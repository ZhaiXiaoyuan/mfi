<template>
    <div class="page-content coach-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        返回
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block detail-block">
                    <div class="block-bd">
                        <el-row>
                            <el-col :span="5">
                                <img class="avatar" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=589774041,1624402021&fm=58&bpow=640&bpoh=649" alt="">
                            </el-col>
                            <el-col :span="18">
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">姓：</span>
                                        <span class="value">Liang</span>

                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">名：</span>
                                        <span class="value">Feng</span>

                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">等级：</span>
                                        <span class="value">MFI Instructor Trainer</span>
                                        <i class="icon setting-min-icon"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">性别：</span>
                                        <span class="value">男</span>

                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">生日：</span>
                                        <span class="value">1990-02-21</span>

                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">学校：</span>
                                        <span class="value">广州市xxx培训基地</span>
                                        <i class="icon setting-min-icon"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="5" class="info-item">
                                        <span class="label">国家：</span>
                                        <span class="value">中国</span>

                                    </el-col>
                                    <el-col :span="7" :offset="1" class="info-item">
                                        <span class="label">城市：</span>
                                        <span class="value">广州</span>

                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">状态：</span>
                                        <span class="value">已审核</span>
                                        <i class="icon setting-min-icon"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="info-row">
                                    <el-col :span="13" class="info-item">
                                        <span class="label">地址：</span>
                                        <span class="value">地址 : 广州市天河区时尚天河</span>

                                    </el-col>
                                    <el-col :span="9" :offset="1" class="info-item">
                                        <span class="label">审核日期：</span>
                                        <span class="value">2018.02.22</span>

                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px;">
                            <el-col :span="7" class="info-item">
                                <span class="label">邮箱：</span>
                                <span class="value">liangfeng@gmail.com</span>

                            </el-col>
                            <el-col :span="7" :offset="1" class="info-item">
                                <span class="label">号码：</span>
                                <span class="value">号码 : 86-13788608830</span>

                            </el-col>
                            <el-col :span="7"  :offset="1" class="info-item">
                                <span class="label">紧急联系人 : </span>
                                <span class="value">86-1389983639</span>

                            </el-col>
                        </el-row>
                        <div class="info-row">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .detail-block{
        padding: 40px 20px;
        .avatar{
            width: 200px;
            height: 200px;
            border-radius: 5px;
        }
        .info-row{
            &+.info-row{
                margin-top: 25px;
            }
        }
        .info-item{
            position: relative;
            font-size: 20px;
            padding: 0px 5px;
            .label{

            }
            .value{
                color: #999;
            }
            .icon{
                position: absolute;
                top:0px;
                bottom:0px;
                right: 0px;
                margin: auto;
            }
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


        },
    }
</script>
