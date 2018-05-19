<template>
    <div class="page-content add-admin">
        <div class="cm-panel add-panel">
            <div class="cm-input-row">
                <span class="field">账号</span>
                <input type="text" v-model="account" class="cm-input">
            </div>
            <div class="cm-input-row">
                <span class="field">初始密码</span>
                <input type="password" v-model="pwd" class="cm-input">
            </div>
            <div class="cm-input-row">
                <span class="field">手机</span>
                <input type="tel" v-model="phone" class="cm-input">
            </div>
            <div class="cm-input-row">
                <span class="field">姓名</span>
                <input type="text" v-model="name" class="cm-input">
            </div>
            <div class="cm-input-row" style="margin-top: 60px;">
                <div class="cm-btn cm-handle-btn" @click="save()">
                    确认提交
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
                    Vue.operationFeedback({type:'warn',text:'请输入账号'});
                    return;
                }
                if(!this.pwd){
                    Vue.operationFeedback({type:'warn',text:'请输入密码'});
                    return;
                }
                if(!this.phone){
                    Vue.operationFeedback({type:'warn',text:'请输入手机号'});
                    return;
                }
                if(!this.name){
                    Vue.operationFeedback({type:'warn',text:'请输入姓名'});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    user:this.account,
                    password:this.pwd,
                    phone:this.phone,
                    name:this.name,
                }
                let fb=Vue.operationFeedback({text:'保存中...'});
                Vue.api.addAdmin(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({
                            type:'complete',
                            text:'保存成功'
                        });
                        setTimeout(()=>{
                            this.$router.push({name:'adminList',params:{}});
                        },1500)
                    }else{
                        fb.setOptions({
                            type:'warn',
                            text:'保存失败'
                        });
                    }
                });
            }
        },
        mounted () {


        },
    }
</script>
