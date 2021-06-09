<template>
    <div class="page-content material-item">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();">
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
                        <div class="form" v-if="type!='view'">
                            <div class="form-content">
                                <div class="cm-input-row">
                                    <input type="text" v-model="form.title" :placeholder='$t("holder.title")' class="cm-input">
                                </div>
                                <div class="cm-input-row">
                                    <el-select v-model="form.level" class="handle cm-select" :placeholder='$t("holder.level")'>
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
                                            <span class="file-name" v-if="files&&files.length>0||form.fileName">{{files&&files.length>0?files[0].name:form.fileName}}</span>
                                            <div class="cm-btn cm-handle-btn upload-btn">
                                                <span class="first">{{$t('btn.upload')}}</span>
                                                <span class="again">{{$t('btn.reUpload')}}</span>
                                                <input  type="file" id="file-input" accept="application/pdf" @change="selectFile()">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tips" style="text-align: right;padding: 0px 100px 5px 0px;">
                                    <a class="cm-link-btn" href="https://shimo.im/docs/V8QzGV89gnYqugnk" target="_blank">
                                        {{$t("btn.editorDoc")}}
                                    </a>
                                </div>
                                <div class="cm-input-row">
                                    <div class="editor" id="editor"></div>
                                 <!--   <textarea v-model="form.content" cols="30" rows="20"  :placeholder="$t('holder.content')" ></textarea>-->
                                </div>
                            </div>
                        </div>
                        <div class="view-box cm-watermark" v-if="type=='view'">
                            <p class="title">{{form.title}}</p>
                            <p class="level">{{$t("label.level")}}：{{allLevelList[form.levelList]}}</p>
                            <p class="file"><a :href="form.fileUrl" target="_blank">{{$t("label.file")}}：{{form.fileName}}</a></p>
                            <div class="content-detail">
                                <div v-html="form.content"></div>
                            </div>
                          <!--  <pdf class="pdf-area" v-for="i in numPages"
                                 :key="i" :page="i" :src="task" style="display: inline-block;width: 100%"></pdf>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cm-right-handle-list" v-if="type=='add'||type=='edit'">
            <div class="cm-btn handle-btn" @click="save()">
                {{$t("btn.save")}}
            </div>
            <div class="cm-btn handle-btn" @click="cancel()">
                {{$t("btn.cancel")}}
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .material-item{
        width: 1000px;
        margin: 0px auto;
        .cm-input-row .field{
            min-width: 110px;
        }
        .form{
            background: #fff;
            padding: 20px 40px;
            border-radius: 5px;
            .form-content{
                .cm-input-row{
                    justify-content: flex-start;
                    textarea{
                        width: 600px;
                        height: 400px;
                    }
                }
                .cm-input{
                    width: 500px;
                }
                .cm-select{
                    position: relative;
                    z-index: 1;
                    width: 500px;
                    input{
                        width: 100%;
                    }
                }
                .cm-file-uploader{
                    margin-top: 0px;
                    min-height: 0px;
                    width: 500px;
                }
                .editor{
                    position: relative;
                    z-index: 0;
                    width: 90%;
                    .w-e-toolbar .w-e-menu{
                       /* z-index: 10 !important;*/
                    }
                    .w-e-text-container{
                        height: 800px !important;
                        z-index: 10!important;
                    }
                }
            }
        }
        .view-box{
            background: #fff;
            padding: 20px 40px;
            border-radius: 5px;
            .title{
                font-size: 28px;
                text-align: center;
                color: #333;
            }
            .level{
                margin-top: 10px;
                text-align: center;
                font-size: 16px;
            }
            .file{
                margin-top: 10px;
                a{
                    color: #5560aa;
                    font-size: 16px;
                }
            }
            .content-detail{
                margin: 20px auto 0px auto;
                width: 800px;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .material-item{
            width: 100%;
            .view-box{
                padding: 15px 0px;
                overflow: hidden;
                .title{
                    font-size: 20px;
                    padding: 0px 15px;
                }
                .level{
                    font-size: 14px;
                    margin-top: 5px;
                    padding: 0px 15px;
                }
                .content-detail{
                    margin-top: 15px;
                    font-size: 14px;
                    width: 100%;
                    padding: 0px 15px;
                }
                .pdf-area{
                    /*transform: scale(1.3);*/
                }
            }
        }
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
                account:{},
                type:'',//add、edit、view

                levelOptions:[],
                listLevelOptions:[],
                selectedLevel:null,

                id:null,
                entry:null,
                form:{
                    level:null,
                    fileName:null,
                },
                editor:null,
                uploadFb:null,
                uploadedCount:0,
                files:[],
                uploadStatus:null,
                numPages:0,
                task:null,
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
                        Vue.api.addContentPicture(formData).then(function (data) {
                            if(data.status=='2000'){
                                fb.setOptions({type:'complete',text:'上传成功',delayForDelete:1500});
                                insert(Vue.basicConfig.filePrefix+'/mfiFile/teachingMaterial/'+data.respMsg);
                            }else{
                                fb.setOptions({type:'warn',text:'图片上传失败'});
                            }
                        });
                    }
                    this.editor.customConfig.lang = {
                        '设置标题': this.$t("editor.title"),
                        '正文': this.$t("editor.p"),
                        '链接文字': this.$t("editor.linkText"),
                        '链接': this.$t("editor.link"),
                        '上传图片': this.$t("editor.uploadImage"),
                        '编辑图片': this.$t("editor.editImage"),
                        '最大宽度': this.$t("editor.maxWidth"),
                        '删除图片': this.$t("editor.deleteImage"),
                        '网络图片': this.$t("editor.onlineImage"),
                        '图片链接': this.$t("editor.imageLink"),
                        '插入视频': this.$t("editor.insertVideo"),
                        '插入表格': this.$t("editor.insertTable"),
                        '插入': this.$t("editor.insert"),
                        '上传': this.$t("editor.upload"),
                        '字号': this.$t("editor.fontSize"),
                        '字体': this.$t("editor.fontFamily"),
                        '文字颜色': this.$t("editor.fontColor"),
                        '背景色': this.$t("editor.backgroundColor"),
                        '微软雅黑': this.$t("editor.MicrosoftAccorblack"),
                        '宋体': this.$t("editor.SongTypeface"),
                        '设置列表': this.$t("editor.list"),
                        '有序列表': this.$t("editor.orderedList"),
                        '无序列表': this.$t("editor.unorderedList"),
                        '对齐方式': this.$t("editor.alignment"),
                        '靠左': this.$t("editor.left"),
                        '居中': this.$t("editor.center"),
                        '靠右': this.$t("editor.right"),
                        '创建': this.$t("editor.init"),
                        '行': this.$t("editor.row"),
                        '列的表格': this.$t("editor.col"),
                        '格式如：': this.$t("editor.format"),
                        '默认': this.$t("editor.default"),
                        '新浪': this.$t("editor.sina"),
                    }
                    this.editor.create();
                    this.editor.txt.clear();
                    if(this.id){
                        this.getEntry(this.id);
                    }
                },500);
            },
            getEntry:function (id) {
                let params={
                    id:id,
                }
                Vue.api.getTeachingMaterial(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.form=data;
                        console.log('this.form:',this.form);
                        this.form.level=Vue.tools.allLevelList[this.form.levelList];
                        this.form.fileName=this.form.fileUrl.split('/mfiFile/teachingMaterial/')[1];
                        if(this.form.fileName){
                            this.uploadStatus='uploaded';
                        }
                        this.editor&&this.editor.txt.html(this.form.content);
                    if(this.form.fileUrl){
                        this.form.fileUrl=Vue.basicConfig.filePrefix+this.form.fileUrl;
                      /*  this.task=pdf.createLoadingTask(this.form.fileUrl);

                        this.task.then(pdf => {
                            this.numPages = pdf.numPages;});*/
                        }
                    }
                });
            },
            selectFile:function () {
                this.files=document.getElementById('file-input').files;
                this.uploadStatus='uploaded';
                if(this.form.id&&this.files.length>0){
                    this.form.file=this.files[0];
                    let formData = new FormData();
                    formData.append("timeStamp",Vue.sessionInfo().timeStamp);
                    formData.append("id", this.form.id);
                    formData.append("file", this.form.file);
                    let fb=Vue.operationFeedback({text:this.$t("tips.upload")});
                    Vue.api.updataTeachingMaterialFile(formData).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.form.fileUrl=resp.respMsg;
                            this.form.fileName=this.form.fileUrl.split('/mfiFile/teachingMaterial/')[1];
                            this.files=[];
                            fb.setOptions({type:'complete', text:this.$t("tips.uploadS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.uploadF",{msg:resp.respMsg})});
                        }
                    });
                }
            },
            save:function () {
                this.form.content=this.editor.txt.html();
                if(!this.form.title){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.title")});
                    return;
                }
                if(!this.form.level){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.level")});
                    return;
                }
                if(!this.form.content){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.content")});
                    return;
                }
                if(!this.form.id){
                    this.form.file=this.files[0];
                    if(!this.form.file){
                        Vue.operationFeedback({type:'warn',text:this.$t("holder.upload")});
                        return;
                    }
                    let formData = new FormData();
                    formData.append("timeStamp",Vue.sessionInfo().timeStamp);
                    formData.append("creator", this.account.id);
                    formData.append("title", this.form.title);
                    formData.append("minLevel", this.form.level);
                    formData.append("content", this.form.content);
                    formData.append("file", this.form.file);
                    let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                    Vue.api.addTeachingMaterial(formData).then((resp)=>{
                        if(resp.respCode=='2000'){
                            let data=JSON.parse(resp.respMsg);
                            this.files=[];
                            this.form.id=data.teachingMaterial.id;
                            this.form.fileUrl=data.teachingMaterial.fileUrl;
                            this.form.fileName=this.form.fileUrl.split('/mfiFile/teachingMaterial/')[1];
                            fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                        }
                    });
                }else{
                    let formData = new FormData();
                    formData.append("timeStamp",Vue.sessionInfo().timeStamp);
                    formData.append("id", this.form.id);
                    formData.append("title", this.form.title);
                    formData.append("minLevel", this.form.level);
                    formData.append("content", this.form.content);
                    let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                    Vue.api.updataTeachingMaterial(formData).then((resp)=>{
                        if(resp.respCode=='2000'){
                            fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                        }
                    });
                }
            },
            cancel:function () {
                this.$router.go(-1);
            }
        },
        mounted () {
            //
            this.id=this.$route.params.id;
            this.type=this.$route.params.type;
            this.type=this.type?this.type:'add';
            /**/
            this.account=Vue.getAccountInfo();

            /**/
            this.levelOptions=this.genLevelConfig(this.account.type=='coach'?{level:this.account.mfiLevel, oLevel:this.account.oLevel, jLevel:this.account.jLevel, gLevel:this.account.gLevel, pLevel:this.account.pLevel}:{level:'all'});

            this.listLevelOptions=[{
                value:null,
                label:this.$t("btn.all"),
            }].concat(this.levelOptions);
            //
            if(this.type!='add'){
                this.getEntry(this.id);
            }
            if(this.type!='view'){
                this.initEditor();
            }
            //
        },
    }
</script>
