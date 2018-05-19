<template>
    <div class="page-content page-content-min msg-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();">
                    <i class="icon el-icon-arrow-left"></i>
                    返回
                </div>
                <span class="time">2018-01-26   10:00</span>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block">
                    <div class="block-hd">
                        <span class="title">{{curMsg.title}}</span>
                        <a :href="basicConfig.filePrefix+curMsg.fileUrl" class="cm-btn download-btn">
                            <i class="icon el-icon-download"></i>
                            下载文件
                        </a>
                    </div>
                    <div class="block-bd">
                        <div class="msg-content">
                            <pdf :src="basicConfig.filePrefix+curMsg.fileUrl"></pdf>
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

        },
        mounted () {
            this.curMsg=JSON.parse(localStorage.getItem('curMsg'));
        },
    }
</script>
