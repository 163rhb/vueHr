<template>
    <div>
        <el-button @click="show">xians</el-button>
    </div>
</template>

<script>
    export default {
        name: "EcMana",
        methods:{
            show(){
                this.getRequst("/system/hr/").then(resp=>{
                    if(resp){
                        alert("x")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>