<template>
    <div class="page-content material-item">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();"  v-if="account.type=='admin'">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="false">
                    <div class="block-hd">
                        <p class="title">
                            <span v-if="type=='add'">{{$t("title.addMaterial")}}</span>
                            <span v-if="type=='edit'">{{$t("title.editMaterial")}}</span>
                            <span v-if="type=='view'">{{$t("title.materialDetail")}}</span>
                        </p>
                    </div>
                    <div class="block-bd">
                        <div class="form">
                            <div class="form-content">
                                <div class="cm-input-row">
                                    <input type="text" v-model="newForm.email" :placeholder='$t("holder.title")' class="cm-input">
                                </div>
                                <div class="cm-input-row">
                                    <el-select v-model="newForm.level" class="handle cm-select" :placeholder='$t("holder.level")'>
                                        <el-option
                                            v-for="(item,index) in levelOptions"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="cm-input-row">
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
                                </div>
                                <div class="cm-input-row">
                                    <div id="editor" class="editor"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cm-right-handle-list" v-if="type=='add'||type=='edit'">
            <div class="cm-btn handle-btn">
                {{$t("btn.save")}}
            </div>
            <div class="cm-btn handle-btn">
                {{$t("btn.cancel")}}
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .cm-input-row .field{
        min-width: 110px;
    }
    .material-item{
        width: 1000px;
        margin: 0px auto;
        .form{
            background: #fff;
            padding: 20px 40px;
            border-radius: 10px;
            .form-content{
                .cm-input-row{
                    justify-content: flex-start;
                }
                .cm-input{

                }
                .cm-file-uploader{
                    margin-top: 0px;
                    min-height: 0px;
                }
                .editor{
                    width: 100%;
                    .w-e-toolbar .w-e-menu{
                        z-index: 10 !important;
                    }
                    .w-e-text-container{
                        height: 1000px !important;
                        z-index: 10!important;
                    }
                }
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
                account:{},
                type:'',//add、edit、view

                levelOptions:[],
                listLevelOptions:[],
                selectedLevel:null,


                dialogFormVisible:false,
                newForm:{
                    level:null,
                },
                editor:null,
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
            initEditor:function () {
                setTimeout(()=>{
                    let E = window.wangEditor;
                    this.editor = new E('#editor');
                    this.editor.customConfig.colors =Vue.tools.basicConfig.colors;
                    this.editor.customConfig.uploadImgMaxSize = 5* 1024 * 1024;
                    this.editor.customConfig.uploadImgMaxLength = 1;
                    this.editor.customConfig.uploadImgTimeout = 3000;
                    this.editor.customConfig.customUploadImg = (files, insert) => {
                        let formData = new FormData();
                        formData.append('coverPicFile', files[0]);
                        let fb=Vue.operationFeedback({text:'上传中...'});
                        Vue.api.uploadPic(formData).then(function (data) {
                            if(data.status=='2000'){
                                fb.setOptions({type:'complete',text:'上传成功',delayForDelete:1500});
                                insert(Vue.basicConfig.coverBasicUrl+data.respMsg);
                            }else{
                                fb.setOptions({type:'warn',text:'图片上传失败'});
                            }
                        });
                    }
                    this.editor.create();
                    this.editor.txt.clear();
                },500);
            },
            save:function () {
                if(!this.newForm.courseName){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.courseName")});
                    return;
                }
                if(!this.newForm.level){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.level")});
                    return;
                }
                if(!this.newForm.address){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.address")});
                    return;
                }
                if(!this.newForm.startTime){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.startTime")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    instructorId:this.coach.id,
                    mfiLevel:this.newForm.level,
                    courseName:this.newForm.courseName,
                    site:this.newForm.address,
                    startTime:Vue.formatDate(this.newForm.startTime,'yyyy-MM-dd')
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.addCourse(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getList();
                        this.dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
        },
        mounted () {
            //
            this.type=this.$route.params.type;
            this.type=this.type?this.type:'add';
            /**/
            this.account=Vue.getAccountInfo();

            /**/
            this.levelOptions=this.genLevelConfig({level:this.account.type=='coach'?this.account.mfiLevel:'all'});
            this.listLevelOptions=[{
                value:null,
                label:this.$t("btn.all"),
            }].concat(this.levelOptions);
            //
            this.initEditor();
        },
    }
</script>
