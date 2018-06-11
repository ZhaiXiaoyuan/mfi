<template>
    <div class="wrapper">
        <v-sidebar></v-sidebar>
        <language></language>
        <div class="content" :class="{'content-collapse':collapse}">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>
<style>
    .content{
        top:0px;
        left: 300px;
        background: none;
        padding: 30px;
    }
</style>
<script>
    import Vue from 'vue'
    import vSidebar from './Sidebar.vue';
    import bus from '../common/bus';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            vSidebar
        },
        watch:{

        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
        },
        beforeRouteEnter (to, from, next) {
            Vue.getAccountInfo();
            next(vm =>{

            });
        },
    }
</script>
