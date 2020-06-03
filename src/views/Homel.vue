<template>
<div>
    <el-container>
        <el-header class="homeHeader">
            <div class="title">
                人事
            </div>
            <div>
                <el-button icon="el-icon-bell" type="text"
                           style="margin-right: 8px;color: #000000;"
                           size="normal" @click="goChat"></el-button>
            <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.name}}
      <!--双引号里一般解释为字符串，但用v-bind绑定后就可以当成变量-->
      <i><img :src="user.userface"></i>
  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
                    <el-dropdown-item command="设置">设置</el-dropdown-item>
                    <el-dropdown-item  command="logout" divided>注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </div>
        </el-header>
        <el-container>
        <el-aside style="width: 200px">
        <!--seclct事件含两个参数，第一个为自己，一个为数组（父index，子index），不用加括号传参数，点击选项时自动传参数-->
        <el-menu router>
            <el-submenu :index="id++ +''" v-for="(item,id) in showItems"  :key="id">
                <template slot="title">
                    <i :class="item.iconCls" style="color: dodgerblue;margin-right: 7px"></i>
                    <span>{{item.name}}</span>
                </template>
                    <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                        {{child.name}}
                    </el-menu-item>
            </el-submenu>
            </el-menu>
        </el-aside>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }" v-if="this.$router.currentRoute.path!='/home'">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="homeItem" v-if="this.$router.currentRoute.path==='/home'">
                    人事管理系统！
                </div>
                <router-view class="home"/>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    name: "Home",
    data(){
    return{
        user: JSON.parse(window.sessionStorage.getItem("user"))
    }
    },
    methods:{
        goChat(){
            this.$router.push("/chat");
        },
        /*menuClick(index){
            this.$router.push(index)
        },*//*有router属性不用点击事件*/
        commandHandler(cmd){
            if(cmd=='logout')
            {
                this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getRequst('/logout')
                   /* window.sessionStorage.removeItem("user")*/
                    this.$store.commit('initRoutes',[])
                    this.$router.replace("/")
                    /*this.$message({
                        type: 'success',
                        message: '成功退出!'
                    });*/
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        }
    },
    computed:{
        routes(){
            return this.$store.state.routes;
        },
        showItems(){
            return this.routes.filter((routes)=>{
                return !routes.hidden
            })
        }

    }
}
</script>

<style>
.homeHeader{
    background: dodgerblue;
    display: flex;/*弹性布局*/
    align-items: center;
    font-size: 30px;
    justify-content: space-between;
}
    .title{
        font-family: 华文行楷;
        color: white;
    }
.el-dropdown-link {
    display: flex;
    align-items: center;
    color: #F2FCFF;

}
.el-dropdown-link img{
    width: 48px;
    height: 48px;
    /*设置圆弧*/
    border-radius: 24px;
    margin-left: 10px;

}
.el-icon-arrow-down {
    font-size: 12px;
}
    .userInfo{
        cursor: pointer;
    }
    .homeItem{
        font-size: 30px;
        text-align: center;
        color: dodgerblue;
        font-family: 华文行楷;
        padding-top: 250px;
    }
    .home{
        margin-top: 30px;

    }
</style>