<template>
    <div class="page-content">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" v-if="account.type=='admin'" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title">{{$t('title.someoneStudent',{msg:coach.name})}}</span>
                        <div class="con-item con-item-search">
                            <el-input :placeholder='$t("holder.certificateStatisticsSearch")' v-model="keyword" @keyup.enter.native="getList()"  class="cm-search">
                                <el-button slot="append" class="cm-btn" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.account")}}
                            </th>
                            <th>
                                {{$t("label.name")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th>{{$t("label.handle")}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.email}}
                            </td>
                            <td>
                                {{item.name}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                {{$t("btn."+item.studentAccountStatus)}}
                            </td>
                            <td>
                                <span class="handle" :class="{'cm-disabled':item.studentAccountStatus=='nonActivated'}" @click="()=>{$router.push({name:'studentDetail',params:{id:item.id}})}">{{$t("btn.detail")}}</span>
                                <span class="handle" @click="reSentStudentActivationEmail(item)" v-if="account.type=='coach'&&item.studentAccountStatus=='nonActivated'">{{$t('btn.activationEmail')}}</span>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        class="cm-pager"
                        @current-change="getList"
                        :prev-text='$t("btn.prev")'
                        :next-text='$t("btn.next")'
                        :current-page="pager.pageIndex"
                        :page-size="pager.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pager.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                account:{},
                coach:{},

                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                requesting:false,
            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.coach.id,
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    mfiLevel:'',
                    canJoinCourseId:null,
                    searchContent:this.keyword,
                }
                this.pager.loading=true;
                Vue.api.getInstrutorStudentList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.studentList);
                        this.pager.total=data.count;
                    }
                });
            },
            reSentStudentActivationEmail:function (item) {
                if(this.requesting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    email:item.email,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                this.requesting=true;
                Vue.api.reSentStudentActivationEmail(params).then((resp)=>{
                    this.requesting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },
        },
        mounted () {
            /**/
            this.coach=JSON.parse(localStorage.getItem('curCoach'));
            this.account=Vue.getAccountInfo();
            this.coach=this.account.type=='coach'?this.account:this.coach;
            console.log('this.coach:',this.coach);

            /**/
            this.getList();
        },
    }
</script>
