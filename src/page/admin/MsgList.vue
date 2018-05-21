<template>
    <div class="page-content msg-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">站内消息</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                标题
                            </th>
                            <th>
                                文件
                            </th>
                            <th>
                                时间
                            </th>
                            <th>
                                操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.title}}
                            </td>
                            <td>
                                {{item.fileUrl.split('massage/')[1]}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm:ss')}}
                            </td>
                            <td>
                                <el-select v-model="item.state" class="handle status-select-handle" @change="setState(index)">
                                    <el-option
                                        v-for="entry in options"
                                        :key="entry.value"
                                        :label="entry.label"
                                        :value="entry.value">
                                    </el-option>
                                </el-select>
                                <span class="handle" @click="toDetail(index)">查看</span>
                                <span class="handle" @click="del(index)">删除</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        class="cm-pager"
                        @current-change="getList"
                        prev-text="上一页"
                        next-text="下一页"
                        :current-page="pager.pageIndex"
                        :page-size="pager.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pager.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="cm-btn cm-add-btn" @click="dialogFormVisible=true">
            <div class="icon-wrap">
                <i class="icon add-msg-icon"></i>
            </div>
            <p>新的消息</p>
        </div>
        <el-dialog title="新的消息" class="edit-dialog cm-dialog add-msg-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <textarea v-model="title" cols="30" rows="10"></textarea>
            <div class="cm-file-uploader" :class="{'uploading':uploadStatus=='uploading','uploaded':uploadStatus=='uploaded'}">
                <el-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="80" color="#5560aa"></el-progress>
                <div class="btn-wrap">
                    <span class="file-name" v-if="this.files&&this.files.length>0">{{this.files[0].name}}</span>
                    <div class="cm-btn cm-handle-btn upload-btn">
                        <span class="first">上传文件</span>
                        <span class="again">重新上传</span>
                        <input  type="file" id="file-input" accept="application/pdf" @change="selectFile()">
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">取消</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="save">完成</div>
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
                account:null,

                test:'',
                dialogFormVisible:false,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                isSetting:false,
                editForm:null,
                options:[
                 /*   {
                        value:'top',
                        label:'置顶',
                    },*/
                    {
                        value:'enable',
                        label:'展示',
                    },
                    {
                        value:'disable',
                        label:'隐藏',
                    }
                ],

                title:null,
                uploadFb:null,
                uploadedCount:0,
                files:[],
                uploadStatus:null,
            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    searchContent:null,
                }
                this.pager.loading=true;
                Vue.api.getMessageList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.messageList);
                        this.pager.total=data.count;
                        this.entryList.forEach((item,i)=>{
                            item.state=item.state.replace(' ','');
                            item.adminInfo=JSON.parse(item.adminInfo);
                        })
                        console.log('this.entryList:',this.entryList);
                    }
                });
            },
            setState:function (index) {
                let item=this.entryList[index];
                let params={
                    ...Vue.sessionInfo(),
                    id:item.id,
                    state:item.state.replace(' ','')
                }
                let fb=Vue.operationFeedback({text:'设置中...'});
                Vue.api.setMessageState(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:'设置成功'});
                    }else{
                        fb.setOptions({type:'warn', text:'设置失败'});
                    }
                });
            },
            selectFile:function () {
                this.files=document.getElementById('file-input').files;
                this.uploadStatus='uploaded';
            },
            save:function () {
                if(!this.title){
                    Vue.operationFeedback({type:'warn',text:'请输入标题'});
                    return;
                }
                if(this.files.length==0){
                    Vue.operationFeedback({type:'warn',text:'请上传文件'});
                    return;
                }
                let formData = new FormData();
                formData.append("timeStamp",Vue.sessionInfo().timeStamp);
                formData.append("creator", this.account.id);
                formData.append("title", this.title);
                formData.append("file", this.files[0]);
                let fb=Vue.operationFeedback({text:'保存中...'});
                Vue.api.addMessage(formData).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getList();
                        this. dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:'保存成功'});
                    }else{
                        fb.setOptions({type:'warn', text:'保存失败'});
                    }
                });
            },
            del:function (index) {
                let item=this.entryList[index];
                this.$confirm('确定删除该通知?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(233);
                    let params={
                        ...Vue.sessionInfo(),
                        id:item.id,
                        state:'del'
                    }
                    let fb=Vue.operationFeedback({text:'删除中...'});
                    Vue.api.setMessageState(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.entryList.splice(index,1);
                            fb.setOptions({type:'complete', text:'删除成功'});
                        }else{
                            fb.setOptions({type:'warn', text:'删除失败'});
                        }
                    });
                }).catch(() => {

                });
            },
            toDetail:function (index) {
                let item=this.entryList[index];
                localStorage.setItem('curMsg',JSON.stringify(item));
                this.$router.push({name:'msgDetail',params:{}});
            }
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();
            console.log('this.account:',this.account);

            /**/
            this.getList();
        },
    }
</script>
