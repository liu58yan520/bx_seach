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
    <Form :model="formItem" :label-width="80">
 

        <FormItem label="品牌">
            <Select v-model="formItem.brand">
                <Option :value="item.name" v-for="(item,index) in car_brand" :key="index" >
                    {{item.name}}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="购置价" prop="price">
            <radio-group v-model="formItem.price">
                <radio :label="item.id" v-for="(item,index) in car_price" :key='index'>{{item.name}}</radio>
            </radio-group>
        </FormItem>
         <FormItem label="过户标志">
            <i-switch v-model="formItem.via_sign" size="large" true-value='1' false-value='0'>
                <span slot="open">Y</span>
                <span slot="close">N</span>
            </i-switch>
        </FormItem>
        
        <FormItem label="使用年限">
            <radio-group v-model="formItem.year">
                <radio :label="item.id" v-for="(item,index) in car_year" :key="item.name"  >{{item.name}}</radio>
            </radio-group>
        </FormItem>
          <FormItem label="单三者标志" >
            <i-switch v-model="formItem.dan3_sign" size="large" true-value='1' false-value='0'>
                <span slot="open">Y</span>
                <span slot="close">N</span>
            </i-switch>
        </FormItem>  
        <FormItem label="出险次数">
            <radio-group v-model="formItem.go_danger">
                <radio :label="item.id" v-for="(item,index) in car_go_danger" :key="item.name"  >{{item.name}}</radio>
            </radio-group>
        </FormItem>  
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
                car_level:'',
                car_go_danger:null,
                car_year:"",
                max:20,
                formItem: {
                    id:null,
                    brand: "",
                    price: "",
                    via_sign:0,
                    dan3_sign:0,
                    year:null,
                    level:"",
                    rate:"",
                    go_danger:''
                }
            }
        },
        methods: {
            handleSubmit(name) { //提交
                let str= this.formItem.id==null?'data_add':'data_update'
                let data=this.$qs.stringify({
                    items:this.formItem
                });
                this.axios.post(this.http_url+'/Car/'+str+'?source=renew', data)
                .then((res)=>{
                    if(res.data>0){
                        this.$Message.info('提交成功');
                    }
                }).catch(()=>{
                     this.$Notice.error({
                        title: '错误提示',
                        desc: '有重复值 此次提交失败',
                        duration: 5
                    });
                })      
            },
        },
        mounted(){
            if(!!this.$route.params.data_id ){
                this.axios.get(this.http_url+'/car/guolv?table=renew&id='+this.$route.params.data_id)
                .then(res=>{
                    this.formItem=res.data
                })
            }
            this.getSystem.then(res=>{
                this.car_brand=res.data.brand_list
                this.car_price=res.data.price_list
                this.car_level=res.data.level_list
                this.car_year =res.data.year_list
                this.car_go_danger =res.data.go_danger_list
            })
        }
    
    }
</script>
