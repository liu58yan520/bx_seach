<template>        
        <Table border :columns="columns6" :data="data_list"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns6: [
                    {
                        title: '渠道',
                        key: 'channel'
                    },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '购置价',
                        key: 'price',
                        filters: [
                            {
                                label: 'Greater than 25',
                                value: 1
                            },
                            {
                                label: 'Less than 25',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 25;
                            } else if (value === 2) {
                                return row.age < 25;
                            }
                        }
                    },
                    {
                        title: '送修情况',
                        key: 'repair'
             
                    },
                    {
                        title: '等级',
                        key: 'level'
                    },{
                        title: '费率 %',
                        key: 'rate'
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
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
                data_list: [],
            }
        },
        methods: {
            show (index) {
                this.$router.push({ name:'newcaredit',params: { data_id: this.data_list[index].id }  })
            },
            remove (index) {
                this.axios.post(this.http_url+'/Car/data_del?source=newcar&id='+this.data_list[index].id)
                .then((res)=>{
                    if(res.data>0) this.data_list.splice(index, 1);
                })
            }
        },
        created () {
            this.axios.post(this.http_url+'/Car/data_select?source=newcar')
            .then((res)=>{
                this.data_list=this.guolv(res.data)
            })
        }
    }
</script>
