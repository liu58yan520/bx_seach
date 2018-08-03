<style scoped>
.ivu-row{
    margin-bottom: 30px;
}
.ivu-input-type{
    margin-bottom: 10px;
}


</style>
<template>
    <div class="brandlist">
        <Row>
            <Col span="4" 
                :style="{'text-align': 'center',padding:'10px 0','border-bottom':'1px solid #333'}" 
                v-for="(item,index) in car_brand" :key="item.id">
                <p>
                    <span>{{item.name}}</span>
                </p>
                <Button type="info" size="small" @click="look(item.id,item.name)">查看</Button>
                <Button type="error" size="small" @click="del(item.name,index)">删除</Button>
            </Col>

        </Row>
        <Modal
            v-model="modal"
            title="提示"
            @on-ok="ok"
        ><p>{{msg}} 即将被删除？与其关联的条件、车系也即将无效</p></Modal>
        <div class="form">
            <Form ref="formDynamic" :model="formDynamic" :label-width="80"  inline>
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        :label="'添加品牌 ' + item.index"
                        :prop="'items.' + index + '.name'"
                        >
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.name" placeholder="请输入品牌名称"></Input>
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
            del_id:'',
            modal: false,
            car_brand:'',
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
            this.del_id=index
            this.modal=true
        },
        ok () {
            this.axios.post(this.http_url+'/system/action_system?action=del&table=brand_list&id='+this.car_brand[this.del_id].id)
            .then(res=>{
                if(res.data==1)
                    this.car_brand.splice(this.del_id, 1);
            })
        },
        look(id,name){
            this.$router.push({ name:'serieslist',params: { select_id:id,select_name:name }  })
        },
        handleSubmit (name) {
                let data=this.$qs.stringify({
                    items:this.formDynamic.items
                });
                this.axios.post(this.http_url+'/system/action_system?action=put&table=brand_list', data)
                .then((res)=>{
                    if(res.data>0){
                        this.$Message.info('添加成功');
                        let Ndata=JSON.parse(JSON.stringify(this.formDynamic.items));
                        this.getSystem.then(res=>{
                            res.data.brand_list=this.car_brand=this.car_brand.concat(Ndata)
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
                this.car_brand=res.data.brand_list
            })
    }
}
</script>

