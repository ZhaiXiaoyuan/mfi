<template>
    <div id="app" v-cloak>
        <router-view></router-view>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    @import "less/main";
    [v-cloak] { display: none }
</style>
<script>
    import Vue from 'vue'
    import bus from './components/common/bus';

    export default {
        components: {

        },
        props:{

        },
        data: function () {
            return {

            }
        },
        computed: {},
        watch: {

        },
        methods: {

        },
        created: function () {

        },
        mounted: function () {
            bus.$off('service_modal_handle');
            bus.$on('service_modal_handle', data => {
                console.log('ddddd**********:',data);
                this.alert({
                    title:'',
                    html:'<div style="text-align: center;padding: 30px 0px;"><a href="/#/protocol" target="_blank" style="font-size: 20px;color: #5360aa;cursor: pointer;">《'+this.$t("title.serviceProtocol")+'》</a></div>',
                    yes:this.$t("btn.agree"),
                    lock:true,
                    ok:()=>{
                        if(data.school&&data.school.id){
                            let params={
                                ...Vue.sessionInfo(),
                                schoolId:data.school.id,
                            }
                            let fb=Vue.operationFeedback({text:this.$t("tips.handle"),delayForDelete:1000});
                            Vue.api.agreeSchoolProtocol(params).then((resp)=>{
                                if(resp.respCode=='2000'){
                                    fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                                }else{
                                    fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                                }
                            });
                        }else{
                            let params={
                                ...Vue.sessionInfo(),
                                instructorId:data.user.id,
                            }
                            let fb=Vue.operationFeedback({text:this.$t("tips.handle"),delayForDelete:1000});
                            Vue.api.agreeInstructorProtocol(params).then((resp)=>{
                                if(resp.respCode=='2000'){
                                    fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                                }else{
                                    fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                                }
                            });
                        }
                    }
                })
            });
        }
    };
</script>
