<template>
    <div class="page-content msg-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">学校管理</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block">
                    <div class="block-hd">
                        <div class="con-item con-item-search">
                            <el-input placeholder="国家/地区/编号 模糊检索" v-model="keyword" @keyup.enter.native="getList()"  class="cm-search">
                                <el-button slot="append" class="cm-btn" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                国家
                            </th>
                            <th>
                                地区
                            </th>
                            <th>
                                地址
                            </th>
                            <th>
                                编号
                            </th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.country}}
                            </td>
                            <td>
                                {{item.province+item.city}}
                            </td>
                            <td>
                                {{item.address}}
                            </td>
                            <td>
                                {{item.serialCode}}
                            </td>
                            <td>
                                <span class="handle" @click="toEdit(index)">编辑</span>
                              <!--  <span class="handle" @click="del()">删除</span>-->
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
        <div class="cm-btn cm-add-btn" @click="toAdd">
            <div class="icon-wrap">
                <i class="icon add-msg-icon"></i>
            </div>
            <p>新的学校</p>
        </div>
        <el-dialog :title="(editForm.id?'编辑':'新增')+'学校'" class="edit-dialog cm-dialog school-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">国家</span>
                    <input type="text" v-model="editForm.country" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">省份/地区</span>
                    <input type="text" v-model="editForm.province" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">城市</span>
                    <input type="text" v-model="editForm.city" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">地址</span>
                    <input type="text" v-model="editForm.address" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">编号</span>
                    <input type="text" v-model="editForm.serialCode" class="cm-input">
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

</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                dialogFormVisible:false,
                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                isSetting:false,
                editForm:{
                    country:null,
                    province:null,
                    city:null,
                    address:null,
                    serialCode:null,
                },
                options:[
                    {
                        value:'top',
                        label:'置顶',
                    },
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
                    searchContent:this.keyword,
                }
                Vue.api.getSchoolList(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.schoolList);
                        this.pager.total=data.count;
                     /*   this.entryList.forEach((item,i)=>{

                         })*/
                        console.log('this.entryList:',this.entryList);
                    }
                });
            },
            toAdd:function () {
                this.dialogFormVisible=true;
                this.editForm={};
            },
            save:function () {
                if(!this.editForm.country){
                    Vue.operationFeedback({type:'warn',text:'请输入国家'});
                    return;
                }
                if(!this.editForm.province){
                    Vue.operationFeedback({type:'warn',text:'请输入省份/地区'});
                    return;
                }
                if(!this.editForm.city){
                    Vue.operationFeedback({type:'warn',text:'请输入城市'});
                    return;
                }
                if(!this.editForm.address){
                    Vue.operationFeedback({type:'warn',text:'请输入地址'});
                    return;
                }
                if(!this.editForm.serialCode){
                    Vue.operationFeedback({type:'warn',text:'请输入编号'});
                    return;
                }
                let params={
                    ...this.editForm
                }
                let fb=Vue.operationFeedback({text:'保存中...'});
                if(!params.id){//新增
                    Vue.api.addSchool(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.getList();
                            this.dialogFormVisible=false;
                            fb.setOptions({type:'complete', text:'保存成功'});
                        }else{
                            fb.setOptions({type:'warn', text:'保存失败'});
                        }
                    });
                }else{//编辑
                    Vue.api.updateSchool(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.getList(this.pager.pageIndex);//刷新当前页
                            this.dialogFormVisible=false;
                            fb.setOptions({type:'complete', text:'保存成功'});
                        }else{
                            fb.setOptions({type:'warn', text:'保存失败'});
                        }
                    });
                }
            },
            toEdit:function (index) {
                let item=this.entryList[index];
                Object.assign(this.editForm,item);
                this.dialogFormVisible=true;
            }
        },
        mounted () {
            /**/
            this.getList();
        },
    }
</script>
