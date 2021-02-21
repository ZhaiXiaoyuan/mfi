<template>
    <div class="page-content">
        <div class="cm-panel">
            <div class="panel-hd">
               <span class="title">{{$t('title.allStudent')}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <div class="con-item">
                            <span class="label">{{$t("label.level")}}</span>
                            <el-select v-model="selectedLevel" @change="levelChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in levelOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="con-item">
                            <span class="label">{{$t("label.status")}}</span>
                            <el-select v-model="selectedStatus" @change="statusChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in options"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
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
                                {{item.name+item.familyName}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                {{$t("btn."+item.studentAccountStatus)}}
                            </td>
                            <td>
                                <span class="handle" @click="()=>{$router.push({name:'studentDetail',params:{id:item.id}})}" :class="{'cm-disabled':item.studentAccountStatus=='nonActivated'}">{{$t("btn.detail")}}</span>
                                <span class="handle" @click="reSentStudentActivationEmail(item)" v-if="account.type=='admin'&&item.studentAccountStatus=='nonActivated'">{{$t('btn.activationEmail')}}</span>
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

                levelOptions: [{
                    value:null,
                    label:this.$t("btn.all"),
                }, ...Vue.tools.levelOptionsFilter('')],
                selectedLevel:null,
                options:[
                    {
                        value:null,
                        label:this.$t("btn.all"),
                     },
                    {
                        label:this.$t("btn.nonActivated"),
                        value:'nonactivated'
                    },
                    {
                        label:this.$t("btn.certified"),
                        value:'certified'
                    },
                   /* {
                        label:this.$t("btn.pending"),
                        value:'pending'
                    },
                    {
                        label:this.$t("btn.fail"),
                        value:'fail'
                    },*/
                    {
                        label:this.$t("btn.disable"),
                        value:'disable'
                    }
                ],
                selectedStatus:null,

                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
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
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    mfiLevel:this.selectedLevel,
                    studentAccountStatus:this.selectedStatus,
                    searchContent:this.keyword,
                }
                this.pager.loading=true;
                Vue.api.getStudentList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.studentList);
                        console.log('this.entryList:',this.entryList);
                        this.pager.total=data.count;
                    }
                });
            },
            levelChange:function (data) {
                this.getList();
            },
            statusChange:function (data) {
                this.getList();
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
            this.account=Vue.getAccountInfo();

            /**/
            this.getList();
        },
    }
</script>
