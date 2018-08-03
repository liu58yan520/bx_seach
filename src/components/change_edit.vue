<style scoped>
    form{
        width:60%;
        margin-top: 30px;
    }
    .ivu-radio-group-item{
        font-size: 16px;
        margin-right: 26px;
    }
    .ps{
        font-size: 16px;
        color: red;
        padding-top: 6px;
    }
</style>
<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="品牌">
            <Select v-model="formItem.brand" @on-change="brand_change" :disabled='disabled'>
                <Option :value="item.name" v-for="(item,index) in car_brand" :key="index" >
                    {{item.name}}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="车系">
            <Select v-model="formItem.series" :disabled='disabled'>
                <Option :value="item.name" v-for="(item,index) in car_series" :key="item.name" >
                    {{item.name}}
                </Option>
            </Select>
            <Input
                v-model="seach_series_str"
                @on-enter="seach_series"
                placeholder="请输入编号，可查询品牌"
                :style="{width:'200px','margin-right':'5px'}">
            </Input>
            <span class="ps">  {{ series_str }}</span>
        </FormItem>
        <FormItem label="购置价" prop="price">
            <radio-group v-model="formItem.price">
                <radio :label="item.id" v-for="(item,index) in car_price" :key='index'>{{item.name}}</radio>
            </radio-group>
        </FormItem>
         <FormItem label="过户标志" >
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
          <FormItem label="单三者标志">
            <i-switch v-model="formItem.dan3_sign" size="large" true-value='1' false-value='0'>
                <span slot="open">Y</span>
                <span slot="close">N</span>
            </i-switch>
        </FormItem>
        <FormItem label="出险次数">
            <radio-group v-model="formItem.go_danger">
                <radio :label="item.id" v-for="(item,index) in car_go_danger" :key="index"  >{{item.name}}</radio>
            </radio-group>
        </FormItem>  
        <FormItem label="座位">
            <radio-group v-model="formItem.seat">
                <radio :label="item.id" v-for="(item,index) in car_seat" :key="index"  >{{item.name}}</radio>
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
                seach_series_str:'',
                series_str:"编号输完后按回车",
                car_brand:[],
                car_price:[],
                car_level:null,
                car_year:[],
                car_series:[],
                car_seat:null,
                car_go_danger:null,
                max:20,
                disabled:false,
                formItem: {
                    id:null,
                    brand: null,
                    series:'',
                    price: "",
                    via_sign:0,
                    dan3_sign:0,
                    year:2,
                    level:"",
                    seat:'',
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
                this.axios.post(this.http_url+'/Car/'+str+'?source=change', data)
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
            brand_change(){
                this.formItem.series=null
                this.car_series=null
                this.axios.get(this.http_url+'/system/brand_seach_series?brand_name='+this.formItem.brand)
                .then(res=>{
                    this.car_series=res.data
                })
            },
            seach_series(){
                this.axios.get(this.http_url+'/system/brand_seach_series?car_id='+this.seach_series_str)
                .then(res=>{
                    if(!!res.data.series){
                        this.disabled=true;
                        this.series_str=`品牌:${res.data.brand}        车系:${res.data.series}`
                        this.formItem.brand=res.data.brand
                        this.formItem.series=res.data.series
                    }else {
                         this.series_str='未搜索到'
                    }
                })
            }

        },
        created(){
            if(!!this.$route.params.data_id ){
                this.axios.get(this.http_url+'/car/guolv?table=change&id='+this.$route.params.data_id)
                .then(res=>{
                    this.formItem=res.data
                    this.axios.get(this.http_url+'/system/brand_seach_series?brand_name='+this.formItem.brand)
                    .then(res=>{
                        this.car_series=res.data
                        // console.log(res.data)
                    })
                })
                
            }
            this.getSystem.then(res=>{
                this.car_brand=res.data.brand_list
                this.car_price=res.data.price_list
                this.car_level=res.data.level_list
                this.car_year =res.data.year_list
                this.car_seat =res.data.seat_list
                this.car_go_danger =res.data.go_danger_list
            })          
        }
    
    }
</script>
