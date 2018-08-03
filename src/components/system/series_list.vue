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
        <h2>{{title}}</h2>
        <Row>
            <Col span="4" 
                :style="{'text-align': 'center',padding:'10px 0','border-bottom':'1px solid #333'}" 
                v-for="(item,index) in car_series" :key="item.car_id">
                <p>
                    <span>{{item.name}}</span>
                    <span class="bianhao">{{item.car_id}}</span>
                </p>
                <Button type="info" size="small" @click="del(item.name,index)">删除</Button>
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
                        :label="'添加车系 ' + item.index"
                        :prop="'items.' + index + '.car_id'"
                        >
                    <Row>
                        <Col span="18">
                            <Input  v-model="item.car_id" placeholder="请输入车系ID" :style="{'margin-bottom':'10px',width:'180px'}"></Input>
                            <Input type="text" v-model="item.name" placeholder="请输入车系名称"></Input>
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
            title:'',
            msg:'',
            del_id:'',
            modal: false,
            car_series:[],
            index: 1,
            group_ids:'',
            formDynamic: {
                items: [
                    {
                        car_id: '',
                        name:'',
                        group_id:'',
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
            this.modal=true
            this.del_id=index
        },
        ok () {
            this.axios.post(this.http_url+'/system/action_system?action=del&table=series_list&id='+this.car_series[this.del_id].id)
            .then(res=>{
                if(res.data==1)
                    this.car_series.splice(this.del_id, 1);
            })
        },
        handleSubmit (name) {
    
            let data=this.$qs.stringify({
                items:this.formDynamic.items
            });
            this.axios.post(this.http_url+'/system/series_list_add', data)
            .then((res)=>{
                if(res.data>0){
                    this.$Message.info('添加成功');
                    let Ndata=JSON.parse(JSON.stringify(this.formDynamic.items));
                        this.car_series=this.car_series.concat(Ndata)
                }
            }).catch(()=>{
                    this.$Notice.error({
                    title: '错误提示',
                    desc: '有重复值 此次提交失败',
                    duration: 5
            }   );
            })
        },
        handleAdd () {
            this.index++;
            this.formDynamic.items.push({
                index: this.index,
                group_id:this.group_ids,
                status: 1
            });
        },
        handleRemove (index) {
            this.formDynamic.items[index].status = 0;
        }
    },
    created () {
        this.axios.post(this.http_url+'/system/select_series?group_id='+this.$route.params.select_id)
        .then(res=>{
            this.car_series=res.data
console.log(res.data)
            this.title='正在查看: '+this.$route.params.select_name+' 所属车系,共 '+res.data.length+' 个'
            this.formDynamic.items[0].group_id=this.group_ids=this.$route.params.select_id
        });

    }
}
</script>

