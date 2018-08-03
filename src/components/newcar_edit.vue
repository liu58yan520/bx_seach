<style scoped>
    form{
        width:60%;
        margin-top: 30px;
    }
    .ivu-radio-group-item{
        font-size: 16px;
        margin-right: 26px;
    }
</style>
<template>
    <Form :model="formItem" :label-width="80" ref="formValidate" >

        <FormItem label="品牌">
            <Select v-model="formItem.brand">
                <Option :value="item.name" v-for="(item,index) in car_brand" :key="index" >
                    {{item.name}}
                </Option>
            </Select>
        </FormItem>
        <form-item label="渠道" prop="channel">
            <radio-group v-model="formItem.channel">
                <radio :label="item.id" v-for="(item,index) in car_channel" :key="index">{{item.name}}</radio>
            </radio-group>
        </form-item>
        <FormItem label="购置价" prop="price">
            <radio-group v-model="formItem.price">
                <radio :label="item.id" v-for="(item,index) in car_price" :key='index'>{{item.name}}</radio>
            </radio-group>
        </FormItem>
        <form-item label="送修情况" prop="repair">
            <radio-group v-model="formItem.repair">
                <radio label="1" >约定送修比以内</radio>
                <radio label="0">约定送修比以外</radio>
            </radio-group>
        </form-item>
        <form-item label="等级" prop="level">
            <radio-group v-model="formItem.level">
                <radio :label="item.name" v-for="(item,index) in car_level" :key="index"  >{{item.name}}</radio>
            </radio-group>
        </form-item>
        <FormItem label="费率">
            <Input v-model="formItem.rate" placeholder="费率"><span slot="append">%</span></Input>
        </FormItem>
        <FormItem>
            <Button type="primary"  @click="handleSubmit('formItem')">Submit</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                car_brand:[],
                car_price:null,
                car_level:null,
                car_channel:null,
                formItem: {
                    price: '',
                    channel:'',
                    brand:'',
                    repair:'',
                    level:'',
                    rate:'',
                    id:null
                }
            }
        },
        methods: {
            handleSubmit(name) { //提交
                //  console.log(this.formItem.price)
                let str= this.formItem.id==null?'data_add':'data_update'
                let data=this.$qs.stringify({
                    items:this.formItem
                });
                this.axios.post(this.http_url+'/Car/'+str+'?source=newcar', data)
                .then((res)=>{
                    if(res.data>0){
                        this.$Message.info('提交成功');
                        this.$refs['formValidate'].resetFields()
                    }
                }).catch(()=>{
                     this.$refs['formValidate'].resetFields()
                     this.$Notice.error({
                        title: '错误提示',
                        desc: '有重复值 此次提交失败',
                        duration: 5
                    });
                })           
            }
        },
        mounted(){
            if(!!this.$route.params.data_id ){
                this.axios.get(this.http_url+'/car/guolv?table=newcar&id='+this.$route.params.data_id)
                .then(res=>{
                    this.formItem=res.data
                })
            }
            this.getSystem.then(res=>{
                this.car_brand=res.data.brand_list
                this.car_price=res.data.price_list
                this.car_level=res.data.level_list
                this.car_year =res.data.year_list
                this.car_channel =res.data.channel_list
            })

        }
    
    }
</script>
