<style scoped>
 h2{
     margin-bottom: 20px;
 }
 .ivu-input-type{
     margin-bottom: 10px;
 }
</style>

<template>
    <div class="useradd">
        <h2>一次可添加多个用户</h2>
        <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
            <FormItem
                    v-for="(item, index) in formDynamic.items"
                    v-if="item.status"
                    :key="index"
                    :label="'添加用户 ' + item.index"
                    :prop="'items.' + index + '.name'"
                    :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                <Row>
                    <Col span="18">
                        <Input type="text" v-model="item.name" placeholder="请输入用户名"></Input>
                        <Input type="text" v-model="item.pass" placeholder="请输入密码"></Input>
                    </Col>
                    <Col span="4" offset="1">
                        <Button type="ghost" @click="handleRemove(index)">Delete</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
                <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                index: 1,
                formDynamic: {
                    items: [
                        {
                            name: '',
                            pass:'',
                            index: 1,
                            status: 1
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                // console.log(this.formDynamic)
                let data=this.$qs.stringify({
                    items:this.formDynamic.items
                });
                this.axios.post(this.http_url+'/system/put_user', data)
                .then((res)=>{
                    if(res.data>1){
                        this.$Message.info('添加成功');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>
