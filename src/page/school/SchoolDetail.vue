<template>
    <div class="page-content school-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title"></span>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block detail-block show-status">
                    <div class="payment-status" v-if="account.schoolQualification=='notPay'">
                        <div><span>{{$t("tips.schoolQualification")}}</span><span class="cm-btn btn" @click="toPay()">{{$t("btn.go")}}</span></div>
                    </div>
                    <div class="block-bd">
                        <div class="form">
                            <div class="cm-input-row">
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
                            <div class="cm-input-row">
                                <span class="field"></span>
                                <div class="handle-list">
                                    <div class="cm-btn cm-handle-btn handle-btn" @click="reset">{{$t("btn.cancel")}}</div>
                                    <div class="cm-btn cm-handle-btn handle-btn" @click="save">{{$t("btn.submit")}}</div>
                                </div>
                            </div>
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
        .handle-list{
            display: flex;
            margin-top: 40px;
            width: 300px;
            .handle-btn{
                padding: 0px 35px;
                &+.handle-btn{
                    margin-left: auto;
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


                id:null,


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
                    serialCode:this.account.serialCode,
                }
                Vue.api.getSchoolDetail(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...data.school,...data.schoolPayment};
                        this.editForm=JSON.parse(JSON.stringify(this.account));
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
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.updateSchool(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.dialogFormVisible=false;
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
            reset:function () {
                this.editForm=JSON.parse(JSON.stringify(this.account));
                this.editForm.password=null;
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
            }
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();
            /**/
            this.getSchoolDetail();
            this.getRegionConfig();
        },
    }
</script>
