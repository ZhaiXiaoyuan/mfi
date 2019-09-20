<template>
    <div class="page-content coach-detail">
        <canvas width="1240" v-for="(item,index) in rawCertificateList" :id="'canvas'+index"  height="744" style="display:none;border:1px solid #d3d3d3;background:#ffffff;"></canvas>
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" v-if="account.type!='student'" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd cm-watermark">
                <div class="cm-detail-block detail-block" :class="{'show-status':account.type=='student'}">
                    <div class="status" v-if="account.type=='student'">
                        {{$t("title."+account.studentAccountStatus)}}
                    </div>
                    <div class="block-bd">
                        <div class="pc-info">
                            <div class="to-upload"  style="width: 160px;height: 160px;">
                                <img class="avatar" :src="user.headPic?basicConfig.filePrefix+user.headPic:defaultAvatar" alt="">
                                <div class="cm-btn upload-btn" v-if="account.type=='student'">
                                   <div class="wrapper">
                                       <i class="icon upload-icon"></i>
                                       <input  type="file" accept="image/*" @change="selectFile($event)">
                                   </div>
                                </div>
                            </div>
                            <ul class="info-list">
                                <li>
                                    <span class="label">{{$t('label.fName')}}：</span>
                                    <span class="value">{{user.familyName}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.lName')}}：</span>
                                    <span class="value">{{user.name}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.email')}}：</span>
                                    <span class="value">{{user.email}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.status')}}：</span>
                                    <span class="value">{{$t('btn.'+user.studentAccountStatus)}}</span>
                                    <i class="icon setting-min-icon" @click="statusSettingDialogFlag=true" v-if="account.type=='admin'"></i>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.gender')}}：</span>
                                    <span class="value">{{user.gender}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.birth')}}：</span>
                                    <span class="value">{{user.birth}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.country')}}：</span>
                                    <span class="value">{{user.country}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.city')}}：</span>
                                    <span class="value">{{user.city}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.address')}}：</span>
                                    <span class="value">{{user.address}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.contact')}}：</span>
                                    <span class="value">{{user.phone}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.eContactName')}}：</span>
                                    <span class="value">{{user.emergencyName}}</span>
                                </li>
                                <li>
                                    <span class="label">{{$t('label.eContact')}}：</span>
                                    <span class="value">{{user.emergencyPhone}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="mobile-info">
                            <div class="info-row">
                                <div class="info-item">
                                    <div class="to-upload">
                                        <img class="avatar" :src="user.headPic?basicConfig.filePrefix+user.headPic:defaultAvatar" alt="">
                                        <div class="cm-btn upload-btn" v-if="account.type=='student'">
                                            <div class="wrapper">
                                                <i class="icon upload-icon"></i>
                                                <input  type="file" accept="image/*" @change="selectFile($event)">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <p>
                                        <span class="label">{{$t('label.fName')}}：</span>
                                        <span class="value">{{user.familyName}}</span>
                                    </p>
                                    <p>
                                        <span class="label">{{$t('label.lName')}}：</span>
                                        <span class="value">{{user.name}}</span>
                                    </p>
                                    <p>
                                        <span class="label">{{$t('label.gender')}}：</span>
                                        <span class="value">{{user.gender}}</span>
                                    </p>
                                    <p>
                                        <span class="label">{{$t('label.birth')}}：</span>
                                        <span class="value">{{user.birth}}</span>
                                    </p>
                                    <p>
                                        <span class="label">{{$t('label.status')}}：</span>
                                        <span class="value">{{$t('btn.'+user.studentAccountStatus)}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <span class="label">{{$t('label.country')}}：</span>
                                    <span class="value">{{user.country}}</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <span class="label">{{$t('label.city')}}：</span>
                                    <span class="value">{{user.city}}</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <span class="label">{{$t('label.address')}}：</span>
                                    <span class="value">{{user.address}}</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <span class="label">{{$t('label.contact')}}：</span>
                                    <span class="value">{{user.phone}}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">{{$t('label.email')}}：</span>
                                    <span class="value">{{user.email}}</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <span class="label">{{$t('label.eContactName')}}: </span>
                                    <span class="value">{{user.emergencyName}}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">{{$t('label.eContact')}}：</span>
                                    <span class="value">{{user.emergencyPhone}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block-bd">
                       <p class="title">{{$t('title.lCertificate')}}</p>
                        <ul class="pic-list">
                            <li v-for="(item,index) in  certificateList" :style="{background: 'url('+item.filePath+') no-repeat center',backgroundSize: 'cover'}" @click="viewPicModal({imgUrl:item.filePath})">

                            </li>
                        </ul>
                        <div style="text-align: right;">
                            <span class="count">{{$t('tips.total',{msg:certificateList.length})}}</span>
                          <!--  <span class="cm-link-btn" style="padding-left: 20px;" v-if="certificateList.length>3">{{$t('btn.viewAll')}}</span>-->
                        </div>
                    </div>
                    <div class="block-bd" v-if="account.type=='student'">
                        <div class="btn-list">
                            <div class="cm-btn btn" @click="editDialogFlag=true">{{$t("btn.editInfo")}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cm-panel" v-if="account.type!='student'">
            <div class="panel-hd">
                <span class="title">{{$t("title.course")}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.courseNo")}}
                            </th>
                            <th>
                                {{$t("label.courseName")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.site")}}
                            </th>
                            <th>
                                {{$t("label.startTime")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.course.courseId}}
                            </td>
                            <td>
                                {{item.course.courseName}}
                            </td>
                            <td>
                                {{item.course.mfiLevel}}
                            </td>
                            <td>
                                {{item.course.site}}
                            </td>
                            <td>
                                {{item.course.startTime}}
                            </td>
                            <td>
                                <span class="handle" @click="$router.push({name:'courseDetail',params:{id:item.course.courseId}})">{{$t('btn.detail')}}</span>
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
                    <span class="field">{{$t("label.school")}}</span>
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


        <el-dialog :title='$t("title.accountSetting")' class="edit-dialog cm-dialog edit-dialog" :visible.sync="editDialogFlag" v-if="editDialogFlag" width="40%" :modal-append-to-body="false">
            <div class="form-win">
                <div class="form">
                    <div class="cm-input-row">
                        <span class="field">{{$t("label.email")}}</span>
                        <input type="text" v-model="editForm.email" class="cm-input">
                    </div>
                    <div class="cm-input-row">
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
                        <!--<input type="text" v-model="editForm.country" class="cm-input">-->
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
    .detail-block{
        padding: 40px 20px;
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
              /*  position: absolute;
                top:0px;
                bottom:0px;
                right: 0px;
                margin: auto;*/
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
    @media screen and (max-width: 1000px) {
        .edit-dialog{
            overflow: hidden;
            .el-dialog{
                margin-top: 40px !important;
                width: 95% !important;
                .el-dialog__body{
                    padding: 0px 20px 20px 20px;
                }
            }
            .form-win{
                width: 100%;
                height: 350px;
                padding: 0px 5px 20px 5px;
                overflow-y: scroll;
                .field{
                    width: 180px;
                }
                .cm-input-row{
                    margin: 0px;
                    &+.cm-input-row{
                        margin-top: 15px;
                    }
                }
                .handle-list{
                    margin-top: 5px !important;
                }
            }
        }
    }
</style>
<script>
    import Vue from 'vue'
    import md5 from 'js-md5'

    export default {
        components: {

        },
        data() {
            return {
                account:{},
                defaultAvatar:require('../../images/common/default-avatar.png'),
                bgImg:require('../../images/common/card-bg.jpg'),

                id:null,
                user:{},

                aidPicList:[],

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
                    {
                        label:this.$t("btn.certified"),
                        value:'certified'
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
                rawCertificateList:[],
                certificateList:[],

                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],

                editDialogFlag:false,
                editForm:{},
                regionList:[],
                showPassword:false,

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
                    userId:this.user.id,
                    mfiLevel:this.levelForm.level,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.grantCertificateToInstrutor(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.user.mfiLevel=this.levelForm.level;
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
                    userId:this.user.id,
                    state:this.statusForm.status,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.updateUserStudentAccountStatus(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.user.studentAccountStatus=this.statusForm.status;
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
                    userId:this.user.id,
                    schoolConfigParm:this.schoolForm.school,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.setInstructorSchoolConfigParm(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        this.user.school=this.schoolForm.school;
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
                        list.forEach((item,i)=>{
                            this.schoolOptions.push({
                                label:item.school.serialCode+(item.school.name?(' '+item.school.name):''),
                                value:item.school.serialCode,
                            })
                        })
                    }
                });
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
                                item.user=JSON.parse(item.user)
                                this.draw({
                                    id:'canvas'+i,
                                    avatar:Vue.basicConfig.filePrefix+item.user.headPic,
                                    name:item.user.name+' '+item.user.familyName,
                                    level:item.certificate.mfiLevel=='BMI'?'BASIC MERMAID INSTRUCTOR':item.certificate.mfiLevel,
                                    certificateNo:item.certificate.serialCode,
                                    date:Vue.formatDate(item.certificate.updatedAt,'yyyy-MM-dd'),
                                    issuer:item.certificate.schoolSerialCode,
                                    instructor:item.possessorName,
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
                    role:'student'
                }
                Vue.api.getUserBaseInfo(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.getUserCertificate();
                        this.user=data.user;
                        if(this.user.headPic){
                            this.user.headPic=this.user.headPic+"?r="+Math.random();
                        }
                        this.editForm=JSON.parse(JSON.stringify(this.user));
                        this.editForm.password=null;
                        this.statusForm.status=this.user.studentAccountStatus;
                        console.log('this.user:',this.user);
                    }else{

                    }
                });
            },
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    userId:this.id,
                    mfiLevel:'',
                }
                this.pager.loading=true;
                Vue.api.getStudentJoinCourse(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.courseList);
                        this.entryList.forEach((item,i)=>{
                            item.course=JSON.parse(item.course),
                            item.instructor=JSON.parse(item.instructor)
                        })
                        this.pager.total=data.count;
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
                        that.drawText(ctx,'Name:',710,100);
                        that.drawText(ctx,options.name,815,100,'40');

                        that.drawText(ctx,'Level:',718,145);
                        that.drawText(ctx,options.level,815,145);

                        that.drawText(ctx,'Certification Number:',503,190);
                        that.drawText(ctx,options.certificateNo,815,190);

                        that.drawText(ctx,'Certification Date:',548,235);
                        that.drawText(ctx,options.date,815,235);

                        that.drawText(ctx,'Issuing Instructor:',533,280);
                        that.drawText(ctx,options.instructor,815,280);

                        that.drawText(ctx,'Issuing School:',568,325);
                        that.drawText(ctx,options.issuer,815,325);

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
                        this.user=this.account;
                        this.$cookie.set('account',JSON.stringify({
                            type:'student',
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
                let file=Vue.tools.getCurEle($event).files[0];
                Vue.tools.fileToBlob(file,(data)=>{
                    this.cropModal({
                        img:data,
                        ok:(data)=>{
                            let formData = new FormData();
                            let sessionInfo=Vue.sessionInfo();
                            formData.append('timeStamp',sessionInfo.timeStamp);
                            formData.append('userId',this.user.id);
                            formData.append('headPic',data);
                            this.uploading=true;
                            let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                            Vue.api.setHeadPic(formData).then((resp)=>{
                                this.uploading=false;
                                this.getUserBaseInfo();
                                if(resp.respCode=='2000'){
                                    fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                                }else{
                                    fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                }
                            });
                        }
                    });
                });
            },
            getRegionConfig:function () {
                Vue.api.getRegionConfig({ ...Vue.sessionInfo()}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.regionList=JSON.parse(resp.respMsg);
                        if(this.$i18n.locale=='cn'){
                            this.regionList.forEach((item,i)=>{
                                item.label=item.chineseName;
                                item.value=item.code;
                            })
                        }else{
                            this.regionList.forEach((item,i)=>{
                                item.label=item.englishName;
                                item.value=item.code;
                            })
                        }
                    }else{

                    }
                });
            }
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();
            this.id=this.account.type=='student'?this.account.id:this.$route.params.id;

            /**/
            this.getUserBaseInfo();
            this.getList();
            /**/
            this.getSchoolList();
            /**/
            this.getRegionConfig();
            /**/
            this.levelForm.level=this.user.mfiLevel;
            this.statusForm.status=this.user.instructorAccountStatus;
            this.schoolForm.school=this.user.school;
        },
    }
</script>
