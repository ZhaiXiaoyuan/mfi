<template>
    <div class="page-wrap">
        <div class="page-content activation-page">
            <language></language>
            <div class="cm-panel">
                <div class="panel-hd">
                    <span class="title">{{$t("title.studentActivation")}}</span>
                </div>
                <div class="panel-bd">
                    <div class="cm-detail-block">
                        <div class="block-bd form">
                            <div class="cm-input-row">
                                <div class="cm-avatar-uploader">
                                    <div class="wrapper">
                                        <img :src="newForm.avatar?basicConfig.filePrefix+newForm.avatar:defaultAvatar">
                                        <input  type="file" id="file-input" accept="image/*" @change="selectFile()">
                                        <p style="text-align: center;">{{$t("label.avatar")}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.email")}}</span>
                                <input type="text" v-model="newForm.email" class="cm-input">
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
                                <!--<input type="text" v-model="newForm.country" class="cm-input">-->
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
        .cm-input-row{
            .cm-input{
                height: 50px;
            }
            &.cm-input-row{
                margin-top: 15px;
            }
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
             /*   width: 80px;
                height: 80px;*/
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
                    role:'student',
                }
                Vue.api.getEmailByAesData(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.user=JSON.parse(resp.respMsg);
                        if(this.user&&this.user.studentAccountStatus!='nonActivated'){
                            window.location.href=window.location.origin;
                            /*this.$router.push({name:'login',params:{type:'student'}});*/
                        }
                        console.log('this.user:',this.user);
                        this.newForm.email=this.user.email;
                        this.newForm.avatar=this.user.headPic?this.user.headPic+'?=random'+Math.random():null;
                    }else{

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
                } if(!this.newForm.emergencyName){
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
                let params={
                    timeStamp:Vue.genTimestamp(),
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
                        Vue.api.activate({timeStamp:Vue.genTimestamp(),aesData:this.aesData,role:'student'}).then((resp)=>{
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
                                        yes:this.$t("btn.close")
                                    });
                                }else{
                                    //
                                    Vue.api.studentLogin({timeStamp:Vue.genTimestamp(),email:this.newForm.email,password:md5.hex(this.newForm.pwd)}).then((resp)=>{
                                        if(resp.respCode=='2000'){
                                            let data=JSON.parse(resp.respMsg);
                                            this.$cookie.set('account',JSON.stringify({
                                                type:'student',
                                                account:this.newForm.email,
                                                ...data
                                            }),7);
                                            fb.setOptions({
                                                type:'complete',
                                                text:this.$t("tips.loginS")
                                            });
                                            this.$router.push({name:'studentDetail',params:{}});
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
                let ele=document.getElementById('file-input');
                let file=ele.files[0];
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
                                ele.value='';
                                this.uploading=false;
                                this.getEmailByAesData();
                                if(resp.respCode=='2000'){
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
                        },
                        cancel:function () {
                            ele.value='';
                        }
                    });
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
            }
        },
        mounted () {
            console.log('this.$route.query:', this.$route.query);
            console.log('this.$route.query.data:', this.$route.query.data);
            /**/
            this.aesData=this.$route.query.data.replace(/\s/g,"+");
            /**/
            this.getEmailByAesData();
            /**/
            this.getRegionConfig();
        },
    }
</script>
