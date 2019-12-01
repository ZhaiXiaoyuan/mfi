<template>
  <div class="pay-btn">
      <form v-if="payType!=='aliPay'" :action="basicConfig.paypalPrefix+'/cgi-bin/webscr?locale.x=zh_CN'" :id="hostedId" method="post" target="_blank">
          <input type="hidden" name="cmd" value="_s-xclick">
          <input type="hidden" name="hosted_button_id" v-model="hostedId">
          <input type="hidden" name="invoice" v-model="invoice">
          <input type="hidden" name="on0" value="&#25910;&#36135;&#22320;&#22336;">
          <input type="hidden" name="os0" v-model="os0" v-if="os0" maxlength="200">
          <img class="cm-btn" @click="toPay()" src="https://www.paypalobjects.com/zh_HK/HK/i/btn/btn_buynowCC_LG_wCUP.gif" border="0" alt="PayPal － 更安全、更簡單的網上付款方式！">
          <img alt="" border="0" src="https://www.paypalobjects.com/zh_HK/i/scr/pixel.gif" width="1" height="1">
      </form>
      <div class="ali-pay" v-if="payType==='aliPay'">
          <div class="cm-btn cm-handle-btn cm-handle-min-btn" @click="toPay()">立即购买</div>
          <div class="icon-row"><i class="icon ali-pay-icon"></i></div>
          <div v-html="payFormDom"></div>
      </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .ali-pay{
        .cm-handle-btn{
            width: 107px;
        }
        .icon-row{
            margin-top: 4px;
            .icon{
                width: 20px;
                height: 20px;
            }
        }
    }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{
          target:'',
          item:null,
          callback:null,
          address:null,
      }
    },
    data: function () {
      return {
          account:{},
          hostedId:null,
          invoice:null,
          os0:null,
          payType:Vue.appConfig.payType,
          payFormDom:'',
      }
    },
    computed: {},
    watch: {

    },
    methods: {
        toPay:function () {
            if(this.payType==='aliPay'){
                this.createOrder();
            }else{
                let form=document.getElementById(this.hostedId);
                this.options.callback&&this.options.callback({invoice:this.invoice,item:this.options.item});
                form.submit();
            }
        },
        createOrder:async function () {
            let params={
                ...Vue.sessionInfo(),
                userId:this.account.id,
                userType:this.account.type==='coach'?'instructor':this.account.type,
                goodsId:this.options.target,
                zhifubaoRedirect:'https://www.iconfont.cn/',
                address:'',
            }
            /*let fb=Vue.operationFeedback({text:this.$t("tips.save")});*/
            let resp = await Vue.api.createOrder(params);
            if(resp.respCode=='2000'){
                this.payFormDom=resp.respMsg;
                Vue.nextTick(()=>{
                    let form=this.$el.querySelector('form');
                    form.setAttribute('target','_blank');
                    this.$el.querySelector('form').submit();
                });

                /*   fb.setOptions({
                       type:'complete',
                       text:this.$t("tips.saveS")
                   });*/
            }else{
                /*    fb.setOptions({
                        type:'warn',
                        text:this.$t("tips.saveF",{msg:resp.respMsg})
                    });*/
            }
        }
    },
    created: function () {

    },
    mounted: function () {
        this.account=this.getAccountInfo();
        /**/
        this.hostedId=this.hostedIdConfig[this.options.target].id;
        this.invoice=this.account.id+'-'+this.options.target+'-'+this.genTimestamp();
        if(this.options.address){
            this.os0=encodeURIComponent(this.options.address);
        }
    }
  };
</script>
