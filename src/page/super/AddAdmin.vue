<template>
    <div class="page-content add-admin">
        <div class="cm-panel add-panel">
            <div class="cm-input-row">
                <span class="field">{{$t("label.account")}}</span>
                <input type="text" v-model="account" class="cm-input">
            </div>
            <div class="cm-input-row">
                <span class="field">{{$t("label.pwd")}}</span>
                <input type="password" v-model="pwd" class="cm-input">
            </div>
            <div class="cm-input-row">
                <span class="field">{{$t("label.phone")}}</span>
                <input type="tel" v-model="phone" class="cm-input">
            </div>
            <div class="cm-input-row">
                <span class="field">{{$t("label.name")}}</span>
                <input type="text" v-model="name" class="cm-input">
            </div>
            <div class="cm-input-row" style="margin-top: 60px;">
                <div class="cm-btn cm-handle-btn" @click="save()">
                    {{$t("btn.submit")}}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .add-admin{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .add-panel{
        padding-top: 100px;
        padding-bottom: 40px;
        width: 780px;
        min-height: 480px;
        background: #fff8fe;
        border-radius: 10px;
        box-shadow: 1px 5px 10px rgba(85,96,170,0.4);
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                account:null,
                pwd:null,
                phone:null,
                name:null,
            }
        },
        created(){

        },
        watch:{
        },
        computed: {
        },
        methods: {
            save:function () {
                if(!this.account){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.account")});
                    return;
                }
                if(!this.pwd){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.pwd")});
                    return;
                }
                if(!this.phone){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.phone")});
                    return;
                }
                if(!this.name){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.name")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    user:this.account,
                    password:this.pwd,
                    phone:this.phone,
                    name:this.name,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.addAdmin(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({
                            type:'complete',
                            text:this.$t("tips.saveS")
                        });
                        setTimeout(()=>{
                            this.$router.push({name:'adminList',params:{}});
                        },1500)
                    }else{
                        fb.setOptions({
                            type:'warn',
                            text:this.$t("tips.saveF",{msg:resp.respMsg})
                        });
                    }
                });
            }
        },
        mounted () {


        },
    }
</script>
