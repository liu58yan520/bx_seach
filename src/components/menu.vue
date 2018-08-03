<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .logout{
        float: right;
        margin-top: 16px;
    }
    li.ivu-menu-item-selected a{
        color:#fff;
    }
    .ivu-menu a{
        display: block;
        color: #fff;
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        新车
                    </template>
                    <MenuItem name="1-1" ><router-link :to="{name:'newcarlist'}">条件列表</router-link></MenuItem>
                    <MenuItem name="1-2"><router-link :to="{name:'newcaredit'}">添加条件</router-link></MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        续保
                    </template>
                    <MenuItem name="2-1" ><router-link :to="{name:'renewlist'}">条件列表</router-link></MenuItem>
                    <MenuItem name="2-2" ><router-link :to="{name:'renewedit'}">添加列表</router-link></MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        转入
                    </template>
                    <MenuItem name="3-1" ><router-link :to="{name:'changelist'}">条件列表</router-link></MenuItem>
                    <MenuItem name="3-2" ><router-link :to="{name:'changeedit'}">添加列表</router-link></MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        系统设置
                    </template>
                    <MenuItem name="4-1" ><router-link :to="{name:'userlist'}">用户列表</router-link></MenuItem>
                    <MenuItem name="4-2" ><router-link :to="{name:'useradd'}">添加用户</router-link></MenuItem>
                    <MenuItem name="4-3" ><router-link :to="{name:'brandlist'}">品牌列表</router-link></MenuItem>
                    <MenuItem name="4-4" ><router-link :to="{name:'channellist'}">渠道列表</router-link></MenuItem>
                    <MenuItem name="4-5" ><router-link :to="{name:'pricelist'}">价格区间</router-link></MenuItem>
                    <MenuItem name="4-6" ><router-link :to="{name:'levellist'}">等级列表</router-link></MenuItem>
                    <MenuItem name="4-7" ><router-link :to="{name:'go_dangerlist'}">出险次数</router-link></MenuItem>
                    <MenuItem name="4-8" ><router-link :to="{name:'yearlist'}">年限列表</router-link></MenuItem>
                    <MenuItem name="4-9" ><router-link :to="{name:'seatlist'}">座位列表</router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Button type="warning" class="logout" v-on:click='logout'>退出</Button>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem v-for="(item,index) in nav" :key="index">{{item}}</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="min-height: 600px">
                        <!-- <myContent v-bind:name="name"></myContent> -->
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
export default {
    data(){
        return {
            nav:[]
        }
    },
    methods:{
        logout:function(){
            localStorage.removeItem('admin')
                this.$router.push({  path: '/login'  })
            }
    }
}
</script>
