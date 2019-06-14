<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();" v-if="school">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
                <span class="title" v-if="!school">{{$t("title.allCoach")}}</span>
                <span class="title" v-if="school">{{$t("title.someoneCoach",{msg:schoolName})}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
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
                        <div class="con-item">
                            <span class="label">{{$t("label.status")}}</span>
                            <el-select v-model="selectedStatus" @change="statusChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in listOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="con-item con-item-search">
                            <el-input :placeholder="$t('holder.coachSearch')" v-model="keyword" class="cm-search">
                                <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
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
                                {{$t("label.school")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th v-if="account.type=='admin'">
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
                            <td v-if="account.type=='admin'">
                                <span class="handle btn-style" v-if="item.giftCertificateState=='notPresented'" @click="sendM0(item)">{{$t('btn.send')}}</span>
                                <span v-if="item.giftCertificateState=='presented'">{{$t('btn.sent')}}</span>
                            </td>
                            <td>
                                <span class="handle" @click="toDetail(index)" :class="{'cm-disabled':item.instructorAccountStatus=='nonActivated'}">{{$t('btn.detail')}}</span>
                                <span class="handle" @click="reSentInstructorActivationEmail(item)" v-if="account.type=='admin'&&item.instructorAccountStatus=='nonActivated'">{{$t('btn.activationEmail')}}</span>
                                <span class="handle" @click="toSetSchool(item)" v-if="account.type=='admin'&&item.instructorAccountStatus!='nonActivated'">{{$t('btn.school')}}</span>
                                <span class="handle" @click="toSetStatus(item)" v-if="account.type=='admin'&&item.instructorAccountStatus!='nonActivated'">{{$t('btn.status')}}</span>
                                <div class="handle-row" v-if="account.type=='admin'&&item.instructorAccountStatus!='nonActivated'">
                                    <span style="display: block" class="handle" @click="feeWaiver('professionalMembersFee',item)" v-if="item.professionalMembersFee=='notPay'||item.professionalMembersFee=='expire'">{{$t("btn.professionalMembersFeeWaiver")}}</span>
                                    <span class="handle" @click="feeWaiver('instructorQualification',item)" v-if="item.instructorQualification=='notPay'||item.instructorQualification=='expire'">{{$t("btn.instructorQualificationFeeWaiver")}}</span>
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
        <div class="cm-btn cm-add-btn" v-if="account.type=='admin'" @click="dialogFormVisible=true">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>{{$t('btn.newCoach')}}</p>
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
        <el-dialog :title='$t("title.schoolSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="schoolSettingDialogFlag" v-if="schoolSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select filterable v-model="schoolForm.school" filterable class="handle cm-select">
                        <el-option
                            v-for="(item,index) in schoolOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="schoolSettingDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveSchool">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
        <el-dialog :title='$t("title.statusSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="statusSettingDialogFlag" v-if="statusSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="statusForm.status" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value" :class="{'cm-hidden':item.value=='nonactivated'||item.value=='certified'}">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="statusSettingDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveStatus">{{$t("btn.submit")}}</div>
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
                school:null,
                schoolName:null,
                levelOptions:[
                   /* {
                        value:null,
                        label:this.$t("btn.all"),
                    },*/
                   /* {
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
                    },*/
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
                options:[
                    /*  {
                     value:null,
                     label:this.$t("btn.all"),
                     },*/
                    {
                        label:this.$t("btn.nonActivated"),
                        value:'nonactivated'
                    },
                    {
                        label:this.$t("btn.certified"),
                        value:'certified'
                    },
                    {
                        label:this.$t("btn.pending"),
                        value:'pending'
                    },{
                        label:this.$t("btn.fail"),
                        value:'fail'
                    },
                    {
                        label:this.$t("btn.disable"),
                        value:'disable'
                    }
                ],
                schoolOptions:[],

                listLevelOptions:[],
                listOptions:[],
                selectedLevel:null,
                selectedStatus:null,


                dialogFormVisible:false,
                newForm:{
                    email:null,
                    level:null,
                    status:'nonactivated',
                    school:null,
                },

                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                requesting:false,
                curItem:null,
                isSetting:false,
                schoolSettingDialogFlag:false,
                schoolForm:{
                    school:null,
                },
                statusSettingDialogFlag:false,
                statusForm:{
                    status:null,
                },
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
                    school:this.account.type=='school'?this.account.serialCode:(this.school?this.school:''),
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
            levelChange:function (data) {
                this.getList();
            },
            statusChange:function (data) {
                this.getList();
            },
            getSchoolList:function () {
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:1,
                    pageSize:1000,
                    searchContent:null,
                }
                Vue.api.getSchoolList(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=data.schoolList;
                        console.log('list:',list);
                        if(this.account.type=='school'){
                            this.schoolOptions.push({
                                label:this.account.account+(this.account.name?(' '+this.account.name):''),
                                value:this.account.account
                            })
                        }else{
                            list.forEach((item,i)=>{
                                this.schoolOptions.push({
                                    label:item.school.serialCode+(item.school.name?(' '+item.school.name):''),
                                    value:item.school.serialCode,
                                })
                            })
                        }
                    }
                });
            },
            save:function () {
                if(!this.newForm.email){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.email")});
                    return;
                }
                if(!this.newForm.level){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.level")});
                    return;
                }
                if(!this.newForm.school){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.school")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    email:this.newForm.email,
                    mfiLevel:this.newForm.level,
                    schoolConfigParm:this.newForm.school,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.addCoach(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this. newForm={
                            email:null,
                            level:null,
                            status:'nonactivated',
                            school:null,
                        };
                        this.getList();
                        this.dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
            reSentInstructorActivationEmail:function (item) {
                if(this.requesting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    email:item.email,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                this.requesting=true;
                Vue.api.reSentInstructorActivationEmail(params).then((resp)=>{
                    this.requesting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },
            toDetail:function (index) {
                let coach=this.entryList[index];
                localStorage.setItem('curCoach',JSON.stringify(coach));
                this.$router.push({name:'coachDetail',params:{id:coach.id}});
            },
            feeWaiver:function (type,item) {

                this.$confirm(type=='professionalMembersFee'?this.$t("tips.professionalMembersFeeWaiver"):this.$t("tips.instructorQualificationFeeWaiver"), this.$t("title.tips"), {
                    confirmButtonText: this.$t("btn.sure"),
                    cancelButtonText: this.$t("btn.cancel"),
                }).then(() => {
                    let params={
                        ...Vue.sessionInfo(),
                        adminId:this.account.id,
                        userId:item.id,
                        itemNumber:type,
                    }
                    let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                    Vue.api.instructorFeeWaiver(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            if(type=='professionalMembersFee'){
                                item.professionalMembersFee='pay';
                            }else if(type=='instructorQualification'){
                                item.instructorQualification='pay';
                            }
                            fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.handleF",{ msg: resp.respMsg})});
                        }
                    });
                }).catch(() => {

                });
            },
            toSetSchool:function (item) {
                this.curItem=item;
                this.schoolSettingDialogFlag=true;
            },
            saveSchool:function () {
                if(!this.curItem){
                    return
                }
                if(this.isSetting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.curItem.id,
                    schoolConfigParm:this.schoolForm.school,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.setInstructorSchoolConfigParm(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.curItem.school=this.schoolForm.school;
                        this.schoolSettingDialogFlag=false;
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            toSetStatus:function (item) {
                this.curItem=item;
                this.statusSettingDialogFlag=true;
            },
            saveStatus:function () {
                if(!this.curItem){
                    return
                }
                if(this.isSetting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.curItem.id,
                    instructorAccountStatus:this.statusForm.status,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.setInstructorAccountStatus(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.curItem.instructorAccountStatus=this.statusForm.status;
                        this.statusSettingDialogFlag=false;
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            sendM0:function (item) {
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    instructorId:item.instructorId,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                Vue.api.sendGiftCertificate(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        item.giftCertificateState='presented';
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },
        },
        mounted () {
            /**/
            this.school=this.$route.params.school;
            this.schoolName=this.$route.params.schoolName;

            /**/
            this.account=Vue.getAccountInfo();
            /**/
            this.listLevelOptions=[].concat(this.levelOptions,[{
                value:null,
                label:this.$t("btn.all"),
            }]);
            this.listOptions=[].concat(this.options,[{
                value:null,
                label:this.$t("btn.all"),
            }]);
            /**/
            this.getList();
            this.getSchoolList();
        },
    }
</script>
