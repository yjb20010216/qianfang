import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 避免出现：Avoided redundant navigation to current location 错误信息
// 避免了到当前位置的冗余导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/film',
    component: () => import('@/views/film/film'),
    children: [
      { path: 'city', component: () => import('@/components/City') },
      { path: 'nowplaying', component: () => import('@/components/Nowplaying') },
      { path: 'comingsoon', component: () => import('@/components/ComingSoon') },
      { path: 'search', component: () => import('@/components/Search') },
      // { path: 'detail', components: { detail: () => import('@/views/film/detail') } },
      { path: '/film', redirect: '/film/nowplaying' }
    ]
  },
  { path: '/cinema', component: () => import('@/views/cinema/cinema') },
  {
    path: '/mine',
    component: () => import('@/views/mine/mine'),
    // 拦截守卫会判断目标路由是否有meta属性
    meta: {
      isYuanRequired: true
    }
  },
  { path: '/detail/:filmId', component: () => import('@/views/film/detail') },
  { path: '/login', component: () => import('@/components/Login/index.vue') },
  // 都不匹配重定向到film组件
  { path: '/*', redirect: '/film' }
]

const router = new VueRouter({
  mode: 'hash',
  // base: 'process.env.BASE_URL',
  base: 'qianfang',
  routes
})

// 全局拦截 (守卫)
router.beforeEach((to, from, next) => {
  // console.log(to)

  if (to.meta.isYuanRequired) {
    // 判断 本地存储中是否token
    if (localStorage.getItem('qianfangToken')) {
      next()
    } else {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
