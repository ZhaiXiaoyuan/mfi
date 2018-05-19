<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">全部教练</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block">
                    <div class="block-hd">
                        <div class="con-item">
                            <span class="label">等级</span>
                            <el-select v-model="value6" class="handle cm-select">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="con-item">
                            <span class="label">状态</span>
                            <el-select v-model="value6" class="handle cm-select" style="width: 100px;">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="con-item con-item-search">
                            <el-input placeholder="请输入内容" v-model="input5" class="cm-search">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                账号
                            </th>
                            <th>
                                姓名
                            </th>
                            <th>
                                等级
                            </th>
                            <th>
                                状态
                            </th>
                            <th>
                                审核日期
                            </th>
                            <th>
                                操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                instructors1
                            </td>
                            <td>
                                Liang Feng
                            </td>
                            <td>
                                MFI Instructor Trainer
                            </td>
                            <td>
                                certified
                            </td>
                            <td>
                                2018.02.22
                            </td>
                            <td>
                                <span class="handle">详情</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        class="cm-pager"
                        prev-text="上一页"
                        next-text="下一页"
                        :current-page="1"
                        :page-size="100"
                        layout="total, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="cm-btn cm-add-btn">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>新建教练账号</p>
        </div>
        <el-dialog title="新的消息" class="edit-dialog cm-dialog add-msg-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div class="cm-file-uploader">
                <el-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="80" color="#5560aa"></el-progress>
                <div class="btn-wrap">
                    <span class="file-name">关于审核时间的通知...pdf</span>
                    <div class="cm-btn cm-handle-btn upload-btn">
                        <span class="first">上传文件</span>
                        <span class="again">重新上传</span>
                        <input type="file">
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn">完成</div>
                <div class="cm-btn cm-handle-btn handle-btn cancel-btn">取消</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .add-msg-dialog{
        color: #5360aa;
        .el-dialog{
            width: 580px !important;
        }
       .el-dialog__header{
           text-align: center;
           padding: 30px 20px;
           .el-dialog__title{
               font-size: 28px;
               color: #5360aa;
           }
       }
        .el-dialog__body{
            padding-top: 0px;
        }
        textarea{
            width: 100%;
            height: 270px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding: 20px;
            color: #5360aa;
            font-size: 16px;
            resize: none;
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
                value6:'',
                input5:'',
                options:[{
                    label:'1',
                    value:'1'
                }],
                dialogFormVisible:false
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
