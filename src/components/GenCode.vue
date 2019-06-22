<template>
  <div class="gen-code" :class="{'cm-disabled':time<60||!number}" @click="genCode()">
    {{time==60?$t("btn.getCode"):time+'S'}}
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
    font-size: 12px;
    color: #fff;
    text-align: center;
    top:0px;
    bottom:0px;
    right: 0px;
    margin: auto;
    cursor: pointer;
    border-radius: 10px;
  }
  @media screen and (max-width: 1000px){
      .gen-code{
          height: 36px;
          border-radius: 5px;
          margin: 0px;
          top:auto;
          left: auto;
          right: 5px !important;
          bottom: 4px;
      }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
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
        if(!regex.mail.test(this.number)){
            this.operationFeedback({type:'warn',text:regex.mailAlert})
            return;
        }
        if(this.isRequesting||this.time<60){
            return;
        }
        this.isRequesting=true;
        let params={
            timeStamp:Vue.tools.genTimestamp(),
            email:this.number,
            type:this.options.type=='school'?'school':'user'
        }
        let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
        Vue.api.sendForgetPasswordEmail(params).then(function (resp) {
          that.isRequesting=false;
          if(resp.respCode=='2000'){
              let data=JSON.parse(resp.respMsg);
              that.options&&that.options.ok&&that.options.ok(data);
              fb.setOptions({type:'complete', text:that.$t("tips.handleS")});
            var interval=setInterval(function () {
              if(that.time==0){
                that.time=60;
                clearInterval(interval);
              }else{
                that.time--;
              }
            },1000);
          }else{
              fb.setOptions({type:'warn', text:that.$t("tips.handleF",{ msg: resp.respMsg})});
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
