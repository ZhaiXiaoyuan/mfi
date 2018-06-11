<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <ul class="cm-tab-list">
                    <li :class="{'active':state=='pending'}" @click="setState('pending')">{{$t("btn.auditPending")}}</li>
                    <li :class="{'active':state=='pass'}" @click="setState('pass')">{{$t("btn.auditPass")}}</li>
                    <li :class="{'active':state=='fail'}" @click="setState('fail')">{{$t("btn.auditFail")}}</li>
                </ul>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <div class="con-item">
                            <span class="label">{{$t("label.auditType")}}</span>
                            <el-select v-model="selectedType" @change="typeChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in options"
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
                                {{$t("label.account")}}
                            </th>
                            <th>
                                {{$t("label.name")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.type")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th>
                                {{$t("label.submitDate")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>
                                {{item.type|itemFind('value',options).label}}
                            </td>
                            <td>
                                {{item.state}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}
                            </td>
                            <td>
                                <el-button class="small handle-btn" @click="toDetail(item)">{{$t('btn.detail')}}</el-button>
                                <el-button class="small handle-btn" v-if="item.state!='pass'" @click="toAudit('pass',item)">{{$t('btn.toPass')}}</el-button>
                                <el-button class="small handle-btn" v-if="item.state!='fail'" @click="toAudit('fail',item)">{{$t('btn.toReject')}}</el-button>
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

        <el-dialog :title='$t("title.auditFail")' class="edit-dialog cm-dialog audit-input-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <textarea v-model="reason" :placeholder="$t('holder.reason')" maxlength="200" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="toReject()">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
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
                options:[
                    {
                        value:null,
                        label:this.$t("btn.all"),
                     },
                    {
                        label:this.$t("btn.dueAudit"),
                        value:'instructorDueAudit'
                    },
                    {
                        label:this.$t("btn.toInstructor"),
                        value:'studentToInstructor'
                    },
                ],
                selectedType:null,

                state:'pending',//pending:待审核 pass:已审核 fail:以驳回
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],

                dialogFormVisible:false,
                reason:null,
                curItem:null,
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
                    type:this.selectedType,
                    state:this.state,
                }
                this.pager.loading=true;
                Vue.api.getAuditList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.auditList);
                        console.log('this.entryList:', this.entryList);
                        this.pager.total=data.count;
                    }
                });
            },
            setState:function (value) {
                this.state=value;
                this.getList();
            },
            typeChange:function (data) {
                console.log('data:',data);
                this.selectedType=data;
                this.getList();
            },
            toDetail:function (item) {
                if(item.type=='instructorDueAudit'){
                    this.$router.push({name:'coachDetail',params:{id:item.userId}});
                }else if(item.type=='studentToInstructor'){
                    this.$router.push({name:'studentDetail',params:{id:item.userId}});
                }
            },
            toAudit:function (state,item) {
                this.curItem=item;
                if(state=='fail'){
                    this.dialogFormVisible=true;
                }else if(state=='pass'){
                    let params={
                        ...Vue.sessionInfo(),
                        adminId:this.account.id,
                        userId:this.curItem.userId,
                        type:this.curItem.type,
                        state:'pass',
                        msg:this.reason,
                    }
                    let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                    Vue.api.operateAudit(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.getList();
                            fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.settingF",{msg:resp.respMsg})});
                        }
                    });
                }
            },
            toReject:function () {
               /* if(!this.reason){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.reason")});
                    return;
                }*/
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.curItem.userId,
                    type:this.curItem.type,
                    state:'fail',
                    msg:this.reason,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                Vue.api.operateAudit(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.reason=null;
                        this.getList();
                        this.dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{msg:resp.respMsg})});
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
