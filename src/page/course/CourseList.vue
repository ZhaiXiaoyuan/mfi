<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();"  v-if="account.type!='coach'">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title" v-if="account.type=='admin'">{{$t("title.someoneCourse",{ msg:coach.name})}}</span>
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
                        <div class="con-item">
                            <div class="con-item" v-if="account.type=='coach'">
                                <el-menu :default-active="activeType" class="cm-tab-menu" mode="horizontal" @select="setType">
                                    <el-menu-item index="school">{{$t("btn.someoneCourse",{msg:account.school})}}</el-menu-item>
                                    <el-menu-item index="self">{{$t("btn.selfCourse")}}</el-menu-item>
                                </el-menu>
                            </div>
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

        <div class="cm-btn cm-add-btn" :class="{'cm-disabled':account.instructorAccountStatus!='certified'||account.instructorQualification=='notPay'}" v-if="account.type=='coach'" @click="dialogFormVisible=true">
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
<style lang="less" rel="stylesheet/less">
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
                account:{},
                coach:{},

                levelOptions:[],
                listLevelOptions:[],
                selectedLevel:null,

                activeType:'school',//school、self
                ownCourse:true,//是否是自己开设的课程
                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],

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
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    instructorId:this.coach.id,
                    mfiLevel:this.selectedLevel,
                    searchContent:this.keyword,
                    ownCourse:this.activeType=='self'?true:false,
                }
                this.pager.loading=true;
                Vue.api.getCourseList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=data.courseList;
                        this.entryList=[];
                        list.forEach((item,i)=>{
                            this.entryList.push({...item.course,count:item.count});
                        });
                        this.pager.total=data.courseCount;
                        console.log('test:', this.entryList);
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
            setType:function (value) {
                this.activeType=value;
                this.getList(1);
            }
        },
        mounted () {
            /**/
            this.coach=JSON.parse(localStorage.getItem('curCoach'));
            this.account=Vue.getAccountInfo();
            this.coach=this.account.type=='coach'?this.account:this.coach;
            console.log('this.account:',this.account);

            /**/
            this.levelOptions=this.genLevelConfig({level:this.account.type=='coach'?this.account.mfiLevel:'all'});
            this.listLevelOptions=[{
                value:null,
                label:this.$t("btn.all"),
            }].concat(this.levelOptions);
            /**/
            this.getList();
        },
    }
</script>
