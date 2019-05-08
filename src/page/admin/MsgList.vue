<script src="../../../node_modules/_element-ui@2.3.3@element-ui/src/locale/lang/zh-CN.js"></script>
<template>
    <div class="page-content msg-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t('title.message')}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t('label.title')}}
                            </th>
                            <th>
                                {{$t('label.file')}}
                            </th>
                            <th>
                                {{$t('label.time')}}
                            </th>
                            <th>
                                {{$t('label.handle')}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.title}}
                            </td>
                            <td>
                                <span v-if="item.fileUrl">{{item.fileUrl.split('message/')[1]}}</span>
                                <span v-if="!item.fileUrl">-</span>
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm:ss')}}
                            </td>
                            <td>
                                <el-select v-model="item.state" class="handle status-select-handle" @change="setState(index)" v-if="account.type=='admin'">
                                    <el-option
                                        v-for="entry in options"
                                        :key="entry.value"
                                        :label="entry.label"
                                        :value="entry.value">
                                    </el-option>
                                </el-select>
                                <span class="handle" @click="toDetail(index)">{{$t('btn.view')}}</span>
                                <span class="handle" @click="del(index)" v-if="account.type=='admin'">{{$t('btn.del')}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        class="cm-pager"
                        @current-change="getList"
                        :prev-text='$t("btn.prev")'
                        :next-text='$t("btn.next")'
                        :current-page="pager.pageIndex"
                        :page-size="pager.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pager.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="cm-btn cm-add-btn" v-if="account.type=='admin'" @click="dialogFormVisible=true">
            <div class="icon-wrap">
                <i class="icon add-msg-icon"></i>
            </div>
            <p>{{$t('btn.addMsg')}}</p>
        </div>
        <el-dialog :title="$t('title.addMsg')" class="edit-dialog cm-dialog add-msg-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <input type="text" v-model="title" :placeholder="$t('holder.title')" >
            <textarea v-model="content" cols="30" rows="10"  :placeholder="$t('holder.content')" ></textarea>
            <div class="cm-file-uploader" :class="{'uploading':uploadStatus=='uploading','uploaded':uploadStatus=='uploaded'}">
                <el-progress class="progress" :text-inside="true" :stroke-width="20" :percentage="80" color="#5560aa"></el-progress>
                <div class="btn-wrap">
                    <span class="file-name" v-if="this.files&&this.files.length>0">{{this.files[0].name}}</span>
                    <div class="cm-btn cm-handle-btn upload-btn">
                        <span class="first">{{$t('btn.upload')}}</span>
                        <span class="again">{{$t('btn.reUpload')}}</span>
                        <input  type="file" id="file-input" accept="application/pdf" @change="selectFile()">
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">{{$t('btn.cancel')}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="save">{{$t('btn.ok')}}</div>
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
        input{
            width: 100%;
            height: 40px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding:0px 20px;
            color: #5360aa;
            font-size: 16px;
        }
        textarea{
            margin-top: 20px;
            width: 100%;
            height: 220px;
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
                account:{},

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
                   /* {
                        value:'top',
                        label:this.$t("label.stick"),
                    },*/
                    {
                        value:'enable',
                        label:this.$t("label.show"),
                    },
                    {
                        value:'disable',
                        label:this.$t("label.hide"),
                    }
                ],

                title:null,
                content:null,
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
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                Vue.api.setMessageState(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{msg:resp.respMsg})});
                    }
                });
            },
            selectFile:function () {
                this.files=document.getElementById('file-input').files;
                this.uploadStatus='uploaded';
            },
            save:function () {
                if(!this.title){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.title")});
                    return;
                }
                if(!this.content&&this.files.length==0){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.nayContent")});
                    return;
                }
                let formData = new FormData();
                formData.append("timeStamp",Vue.sessionInfo().timeStamp);
                formData.append("creator", this.account.id);
                formData.append("title", this.title);
                formData.append("content", this.content);
                if(this.files.length>0){
                    formData.append("file", this.files[0]);
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.addMessage(formData).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.title=null;
                        this.content=null;
                        this.files=[];
                        this.getList();
                        this. dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
            del:function (index) {
                let item=this.entryList[index];
                this.$confirm(this.$t("tips.delMsg",{msg:item.title}), this.$t("title.tips"), {
                    confirmButtonText: this.$t("btn.sure"),
                    cancelButtonText: this.$t("btn.cancel"),
                    type: 'warning'
                }).then(() => {
                    let params={
                        ...Vue.sessionInfo(),
                        id:item.id,
                        state:'del'
                    }
                    let fb=Vue.operationFeedback({text:this.$t("tips.delete")});
                    Vue.api.setMessageState(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.entryList.splice(index,1);
                            fb.setOptions({type:'complete', text:this.$t("tips.deleteS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.deleteF",{msg:resp.respMsg})});
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
