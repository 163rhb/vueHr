<template>
    <div v-loading="loading"
         element-loading-text="正在登录中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="white">
        <el-form :rules="rules"
                 :model="LoginForm"
                 ref="LoginForm"
                 class="LoginContainer">
            <!--通过ref属性把表单加在进refs-->
            <el-form-item prop="username"><!--用prop属性来绑定校验字段-->
                <el-input size="normal" type="text" v-model="LoginForm.username" auto-complete="off" placeholder="请输入用户名">

                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input size="normal"  type="password" v-model="LoginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin">
<!--是否自动补全-->
                </el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="LoginRem">是否记住密码</el-checkbox>
            <el-button size="normal"  type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
/*import {postKeyValueRequst} from "@/utils/api";*/

export default {
        name: "Login",
        data(){
            return{
                loading:false,
                checked:true,
                LoginForm: {
                    username: 'admin',
                    password: '123',
                },
                /*自定义表单验证规则*/
                rules:{
                    username:[{required:true,message:"请输入用户名",trigger:'blur'}],
                    password:[{required: true,message: "请输入密码",trigger:'blur'}]

                }
            }
        },
        methods:{
            submitLogin(){
                this.$refs.LoginForm.validate((valid) => {
                    /*会自动根据rules进行校验*/
                    if (valid) {
                        this.loading=true
                        this.postKeyValueRequst('/doLogin',this.LoginForm).then(resp=>{
                            this.loading=false
                           if(resp)
                           {
                               window.sessionStorage.setItem("user",JSON.stringify(resp.obj))
                              /* alert(JSON.stringify(resp))*/
                               let path=this.$route.query.redirect;
                              /* this.$router.replace((path=='/'||path==undefined)?'/home':path)*///获取当前路由对象，并替换它，还有一种为push(可返回登录页)
                               this.$router.replace((path==null)?'/home':path)
                           }
                       })
                    } else {
                        this.$message.error('密码或用户未输入');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
.LoginContainer{
    border-radius: 15px;/*边框 */
    background-clip: padding-box;
    margin: 180px  auto;/*上右下左*/
    width: 350px;
    padding: 35px 35px 15px 35px;/*//内边距,上，右，下，左*/
    background: white;
    border: 1px solid silver;

}
    .LoginRem{
        margin-bottom: 20px;
    }
</style>