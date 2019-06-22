<template>
    <div class="page-content coach-list">
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
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title" v-if="account.type=='admin'">{{$t("title.someoneCourse",{ msg:schoolName})}}</span>
                        <div class="con-item">
                            <span class="label">{{$t("label.level")}}</span>
                            <el-select v-model="selectedLevel" @change="levelChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in listLevelOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="con-item con-item-search">
                            <el-input :placeholder="$t('holder.courseSearch')" v-model="keyword" class="cm-search">
                                <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.courseNo")}}
                            </th>
                            <th>
                                {{$t("label.instructorAccount")}}
                            </th>
                            <th>
                                {{$t("label.courseName")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.site")}}
                            </th>
                            <th>
                                {{$t("label.quantity")}}
                            </th>
                            <th>
                                {{$t("label.startTime")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.courseId}}
                            </td>
                            <td>
                                {{item.instructorEmail}}
                            </td>
                            <td>
                                {{item.courseName}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                {{item.site}}
                            </td>
                            <td>
                                {{item.count}}
                            </td>
                            <td>
                                {{item.startTime}}
                            </td>
                            <td>
                                <span class="handle" @click="toDetail(index)">{{$t('btn.detail')}}</span>
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

        <div class="cm-btn cm-add-btn" v-if="account.type=='school'" :class="{'cm-disabled':account.state!='pass'||account.schoolQualification=='notPay'}"  @click="openNewModal()">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>{{$t('btn.newCourse')}}</p>
        </div>

        <el-dialog :title='$t("title.newCourse")' class="cm-dialog new-course-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.courseName")}}</span>
                    <input type="text" v-model="newForm.courseName" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="newForm.level" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in levelOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-tips" style="padding-top: 20px;" v-if="coachList.length<3">{{$t("tips.coachCountTips")}}</div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.instructor")}}</span>
                    <el-select v-model="newForm.instructorId" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in coachList"
                            :key="item.id"
                            :label="item.email"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.address")}}</span>
                    <input type="text" v-model="newForm.address" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.startTime")}}</span>
                    <el-date-picker
                        class="cm-date-selector"
                        v-model="newForm.startTime"
                        type="date"
                        :placeholder='$t("label.startTime")'>
                    </el-date-picker>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="save">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .cm-input-row .field{
        min-width: 110px;
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                school:null,
                schoolName:null,

                account:{},
                coach:{},

                activeType:'self',//school、self

                levelOptions:[],
                listLevelOptions:[],
                selectedLevel:null,

                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],

                coachList:[],

                dialogFormVisible:false,
                newForm:{
                    level:null,
                }
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
                    schoolId:this.account.type=='school'?this.account.id:this.school,
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    mfiLevel:this.selectedLevel,
                    searchContent:this.keyword,
                }
                this.pager.loading=true;
                Vue.api.getCourseListSchool(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('ddd:',data)
                        let list=data.courseList;
                        this.entryList=[];
                        list.forEach((item,i)=>{
                            this.entryList.push({...item.course,count:item.count,instructorEmail:item.instructorEmail,instructorName:item.instructorName});
                        });
                        this.pager.total=data.courseCount;
                        console.log('test:', this.entryList);
                    }
                });
            },
            getCoachList:function () {
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:1,
                    pageSize:500,
                    mfiLevel:null,
                    instructorAccountStatus:null,
                    searchContent:'',
                    school:this.account.type=='school'?this.account.serialCode:(this.school?this.school:''),
                }
                this.pager.loading=true;
                Vue.api.getCoachList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('data:',data);
                        this.coachList=[];
                        let list=data.instructorList;
                        list.forEach((item,i)=>{
                            this.coachList.push({
                                ...item.instructorPayment,
                                ...item.user
                            })
                        })
                        this.pager.total=data.count;
                        console.log('this.coachList:',this.coachList);
                    }
                });
            },
            levelChange:function (data) {
                this.getList();
            },
            toDetail:function (index) {
                let course=this.entryList[index];
                localStorage.setItem('curCourse',JSON.stringify(course));
                this.$router.push({name:'courseDetail',params:{id:course.courseId}});
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
                if(!this.newForm.instructorId){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.instructor")});
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
                    instructorId:this.newForm.instructorId,
                    mfiLevel:this.newForm.level,
                    courseName:this.newForm.courseName,
                    site:this.newForm.address,
                    startTime:Vue.formatDate(this.newForm.startTime,'yyyy-MM-dd'),
                    ownerId:this.account.id,
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
            openNewModal:function () {
                this.newForm={
                    level:null,
                };
                this.dialogFormVisible=true;
            },
        },
        mounted () {
            /**/
            this.school=this.$route.params.school;
            this.schoolName=this.$route.params.schoolName;
            /**/
            this.account=Vue.getAccountInfo();
            console.log('this.account:',this.account);

            /**/
            this.levelOptions=this.genLevelConfig({level:'all'});
            this.listLevelOptions=[{
                value:null,
                label:this.$t("btn.all"),
            }].concat(this.levelOptions);
            /**/
            this.getList();
            /**/
            if(this.account.type=='school'){
                this.getCoachList(1);
            }
        },
    }
</script>
