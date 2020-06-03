<template>
    <div>
        <el-input
                size="small"
                placeholder="添加职位..."
                v-model="pos.name"
                class="addPos"
                @keydown.enter.native="addPosition"
                prefix-icon='el-icon-plus'>
        </el-input>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">添加</el-button>

        <!--prop绑定数组里的对象的某个属性名，显示一列-->
        <el-table class="table"
                :data="Positions"
                stripe
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
                    prop="createDate"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="enabled"
                    label="是否启用">
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

        <el-button @click="deleteMany"    type="danger" style="margin-top: 8px" :disabled="multipleSelection.length===0">批量删除</el-button>

        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input v-model="updatePos.name" size="small"> </el-input>
            </div>
            <div>
                <el-tag>是否启用</el-tag>
                <el-switch
                        v-model="updatePos.enabled"
                        active-text="启用"
                        inactive-text="禁用">
                </el-switch>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>



    </div>
</template>

<script>
    export default {
        name: "PosMana",
        data(){
            return{
                pos:{
                  name:'',
                },
                Positions:[],
                dialogVisible:false,
                updatePos:{
                    name:'',/*要不要都可以*/
                    enabled:false,
                },
                multipleSelection: [],


            }

        },
        mounted(){
            this.initPosition()
        },
        methods:{
            addPosition(){
                if(this.pos.name)
                {
                    this.postRequst("/system/basic/pos/",this.pos).then(resp=>{
                        if(resp)
                        {
                            this.initPosition()//刷新表格
                            this.pos.name=''

                        }

                    })

                }
                else
                {
                    this.$message.error("职位名称不可以为空")
                }
            },

            initPosition(){
                this.getRequst("/system/basic/pos/").then(resp=>{
                    this.Positions=resp;
                }
            )

            },
            handleEdit(index,data){
/*拷贝*/
                Object.assign(this.updatePos,data)
                /*this.updatePos=data*/
                this.dialogVisible=true


            },
            handleDelete(index,data){
                this.$confirm('此操作将永久删除【'+data.name+'】该职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteRequst("/system/baisc/pos/?id="+data.id).then(resp=> {
                        if(resp)
                            this.initPosition();

                    }
                )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            doUpdate(){
                this.putRequst("/system/basic/pos/",this.updatePos).then(resp=>{
                    if(resp)
                    {
                        this.initPosition()
                        this.updatePos.name=''
                        this.dialogVisible=false
                    }
                })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteMany(){
                this.$confirm('此操作将永久删除【'+this.multipleSelection.length+'】个职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let ids='?'
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&'
                    })
                    this.deleteRequst("/system/basic/pos/pi"+ids).then(resp=> {
                            if(resp)
                                this.initPosition();

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
.addPos{
    width: 300px;
    margin-right: 20px;
    margin-top: 20px;
}
    .table{
        margin-top: 10px;
    }
</style>