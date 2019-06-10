<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.mall")}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <div class="con-item">
                            <el-menu :default-active="activeType" class="cm-tab-menu" mode="horizontal" @select="setType()">
                                <el-menu-item index="goods">{{$t("btn.goods")}}</el-menu-item>
                                <el-menu-item index="exchangeRecord">{{$t("btn.exchangeRecord")}}</el-menu-item>
                            </el-menu>
                        </div>
                    </div>
                    <div class="block-bd" v-if="activeType=='goods'">
                        <div class="cm-content-box">
                            <ul class="cm-goods-list">
                                <li>
                                    <div class="cover"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="block-bd" v-if="activeType=='exchangeRecord'">
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
                                    {{$t("label.school")}}
                                </th>
                                <th>
                                    {{$t("label.status")}}
                                </th>
                                <th>
                                    {{$t("label.gift20M0")}}
                                </th>
                                <th>
                                    {{$t("label.handle")}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in entryList">
                                <td>
                                    {{item.email}}
                                </td>
                                <td>
                                    {{item.name}}&nbsp;{{item.familyName}}
                                </td>
                                <td>
                                    {{item.mfiLevel}}
                                </td>
                                <td>
                                    {{item.school}}
                                </td>
                                <td>
                                    {{$t("btn."+item.instructorAccountStatus)}}
                                </td>
                                <td>
                                    <span class="handle btn-style" v-if="item.giftCertificateState=='notPresented'" @click="sendM0(item)">{{$t('btn.send')}}</span>
                                    <span v-if="item.giftCertificateState=='presented'">{{$t('btn.sent')}}</span>
                                </td>
                                <td>
                                    <span class="handle" @click="toDetail(index)" :class="{'cm-disabled':item.instructorAccountStatus=='nonActivated'}">{{$t('btn.detail')}}</span>
                                    <span class="handle" @click="reSentInstructorActivationEmail(item)" v-if="account.type=='admin'&&item.instructorAccountStatus=='nonActivated'">{{$t('btn.activationEmail')}}</span>
                                    <span class="handle" @click="toSetSchool(item)" v-if="account.type=='admin'&&item.instructorAccountStatus!='nonActivated'">{{$t('btn.school')}}</span>
                                    <span class="handle" @click="toSetStatus(item)" v-if="account.type=='admin'&&item.instructorAccountStatus!='nonActivated'">{{$t('btn.status')}}</span>
                                    <div class="handle-row" v-if="account.type=='admin'&&item.instructorAccountStatus!='nonActivated'">
                                        <span style="display: block" class="handle" @click="feeWaiver('professionalMembersFee',item)" v-if="item.professionalMembersFee=='notPay'">{{$t("btn.professionalMembersFeeWaiver")}}</span>
                                        <span class="handle" @click="feeWaiver('instructorQualification',item)" v-if="item.instructorQualification=='notPay'">{{$t("btn.instructorQualificationFeeWaiver")}}</span>
                                    </div>
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

                activeType:'goods',//goods、exchangeRecord

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
                    instructorAccountStatus:this.selectedStatus,
                    searchContent:this.keyword,
                    school:this.account.type=='school'?this.account.account:'',
                }
                this.pager.loading=true;
                Vue.api.getCoachList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('data:',data);
                        this.entryList=[];
                        let list=data.instructorList;
                        list.forEach((item,i)=>{
                            this.entryList.push({
                                ...item.instructorPayment,
                                ...item.user
                            })
                        })
                        this.pager.total=data.count;
                        console.log('this.entryList:',this.entryList);
                    }
                });
            },
            setType:function (value) {

            }
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();
            /**/
            this.getList();
        },
    }
</script>
