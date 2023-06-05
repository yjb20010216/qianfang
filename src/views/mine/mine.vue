<template>
  <div id="main">
    <Header title="我的"></Header>
    <div id="content">
      <ul>
        <li>
          <span>欢迎你：{{ username }}</span>
          <span @click="handleLogOut">退出</span>
        </li>
        <li>
          <span>我的个人信息</span>
          <i class="iconfont icon-miaomiaoyoujiantou1"></i>
        </li>
        <li>
          <span>我的订单</span>
          <i class="iconfont icon-miaomiaoyoujiantou1"></i>
        </li>
        <li>
          <span>历史记录</span>
          <i class="iconfont icon-miaomiaoyoujiantou1"></i>
        </li>
        <li>
          <span>帮助与客服</span>
          <i class="iconfont icon-miaomiaoyoujiantou1"></i>
        </li>
        <li>
          <span>设置</span>
          <i class="iconfont icon-miaomiaoyoujiantou1"></i>
        </li>
      </ul>
    </div>

    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '../../components/Header/index.vue'
import TabBar from '../../components/TabBar/index.vue'
export default {
  name: 'MyMine',
  components: {
    Header,
    TabBar
  },
  data () {
    return {
      username: ''
    }
  },
  activated () {
    const qianfangToken = JSON.parse(localStorage.getItem('qianfangToken'))
    this.username = qianfangToken.username
    // console.log(qianfangToken.username)
  },
  methods: {
    handleLogOut () {
      localStorage.removeItem('qianfangToken')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
#content {
  padding-left: 10px;
  padding-top: 10px;
}
#content ul li {
  margin-bottom: 10px;
  border-bottom: 1px solid #b4b5b6;
  padding-bottom: 5px;
}
#content ul li span {
  font-size: 17px;
}
#content ul li span:nth-child(2),
#content ul li i {
  float: right;
  margin-right: 10px;
}
</style>
