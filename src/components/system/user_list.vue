<template>
    <Table stripe :columns="columns1" :data="userlist"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '密码',
                        key: 'pass'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                userlist: []
            }
        },
        methods: {
            remove (index) {
                this.axios.post(this.http_url+'/system/action_system?action=del&table=user&id='+this.userlist[index].id).then(res=>{
                    this.userlist.splice(index, 1)
                })
            }
        },
        created () {
            this.axios.post(this.http_url+'/system/get_user').then(res=>{
                this.userlist=res.data
            })
        }
    }
</script>
