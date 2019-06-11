<template>
  <div class="gen-code" :class="{'cm-disabled':time<60||!number}" @click="genCode()">
    {{time==60?'获取邮箱验证码':time+'S'}}
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .gen-code{
    position: absolute;
    width: 110px;
    height: 40px;
    line-height: 40px;
    background: rgb(66, 144, 251);
    font-size: 0.12px;
    color: #fff;
    text-align: center;
    top:0px;
    bottom:0px;
    right: 0px;
    margin: auto;
    cursor: pointer;
    border-radius: 10px;

  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      userName:{
         type:String,
      },
      number:{
         type:String,
      },
      identifyCode:{
         type:String,
      },
      url:{
        type:String,
      },
      options:{
          type:Object,
      }
    },
    data: function () {
      return {
        time:60,
        isRequesting:false,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      genCode:function () {
        let that=this;
        if(!this.userName){
            this.operationFeedback({type:'warn',text:'请输入用户名'})
            return;
        }
        if(!regex.mail.test(this.number)){
            this.operationFeedback({type:'warn',text:regex.mailAlert})
            return;
        }
        if(this.isRequesting||this.time<60){
            return;
        }
        this.isRequesting=true;
        let params={
            timestamp:Vue.tools.sessionInfo().timestamp,
            username:this.userName,
            number:this.number,
        }
        let fb=this.operationFeedback({text:'发送中...'});
        Vue.api.sendResetPwdEmail(params).then(function (resp) {
          that.isRequesting=false;
          if(resp.code=='430000'){
            let data=resp.respMsg;
              that.options&&that.options.ok&&that.options.ok(data);
            fb.setOptions({type:'complete','text':'发送成功'});
            var interval=setInterval(function () {
              if(that.time==0){
                that.time=60;
                clearInterval(interval);
              }else{
                that.time--;
              }
            },1000);
          }else{
            fb.setOptions({type:'warn','text':resp.respMsg});
          }
        });
      }
    },
    created: function () {

    },
    mounted: function () {
      /*修改父dom的position*/
      this.$el.parentNode.style.position='relative';
    }
  };
</script>
