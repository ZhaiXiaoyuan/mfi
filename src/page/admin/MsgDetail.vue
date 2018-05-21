<template>
    <div class="page-content page-content-min msg-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        返回
                    </div>
                </div>
                <span class="time"> {{curMsg.createdAt|formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block">
                    <div class="block-hd">
                        <span class="title">{{curMsg.title}}</span>
                        <a :href="curMsg.fileUrl" target="_blank" class="cm-btn download-btn">
                            <i class="icon el-icon-download"></i>
                            下载文件
                        </a>
                    </div>
                    <div class="block-bd">
                        <div class="msg-content" v-if="curMsg.fileUrl">
                            <pdf :src="curMsg.fileUrl"></pdf>
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
            this.curMsg.fileUrl=Vue.basicConfig.filePrefix+this.curMsg.fileUrl;
        },
    }
</script>
