<template>
    <div class="page-content page-content-min msg-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
                <span class="time"> {{curMsg.createdAt|formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block">
                    <div class="block-hd">
                        <span class="title">{{curMsg.title}}</span>
                        <a :href="curMsg.fileUrl" v-if="curMsg.fileUrl" target="_blank" class="cm-btn download-btn">
                            <i class="icon el-icon-download"></i>
                            {{$t('btn.download')}}
                        </a>
                    </div>
                    <div class="block-bd">
                        <div class="text-content" v-if="curMsg.content&&curMsg.content!='null'" v-html="curMsg.content"></div>
                        <div class="msg-content" v-if="curMsg.fileUrl">
                            <pdf v-for="i in numPages"
                                 :key="i" :page="i" :src="task" style="display: inline-block;width: 100%"></pdf>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .msg-detail{
        .panel-hd{
            position: relative;
        }
        .time{
            position: absolute;
            right: 0px;
            bottom: 0px;
            color: #fff;
            padding: 10px;
            opacity: 0.7;
        }
    }
    .text-content{
        color: #666;
        line-height: 28px;
        padding-bottom: 50px;
    }
    .msg-content{
        min-height: 600px;
    }
</style>
<script>
    import Vue from 'vue'
    import pdf from 'vue-pdf'

    export default {
        components: {
            pdf
        },
        data() {
            return {
                curMsg:{},
                numPages:0,
                task:null
            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            download:function () {
                window.location.href=this.curMsg.fileUrl;
            }
        },
        mounted () {
            this.curMsg=JSON.parse(localStorage.getItem('curMsg'));
            console.log('this.curMsg:',this.curMsg);
            if(this.curMsg.fileUrl){
                this.curMsg.fileUrl=Vue.basicConfig.filePrefix+this.curMsg.fileUrl;
                this.task=pdf.createLoadingTask(this.curMsg.fileUrl);

                this.task.then(pdf => {
                    this.numPages = pdf.numPages;
                });
            }
        },
    }
</script>
