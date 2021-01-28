<template>
    <el-dialog title="" custom-class="assist-modal" :visible.sync="modalFlag" v-if="modalFlag" @closed="" :close-on-click-modal="false">
        <div class="dialog-body">
            <div class="cm-panel form">
                <div class="panel-bd">
                    <div class="cm-detail-block">
                        <div class="block-bd form">
                            <div class="cm-input-row" v-if="newForm.id">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close()">{{$t('btn.cancel')}}</el-button>
            <el-button type="primary" @click="save()">
                <span v-if="newForm.id">{{$t('btn.activation')}}</span>
                <span v-if="!newForm.id">{{$t('btn.createAndActivate')}}</span>
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
    import Vue from 'vue'
    import md5 from 'js-md5'

    export default {
        components: {

        },
        props:{
            options:{

            }
        },
        data: function () {
            return {
                modalFlag: false,
                aesData:null,
                user:{},
                defaultAvatar:'',
                newForm:{
                    avatar:null,
                    email:null,
                    gender:'M',
                },
                uploading:false,
                otherPicList:[],
                regionList:[],
                showPassword:false,
                fb:null
            }
        },
        computed: {

        },
        watch: {

        },
        methods: {
            save:function () {
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
                if(this.newForm.id){
                    params.userId = this.newForm.id;
                    this.$confirm(this.$t("tips.activateStudentConfirm"), this.$t("title.tips"), {
                        confirmButtonText: this.$t("btn.sure"),
                        cancelButtonText: this.$t("btn.cancel"),
                        type: 'warning'
                    }).then(() => {
                        let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                        Vue.api.setUserBaseInfo(params).then((resp)=>{
                            if(resp.respCode=='2000'){
                                Vue.api.activateStudent({timeStamp:Vue.genTimestamp(),email:this.newForm.email}).then((resp)=>{
                                    if(resp.respCode=='2000'){
                                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                                        this.fb && this.fb();
                                        this.close();
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
                    }).catch(() => {

                    });
                }else{
                    this.$confirm(this.$t("tips.addStudent"), this.$t("title.tips"), {
                        confirmButtonText: this.$t("btn.sure"),
                        cancelButtonText: this.$t("btn.cancel"),
                        type: 'warning'
                    }).then(() => {
                        let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                        Vue.api.addStudentWithoutActivate(params).then((resp)=>{
                            if(resp.respCode=='2000'){
                                fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                                this.fb && this.fb(params.email);
                                this.close();
                            }else{
                                fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                            }
                        });
                    }).catch(() => {

                    });
                }
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
            },
            open:function (item,fb,type) {
                this.newForm = {}
                if(item){
                    this.newForm = {
                        id: item.id,
                        email: item.email,
                        avatar: item.headPic?item.headPic+'?=random'+Math.random():null
                    }
                }
                this.fb = fb;
                this.modalFlag=true;
            },
            close:function () {
                this.modalFlag=false;
            },
        },
        created: function () {
            this.getRegionConfig();
        },
        mounted: function () {

        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .assist-modal{
        width: 700px !important;
        .dialog-body{
            height: 500px;
            overflow-y: auto;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 5px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 2px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: rgba(0,0,0,0.2);
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                display: none;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 5px;
                background: rgba(0,0,0,0.2);
            }
        }
        .dialog-footer{
            text-align: center;
        }
        .form{
            margin-left: -35px;
        }
        .field{
            width: 188px;
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
</style>
