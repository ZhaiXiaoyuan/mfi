<template>
    <div class="page-wrap">
        <div class="page-content activation-page">
            <language></language>
            <div class="cm-panel">
                <div class="panel-hd">
                    <span class="title">{{$t("title.instructorActivation")}}</span>
                </div>
                <div class="panel-bd">
                    <div class="cm-detail-block">
                        <div class="block-bd form">
                            <div class="cm-input-row">
                                <span class="field"></span>
                                <div class="cm-avatar-uploader">
                                    <div class="wrapper">
                                        <img :src="newForm.avatar?basicConfig.filePrefix+newForm.avatar:defaultAvatar">
                                        <input  type="file" id="file-input" accept="image/*" @change="selectFile()">
                                    </div>
                                </div>
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.email")}}</span>
                                <input type="text" v-model="newForm.email" readonly class="cm-input cm-disabled">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.pwd")}}</span>
                                <div class="input-item">
                                    <input :type="showPassword?'text':'password'" v-model="newForm.pwd" class="cm-input">
                                    <i class="icon" :class="{'eye-close-icon':showPassword,'eye-open-icon':!showPassword}" @click="showPassword=!showPassword"></i>
                                </div>
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.fName")}}</span>
                                <input type="text" v-model="newForm.fName" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.lName")}}</span>
                                <input type="text" v-model="newForm.lName" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.gender")}}</span>
                                <div class="input-wrap">
                                    <el-radio v-model="newForm.gender" label="M">M</el-radio>
                                    <el-radio v-model="newForm.gender" label="F">F</el-radio>
                                </div>
                                <!--<input type="text" v-model="newForm.gender" class="cm-input">-->
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.birth")}}</span>
                                <el-date-picker
                                    class="cm-calender"
                                    v-model="newForm.birth"
                                    type="date"
                                    :placeholder="$t('el.datepicker.selectDate')">
                                </el-date-picker>
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.phone")}}</span>
                                <input type="text" v-model="newForm.phone" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.eContactName")}}</span>
                                <input type="text" v-model="newForm.emergencyName" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.eContact")}}</span>
                                <input type="text" v-model="newForm.eContact" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.country")}}</span>
                                <el-select v-model="newForm.country" filterable>
                                    <el-option
                                        v-for="item in regionList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                    </el-option>
                                </el-select>
                             <!--   <input type="text" v-model="newForm.country" class="cm-input">-->
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.province")}}</span>
                                <input type="text" v-model="newForm.province" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.city")}}</span>
                                <input type="text" v-model="newForm.city" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.address")}}</span>
                                <input type="text" v-model="newForm.address" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t('label.firstAid')}}</span>
                                <div class="cm-input-pic-uploader square">
                                    <div class="wrapper">
                                        <img :src="basicConfig.filePrefix+newForm.firstAidPic" v-if="newForm.firstAidPic">
                                        <i class="icon el-icon-upload" v-if="!newForm.firstAidPic"></i>
                                        <input  type="file" id="firstAidFileInput" accept="image/*" @change="selectFirstAidFile()">
                                    </div>
                                </div>
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t('label.insurance')}}</span>
                                <div class="cm-input-pic-uploader square">
                                    <div class="wrapper">
                                        <img :src="basicConfig.filePrefix+newForm.insurancePic" v-if="newForm.insurancePic">
                                        <i class="icon el-icon-upload" v-if="!newForm.insurancePic"></i>
                                        <input  type="file" id="insuranceFileInput" accept="image/*" @change="selectInsuranceFileFile()">
                                    </div>
                                </div>
                            </div>
                            <div class="cm-input-row" style="margin-top: 40px;">
                                <span class="field"></span>
                                <div class="cm-btn submit-btn" @click="save()">{{$t('btn.activation')}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .page-wrap{
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 40px 0px;
    }
    .activation-page{
        width: 700px;
        margin: 0px auto;
        overflow: auto;
        .form{
            padding: 40px 0px;
        }
        .field{
            width: 180px;
        }
    }
    .submit-btn{
        height: 50px;
        width: 300px;
        background: #5560aa;
        border-radius: 5px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
    @media screen and (max-width: 1000px) {
        .activation-page{
            width: 95%;
            .form{
                padding: 20px 0px;
            }
        }
        .cm-detail-block{
            padding: 0px 20px;
        }
        .cm-input-row{
            display: block;
            .field{
                display: block;
                width: 100%;
                margin-right: 10px;
                padding-bottom: 5px;
                font-size: 16px;
                text-align: left;
            }
            .input-wrap{
                padding: 0px 10px 0px 10px;
                width: 100%;
                background: #fff;
                font-size: 20px;
            }
            .el-input__inner{
                width: 60%;
                height: 50px;
                font-size: 14px;
            }
            .cm-input{
                padding: 0px 10px 0px 10px;
                width: 100%;
                height: 50px;
                background: #fff;
                font-size: 16px;
                border: none;
                border-radius: 10px;
                box-shadow: 0px 1px 10px rgba(85,96,170,0.3);
            }
            .cm-calender{
                width: 100%!important;
            }
            .el-select{
                width: 100%;
                input{
                    width: 100%;
                }
            }
            .cm-btn{
                width: 100%;
            }
            .input-item{
                position: relative;
                input{
                    padding: 0px 50px 0px 10px;
                }
                .icon{
                    position: absolute;
                    top:0px;
                    right: 15px;
                    bottom: 0px;
                    margin: auto;
                }
            }
            .cm-avatar-uploader{
                width: 80px;
                height: 80px;
                margin: 0px auto;
            }
            &+.cm-input-row{
                margin-top: 15px;
            }
            .cm-select{
                width: 300px;
                height: 50px;
                input{
                    height: 50px;
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
                aesData:null,
                user:{},
                defaultAvatar:require('../../images/common/default-avatar.png'),
                newForm:{
                    avatar:null,
                    email:null,
                    insurancePic:null,
                    firstAidPic:null,
                    gender:'M',
                },
                uploading:false,
                otherPicList:[],
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
            getEmailByAesData:function () {
                let params={
                    timeStamp:Vue.genTimestamp(),
                    aesData:this.aesData,
                    role:'instructor',
                }
                Vue.api.getEmailByAesData(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.user=JSON.parse(resp.respMsg);
                        console.log('this.user:',this.user);
                        if(this.user&&this.user.instructorAccountStatus!='nonActivated'){
                            window.location.href=window.location.origin;
                          /*  this.$router.push({name:'login',params:{type:'coach'}});*/
                        }
                        this.newForm.email=this.user.email;
                        this.newForm.avatar=this.user.headPic;
                        if(this.user.insurancePic){
                            this.newForm.insurancePic=this.user.insurancePic+'?random='+Math.random();
                        }
                        if(this.user.firstAidPic){
                            this.newForm.firstAidPic=this.user.firstAidPic+'?random='+Math.random();
                        }
                    }else if(resp.respCode=='4000'){
                        this.alert({
                            title:'',
                            html:'<div style="text-align: center;color:red;">'+this.$t("tips.apiError")+'</div> ',
                            yes:this.$t("btn.sure"),
                            lock:true,
                        });
                    }
                });
            },
            save:function () {
                if(!this.newForm.avatar){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.avatar")});
                    return;
                }
                if(!this.newForm.email){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.email")});
                    return;
                }
                if(!this.newForm.pwd){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.pwd")});
                    return;
                }
                if(!this.newForm.fName){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.fName")});
                    return;
                }
                if(!this.newForm.lName){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.lName")});
                    return;
                }
                if(!this.newForm.gender){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.gender")});
                    return;
                }
                if(!this.newForm.birth){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.birth")});
                    return;
                }
                if(!this.newForm.phone){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.phone")});
                    return;
                }
                if(!this.newForm.emergencyName){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.eContactName")});
                    return;
                }
                if(!this.newForm.eContact){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.eContact")});
                    return;
                }
                if(!this.newForm.country){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.country")});
                    return;
                }
                if(!this.newForm.province){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.province")});
                    return;
                }
                if(!this.newForm.city){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.city")});
                    return;
                }
                if(!this.newForm.address){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.address")});
                    return;
                }
                if(!this.newForm.firstAidPic){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.firstAid")});
                    return;
                }
                if(!this.newForm.insurancePic){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.insurance")});
                    return;
                }
                let params={
                    imeStamp:Vue.genTimestamp(),
                    userId:this.user.id,
                    email:this.newForm.email,
                    password:md5.hex(this.newForm.pwd),
                    familyName:this.newForm.fName,
                    name:this.newForm.lName,
                    gender:this.newForm.gender,
                    birth:Vue.formatDate(this.newForm.birth,'yyyy-MM-dd'),
                    country:this.newForm.country,
                    province:this.newForm.province,
                    city:this.newForm.city,
                    address:this.newForm.address,
                    phone:this.newForm.phone,
                    emergencyName:this.newForm.emergencyName,
                    emergencyPhone:this.newForm.eContact,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.setUserBaseInfo(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        Vue.api.activate({imeStamp:Vue.genTimestamp(),aesData:this.aesData,role:'instructor'}).then((resp)=>{
                            if(resp.respCode=='2000'){
                                if(Vue.tools.deviceType()){
                                    fb.setOptions({
                                        type:'complete',
                                        text:'',
                                        delayForDelete:0,
                                    });
                                    Vue.alert({
                                        title:"",
                                        html:'<div style="text-align: center">'+this.$t("tips.mobileTips")+'</div>',
                                        lock:true,
                                        yes:this.$t("btn.sure")
                                    });
                                }else{
                                    //
                                    Vue.api.coachLogin({timeStamp:Vue.genTimestamp(),email:this.newForm.email,password:md5.hex(this.newForm.pwd)}).then((resp)=>{
                                        if(resp.respCode=='2000'){
                                            let data=JSON.parse(resp.respMsg);
                                            this.$cookie.set('account',JSON.stringify({
                                                type:'coach',
                                                account:this.newForm.email,
                                                ...data.instructorPayment,
                                                ...data.user,
                                            }),7);
                                            fb.setOptions({
                                                type:'complete',
                                                text:this.$t("tips.loginS")
                                            });
                                            this.$router.push({name:'coachDetail',params:{}});
                                        }else{
                                            fb.setOptions({
                                                type:'warn',
                                                text:this.$t("tips.loginF")
                                            });
                                        }
                                    });
                                }
                            }else if(resp.respCode=='4000'){
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                this.alert({
                                    title:'',
                                    html:'<div style="text-align: center;color:red;">'+this.$t("tips.apiError")+'</div> ',
                                    yes:this.$t("btn.sure"),
                                    lock:true,
                                });
                            }else{
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                            }
                        });
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
            selectFile:function () {
                let file=document.getElementById('file-input').files[0];
                Vue.tools.fileToBlob(file,(data)=>{
                    this.cropModal({
                        img:data,
                        ok:(data)=>{
                            let formData = new FormData();
                            let sessionInfo=Vue.sessionInfo();
                            formData.append('timestamp',sessionInfo.timestamp);
                            formData.append('userId',this.user.id);
                            formData.append('headPic',data);
                            this.uploading=true;
                            let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                            Vue.api.setHeadPic(formData).then((resp)=>{
                                this.uploading=false;
                                if(resp.respCode=='2000'){
                                    this.getEmailByAesData();
                                    fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                                }else if(resp.respCode=='4000'){
                                    fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                    this.alert({
                                        title:'',
                                        html:'<div style="text-align: center;color:red;">'+this.$t("tips.apiError")+'</div> ',
                                        yes:this.$t("btn.sure"),
                                        lock:true,
                                    });
                                }else{
                                    fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                }
                            });
                        }
                    });
                });
            },
            selectFirstAidFile:function () {
                let file=document.getElementById('firstAidFileInput').files[0];
                Vue.tools.imgCompress({
                    file:file,
                    width:'800',
                    quality:0.8,
                    callback:(data)=>{
                        let formData = new FormData();
                        formData.append('timestamp',Vue.genTimestamp());
                        formData.append('userId',this.user.id);
                        formData.append('firstAidPic',data);
                        this.uploading=true;
                        let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                        Vue.api.setFirstAidPic(formData).then((resp)=>{
                            this.uploading=false;
                            if(resp.respCode=='2000'){
                                this.getEmailByAesData();
                                fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                            }else if(resp.respCode=='4000'){
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                this.alert({
                                    title:'',
                                    html:'<div style="text-align: center;color:red;">'+this.$t("tips.apiError")+'</div> ',
                                    yes:this.$t("btn.sure"),
                                    lock:true,
                                });
                            }else{
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                            }
                        });
                    }
                });

            },
            selectInsuranceFileFile:function () {
                let file=document.getElementById('insuranceFileInput').files[0];

                Vue.tools.imgCompress({
                    file:file,
                    width:'800',
                    quality:0.8,
                    callback:(data)=>{
                        let formData = new FormData();
                        formData.append('timestamp',Vue.genTimestamp());
                        formData.append('userId',this.user.id);
                        formData.append('insurancePic',data);
                        this.uploading=true;
                        let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                        Vue.api.setInsurancePic(formData).then((resp)=>{
                            this.uploading=false;
                            if(resp.respCode=='2000'){
                                this.getEmailByAesData();
                                fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                            }else if(resp.respCode=='4000'){
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                                this.alert({
                                    title:'',
                                    html:'<div style="text-align: center;color:red;">'+this.$t("tips.apiError")+'</div> ',
                                    yes:this.$t("btn.sure"),
                                    lock:true,
                                });
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
            this.aesData=this.$route.query.data.replace(/\s/g, "+");
            /**/
            this.getEmailByAesData();
            /**/
            this.getRegionConfig();
            /**/
        },
    }
</script>
