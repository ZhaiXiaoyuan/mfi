<template>
    <div class="page-content coach-detail">
        <canvas width="1200" v-for="(item,index) in rawCertificateList" :id="'canvas'+index"  height="675" style="display:none;border:1px solid #d3d3d3;background:#ffffff;"></canvas>
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block detail-block" style="padding-top: 0px;">
                    <div class="status">
                        {{$t("title."+account.instructorAccountStatus)}}
                        <div class="cm-btn btn" @click="$router.push({name:'userAuditList',params:{}})">{{$t('btn.myAudit')}}</div>
                    </div>
                    <div class="block-bd">
                        <el-row>
                            <el-col :span="5">
                                <div class="to-upload" style="width: 160px;height: 160px;">
                                    <img class="avatar" :src="coach.headPic?basicConfig.filePrefix+coach.headPic:defaultAvatar" alt="">
                                    <div class="upload-btn"  v-if="account.type=='coach'">
                                        <div class="wrapper">
                                            <i class="icon upload-icon"></i>
                                            <input  type="file" id="file-input" accept="image/*" @change="selectFile()">
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="19">
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">{{$t('label.fName')}}：</span>
                                        <span class="value">{{coach.familyName}}</span>

                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.lName')}}：</span>
                                        <span class="value">{{coach.name}}</span>

                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.level')}}：</span>
                                        <span class="value">{{coach.mfiLevel}}</span>
                                        <i class="icon setting-min-icon" @click="levelSettingDialogFlag=true" v-if="account.type=='admin'"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">{{$t('label.gender')}}：</span>
                                        <span class="value">{{coach.gender}}</span>

                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.birth')}}：</span>
                                        <span class="value">{{coach.birth}}</span>

                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.school')}}：</span>
                                        <span class="value">{{coach.school}}</span>
                                        <i class="icon setting-min-icon" @click="schoolSettingDialogFlag=true" v-if="account.type=='admin'||(account.type=='coach'&&account.school=='configurable')"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">{{$t('label.country')}}：</span>
                                        <span class="value">{{coach.country}}</span>

                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.city')}}：</span>
                                        <span class="value">{{coach.city}}</span>
                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.status')}}：</span>
                                        <span class="value">{{coach.instructorAccountStatus}}</span>
                                        <i class="icon setting-min-icon" @click="statusSettingDialogFlag=true" v-if="account.type=='admin'"></i>
                                        <span style="margin-left: 10px;" class="cm-btn btn" @click="addAudit()" v-if="account.type=='coach'&&(coach.instructorAccountStatus=='pending'||coach.instructorAccountStatus=='fail')">{{$t("btn.applyForAudit")}}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">{{$t('label.address')}}：</span>
                                        <span class="value">{{coach.address}}</span>
                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.contact')}}：</span>
                                        <span class="value">{{coach.phone}}</span>
                                    </el-col>
                                    <!--功能临时注释-->
                                   <!-- <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.auditDate')}}：</span>
                                        <span class="value"></span>
                                    </el-col>-->
                                </el-row>
                                <el-row  class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">{{$t('label.eContact')}}: </span>
                                        <span class="value">{{coach.emergencyPhone}}</span>
                                    </el-col>
                                    <el-col :span="9"  :offset="1" class="info-item">
                                        <span class="label">{{$t('label.email')}}：</span>
                                        <span class="value">{{coach.email}}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="block-bd">
                       <p class="title">{{$t('title.lCertificate')}}</p>
                        <ul class="pic-list">
                            <li v-for="(item,index) in  certificateList" @click="viewPicModal({imgUrl:item.filePath})">
                                <img :src="item.filePath">
                            </li>
                        </ul>
                        <div style="text-align: right;">
                            <span class="count">{{$t('tips.total',{msg:certificateList.length})}}</span>
                          <!--  <span class="cm-link-btn" style="padding-left: 20px;" v-if="certificateList.length>3">{{$t('btn.viewAll')}}</span>-->
                        </div>
                    </div>
                    <div class="block-bd">
                        <p class="title">{{$t('title.oCertificate')}}</p>
                        <ul class="pic-list">
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
                    <div class="block-bd" v-if="account.type=='admin'">
                        <div class="btn-list">
                            <div class="btn" @click="$router.push({name:'studentList',params:{id:coach.id}})">{{$t("btn.student")}}</div>
                            <div class="btn" @click="toCourse()">{{$t("btn.course")}}</div>
                            <div class="btn" @click="$router.push({name:'coachCertificateStatistics',params:{id:coach.id}})">{{$t("btn.AuthorizationRecord")}}</div>
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

        <el-dialog :title='$t("title.auditingSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="statusSettingDialogFlag" v-if="statusSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="statusForm.status" class="handle cm-select">
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
                <div class="cm-btn cm-handle-btn handle-btn" @click="statusSettingDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveStatus">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("title.schoolSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="schoolSettingDialogFlag" v-if="schoolSettingDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="schoolForm.school" filterable class="handle cm-select">
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
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.pwd")}}</span>
                        <input type="password" v-model="editForm.password" class="cm-input">
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
                        <input type="text" v-model="editForm.gender" class="cm-input">
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
                        <span class="field">{{$t("label.eContact")}}</span>
                        <input type="text" v-model="editForm.emergencyPhone" class="cm-input">
                    </div>
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.country")}}</span>
                        <input type="text" v-model="editForm.country" class="cm-input">
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
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .edit-dialog{
        .el-dialog{
            width: 700px !important;
        }
        .form-win{
            width: 100%;
            height: 400px;
            overflow-y: scroll;
            .field{
                width: 180px;
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
</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

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
                        value:'MBI',
                        label:'MBI',
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
                        label:this.$t("btn.nonactivated"),
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
                    {
                        label:this.$t("btn.disable"),
                        value:'disable'
                    }
                ],
                schoolOptions:[{
                    label:this.$t("btn.configurable"),
                    value:'configurable'
                },],
                schoolDetail:null,

                isSetting:false,

                levelSettingDialogFlag:false,
                levelForm:{
                    level:null,
                },

                statusSettingDialogFlag:false,
                statusForm:{
                    status:null,
                },

                schoolSettingDialogFlag:false,
                schoolForm:{
                    school:null,
                },
                rawCertificateList:[],
                certificateList:[],

                editDialogFlag:false,
                editForm:{}

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
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            saveStatus:function () {
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
                        let list=JSON.parse(data.schoolList);
                        if(this.account.type=='coach'){
                            this.schoolOptions=[];
                        }
                        list.forEach((item,i)=>{
                            this.schoolOptions.push({
                                label:item.serialCode,
                                value:item.serialCode,
                            })
                        })
                    }
                });
            },
            toCourse:function () {
                localStorage.setItem('curCoach',JSON.stringify(this.coach));

                this.$router.push({name:'courseList',params:{id:this.coach.id}})
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
                                    avatar:Vue.basicConfig.filePrefix+item.user.headPic,
                                    name:item.user.name+' '+item.user.familyName,
                                    level:item.certificate.mfiLevel,
                                    certificateNo:item.certificate.serialCode,
                                    date:Vue.formatDate(item.certificate.updatedAt,'yyyy-MM-dd'),
                                    issuer:item.certificate.schoolSerialCode,
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
                        this.coach=data;
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
            drawText:function (ctx,text,x,y) {
                ctx.save();
                ctx.font = "32px ' Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei'";
                ctx.fillStyle = "#666";
                ctx.fillText(text,x,y,300);
                ctx.restore();
            },
            draw:function (options) {
                let that=this;
                var canvas=document.getElementById(options.id);
                var ctx=canvas.getContext("2d");

                ctx.save();
                let bgImg=new Image();
                bgImg.src=this.bgImg;
                bgImg.onload=function(){
                    ctx.drawImage(bgImg,0,0);
                    ctx.restore();


                    ctx.save();
                    var img = new Image();
                    img.src = options.avatar;
                    img.onload=function () {
                        that.circleImg(ctx, img, 95, 101, 150);
                        ctx.restore();

                        //
                        that.drawText(ctx,options.name,490,170);
                        that.drawText(ctx,options.level,880,170);

                        that.drawText(ctx,options.certificateNo,490,275);
                        that.drawText(ctx,options.date,880,275);

                        that.drawText(ctx,options.issuer,490,380);
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
                    imeStamp:Vue.genTimestamp(),
                    userId:this.id,
                    ...this.editForm
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
            selectFile:function () {
                let file=document.getElementById('file-input').files[0];
                let formData = new FormData();
                let sessionInfo=Vue.sessionInfo();
                formData.append('timestamp',sessionInfo.timestamp);
                formData.append('userId',this.account.id);
                formData.append('headPic',file);
                this.uploading=true;
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.setHeadPic(formData).then((resp)=>{
                    this.uploading=false;
                    if(resp.respCode=='2000'){
                        this.getUserBaseInfo();
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
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
                let formData = new FormData();
                formData.append('timestamp',Vue.genTimestamp());
                formData.append('userId',this.account.id);
                formData.append('firstAidPic',file);
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
            },
            selectInsuranceFileFile:function () {
                let file=document.getElementById('file-1').files[0];
                let formData = new FormData();
                formData.append('timestamp',Vue.genTimestamp());
                formData.append('userId',this.account.id);
                formData.append('insurancePic',file);
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
        },
    }
</script>
