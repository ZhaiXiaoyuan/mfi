<template>
    <div class="page-content coach-detail">
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
                <div class="cm-detail-block detail-block">
                    <div class="block-bd">
                        <el-row>
                            <el-col :span="5">
                                <img class="avatar" :src="coach.headPic?basicConfig.filePrefix+coach.headPic:defaultAvatar" alt="">
                            </el-col>
                            <el-col :span="18">
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
                                        <i class="icon setting-min-icon" @click="levelSettingDialogFlag=true"></i>
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
                                        <i class="icon setting-min-icon" @click="schoolSettingDialogFlag=true"></i>
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
                                        <i class="icon setting-min-icon" @click="statusSettingDialogFlag=true"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="13" class="info-item">
                                        <span class="label">{{$t('label.address')}}：</span>
                                        <span class="value">{{coach.address}}</span>
                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">{{$t('label.auditDate')}}：</span>
                                        <span class="value">2018.02.22</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px;">
                            <el-col :span="7" class="info-item">
                                <span class="label">{{$t('label.email')}}：</span>
                                <span class="value">{{coach.email}}</span>

                            </el-col>
                            <el-col :span="7" :offset="1" class="info-item">
                                <span class="label">{{$t('label.contact')}}：</span>
                                <span class="value">{{coach.phone}}</span>

                            </el-col>
                            <el-col :span="7"  :offset="1" class="info-item">
                                <span class="label">{{$t('label.eContact')}}: </span>
                                <span class="value">{{coach.emergencyPhone}}</span>

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
                            <li v-for="(item,index) in  otherPicList" @click="viewPicModal({imgUrl:item.filePath})">
                                <img :src="item.filePath">
                                <p class="label">{{item.label}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="block-bd">
                        <div class="btn-list">
                            <div class="btn">{{$t("btn.student")}}</div>
                            <div class="btn" @click="toCourse">{{$t("btn.course")}}</div>
                            <div class="btn">{{$t("btn.AuthorizationRecord")}}</div>
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
                    <el-select v-model="schoolForm.school" class="handle cm-select">
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
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .detail-block{
        padding: 40px 20px;
        .avatar{
            width: 200px;
            height: 200px;
            border-radius: 5px;
        }
        .info-row{
            &+.info-row{
                margin-top: 25px;
            }
        }
        .info-item{
            position: relative;
            font-size: 18px;
            padding: 0px 5px;
            .label{

            }
            .value{
                color: #999;
            }
            .icon{
                position: absolute;
                top:0px;
                bottom:0px;
                right: 0px;
                margin: auto;
                cursor: pointer;
            }
        }
        .block-bd{
            .title{
                font-size: 18px;
                color: #5360aa;
                padding: 10px;
            }
            &.block-bd{
                border-top: 1px solid #e5e5e5;
            }
            .pic-list{
                overflow: hidden;
                li{
                    float: left;
                    text-align: center;
                    margin: 5px 25px 5px 0px;
                    img{
                        width: 140px;
                        height: 100px;
                    }
                    .label{
                        text-align: center;
                    }
                }
            }
            .btn-list{
                .btn{
                    display: inline-block;
                    font-size: 16px;
                    color: #5360aa;
                    border-radius: 5px;
                    border: 1px solid #5360aa;
                    padding: 8px 15px;
                    cursor: pointer;
                    &+.btn{
                        margin-left: 20px;
                    }
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
                account:{},
                defaultAvatar:require('../../images/common/default-avatar.png'),

                coach:{},
                aidPicList:[],
                otherPicList:[],

                levelOptions:[
                    /* {
                     value:null,
                     label:this.$t("btn.all"),
                     },*/
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
                certificateList:[],
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
                    userId:this.coach.id,
                }
                Vue.api.getUserCertificate(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.certificateList=data;
                        console.log('data1:',data);
                    }else{

                    }
                });
            },
            getUserBaseInfo:function () {
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.coach.id,
                    role:'instructor'
                }
                Vue.api.getUserBaseInfo(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('data2:',data);
                    }else{

                    }
                });
            }
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();

            /**/
            this.coach=JSON.parse(localStorage.getItem('curCoach'));
            this.getUserBaseInfo();
            this.getUserCertificate();
            if(this.coach.firstAidPic){
                this.aidPicList.push({
                    filePath:Vue.basicConfig.filePrefix+this.coach.firstAidPic
                })
            }
            if(this.coach.firstAidPic){
                this.otherPicList.push({
                    label:this.$t('label.firstAid'),
                    filePath:Vue.basicConfig.filePrefix+this.coach.firstAidPic
                })
            }
            if(this.coach.insurancePic){
                this.otherPicList.push({
                    label:this.$t('label.insurance'),
                    filePath:Vue.basicConfig.filePrefix+this.coach.insurancePic
                })
            }
            /**/
            this.getSchoolList();
            /**/
            this.levelForm.level=this.coach.mfiLevel;
            this.statusForm.status=this.coach.instructorAccountStatus;
            this.schoolForm.school=this.coach.school;
            console.log('this.coach:',this.coach);

        },
    }
</script>
