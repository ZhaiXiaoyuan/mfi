<template>
    <div class="page-content">
        <div class="cm-panel">
            <div class="panel-hd">
             <!--   <div class="cm-btn cm-return-btn" @click="$router.back();"  v-if="account.type=='admin'">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>-->
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title">{{$t("title.teachingMaterial")}}</span>
                        <div class="con-item">
                            <span class="label">{{$t("label.level")}}</span>
                            <el-select v-model="selectedLevel" @change="levelChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in listLevelOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.title")}}
                            </th>
                            <th>
                                {{$t("label.time")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.title}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}
                            </td>
                            <td>
                                <span class="handle" @click="toDetail(index,'view')">{{$t('btn.detail')}}</span>
                                <span class="handle" @click="toDetail(index,'edit')" v-if="account.type=='admin'">{{$t('btn.edit')}}</span>
                                <span class="handle" @click="del(index)" v-if="account.type=='admin'">{{$t('btn.del')}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="cm-entry-block-list">
                        <li v-for="(item,index) in entryList" class="entry">
                            <div class="entry-hd">
                                <div class="info-item"> {{$t("label.title")}}</div>
                            </div>
                            <div class="entry-bd">
                                <div class="info-item">{{$t("label.time")}}<span class="gap">:</span>{{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}</div>
                            </div>
                            <div class="entry-ft">
                                <span class="handle cm-handle-btn cm-handle-min-btn" @click="toDetail(index,'view')">{{$t('btn.detail')}}</span>
                            </div>
                        </li>
                    </ul>
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

        <router-link tag="div" :to="{name:'materialItem',params:{type:'add'}}" class="cm-btn cm-add-btn" v-if="account.type=='admin'" @click="dialogFormVisible=true">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>{{$t('btn.newMaterial')}}</p>
        </router-link>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .cm-input-row .field{
        min-width: 110px;
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                account:{},

                levelOptions:[],
                listLevelOptions:[],
                selectedLevel:'M0',

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
                this.getTeachingMaterialList(pageIndex);
            },
            getTeachingMaterialList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                if(this.account.type=='admin'){
                    let params={
                        ...Vue.sessionInfo(),
                        pageIndex:this.pager.pageIndex,
                        pageSize:this.pager.pageSize,
                        mfiLevel:this.selectedLevel,
                    }
                    this.pager.loading=true;
                    Vue.api.getAdminTeachingMaterialList(params).then((resp)=>{
                        this.pager.loading=false;
                        if(resp.respCode=='2000'){
                            let data=JSON.parse(resp.respMsg);
                            try {
                                this.entryList=JSON.parse(data.teachingMaterialList);
                            }catch (e) {
                                this.entryList=[];
                            }
                            this.pager.total=data.count;
                        }
                    });
                }else{
                    let params={
                        ...Vue.sessionInfo(),
                        userId:this.account.id,
                        pageIndex:this.pager.pageIndex,
                        pageSize:this.pager.pageSize,
                        mfiLevel:this.selectedLevel,
                    }
                    this.pager.loading=true;
                    Vue.api.getUserTeachingMaterialList(params).then((resp)=>{
                        this.pager.loading=false;
                        if(resp.respCode=='2000'){
                            let data=JSON.parse(resp.respMsg);
                            let list=data.teachingMaterialList;
                            try {
                                this.entryList=JSON.parse(data.teachingMaterialList);
                            }catch (e) {
                                this.entryList=[];
                            }
                            this.pager.total=data.count;
                        }
                    });
                }
            },
            levelChange:function (data) {
                this.getList();
            },
            toDetail:function (index,type) {
                type=type?type:'add';
                let item=this.entryList[index];
                this.$router.push({name:'materialItem',params:{id:item.id,type:type}});
            },
            del:function (index) {
                let item=this.entryList[index];
                this.$confirm(this.$t("tips.del",{msg:item.title}), this.$t("title.tips"), {
                    confirmButtonText: this.$t("btn.sure"),
                    cancelButtonText: this.$t("btn.cancel"),
                    type: 'warning'
                }).then(() => {
                    let params={
                        ...Vue.sessionInfo(),
                        id:item.id,
                        state:'del'
                    }
                    let fb=Vue.operationFeedback({text:this.$t("tips.delete")});
                    Vue.api.setTeachingMaterialState(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.entryList.splice(index,1);
                            fb.setOptions({type:'complete', text:this.$t("tips.deleteS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.deleteF",{msg:resp.respMsg})});
                        }
                    });
                }).catch(() => {

                });
            },
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();

            /**/
            this.levelOptions=this.genLevelConfig({level:this.account.type=='coach'?this.account.mfiLevel:'all'});
            this.levelOptions.push({
                value:null,
                label:this.$t("btn.all"),
            })
            this.listLevelOptions=this.levelOptions;
            /**/
            this.getList();
        },
    }
</script>
