<template>
    <div class="page-content edit-admin">
        <div class="cm-panel edit-panel">
            <div class="panel-hd">修改密码</div>
            <div class="cm-input-row">
                <div class="row-wrap">
                    <span class="field">{{$t("label.pwd")}}</span>
                    <input type="password" v-model="pwd" class="cm-input">
                </div>
            </div>
            <div class="cm-input-row" style="margin-top: 60px;">
                <div class="row-wrap">
                    <div class="cm-btn cm-handle-btn" @click="updatePwd()" style="width: 300px">
                        {{$t("btn.submit")}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .edit-admin{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .edit-panel{
        padding-top: 50px;
        padding-bottom: 40px;
        width: 780px;
        min-height: 480px;
        background: #fff8fe;
        border-radius: 10px;
        box-shadow: 1px 5px 10px rgba(85,96,170,0.4);
        text-align: center;
        .row-wrap{
            position: relative;
            display: block;
            width: 300px;
            .field{
                position: absolute;
                left: -35%;
                line-height: 50px;
            }
        }
        .panel-hd{
            justify-content: center;
            font-size: 28px;
            color: #5560aa;
            padding-bottom: 40px;
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
            updatePwd:function () {
                if(!this.pwd){
                    Vue.operationFeedback({type:'warn',text:this.$t('holder.pwd')});
                    return;
                };
                let fb=Vue.operationFeedback({text:this.$t('tips.save')});
                let params={
                    ...Vue.sessionInfo(),
                    ...this.account,
                    password:this.pwd
                }
                Vue.api.updateAdmin(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t('tips.saveS')});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t('tips.saveF',{msg:resp.respMsg})});
                    }
                });
            }
        },
        mounted () {
            this.account=Vue.getAccountInfo();
        },
    }
</script>
