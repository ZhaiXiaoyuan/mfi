<template>
    <div class="login-page">
        <div class="cm-btn switch-btn" v-if="type=='super'" @click="switchType('admin')">管理员登录</div>
        <div class="cm-btn switch-btn" v-if="type=='admin'" @click="switchType('super')">超级管理员登录</div>
        <language></language>
        <div class="login-panel">
            <div class="form-block">
                <div class="block-hd">
                    <p>MFI  EOS</p>
                    <p v-if="type=='super'">超级管理员</p>
                    <p v-if="type=='admin'">管理员</p>
                </div>
                <div class="block-bd">
                    <div class="input-row">
                        <p>账号</p>
                        <div class="input-item">
                            <input type="text" v-model="account">
                            <i class="icon account-icon"></i>
                        </div>
                    </div>
                    <div class="input-row">
                        <p>密码</p>
                        <div class="input-item">
                            <input type="password" v-model="pwd">
                            <i class="icon pwd-icon"></i>
                        </div>
                    </div>
                    <div class="cm-btn handle-btn" @click="login()">登&nbsp;&nbsp;录</div>
                </div>
            </div>
            <p class="help">帮助</p>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .login-page{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .login-panel{
        position: relative;
        background: url("../../images/login/login-panel-bg.png") no-repeat;
        width: 1262px;
        height: 767px;
        background-size: cover;
    }
    .form-block{
        float: right;
        margin-top: 100px;
        margin-right: 100px;
        color: #5560aa;
        .block-hd{
            text-align: center;
            font-size: 30px;
            p+{
                padding-top: 10px;
                font-size: 40px;
            }
        }
        .block-bd{
            margin-top: 48px;
        }
        .input-row{
            p{
                font-size: 20px;
                padding-bottom: 5px;
            }
            .input-item{
                position: relative;
               input{
                   padding: 0px 50px 0px 10px;
                   width: 300px;
                   height: 60px;
                   border-radius: 10px;
                   background: #fff;
                   font-size: 20px;
                   border: none;
                   border-radius: 10px;
                   box-shadow: 0px 1px 10px rgba(85,96,170,0.3);
               }
                .icon{
                    position: absolute;
                    top:0px;
                    right: 15px;
                    bottom: 0px;
                    margin: auto;
                }
            }
            &+.input-row{
                margin-top: 30px;
            }
        }
        .handle-btn{
            margin-top: 34px;
            width: 300px;
            height: 60px;
            border-radius: 10px;
            background: #5560aa;
            font-size:24px;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }
    }
    .help{
        position: absolute;
        right: 50px;
        bottom: 60px;
        font-size: 20px;
        color: #606aaf;
    }
    .switch-btn{
        position: fixed;
        top:45px;
        left: 45px;
        display: inline-block;
        font-size: 20px;
        color: #fff;
        padding: 12px 20px;
        border-radius: 5px;
        border: 1px solid #fff;
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        components:{

        },
        data: function(){
            return {
                type:'super',
                account:null,
                pwd:null,
            }
        },
        methods: {
            switchType:function (value) {
                this.type=value;
                this.account=null;
                this.pwd=null;
            },
            login:function () {
                if(!this.account){
                    Vue.operationFeedback({type:'warn',text:'请输入账号'});
                    return;
                }
                if(!this.pwd){
                    Vue.operationFeedback({type:'warn',text:'请输入密码'});
                    return;
                }
                let fb=Vue.operationFeedback({text:'登录中...'});
                let params={
                    ...Vue.sessionInfo(),
                    user:this.account,
                    password:this.pwd
                }
                if(this.type=='super'){
                    Vue.api.superLogin(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            console.log('this.type:',this.type);
                            this.$cookie.set('account',JSON.stringify({
                                type:this.type,
                                account:this.account,
                            }),7);
                            fb.setOptions({
                                type:'complete',
                                text:'登录成功'
                            });
                            this.$router.push({name:'adminList',params:{}});
                        }else{
                            fb.setOptions({
                                type:'warn',
                                text:'登录失败，账号或密码错误'
                            });
                        }
                    });
                }else if(this.type=='admin'){
                    Vue.api.adminLogin(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            let data=JSON.parse(resp.respMsg);
                            this.$cookie.set('account',JSON.stringify({
                                type:this.type,
                                account:this.account,
                                ...data
                            }),7);
                            fb.setOptions({
                                type:'complete',
                                text:'登录成功'
                            });
                            this.$router.push({name:'msgList',params:{}});
                        }else{
                            fb.setOptions({
                                type:'warn',
                                text:'登录失败，账号或密码错误'
                            });
                        }
                    });
                }
            }
        },
        mounted () {
            /**/
            this.type=this.$route.params.type?this.$route.params.type:this.type;
        },
    }
</script>
