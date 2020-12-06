<template>
    <div class="page-content coach-detail">
        <canvas width="1240" v-for="(item,index) in rawCertificateList" :id="'canvas'+index"  height="744" style="display:none;border:1px solid #d3d3d3;background:#ffffff;"></canvas>
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back()">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd cm-watermark">
                <div class="cm-detail-block detail-block show-status">
                    <div class="status" v-if="account.type=='coach'&&(account.professionalMembersFee!='notPay'&&account.professionalMembersFee!='expire'&&account.instructorQualification!='notPay'&&account.instructorQualification!='expire')">
                        <span>{{$t("title."+account.instructorAccountStatus)}}</span>
                    </div>
                    <p class="cm-tips cm-info-tips" v-if="account.type==='coach'&&account.instructorAccountStatus==='fail'&&coach.auditMsg">
                       {{coach.auditMsg}}
                    </p>

                    <div class="payment-status" v-if="account.type=='coach'&&(account.professionalMembersFee=='notPay'||account.professionalMembersFee=='expire'||account.instructorQualification=='notPay'||account.instructorQualification=='expire')">
                        <div v-if="account.professionalMembersFee=='notPay'||account.professionalMembersFee=='expire'"><span>{{$t("tips.annualFeelForProfessionalMembers")}}</span><span class="cm-btn btn" @click="toPay({type:'professionalMembersFee'})">{{$t("btn.go")}}</span></div>
                        <div v-if="account.instructorQualification=='notPay'||account.instructorQualification=='expire'"><span>{{$t("tips.instructorQualification")}}</span><span class="cm-btn btn" @click="toPay({type:'instructorQualification'})">{{$t("btn.go")}}</span></div>
                    </div>
                    <div class="payment-status" v-if="account.type=='admin'&&(coach.professionalMembersFee=='notPay'||coach.professionalMembersFee=='expire'||coach.instructorQualification=='notPay'||coach.instructorQualification=='expire')">
                        <div v-if="coach.professionalMembersFee=='notPay'||coach.professionalMembersFee=='expire'"><span class="cm-btn btn" @click="feeWaiver('professionalMembersFee')">{{$t("btn.professionalMembersFeeWaiver")}}</span></div>
                        <div v-if="coach.instructorQualification=='notPay'||coach.instructorQualification=='expire'"><span class="cm-btn btn" @click="feeWaiver('instructorQualification')">{{$t("btn.instructorQualificationFeeWaiver")}}</span></div>
                    </div>
                    <div class="block-bd">
                        <div class="to-upload" style="width: 160px;height: 160px;">
                            <img class="avatar" :src="coach.headPic?basicConfig.filePrefix+coach.headPic+'?r='+Math.random():defaultAvatar" alt="">
                            <div class="upload-btn"  v-if="account.type=='coach'">
                                <div class="wrapper">
                                    <i class="icon upload-icon"></i>
                                    <input  type="file" id="file-input" accept="image/*" @change="selectFile($event)">
                                </div>
                            </div>
                        </div>
                        <ul class="info-list">
                            <li>
                                <span class="label">{{$t('label.fName')}}：</span>
                                <span class="value">{{coach.familyName}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.lName')}}：</span>
                                <span class="value">{{coach.name}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.level')}}：</span>
                                <span class="value">{{coach.mfiLevel}}</span>
                                <i class="icon setting-min-icon" @click="levelSettingDialogFlag=true" v-if="account.type=='admin'"></i>
                            </li>
                            <li>
                                <span class="label">{{$t('label.school')}}：</span>
                                <span class="value">{{coach.school}}</span>
                                <i class="icon setting-min-icon" @click="schoolSettingDialogFlag=true" v-if="account.type=='admin'||(account.type=='coach'&&account.school=='configurable')"></i>
                            </li>
                            <li>
                                <span class="label">{{$t('label.email')}}：</span>
                                <span class="value">{{coach.email}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.status')}}：</span>
                                <span class="value">{{$t('btn.'+coach.instructorAccountStatus)}}</span>
                                <i class="icon setting-min-icon" @click="statusSettingDialogFlag=true" v-if="account.type=='admin'"></i>
                                <span style="margin-left: 10px;" class="cm-btn btn" @click="addAudit()" v-if="account.type=='coach'&&(coach.instructorAccountStatus=='pending'||coach.instructorAccountStatus=='fail')&&(coach.professionalMembersFee=='pay'&&coach.instructorQualification=='pay')">{{$t("btn.applyForAudit")}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.gender')}}：</span>
                                <span class="value">{{coach.gender}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.birth')}}：</span>
                                <span class="value">{{coach.birth}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.country')}}：</span>
                                <span class="value">{{coach.country}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.city')}}：</span>
                                <span class="value">{{coach.city}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.address')}}：</span>
                                <span class="value">{{coach.address}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.contact')}}：</span>
                                <span class="value">{{coach.phone}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.eContactName')}}: </span>
                                <span class="value">{{coach.emergencyName}}</span>
                            </li>
                            <li>
                                <span class="label">{{$t('label.eContact')}}：</span>
                                <span class="value">{{coach.emergencyPhone}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="block-bd">
                       <p class="title">{{$t('title.lCertificate')}}</p>
                        <ul class="pic-list">
                            <li v-for="(item,index) in  certificateList" @click="viewPicModal({imgUrl:item.filePath})"  :style="{background: 'url('+item.filePath+') no-repeat center',backgroundSize: 'cover'}">

                            </li>
                        </ul>
                        <div style="text-align: right;">
                            <span class="count">{{$t('tips.total',{msg:certificateList.length})}}</span>
                          <!--  <span class="cm-link-btn" style="padding-left: 20px;" v-if="certificateList.length>3">{{$t('btn.viewAll')}}</span>-->
                        </div>
                    </div>
                    <div class="block-bd">
                        <p class="title">{{$t('title.oCertificate')}}</p>
                        <ul class="pic-list" style="padding-bottom: 40px;">
                            <li v-for="(item,index) in  otherPicList" class="to-upload" @click="viewPicModal({imgUrl:item.filePath})">
                                <img :src="item.filePath">
                                <p class="label">{{item.label}}</p>
                                <div class="upload-btn"  v-if="account.type=='coach'">
                                    <div class="wrapper">
                                        <i class="icon upload-icon"></i>
                                        <input  type="file" :id="'file-'+index" accept="image/*" @change="uploadOCertificate(index)" @click="stopPropagation($event)">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="block-bd" v-if="account.type=='admin'||account.type=='school'">
                        <div class="btn-list">
                            <div class="btn" @click="toStudent()">{{$t("btn.student")}}</div>
                            <div class="btn" @click="toCourse()">{{$t("btn.course")}}</div>
                            <div class="btn" @click="toIssuingRecord()">{{$t("btn.AuthorizationRecord")}}</div>
                            <div class="btn" @click="openRecordModal()" v-if="account.type=='school'">{{$t("btn.transpondRecord")}}</div>
                        </div>
                    </div>
                    <div class="block-bd" v-if="account.type=='coach'">
                        <div class="btn-list">
                            <div class="cm-btn btn" @click="editDialogFlag=true">{{$t("btn.editInfo")}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <el-dialog :title='$t("title.levelSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="levelSettingDialogFlag" v-if="levelSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="levelForm.level" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in levelOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="levelSettingDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveLevel">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("title.statusSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="statusSettingDialogFlag" v-if="statusSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.status")}}</span>
                    <el-select v-model="statusForm.status" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value" :class="{'cm-hidden':item.value=='certified'}">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="statusSettingDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveStatus">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("title.schoolSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="schoolSettingDialogFlag" v-if="schoolSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.school")}}</span>
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

        <el-dialog :title='$t("title.accountSetting")' class="edit-dialog cm-dialog edit-dialog" :visible.sync="editDialogFlag" v-if="editDialogFlag" width="40%">
            <div class="form-win">
                <div class="form">
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.email")}}</span>
                        <input type="text" v-model="editForm.email" readonly class="cm-input cm-disabled">
                    </div>
                    <div class="cm-input-row input-row">
                        <span class="field">{{$t("label.setPwd")}}</span>
                        <div class="input-item">
                            <input :type="showPassword?'text':'password'" v-model="editForm.password" class="cm-input">
                            <i class="icon" :class="{'eye-close-icon':showPassword,'eye-open-icon':!showPassword}" @click="showPassword=!showPassword"></i>
                        </div>
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.fName")}}</span>
                        <input type="text" v-model="editForm.familyName" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.lName")}}</span>
                        <input type="text" v-model="editForm.name" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.gender")}}</span>
                        <div class="input-wrap">
                            <el-radio v-model="editForm.gender" label="M">M</el-radio>
                            <el-radio v-model="editForm.gender" label="F">F</el-radio>
                        </div>
                       <!-- <input type="text" v-model="editForm.gender" class="cm-input">-->
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.birth")}}</span>
                        <el-date-picker
                            class="cm-calender"
                            v-model="editForm.birth"
                            type="date"
                            :placeholder="$t('el.datepicker.selectDate')">
                        </el-date-picker>
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.phone")}}</span>
                        <input type="text" v-model="editForm.phone" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.eContactName")}}</span>
                        <input type="text" v-model="editForm.emergencyName" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.eContact")}}</span>
                        <input type="text" v-model="editForm.emergencyPhone" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.country")}}</span>
                        <el-select v-model="editForm.country" filterable>
                            <el-option
                                v-for="item in regionList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>
                     <!--   <input type="text" v-model="editForm.country" class="cm-input">-->
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.province")}}</span>
                        <input type="text" v-model="editForm.province" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.city")}}</span>
                        <input type="text" v-model="editForm.city" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.address")}}</span>
                        <input type="text" v-model="editForm.address" class="cm-input">
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="editDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveEdit()">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("btn.transpondRecord")' class="edit-dialog cm-dialog record-modal" :visible.sync="recordModalFlag" v-if="recordModalFlag" width="40%">
            <div class="modal-body">
                <table class="cm-entry-list">
                    <thead>
                    <tr>
                        <th>
                            {{$t("label.from")}}
                        </th>
                        <th>
                            {{$t("label.to")}}
                        </th>
                        <th>
                            {{$t("label.level")}}
                        </th>
                        <th>
                            {{$t("label.certificateNo")}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in entryList">
                        <td>
                            {{transpondData.from.name}}
                        </td>
                        <td>
                            {{transpondData.to.email}}
                        </td>
                        <td>
                            {{item.mfiLevel}}
                        </td>
                        <td>
                           <p v-for="(entry,entryIndex) in JSON.parse(item.certificateList)" >{{entry}}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="recordModalFlag=false">{{$t("btn.close")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .payment-status{
        color: #F56C6C;
        font-size: 16px;
        text-align: center;
        padding: 10px 0px;
        >div{
            &+div{
                margin-top: 5px;
            }
        }
        .btn{
            margin-left: 10px;
            display: inline-block;
            font-size: 12px;
            color: #5360aa;
            border-radius: 5px;
            border: 1px solid #5360aa;
            padding: 2px 12px;
            cursor: pointer;
        }
    }
    .edit-dialog{
        .el-dialog{
            width: 700px !important;
        }
        .form-win{
            width: 100%;
            height: 400px;
            overflow-y: scroll;
            .field{
                width: 192px;
            }
            .cm-input-row{
                .cm-input{
                    height: 50px;
                }
                &.cm-input-row{
                    margin-top: 15px;
                }
            }
        }
    }
    .record-modal{
        .el-dialog{
            width: 70% !important;
            max-width: 1200px;
            .el-dialog__body{
                /*background: #fafafa;*/
                padding: 0px;
            }
        }
        .modal-body{
            height: 400px;
            overflow-y: auto;
            /*background: #fafafa;*/
        }
        .handle-list{
            align-items: center;
            justify-content: center;
            padding-bottom: 20px;
        }
    }
</style>
<script>
    import Vue from 'vue';
    import vueCropper from 'vue-cropper'
    import md5 from 'js-md5'

    export default {
        components: {
            vueCropper
        },
        data() {
            return {
                id:null,

                account:{},
                defaultAvatar:require('../../images/common/default-avatar.png'),
                bgImg:require('../../images/common/card-bg.jpg'),
                coach:{},
                otherPicList:[],

                levelOptions:[
                    /* {
                     value:null,
                     label:this.$t("btn.all"),
                     },*/
                  /*  {
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
                        label:this.$t("btn.nonActivated"),
                        value:'nonactivated'
                    },*/
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
                /*    {
                        label:this.$t("btn.disable"),
                        value:'disable'
                    }*/
                ],
                schoolOptions:[
                  /*  {
                    label:this.$t("btn.configurable"),
                    value:'mfi-individual '},*/
                ],
                schoolDetail:null,

                isSetting:false,

                levelSettingDialogFlag:false,
                levelForm:{
                    level:null,
                },

                statusSettingDialogFlag:false,
                statusForm:{
                    status:'',
                },

                schoolSettingDialogFlag:false,
                schoolForm:{
                    school:null,
                },
                rawCertificateList:[],
                certificateList:[],

                showPassword:false,
                editDialogFlag:false,
                editForm:{},
                regionList:[],

                recordModalFlag:false,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                transpondData:{},
                entryList:[],
                levelNameConf:{
                    "BMI": "BASIC MERMAID INSTRUCTOR",
                    "MI": "Mermaid Instructor",
                    "MIT": "Mermaid Instructor Trainer"
                }
            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            saveLevel:function () {
                if(this.isSetting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.coach.id,
                    mfiLevel:this.levelForm.level,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.grantCertificateToInstrutor(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.coach.mfiLevel=this.levelForm.level;
                        this.levelSettingDialogFlag=false;
                        localStorage.setItem('curCoach',JSON.stringify(this.coach));
                        this.getUserBaseInfo();
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            saveStatus:function () {
                console.log('test:',this.statusForm);
                if(this.isSetting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.coach.id,
                    instructorAccountStatus:this.statusForm.status,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.setInstructorAccountStatus(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.coach.instructorAccountStatus=this.statusForm.status;
                        this.statusSettingDialogFlag=false;
                        localStorage.setItem('curCoach',JSON.stringify(this.coach));
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            saveSchool:function () {
                if(this.isSetting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.coach.id,
                    schoolConfigParm:this.schoolForm.school,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.setInstructorSchoolConfigParm(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.coach.school=this.schoolForm.school;
                        this.account.school=this.schoolForm.school;
                        this.schoolSettingDialogFlag=false;
                        localStorage.setItem('curCoach',JSON.stringify(this.coach));
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
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
                        if(this.account.type=='coach'){
                            this.schoolOptions=[];
                        }
                        list.forEach((item,i)=>{
                            this.schoolOptions.push({
                                label:item.school.serialCode+(item.school.name?(' '+item.school.name):''),
                                value:item.school.serialCode,
                            })
                        })
                    }
                });
            },
            toStudent:function () {
                localStorage.setItem('curCoach',JSON.stringify(this.coach));
                this.$router.push({name:'studentList',params:{id:this.coach.id}});
            },
            toCourse:function () {
                localStorage.setItem('curCoach',JSON.stringify(this.coach));

                this.$router.push({name:'courseList',params:{id:this.coach.id}});
            },
            toIssuingRecord:function () {
                localStorage.setItem('curCoach',JSON.stringify(this.coach));
                this.$router.push({name:'coachCertificateStatistics',params:{id:this.coach.id}});
            },
            getUserCertificate:function () {
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.id,
                }
                Vue.api.getUserCertificate(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.rawCertificateList=JSON.parse(resp.respMsg);
                        this.certificateList=[];
                        console.log('this.rawCertificateList:',this.rawCertificateList);

                        setTimeout(()=>{
                            this.rawCertificateList.forEach((item,i)=>{
                                item.certificate=JSON.parse(item.certificate);
                                item.user=JSON.parse(item.user);
                                this.draw({
                                    id:'canvas'+i,
                                    avatar:Vue.basicConfig.filePrefix+item.user.headPic+"?r="+Math.random(),
                                    name:item.user.name+' '+item.user.familyName,
                                    level: this.levelNameConf[item.certificate.mfiLevel] || item.certificate.mfiLevel,
                                    certificateNo:item.certificate.serialCode,
                                    date:Vue.formatDate(item.certificate.updatedAt,'yyyy-MM-dd'),
                                    issuer:item.certificate.schoolSerialCode,
                                    instructor:item.possessorName,
                                    status:'BMI,MI,MMI,MIT'.indexOf(item.certificate.mfiLevel)>-1?(Vue.filter('coachStatus')(item.user.instructorAccountStatus)+' '+(item.user.instructorAccountStatus==='certified'?this.getValidityDate():'')):'',
                                    callback:(data)=>{
                                        item.filePath=data;
                                        this.certificateList.push(item);
                                    }
                                });
                            });
                        },1000)
                    }else{

                    }
                });
            },
            getUserBaseInfo:function () {
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.id,
                    role:'instructor'
                }
                Vue.api.getUserBaseInfo(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);

                        this.coach={...data.instructorPayment,...data.user,auditMsg:data.audit?data.audit.msg:''};

                        if(this.coach.headPic){
                            this.coach.headPic=this.coach.headPic+"?r="+Math.random();
                        }
                        this.getUserCertificate();
                        this.otherPicList=[];
                        if(this.coach.firstAidPic){
                            this.otherPicList.push({
                                label:this.$t('label.firstAid'),
                                filePath:Vue.basicConfig.filePrefix+this.coach.firstAidPic+"?r="+Math.random()
                            })
                        }
                        if(this.coach.insurancePic){
                            this.otherPicList.push({
                                label:this.$t('label.insurance'),
                                filePath:Vue.basicConfig.filePrefix+this.coach.insurancePic+"?r="+Math.random()
                            })
                        }

                        this.levelForm.level=this.coach.mfiLevel;
                        this.statusForm.status=this.coach.instructorAccountStatus;
                        this.schoolForm.school=this.coach.school;
                        console.log('this.coach:',this.coach);
                        //
                        this.editForm=JSON.parse(JSON.stringify(this.coach));
                        this.editForm.password=null;
                    }else{

                    }
                });
            },
            circleImg:function(ctx, img, x, y, r) {
                ctx.save();
                var d =2 * r;
                var cx = x + r;
                var cy = y + r;
                ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                ctx.clip();
                ctx.drawImage(img, x, y, d, d);
                ctx.restore();
            },
            drawText:function (ctx,text,x,y,fontSize) {
                fontSize=fontSize?fontSize:32;
                ctx.save();
                ctx.font = fontSize+"px ' Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei'";
                ctx.fillStyle = "#333";
                ctx.fillText(text,x,y,300);
                ctx.restore();
            },
            draw:function (options) {
                let that=this;
                var canvas=document.getElementById(options.id);
                var ctx=canvas.getContext("2d");

                ctx.save();
                let bgImg=new Image();
                bgImg.crossOrigin="anonymous";
                bgImg.src=this.bgImg;
                bgImg.onload=function(){
                    ctx.drawImage(bgImg,0,0);
                    ctx.restore();


                    ctx.save();
                    var img = new Image();
                    img.crossOrigin="anonymous";
                    img.src = options.avatar;
                    img.onload=function () {
                        that.circleImg(ctx, img, 95, 80, 150);
                        ctx.restore();
                        //
                        that.drawText(ctx,'Name:',710,70);
                        that.drawText(ctx,options.name,815,70,'40');

                        that.drawText(ctx,'Level:',718,115);
                        that.drawText(ctx,options.level,815,115);

                        that.drawText(ctx,'Certification Number:',503,160);
                        that.drawText(ctx,options.certificateNo,815,160);

                        that.drawText(ctx,'Certification Date:',548,205);
                        that.drawText(ctx,options.date,815,205);

                        that.drawText(ctx,'Issuing Instructor:',550,250);
                        that.drawText(ctx,options.instructor,815,250);

                        that.drawText(ctx,'Issuing School:',586,295);
                        that.drawText(ctx,options.issuer,815,295);

                        if(options.status){
                            that.drawText(ctx,'Status:',705,340);
                            that.drawText(ctx,options.status,815,340);
                        }

                        //
                        let dataUrl = canvas.toDataURL('image/jpeg');
                        options.callback&&options.callback(dataUrl);
                    }
                }
            },
            saveEdit:function () {
                if(!this.editForm.email){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.email")});
                    return;
                }
                if(!this.editForm.familyName){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.fName")});
                    return;
                }
                if(!this.editForm.name){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.lName")});
                    return;
                }
                if(!this.editForm.gender){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.gender")});
                    return;
                }
                if(!this.editForm.birth){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.birth")});
                    return;
                }else{
                    this.editForm.birth=Vue.tools.formatDate(this.editForm.birth,'yyyy-MM-dd');
                }
                if(!this.editForm.phone){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.phone")});
                    return;
                }
                if(!this.editForm.emergencyName){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.eContactName")});
                    return;
                }
                if(!this.editForm.emergencyPhone){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.eContact")});
                    return;
                }
                if(!this.editForm.country){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.country")});
                    return;
                }
                if(!this.editForm.province){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.province")});
                    return;
                }
                if(!this.editForm.city){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.city")});
                    return;
                }
                if(!this.editForm.address){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.address")});
                    return;
                }
                let params={
                    timeStamp:Vue.genTimestamp(),
                    userId:this.id,
                    ...this.editForm
                }
                if(params.password){
                    params.password=md5.hex(params.password);
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.setUserBaseInfo(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        Object.assign(this.account,this.editForm);
                        this.coach=this.account;
                        this.$cookie.set('account',JSON.stringify({
                            type:'coach',
                            account:this.account.email,
                            ...this.account
                        }),7);
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS",{msg:resp.respMsg})});
                        this.editDialogFlag=false;
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
            selectFile:function ($event) {
                let ele=Vue.tools.getCurEle($event);
                let file=ele.files[0];
                Vue.tools.fileToBlob(file,(data)=>{
                    this.cropModal({
                        img:data,
                        ok:(data)=>{
                            let formData = new FormData();
                            let sessionInfo=Vue.sessionInfo();
                            formData.append('timeStamp',sessionInfo.timeStamp);
                            formData.append('userId',this.account.id);
                            formData.append('headPic',data);
                            this.uploading=true;
                            let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                            Vue.api.setHeadPic(formData).then((resp)=>{
                                ele.value='';
                                this.uploading=false;
                                if(resp.respCode=='2000'){
                                    this.getUserBaseInfo();
                                    fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                                }else{
                                    fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                }
                            });
                        },
                        cancel:function () {
                            ele.value='';
                        }
                    });
                });
            },
            addAudit:function () {
                if(this.isSetting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.coach.id,
                    type:'instructorDueAudit',
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                this.isSetting=true;
                Vue.api.addAudit(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                        localStorage.setItem('curCoach',JSON.stringify(this.coach));
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{ msg: resp.respMsg})});
                    }
                });
            },
            uploadOCertificate:function (index) {
                if(index==0){
                    this.selectFirstAidFile();
                }else if(index==1){
                    this.selectInsuranceFileFile();
                }
            },
            selectFirstAidFile:function () {
                let file=document.getElementById('file-0').files[0];
                Vue.tools.imgCompress({
                    file:file,
                    width:'800',
                    quality:0.8,
                    callback:(data)=>{
                        let formData = new FormData();
                        formData.append('timeStamp',Vue.genTimestamp());
                        formData.append('userId',this.account.id);
                        formData.append('firstAidPic',data);
                        this.uploading=true;
                        let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                        Vue.api.setFirstAidPic(formData).then((resp)=>{
                            this.uploading=false;
                            if(resp.respCode=='2000'){
                                this.getUserBaseInfo();
                                fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                            }else{
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                            }
                        });
                    }
                });

            },
            selectInsuranceFileFile:function () {
                let file=document.getElementById('file-1').files[0];
                Vue.tools.imgCompress({
                    file:file,
                    width:'800',
                    quality:0.8,
                    callback:(data)=>{
                        let formData = new FormData();
                        formData.append('timeStamp',Vue.genTimestamp());
                        formData.append('userId',this.account.id);
                        formData.append('insurancePic',data);
                        this.uploading=true;
                        let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                        Vue.api.setInsurancePic(formData).then((resp)=>{
                            this.uploading=false;
                            if(resp.respCode=='2000'){
                                this.getUserBaseInfo();
                                fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                            }else{
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                            }
                        });
                    }
                });
            },
            getRegionConfig:function () {
                Vue.api.getRegionConfig({ ...Vue.sessionInfo()}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.regionList=JSON.parse(resp.respMsg);
                        this.regionList.forEach((item,i)=>{
                            item.label=item.englishName;
                            item.value=item.code;
                        })
                    }else{

                    }
                });
            },
            toPay:function (options) {
                console.log('this.unusedList:',this.unusedList);
                let interval=null;
                let payModalInstance=this.payModal({
                    userId:this.account.id,
                    level:options.type,
                    title:this.$t('title.toPaypal'),
                    tips:this.$t('label.'+(options.type=='professionalMembersFee'?'annualFeelForProfessionalMembers':'instructorQualification')),
                    callback:(data)=>{
                        // payModalInstance.close();

                        let alertInstance=this.alert({
                            title:"",
                            html:'<div style="text-align: center;"><div><i class="icon loading-icon"></i></div><div>'+this.$t('tips.payingTips')+'</div></div>',
                            yes:this.$t('btn.cancel'),
                            lock:true,
                            ok:()=>{
                                interval&&clearInterval(interval);
                                payModalInstance.close();
                            }
                        });
                        interval=setInterval(()=>{
                            Vue.api.getUserBaseInfo({  ...Vue.sessionInfo(), userId:this.id, role:'instructor'}).then((resp)=>{
                                if(resp.respCode=='2000'){
                                    let data=JSON.parse(resp.respMsg);
                                    if(options.type=='professionalMembersFee'&&data.instructorPayment.professionalMembersFee=='pay'){
                                        alertInstance.close();
                                        clearInterval(interval);
                                        window.location.reload();
                                    }else if(options.type=='instructorQualification'&&data.instructorPayment.instructorQualification=='pay'){
                                        alertInstance.close();
                                        clearInterval(interval);
                                        window.location.reload();
                                    }
                                }else{

                                }
                            });
                        },3000)
                    },
                    closeCallback:()=>{
                        clearInterval(interval);
                    }
                });
            },
            feeWaiver:function (type) {
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.coach.id,
                    itemNumber:type,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                Vue.api.instructorFeeWaiver(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getUserBaseInfo();
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{ msg: resp.respMsg})});
                    }
                });
            },
            openRecordModal:function () {
                this.recordModalFlag=true;
                this.getList(1);
            },
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    from:this.account.id,
                    to:this.coach.id,
                }
                this.pager.loading=true;
                Vue.api.getCertificateTranspondList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.transpondData=data;
                        console.log('tRecord:',data);
                        this.entryList=this.transpondData.list;
                        this.pager.total=data.count;
                    }
                });
            },
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();
            console.log('this.account:',this.account);

            this.id=this.account.type=='coach'?this.account.id:this.$route.params.id;


            /**/
            this.getUserBaseInfo();

            /**/
            this.getSchoolList();
            /**/
            //
            this.getRegionConfig();
        },
    }
</script>
