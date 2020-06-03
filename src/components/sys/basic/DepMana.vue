<template>
    <div style="width: 500px">
        <el-input
                placeholder="请输入部门名称进行搜索..."
                prefix-icon="el-icon-search"
                v-model="filterText"
                style="margin-bottom: 20px">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="deps"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree">
            <span class="custom-tree-node"  style="display: flex;  justify-content: space-between;width: 100%"    slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="primary"
                  size="mini"
                  class="button"
                  @click="() => showDialog(data)">
            添加部门
          </el-button>
          <el-button
                  type="danger"
                  size="mini"
                  class="button"
                  @click="() => removeDep(node, data)">
            删除部门
          </el-button>
        </span>
      </span>
        </el-tree>
        <el-dialog title="添加部门"
                   :visible.sync="dialogVisible"
                   :before-close="clear"
                    class="dia">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag>上级部门</el-tag>
                        </td>
                        <td>{{pName}}</td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>部门名称</el-tag>
                        </td>
                        <td>
                            <el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addDep">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data() {
            return {
                sameName:0,
                    dep: {
                    name: '',
                    parentId: '',

                },
                pName: '',
                dialogVisible: false,
                filterText: '',
                deps: [],
                defaultProps: {
                    label: 'name',
                    children: 'children',
                },
                formLabelWidth: "100px"


            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.initDepartment()
        },
        methods: {
            clear(){
                this.dep.name=''
                this.dep.parentId=-1
                this.dialogVisible=false

            },
            /*p.parent是前端自定义属性*/
            addDep2Deps(deps, dep) {
                for (let i = 0; i < deps.length; i++) {
                    let d = deps[i];
                    if (d.id == dep.parentId) {
                        d.children = d.children.concat(dep);
                        if (d.children.length > 0) {
                            d.parent = true;
                        }
                        return;
                    } else {
                        this.addDep2Deps(d.children, dep);
                    }
                }
            },
            cancel() {
                this.dialogVisible = false
                this.dep.name = ''
                this.dep.parentId = -1

            },
            showDialog(data) {
                this.pName = data.name
                this.dep.parentId = data.id
                this.dialogVisible = true

            },
            digui(deps, names) {
                for (let i = 0; i < deps.length; i++) {
                    let d=deps[i]
                    if (d.name === names) {
                        this.sameName=1
                        this.$message.error("名字已有重复！请换另一个名字")
                        return
                    } else {
                         this.digui(d.children, names)
                    }

                }

            },
            addDep() {
                this.digui(this.deps,this.dep.name)
                if(this.sameName==0) {
                    this.postRequst("/system/basic/department/", this.dep).then(resp => {
                        if (resp) {
                            this.addDep2Deps(this.deps, resp.obj);
                            this.dialogVisible = false
                            this.dep.name = ''
                            this.dep.parentId = -1

                        }
                    })
                }
                else {
                    this.sameName=0
                }
            },
            removeDepFromDeps(p,deps, id) {
                for(let i=0;i<deps.length;i++){
                    let d = deps[i];
                    if (d.id == id) {
                        deps.splice(i, 1);
                        if (deps.length == 0) {
                            p.parent = false;
                        }
                        return;
                    }else{
                        this.removeDepFromDeps(d,d.children, id);
                    }
                }
            },





            removeDep(node, data) {
                if (data.parent) {
                    this.$message.error("父部门删除失败");
                }
                else {
                    this.$confirm('此操作将永久删除【' + data.name + '】该部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.deleteRequst("/system/basic/department/" + data.id).then(resp => {
                                if (resp)
                                    this.removeDepFromDeps(null,this.deps,data.id)
                            }
                        )
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }



            },
            initDepartment() {
                this.getRequst("/system/basic/department/").then(resp => {
                    if (resp) {
                        this.deps = resp
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
        },
    }


</script>

<style scoped>
    .button{
        margin: 5px;
        padding: 4px;
    }








</style>