<style scoped>
h2{
    font-size: 30px;
    text-align: center;
    margin-top: 10%;
}
    form{
        display: block;
        margin: 5% auto 0;
        width:437px;
    }
</style>
<template>
    <div>
        <h2>管理后台</h2>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>

    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码.', trigger: 'blur' },
                        { type: 'string', min: 3, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid&& this.formInline.user=='admin' && this.formInline.password=='123') {
                        this.$Message.success('Success!');
                        localStorage.setItem('admin',true);
                        this.$router.push({ name: 'newcarlist',path:'/newcarlist' })
                    } else {
                        this.$Message.error('错误!');
                    }
                })

            }
        }
    }
</script>
