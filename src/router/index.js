const routers = [ 
    {
        name: "login",
        path: '/login',
        component: (resolve) => require(['@/login.vue'], resolve)
    },   
    
    {
        name:"newcarlist",
        path: '/newcarlist',
        component: (resolve) => require(['@/components/newcar_list.vue'], resolve)
    },
    {
        name:'newcaredit',
        path: '/newcaredit',
        component: (resolve) => require(['@/components/newcar_edit.vue'], resolve)
    }, {
        name: 'renewlist',
        path: '/renewlist',
        component: (resolve) => require(['@/components/renew_list.vue'], resolve)
    },
    {
        name: 'renewedit',
        path: '/renewedit',
        component: (resolve) => require(['@/components/renew_edit.vue'], resolve)
    },
    {
        name: 'changelist',
        path: '/changelist',
        component: (resolve) => require(['@/components/change_list.vue'], resolve)
    },
    {
        name: 'changeedit',
        path: '/changeedit',
        component: (resolve) => require(['@/components/change_edit.vue'], resolve)
    },{
        name: 'brandlist',
        path: '/brandlist',
        component: (resolve) => require(['@/components/system/brand_list.vue'], resolve)
    }, {
        name: 'serieslist',
        path: '/serieslist',
        component: (resolve) => require(['@/components/system/series_list.vue'], resolve)
    }, {
        name: 'userlist',
        path: '/userlist',
        component: (resolve) => require(['@/components/system/user_list.vue'], resolve)
    }, {
        name: 'useradd',
        path: '/useradd',
        component: (resolve) => require(['@/components/system/user_add.vue'], resolve)
    },{
        name: 'channellist',
        path: '/channellist',
        component: (resolve) => require(['@/components/system/channel_list.vue'], resolve)  
    }, {
        name: 'pricelist',
        path: '/pricelist',
        component: (resolve) => require(['@/components/system/price_list.vue'], resolve)
    }, {
        name: 'levellist',
        path: '/levellist',
        component: (resolve) => require(['@/components/system/level_list.vue'], resolve)
    }, {
        name: 'go_dangerlist',
        path: '/go_dangerlist',
        component: (resolve) => require(['@/components/system/go_danger_list.vue'], resolve)
    }, {
        name: 'yearlist',
        path: '/yearlist',
        component: (resolve) => require(['@/components/system/year_list.vue'], resolve)
    }, {
        name: 'seatlist',
        path: '/seatlist',
        component: (resolve) => require(['@/components/system/seat_list.vue'], resolve)
    }

];
export default routers;