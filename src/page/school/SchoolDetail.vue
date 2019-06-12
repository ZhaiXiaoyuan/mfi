<template>
    <div class="page-content school-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();" v-if="account.type=='admin'">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
                <span class="title">{{$t("title.school")}}：{{editForm.name}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block detail-block show-status">
                    <div class="payment-status" v-if="account.schoolQualification=='notPay'">
                        <div><span>{{$t("tips.schoolQualification")}}</span><span class="cm-btn btn" @click="toPay()">{{$t("btn.go")}}</span></div>
                    </div>
                    <div class="block-bd">
                        <div class="block-bd">
                            <el-row>
                                <el-col :span="20">
                                    <el-row class="info-row">
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.schoolNameLen')}}：</span>
                                            <span class="value">{{editForm.name}}</span>
                                        </el-col>
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.email')}}：</span>
                                            <span class="value">{{editForm.email}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row class="info-row">
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.country')}}：</span>
                                            <span class="value">{{editForm.country}}</span>
                                        </el-col>
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.code')}}：</span>
                                            <span class="value">{{editForm.serialCode}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row class="info-row">
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.province')}}：</span>
                                            <span class="value">{{editForm.province}}</span>
                                        </el-col>
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.status')}}：</span>
                                            <span class="value">{{$t('btn.'+editForm.state)}}</span>
                                            <span style="margin-left: 10px;" class="cm-btn btn cm-handle-btn cm-handle-min-btn" @click="toAudit()" v-if="account.type=='admin'&&(editForm.state=='pending'||editForm.state=='fail')">{{$t("btn.auditPassLen")}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row class="info-row">
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.city')}}：</span>
                                            <span class="value">{{editForm.city}}</span>
                                        </el-col>
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.level')}}：</span>
                                            <span class="value" v-if="editForm.level&&editForm.level!='null'">{{$t('value.'+editForm.level)}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row class="info-row">
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.address')}}：</span>
                                            <span class="value">{{editForm.address}}</span>
                                        </el-col>
                                        <el-col :span="10" class="info-item">
                                            <span class="label">{{$t('label.postcode')}}：</span>
                                            <span class="value">{{editForm.postcode}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="4">
                                    <span style="margin-left: 10px;" class="cm-btn btn cm-handle-btn cm-handle-md-btn" @click="toEdit()" v-if="account.type=='admin'">{{$t("btn.edit")}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="block-bd" v-if="account.type=='admin'">
                        <div class="btn-list">
                            <div class="btn" @click="$router.push({name:'schoolCourseList',params:{school:editForm.id,schoolName:editForm.name}})">{{$t("btn.course")}}</div>
                            <div class="btn" @click="$router.push({name:'coachList',params:{school:editForm.serialCode,schoolName:editForm.name}})">{{$t("btn.coachInfo")}}</div>
                            <div class="btn" @click="$router.push({name:'certificateStatistics',params:{school:editForm.serialCode,schoolName:editForm.name}})">{{$t("btn.buyRecord")}}</div>
                        </div>
                    </div>
                    <div class="block-bd" v-if="account.type=='school'">
                        <div class="btn-list">
                            <div class="cm-btn btn" @click="toEdit()">{{$t("btn.editInfo")}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :title='$t("title.accountSetting")' class="edit-dialog cm-dialog school-dialog" :visible.sync="editDialogFlag" v-if="editDialogFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.schoolName")}}</span>
                    <input type="text" v-model="editForm.name" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.email")}}</span>
                    <input type="text" v-model="editForm.email" class="cm-input">
                </div>
                <div class="cm-input-row cm-inner-btn-row" v-if="account.type=='admin'">
                    <span class="field">{{$t("label.pwd")}}</span>
                    <input type="password" v-model="editForm.password" class="cm-input">
                    <div class="cm-btn inner-btn" @click="useDefaultPassword()">{{$t("btn.useDefaultPwd")}}</div>
                </div>
                <div class="cm-input-row input-row" v-if="account.type=='school'">
                    <span class="field">{{$t("label.pwd")}}</span>
                    <div class="input-item">
                        <input :type="showPassword?'text':'password'" v-model="editForm.password" class="cm-input">
                        <i class="icon" :class="{'eye-close-icon':showPassword,'eye-open-icon':!showPassword}" @click="showPassword=!showPassword"></i>
                    </div>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.country")}}</span>
                    <el-select v-model="editForm.code" filterable :class="{'cm-disabled':editForm.id}">
                        <el-option
                            v-for="item in regionList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input type="text" v-model="editForm.country" class="cm-input">-->
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
                <div class="cm-input-row">
                    <span class="field">{{$t("label.postcode")}}</span>
                    <input type="text" v-model="editForm.postcode" class="cm-input">
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="editDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="save">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .school-detail{
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


                id:null,
                code:null,


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
            getSchoolDetail:function () {
                let params={
                    ...Vue.sessionInfo(),
                    serialCode:this.account.type=='school'?this.account.serialCode:this.code,
                }
                Vue.api.getSchoolDetail(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('data:',data);
                        if(this.account.type=='school'){
                            this.account={...this.account,...data.school,...data.schoolPayment};
                            this.editForm=JSON.parse(JSON.stringify(this.account));
                        }else{
                            this.editForm={...data.school,...data.schoolPayment};
                        }
                        this.editForm.password=null;
                    }else{

                    }
                });
            },
            save:function () {
                if(!this.editForm.code&&!this.editForm.id){
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
                if(!this.editForm.postcode){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.postcode")});
                    return;
                }
                let selectedCountry=this.regionList.find((item,i)=>{
                    return item.value==this.editForm.code;
                })
                this.editForm.country=selectedCountry.label;
                let params={
                    ...this.editForm
                }
                if(params.password){
                    params.password=md5.hex(params.password);
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.updateSchool(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.editDialogFlag=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
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
            },
            toPay:function () {
                console.log('this.unusedList:',this.unusedList);
                let interval=null;
                let payModalInstance=this.payModal({
                    userId:this.account.id,
                    level:'schoolQualification',
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

                            Vue.api.getSchoolDetail({...Vue.sessionInfo(), serialCode:this.account.serialCode,}).then((resp)=>{
                                if(resp.respCode=='2000'){
                                    let data=JSON.parse(resp.respMsg);
                                    let school={...data.school,...data.schoolPayment};
                                    if(data.schoolQualification=='pay'){
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
            toEdit:function (index) {
                this.editDialogFlag=true;
            },
            toAudit:function () {
                let params={
                    ...Vue.sessionInfo(),
                    adminId:this.account.id,
                    userId:this.editForm.id,
                    type:'schoolDueAudit',
                    state:'pass',
                    msg:'审核通过',
                    forcePass:"true",
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                Vue.api.operateAudit(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.editForm.state='pass';
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{msg:resp.respMsg})});
                    }
                });
            },
            useDefaultPassword:function () {
                this.editForm.password='123456';
            },
        },
        mounted () {
            /**/
            this.code=this.$route.params.code;
            console.log('this.code:',this.code);
            /**/
            this.account=Vue.getAccountInfo();
            console.log('this.account:',this.account);
            /**/
            this.getSchoolDetail();
            this.getRegionConfig();
            //
           /* this.toEdit();*/
        },
    }
</script>
