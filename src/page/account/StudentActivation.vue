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
                                <input type="text" v-model="newForm.email" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.pwd")}}</span>
                                <input type="password" v-model="newForm.pwd" class="cm-input">
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
                                <input type="text" v-model="newForm.gender" class="cm-input">
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
                                <span class="field">{{$t("label.eContact")}}</span>
                                <input type="text" v-model="newForm.eContact" class="cm-input">
                            </div>
                            <div class="cm-input-row">
                                <span class="field">{{$t("label.country")}}</span>
                                <input type="text" v-model="newForm.country" class="cm-input">
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
                },
                uploading:false,
                otherPicList:[],
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
                    emergencyPhone:this.newForm.eContact,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.setUserBaseInfo(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        Vue.api.activate({imeStamp:Vue.genTimestamp(),aesData:this.aesData,role:'student'}).then((resp)=>{
                            if(resp.respCode=='2000'){
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
                                        this.$router.push({name:'studentCourseList',params:{}});
                                    }else{
                                        fb.setOptions({
                                            type:'warn',
                                            text:this.$t("tips.loginF")
                                        });
                                    }
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
                let formData = new FormData();
                let sessionInfo=Vue.sessionInfo();
                formData.append('timestamp',sessionInfo.timestamp);
                formData.append('userId',this.user.id);
                formData.append('headPic',file);
                this.uploading=true;
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.setHeadPic(formData).then((resp)=>{
                    this.uploading=false;
                    this.getEmailByAesData();
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
        },
        mounted () {
            /**/
            this.aesData=this.$route.query.data.replace(' ','+');
            /**/
            this.getEmailByAesData();
        },
    }
</script>
