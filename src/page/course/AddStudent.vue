<template>
    <div class="page-content page-content-min">
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
                <div class="cm-detail-block detail-block">
                    <div class="block-bd">
                        <p class="title cm-title" style="padding-left: 5px;">{{$t("title.addStudent")}}</p>
                        <el-row>
                            <el-col :span="12" class="info-item">
                                <span class="label">{{$t('label.courseNo')}}：</span>
                                <span class="value">{{course.courseId}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="padding: 50px 0px;text-align: center;">
                            <div class="cm-btn add-btn" @click="emailDialogFlag=true">{{$t('btn.email')}}</div>
                            <div class="cm-btn add-btn" @click="selectStudentDialogFlag=true">{{$t('btn.fromMyStudent')}}</div>
                            <div class="cm-btn add-btn" v-if="course.mfiLevel!='M0'&&course.mfiLevel!='M1'" @click="newStudentDialogFlag=true">{{$t('btn.newStudent')}}</div>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :title='$t("title.studentList")' class="edit-dialog cm-dialog select-student-dialog" :visible.sync="selectStudentDialogFlag" v-if="selectStudentDialogFlag" width="55% !important">
            <div class="view-win">
                <div class="student-list">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {{$t('label.account')}}
                            </th>
                            <th>
                                {{$t('label.name')}}
                            </th>
                            <th>
                                {{$t('label.level')}}
                            </th>
                            <th>
                                {{$t('label.create')}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in studentList">
                            <td>
                                <el-checkbox class="cm-checkbox" :label="item.email" @change="studentCheck(item)"></el-checkbox>
                                {{item.email}}
                            </td>
                            <td>{{item.name}} {{item.familyName?item.familyName:''}}</td>
                            <td>{{item.mfiLevel}}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="handle-list" style="padding: 0px 15%">
                <div class="cm-btn cm-handle-btn handle-btn" @click="selectStudentDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="selectToAdd()">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog class="edit-dialog cm-dialog email-dialog" :visible.sync="emailDialogFlag" v-if="emailDialogFlag" width="40%">
            <div class="form">
                <textarea name="emailListStr" v-model="emailListStr" cols="30" rows="10" :placeholder="$t('holder.emailStr')"></textarea>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="emailDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="emailToAdd()">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("title.newStudent")' class="edit-dialog cm-dialog new-student-dialog" :visible.sync="newStudentDialogFlag" v-if="newStudentDialogFlag">
            <div class="form">
                <div class="cm-input-row">
                    <div class="row-wrap">
                        <span class="field">{{$t("label.email")}}</span>
                        <input type="text" v-model="newForm.email" class="cm-input">
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="newStudentDialogFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveNew">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>


    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .add-btn{
        display: inline-block;
        width: 200px;
        height: 60px;
        line-height: 60px;
        border-radius: 5px;
        background: #5560aa;
        font-size: 20px;
        color: #fff;
        &+.add-btn{
            margin-left: 100px;
        }
    }
    .select-student-dialog{
        .view-win{
            height: 350px;
            overflow: auto;
            padding-left: 50px;
        }
        .student-list{
            width: 100%;
            text-align: center;
            color: #5360aa;
            border: 1px solid #5360aa;
            border-radius: 5px;
            table{
                width: 100%;
                thead{
                    border-bottom: 1px solid #5360aa;
                }
                th{
                    padding: 10px 5px;
                    font-size: 18px;
                    &+th{
                        border-left: 1px solid #5360aa;
                    }
                }
                td{
                    position: relative;
                    padding: 15px 5px;
                    &+td{
                        border-left: 1px solid #5360aa;
                    }
                }
                .student-selector{
                    position: absolute;
                    left: -35px;
                    .el-radio__inner{
                       width: 20px;
                       height: 20px;
                    }
                    .el-radio__label{
                        display: none;
                    }
                    .is-checked{
                        .el-radio__inner{
                            background: #5360aa;
                            border: 1px solid #5360aa;
                        }
                    }
                }
                .cm-checkbox{
                    position: absolute;
                    left: -35px;
                    .el-checkbox__inner{
                        width: 20px;
                        height: 20px;
                        border: 1px solid #5360aa;
                        &:after{
                            top:3px;
                            left:7px;
                        }
                    }
                    .el-checkbox__label{
                        display: none;
                    }
                    .is-checked{
                        .el-checkbox__inner{
                            background: #5360aa;
                            border: 1px solid #5360aa;
                        }
                    }
                }
            }
        }
    }
    .email-dialog{
        textarea{
            width: 100%;
            height: 200px;
            border:1px solid #ddd;
            resize: none;
            font-size: 20px;
            color: #666;
            padding: 20px;
        }
    }
    .new-student-dialog{
        .el-dialog{
            width: 700px !important;
        }
        .field{
            width: 170px;
        }
        .cm-input-row{
            text-align: center;
            .cm-input{
                height: 50px;
            }
            &.cm-input-row{
                margin-top: 15px;
            }
            .row-wrap{
                position: relative;
                display: block;
                width: 300px;
                .field{
                    position: absolute;
                    width: 88px;
                    left: -42%;
                    line-height: 50px;
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
                id:null,
                course:{},
                account:{},
                coach:{},

                selectStudentDialogFlag:false,
                studentList:[],

                emailDialogFlag:false,
                emailListStr:null,

                newStudentDialogFlag:false,
                newForm:{

                },

                selectedStudent:null,
                checkList:[],
            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            getCourse:function () {
                let params={
                    ...Vue.sessionInfo(),
                    courseId:this.id,
                }
                Vue.api.getCourseDetail(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.course={...data.course,instructorEmail:data.instructorEmail,instructorName:data.instructorName}
                     /*   console.log('this.course:',this.course);*/
                    }
                });
            },
            getStudentList:function () {
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.coach.id,
                    mfiLevel:'',
                    pageIndex:1,
                    pageSize:1000,
                    canJoinCourseId:this.id,
                    searchContent:null,
                }
                Vue.api.getInstrutorStudentList(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.studentList=JSON.parse(data.studentList);
                        console.log('this.studentList:',this.studentList);
                    }
                });
            },
            selectToAdd:function () {
                let emailList=[];
                this.studentList.forEach((item,i)=>{
                    emailList.push({email:item.email});
                })
                if(emailList.length==0){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.selectedStudent")});
                    return;
                }
                this.addToCourse(emailList,()=>{
                    this.getStudentList();
                });
            },
            emailToAdd:function () {
                if(!this.emailListStr){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.emailStr")});
                    return;
                }
                let temArr=this.emailListStr.split(',');
                let emailList=[];
                temArr.forEach((item,i)=>{
                    emailList.push({email:item});
                });
                this.addToCourse(emailList,()=>{
                    this.emailListStr=null;
                    this.emailDialogFlag=false;
                });
            },
            addToCourse:function (emailList,callback) {
                console.log('test:',this.course);
                let params={
                    ...Vue.sessionInfo(),
                    courseId:this.course.courseId,
                    emailArray:JSON.stringify(emailList),
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                Vue.api.addStudentToCourse(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        callback&&callback();
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            studentCheck:function (item) {
              item.checked=!item.checked;
                console.log('student:',this.studentList);
            },
            saveNew:function () {
                if(!this.newForm.email){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.email")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    ...this.newForm
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.addStudent(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getStudentList();
                        this.newStudentDialogFlag=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
        },
        mounted () {
            /**/
            this.id=this.$route.params.id;
            /*   this.course=JSON.parse(localStorage.getItem('curCourse'));*/
            this.account=Vue.getAccountInfo();
            this.coach=this.account.type=='coach'?this.account:this.coach;
            /**/
            this.getCourse();
            this.getStudentList();
        },
    }
</script>
