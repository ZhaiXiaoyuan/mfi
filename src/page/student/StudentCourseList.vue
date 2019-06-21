<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" v-if="account.type!='student'" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title">{{$t("title.someoneCourse",{ msg:account.name})}}</span>
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
                     <!--   <div class="con-item con-item-search">
                            <el-input :placeholder="$t('holder.courseSearch')" v-model="keyword" class="cm-search">
                                <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>-->
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.courseNo")}}
                            </th>
                            <th>
                                {{$t("label.instructorName")}}
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
                                {{item.course.courseNo}}
                            </td>
                            <td>
                                {{item.instructor.name}}
                            </td>
                            <td>
                                {{item.course.courseName}}
                            </td>
                            <td>
                                {{item.course.mfiLevel}}
                            </td>
                            <td>
                                {{item.course.site}}
                            </td>
                            <td>
                                {{item.course.startTime}}
                            </td>
                            <td>
                                <span class="handle" @click="toDetail(index)">{{$t('btn.detail')}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="cm-entry-block-list">
                        <li v-for="(item,index) in entryList" class="entry">
                            <div class="entry-hd">
                                <div class="info-item">{{item.course.courseNo}}</div>
                                <div class="info-item right">{{item.course.courseName}}</div>
                            </div>
                            <div class="entry-bd">
                                <div class="info-item">{{$t("label.instructorName")}}<span class="gap">:</span>{{item.instructor.name}}</div>
                                <div class="info-item">{{$t("label.level")}}<span class="gap">:</span>{{item.course.mfiLevel}}</div>
                                <div class="info-item">{{$t("label.site")}}<span class="gap">:</span>{{item.course.site}}</div>
                                <div class="info-item">{{$t("label.time")}}<span class="gap">:</span>{{item.course.startTime}}</div>
                            </div>
                            <div class="entry-ft">
                                <span class="handle cm-handle-btn cm-handle-min-btn" @click="toDetail(index)">{{$t('btn.detail')}}</span>
                            </div>
                        </li>
                    </ul>
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
                account:{},

                levelOptions:[
                   /* {
                        value:null,
                        label:this.$t("btn.all"),
                    },*/
                    {
                        value:'M0',
                        label:'M0',
                    },
                    {
                        value:'M1',
                        label:'M1',
                    },
                    {
                        value:'M2',
                        label:'M2',
                    },
                    {
                        value:'M3',
                        label:'M3',
                    },
                    {
                        value:'BMI',
                        label:'BMI',
                    },
                    {
                        value:'MI',
                        label:'MI',
                    },
                    {
                        value:'MMI',
                        label:'MMI',
                    },
                    {
                        value:'MIT',
                        label:'MIT',
                    },
                ],
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
                    userId:this.account.id,
                    mfiLevel:this.selectedLevel,
                }
                this.pager.loading=true;
                Vue.api.getStudentJoinCourse(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.courseList);
                        console.log('this.entryList:',this.entryList);
                        this.entryList.forEach((item,i)=>{
                            item.course=JSON.parse(item.course);
                            item.instructor=JSON.parse(item.instructor);
                            item.course.courseNo=item.course.school+item.course.courseId.substring(item.course.courseId.length-5)
                        })
                        this.pager.total=data.count;
                    }
                });
            },
            levelChange:function (data) {
                this.getList();
            },
            toDetail:function (index) {
                let course=this.entryList[index];
                localStorage.setItem('curCourse',JSON.stringify(course));
                this.$router.push({name:'studentCourseDetail',params:{id:course.course.courseId}});
            },
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();

            /**/
            this.listLevelOptions=[].concat(this.levelOptions,[{
                value:null,
                label:this.$t("btn.all"),
            }]);
            /**/
            this.getList();
        },
    }
</script>
