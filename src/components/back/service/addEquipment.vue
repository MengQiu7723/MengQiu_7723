<template>
    <div class="selector">
        <div class="el-input1">
            <el-input placeholder="搜索" @keyup.enter.native="onEnter" v-model="params.query"
            size="small" type="text" class=""/>
        </div>
        <div class="selector-check" @scroll="scrollEvent">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <el-checkbox @change="change(item.id,item.checked)" v-model="item.checked">
                       <div>
                           <p>{{item.id}}</p>
                           <p>{{item.groupName}}</p>
                       </div>
                    </el-checkbox>
                </li>
            </ul>
        </div>
    </div> 
</template>

<script>
export default {
    name:"elTransfer",
    props:['deviceIds'],
    data(){
        return{
            list:[],
            params:{
                size:10,
                from:0,
                query:''
            }
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
         change(id,checked){
             if (checked){
                 let list = this.list.map((item) => {
                     if (id ==item.id){
                         item.checked = true
                     }
                     return item;
                 });
                 this.list = list;
             }else {
                 let list = this.list.map((item) => {
                     if (id ==item.id){
                         item.checked = false
                     }
                     return item;
                 });
                 this.list = list;
             }
         },
    }
}
</script>