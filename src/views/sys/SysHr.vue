<template>
    <div v-loading="loading"
         element-loading-text="正在刷新中..."
         element-loading-spinner="el-icon-loading"
         element-loading-background="white">
        <div style="display: flex; justify-content:center">
            <el-input v-model="keyWords"
                      placeholder="通过用户名搜索用户..."
                      style="width: 400px;"
                      prefix-icon="el-icon-search"
                      @keydown.enter.native="doSearch"></el-input>
            <el-button @click="doSearch" icon="el-icon-search" type="primary" style="margin-left: 10px">搜索</el-button>
        </div>
        <div class="container">
            <el-card class="el-card" v-for="(hr,index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button  @click="delHr(hr)" style="float: right; padding: 3px 0 ;color: crimson" type="text" icon="el-icon-delete"></el-button>
                </div>
                <div>
                    <div class="img-container">
                        <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
                    </div>
                    <div class="userinfo-container">
                        <div>用户名：{{hr.name}}</div>
                        <div>手机号码：{{hr.phone}}</div>
                        <div>电话号码：{{hr.telephone}}</div>
                        <div>地址：{{hr.address}}</div>
                        <div>用户状态：
                            <el-switch
                                    v-model="hr.enabled"
                                    active-text="启用"
                                    @change="enabledChange(hr)"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    inactive-text="禁用">
                            </el-switch>
                        </div>
                        <div>用户角色：
                            <el-tag type="success" style="margin-right: 4px"
                                    v-for="(role,indexj) in hr.roles"
                                    :key="indexj">{{role.nameZh}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="角色列表"
                                    @show="showPop(hr)"
                                    @hide="hidePop(hr)"
                                    width="200"
                                    trigger="click">
                            <el-select  multiple v-model="selectedRoles" placeholder="请选择">
                                <el-option
                                        v-for="(r,indexr) in allRoles"
                                        :key="indexr"
                                        :label="r.nameZh"
                                        :value="r.id">
                                </el-option>
                            </el-select>
                                <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
                            </el-popover>
                        </div>
                </div>
                </div>

            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysHr",
        data(){
          return{
              loading:false,
              keyWords:'',
              hrs:[],
              allRoles:[],
              selectedRoles:[],

          }
        },
        mounted(){
            this.initHrs()

        },
        methods:{
            delHr(hr){
                this.$confirm( '此操作将永久删除【'+hr.name+'】该职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteRequst("/system/hr/"+hr.id).then(resp=> {
                            if(resp)
                            {
                                this.initHrs();
                            }
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },

            showPop(hr){
                this.initAllRoles()
                let roles=hr.roles
                this.selectedRoles=[];
                roles.forEach(r=>{
                    this.selectedRoles.push(r.id)
                })

            },
            hidePop(hr){
                let roles=[]
                Object.assign(roles,hr.roles)
                let flag=false
                if(roles.length!=this.selectedRoles.length){
                    flag=true
                }
                else{
                    for(let i=0;i<roles.length;i++)
                    {
                        let role=roles[i]
                        for(let j=0;i<this.selectedRoles.length;j++)
                        {
                            if(role.id==this.selectedRoles[i])
                            {
                                roles.splice(i,1)
                                i--
                                break
                            }
                        }
                    }
                        if(roles.length!=0)
                        {
                            flag=true
                        }
                    }
                if(flag){
                    this.updateHrWithRoles(hr)
                }


            },
            updateHrWithRoles(hr){
              let url='/system/hr/?hrid='+hr.id
                this.selectedRoles.forEach(rid=>{
                    url+="&rids="+rid
                })

                this.putRequst(url).then(resp=>{
                    if(resp){
                        this.initHrs()
                    }
                })
            },
            doSearch(){
                this.initHrs()

            },
            enabledChange(hr){
                delete hr.roles
                this.postRequst("/system/hr/",hr).then(resp=>{
                    if(resp){
                        this.initHrs()
                    }
                })
            },
            initAllRoles(){
              this.getRequst("/system/hr/roles").then(resp=>{
                  if(resp)
                  {
                      this.allRoles=resp
                  }
              })
            },

        initHrs(){
                this.loading=true
            this.getRequst("/system/hr/?keyWords="+this.keyWords).then(resp=>{
                this.loading=false
                if(resp){

                    this.hrs=resp
                }

                }
            )
        },
        }
    }

</script>

<style>
    .userinfo-container div {
        font-size: 12px;
        color: #409eff;
    }

    .userinfo-container {
        margin-top: 20px;
    }
    .el-card{
        width: 350px;
        margin-bottom: 20px;

    }
    .container{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

    }
    .img-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .userface-img {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }

</style>