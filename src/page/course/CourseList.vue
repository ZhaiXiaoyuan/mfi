<template>
    <div class="page-content coach-list">
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
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title">{{$t("title.someoneCourse",{ msg:coach.name})}}</span>
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
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                coach:{},

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
                        value:'MBI',
                        label:'MBI',
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
                    instructorId:this.coach.id,
                    mfiLevel:this.selectedLevel,
                    searchContent:this.keyword,
                }
                this.pager.loading=true;
                Vue.api.getCourseList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.courseList);
                        console.log('this.entryList:',this.entryList);
                        this.pager.total=data.courseCount;
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
        },
        mounted () {
            /**/
            this.coach=JSON.parse(localStorage.getItem('curCoach'));
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
