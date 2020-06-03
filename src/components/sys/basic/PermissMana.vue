<template>
    <div>
        <div class="permissIp">
            <el-input  size="small" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input  size="small" placeholder="请输入角色中文名" v-model="role.nameZh">
            </el-input>
            <el-button type="primary"  @click="addRole" icon="el-icon-plus" size="small"  style="margin-left: 8px;">添加</el-button>
        </div>
        <div>
            <el-collapse  v-model="activeName" @change="change"  accordion>
                <el-collapse-item :title="r.nameZh" v-for="(r ,index) in roles"     :name="r.id" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0 ;color: crimson"  icon="el-icon-delete" type="text" @click="delRole(r)"></el-button>
                        </div>
                        <div>
                            <el-tree  show-checkbox
                                      node-key="id"
                                      ref="tree"
                                      :key="index"
                                      :default-checked-keys="checkMenusId"
                                      :data="menus"
                                      :props="defaultProps" ><!--@node-click="handleNodeClick"-->
                            </el-tree>
                        </div>
                        <div style="display: flex ;justify-content: flex-end">
                            <el-button @click="cancleUpdate">取消修改</el-button>
                            <el-button type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                        </div>
                    </el-card>
                </el-collapse-item>
                </el-collapse>

        </div>

    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data(){
            return{
                activeName:-1,
                checkMenusId:[],
                defaultProps:{
                    label:'name',
                    children:'children',
                },

                role:{
                    name:'',
                    nameZh:'',
                },
                roles:[],
                menus:[],
            }
        },
        mounted(){
            this.initPermiss()

        },
        methods:{
            delRole(role){
                this.$confirm('此操作将永久删除【'+role.nameZh+'】该职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteRequst("/system/basic/permiss/"+role.id).then(resp=> {
                            if(resp)
                                this.initPermiss()
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            addRole(){
                if(this.role.name&&this.role.nameZh)
                {

                    this.postRequst("/system/basic/permiss/",this.role).then(resp=>{
                        if(resp)
                        {
                            this.initPermiss()
                            this.role.name=''
                            this.role.nameZh=''
                        }
                    })

                }
                else {
                    this.$message.error("角色英文名或中文名不可以为空");
                }

            },
            cancleUpdate(){
                this.activeName=-1
            }
            ,
            doUpdate(rid,mids){
                let tree=this.$refs.tree[mids]
                let selectedTrees=tree.getCheckedKeys(true)
                let url='/system/basic/permiss/?rid='+rid;
                selectedTrees.forEach(item=>{
                    url+='&mids='+item
                })
                this.putRequst(url).then(resp=>{
                    if(resp)
                    {
                        /*点开时会刷新*/
                        /* this.initSelectedMenus(rid)*/
                        /*this.initMenus()*/
                        this.activeName=-1
                    }
                })


            },
            initSelectedMenus(id){
                this.getRequst("/system/basic/permiss/mid/menus/"+id).then(resp=>{
                    if(resp)
                    {
                        this.checkMenusId=resp
                    }
                })

            },
            change(id){
                // eslint-disable-next-line no-console
                if(id){
                this.initMenus()
                    this.initSelectedMenus(id)
                }

            },
            initPermiss(){
                this.getRequst("/system/basic/permiss/").then(resp=>{
                    if(resp)
                    {
                        this.roles=resp
                    }
                })
            },
            initMenus(){
                this.getRequst("/system/basic/permiss/allmenus").then(resp=>{
                    if(resp)
                    {
                        this.menus=resp
                    }
                })

            }

        }
    }
</script>

<style >
    .permissIp{
        display: flex;
    }
.permissIp .el-input{

    width: 300px;

}
</style>