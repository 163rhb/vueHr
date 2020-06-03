<template>
    <div >
        <el-input
                size="small"
                style="width: 300px;margin-right: 8px"
                placeholder="添加职称"
                v-model="jL.name"
                @keydown.enter.native="addJobLevel"
                prefix-icon='el-icon-plus'>
        </el-input>

        <el-select v-model="jL.titleLevel" placeholder="职称等级" size="small">
            <el-option
                    v-for="item in jR"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" size="small"  @click="addJobLevel" style="margin-left: 8px;">添加</el-button>

        <el-table class="table"
                  :data="jobLevels"
                  stripe
                  v-loading="loading"
                  element-loading-text="刷新中..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="white"
                  style="width: 70%" @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="编号"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="职位名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="titleLevel"
                    label="职位等级"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建时间" width="150px">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                    <el-tag type="danger" v-else>未启用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--.$index获取到点击的那行，.row获得那行的对象（json格式）-->
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="delJobLevels"    type="danger" style="margin-top: 8px" :disabled="multipleSelection.length===0">批量删除</el-button>

        <el-dialog
                title="修改职称"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag>职称名</el-tag>
                        </td>
                        <td>
                            <el-input size="small" v-model="upDateJL.name"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>职称级别</el-tag>
                        </td>
                        <td>
                            <el-select v-model="upDateJL.titleLevel" placeholder="职称等级" size="small"
                                       style="margin-left: 5px;margin-right: 5px">
                                <el-option
                                        v-for="item in jR"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>是否启用</el-tag>
                        </td>
                        <td>
                            <el-switch
                                    v-model="upDateJL.enabled"
                                    active-text="启用"
                                    inactive-text="禁用">
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>


</template>

<script>
    export default {
        name: "JobLevelMana",
        data() {
            return {
                loading:false,
                jL: {
                    name: '',
                    titleLevel:'',

                },
                dialogVisible:false,

                upDateJL:
                    {
                        name:'',
                        titleLevel:'',
                        enabled:false,
                    },

                jR: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',],
                jobLevels: [],
                multipleSelection: [],


            }
        },
        mounted() {

            this.initJobLevel()

        },
        methods: {
            initJobLevel() {
                this.loading=true

                this.getRequst("/system/basic/jobLevel/").then(resp => {
                    this.loading=false
                    if (resp) {
                        this.jobLevels = resp;
                        this.jL={
                            name:'',
                            titleLevel: '',
                        }
                    }
                })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val

            },
            addJobLevel() {
                if (this.jL.name&&this.jL.titleLevel) {
                    /*地址与请求体，用逗号隔开*/
                    this.postRequst("/system/basic/jobLevel/",this.jL).then(resp => {
                            if (resp)
                            {
                                this.initJobLevel()
                                this.jL.name=''
                                this.jL.titleLevel=''
                            }


                        }
                    )
                } else {
                    this.$message.error("职位名称或职位等级都不可以为空")
                }
            },
            handleDelete(index,data){
                this.$confirm('此操作将永久删除【'+data.name+'】该职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteRequst("/system/basic/jobLevel/?id="+data.id).then(resp=> {
                            if(resp)
                            {
                                this.initJobLevel();
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
            handleEdit(index,data){
                Object.assign(this.upDateJL,data)
               /* this.upDateJL=data*/
                /*this.updatePos=data*/
                this.dialogVisible=true
            },
            doUpdate(){
                this.putRequst("/system/basic/jobLevel/",this.upDateJL).then(resp=>{
                    if(resp){
                        this.initJobLevel()
                        this.dialogVisible=false


                    }
                })


            },
            delJobLevels(){

                this.$confirm('此操作将永久删除【'+this.multipleSelection.length+'】个职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let ids='?'
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&'
                    })
                    // eslint-disable-next-line no-console
                    console.log(ids)
                    this.deleteRequst("/system/basic/jobLevel/pi"+ids).then(resp=> {
                            if(resp)
                                this.initJobLevel();

                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        }
    }



</script>

<style scoped>

</style>
