<template>
    <div class="page-content">
        <div class="cm-panel">
            <div class="panel-hd">
             <!--   <div class="cm-btn cm-return-btn" @click="$router.back();"  v-if="account.type=='admin'">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>-->
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <span class="title">{{$t("title.teachingMaterial")}}</span>
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
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.title")}}
                            </th>
                            <th>
                                {{$t("label.time")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.title}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}
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

        <div class="cm-btn cm-add-btn" v-if="account.type=='admin'" @click="dialogFormVisible=true">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>{{$t('btn.newMaterial')}}</p>
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

                levelOptions:[],
                listLevelOptions:[],
                selectedLevel:null,

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
                this.getTeachingMaterialList(pageIndex);
            },
            getTeachingMaterialList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    mfiLevel:this.selectedLevel,
                }
                this.pager.loading=true;
                Vue.api.getTeachingMaterialList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=data.teachingMaterialList;
                        try {
                            this.entryList=JSON.parse(data.teachingMaterialList);
                        }catch (e) {
                            this.entryList=[];
                        }
                        this.pager.total=data.count;
                        console.log('entryList:', this.entryList);
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
            this.account=Vue.getAccountInfo();

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
