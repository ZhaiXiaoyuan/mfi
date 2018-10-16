<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.certificateStatistics")}}</span>
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
                        <div class="con-item con-item-search">
                            <el-input :placeholder="$t('holder.certificateStatisticsSearch')" v-model="keyword" class="cm-search">
                                <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.orderNo")}}
                            </th>
                            <th>
                                {{$t("label.buyer")}}
                            </th>
                            <th>
                                {{$t("label.school")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.count")}}
                            </th>
                            <th>
                                {{$t("label.amount")}}
                            </th>
                            <th>
                                {{$t("label.time")}}
                            </th>
                            <th>
                                {{$t("label.certificateNo")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.orderRecordId}}
                            </td>
                            <td>
                                {{item.possessor?item.possessor.email:'-'}}
                            </td>
                            <td>
                                {{item.schoolSerialCode}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                {{item.mfiLevel=='M0'?20:1}}
                            </td>
                            <td>
                                {{item.orderRecord?item.orderRecord.paymentGross:'-'}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd')}}
                            </td>
                            <td>
                                {{item.serialCode}}
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
        <el-dialog :title='$t("title.newCoach")' class="edit-dialog cm-dialog school-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.email")}}</span>
                    <input type="text" v-model="newForm.email" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="newForm.level" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in levelOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.school")}}</span>
                    <el-select v-model="newForm.school" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in schoolOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.status")}}</span>
                    <el-select v-model="newForm.status" class="handle cm-select" disabled>
                        <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="save">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .add-msg-dialog{
        color: #5360aa;
        .el-dialog{
            width: 580px !important;
        }
       .el-dialog__header{
           text-align: center;
           padding: 30px 20px;
           .el-dialog__title{
               font-size: 28px;
               color: #5360aa;
           }
       }
        .el-dialog__body{
            padding-top: 0px;
        }
        textarea{
            width: 100%;
            height: 270px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding: 20px;
            color: #5360aa;
            font-size: 16px;
            resize: none;
        }
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
                coach:{},

                levelOptions:[
                    {
                        value:null,
                        label:this.$t("btn.all"),
                    },
                    {
                        value:'M0',
                        label:'M0',
                    },
                    {
                        value:'M1',
                        label:'M1',
                    },
                    {
                        value:'M2',
                        label:'M2',
                    },
                    {
                        value:'M3',
                        label:'M3',
                    },
                    {
                        value:'BMI',
                        label:'BMI',
                    },
                    {
                        value:'MI',
                        label:'MI',
                    },
                    {
                        value:'MMI',
                        label:'MMI',
                    },
                    {
                        value:'MIT',
                        label:'MIT',
                    },
                ],

                selectedLevel:null,


                dialogFormVisible:false,

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
                    possessorId:'',
                    mfiLevel:this.selectedLevel,
                    certificateState:null,
                    searchContent:this.keyword,
                    schoolSerialCode:this.account.type=='school'?this.account.serialCode:'',
                }
                this.pager.loading=true;
                Vue.api.getInstructorBuyCertificate(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=JSON.parse(data.certificateList);
                        this.entryList=[];
                        list.forEach((item,i)=>{
                            item.possessor=item.possessor?JSON.parse(item.possessor):null;
                            item.user=item.user?JSON.parse(item.user):null;
                            if(item.orderRecord){
                                let orderInfo=JSON.parse(item.orderRecord);
                                orderInfo.tpMsg=JSON.parse(orderInfo.tpMsg);
                                item.orderRecord=orderInfo;
                            }
                            this.entryList.push(item);
                        })
                        console.log('this.entryList:', this.entryList);
                        this.pager.total=data.count;
                    }
                });
            },
            levelChange:function (data) {
                this.getList();
            },

        },
        mounted () {
            this.account=Vue.getAccountInfo();
            this.coach=this.account.type=='coach'?this.account:this.coach;
            /**/
            this.getList();

        },
    }
</script>
