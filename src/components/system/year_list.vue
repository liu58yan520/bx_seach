<style scoped>
.ivu-row{
    margin-bottom: 30px;
}
.ivu-input-type{
    margin-bottom: 10px;
}
.bianhao{
    color: #f60;
}

</style>
<template>
    <div class="brandlist">
        <Row>
            <Col span="4" 
                :style="{'text-align': 'center',padding:'10px 0','border-bottom':'1px solid #333'}" 
                v-for="(item,index) in data_list" :key="item.id">
                <p>
                    <span>{{item.name}}</span>
                </p>
                <Button type="error" size="small" @click="del(item.name,index)">删除</Button>
            </Col>

        </Row>
        <Modal
            v-model="modal"
            title="提示"
            @on-ok="ok"
        ><p>{{msg}} 即将被删除？</p></Modal>
        <div class="form">
            <Form ref="formDynamic" :model="formDynamic" :label-width="80"  inline>
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        :label="'添加项目 ' + item.index"
                        >
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.name" placeholder="请输入栏目内容"></Input>
                        </Col>
                        <Col span="4" offset="5">
                            <Button type="ghost" @click="handleRemove(index)">Delete</Button>
                        </Col>
                    </Row>
                </FormItem>
                <br>
                <FormItem>
                    <Row>
                        <Col span="30">
                            <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
                </FormItem>
            </Form>
        </div>
   
    </div>
</template>
<script>
export default {
    data () {
        return {
            msg:'',
            id:'',
            modal: false,
            data_list:[],
            index: 1,
            formDynamic: {
                items: [
                    {
                        name:'',
                        index: 1,
                        status: 1
                    }
                ]
            }
        }
    },
    methods:{
        del(name,index){
            this.msg=name 
            this.id=index
            this.modal=true
        },
        ok () {
            this.axios.post(this.http_url+'/system/action_system?action=del&table=year_list&id='+this.data_list[this.id].id)
                .then(res=>{
                    console.log(res)
                    if(res.data==1)
                        this.data_list.splice(this.id, 1);
                    else 
                        this.$Notice.error({
                            title: '错误提示',
                            desc: '请刷新后删除',
                            duration: 5
                }       );
                })
        },
        look(id,name){
            this.$router.push({ name:'serieslist',params: { select_id:id,select_name:name }  })
        },
        handleSubmit (name) {
                let data=this.$qs.stringify({
                    items:this.formDynamic.items
                });
                this.axios.post(this.http_url+'/system/action_system?action=put&table=year_list', data)
                .then((res)=>{
                    if(res.data>0){
                        this.$Message.info('添加成功');
                        let Ndata=JSON.parse(JSON.stringify(this.formDynamic.items));
                        //  this.data_list=this.data_list.concat(Ndata)
                        this.getSystem.then(res=>{
                            this.data_list=res.data.year_list=this.data_list.concat(Ndata)
                        })
                    }
                }).catch(()=>{
                     this.$Notice.error({
                        title: '错误提示',
                        desc: '此次提交失败',
                        duration: 5
                }   );
                })
            },
        handleAdd () {
            this.index++;
            this.formDynamic.items.push({
                index: this.index,
                status: 1
            });
        },
        handleRemove (index) {
             this.formDynamic.items[index].status = 0;
        }
    },
    created () {
         this.getSystem.then(res=>{
                this.data_list=res.data.year_list
            })
    }
}
</script>

