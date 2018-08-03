<template>
    <div class="list">
        <Table border :columns="columns6" :data="data_list" ref="table"></Table>
        <br>
        <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出全部数据</Button>
        <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出筛选数据</Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns6: [
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '车系',
                        key: 'series'
                    },
                    {
                        title: '购置价',
                        key: 'price',
                        filters: [
                            {
                                label: '大于5000',
                                value: 1
                            },
                            {
                                label: '小于4999',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.price >= 5000;
                            } else if (value === 2) {
                                return row.price <= 4999;
                            }
                        }
                    },
                    {
                        title: '过户标志',
                        key: 'via_sign',
                        filters: [
                            {
                                label: 'Y',
                                value: 1
                            },
                            {
                                label: 'N',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.via_sign =='Y';
                            } else if (value === 2) {
                                return row.via_sign =='N';
                            }
                        }
                    },
                    {
                        title: '单三者标志',
                        key: 'dan3_sign',
                        filters: [
                            {
                                label: 'Y',
                                value: 1
                            },
                            {
                                label: 'N',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.dan3_sign =='Y';
                            } else if (value === 2) {
                                return row.dan3_sign =='N';
                            }
                        }
                    },
                    {
                        title: '使用年限',
                        key: 'year'
                    },
                    {
                        title: '出险次数',
                        key: 'go_danger'
                    },
                    {
                        title: '座位',
                        key: 'seat'
                    },
                    {
                        title: '等级',
                        key: 'level'
                    },
                    {
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
                data_list: []
            }
        },
        methods: {
            show (index) {
                this.$router.push({ name:'changeedit', path: '/changeedit',params: { data_id: this.data_list[index].id }  })
            },
            remove (index) {
                this.axios.post(this.http_url+'/Car/data_del?source=change&id='+this.data_list[index].id)
                .then((res)=>{
                    if(res.data>0) this.data_list.splice(index, 1);
                })
            },
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '全部数据'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '筛选数据',
                        original: false
                    });
                }
            }      
        },
        created () {
            this.axios.post(this.http_url+'/Car/data_select?source=change')
            .then((res)=>{
                this.data_list=this.guolv(res.data)
            })
        }
    }
</script>
