<template>
  <div class="login_body">
    <Header title="我的"></Header>
    <div>
      <input
        class="login_text"
        type="text"
        placeHolder="账户名/手机号/Email"
        v-model="username"
      />
    </div>
    <div>
      <input
        class="login_text"
        type="password"
        placeHolder="请输入您的密码"
        v-model="password"
      />
    </div>
    <div v-if="LoginIn">
      <input
        class="login_text"
        type="password"
        placeHolder="再一次输入您的密码"
        v-model="rePassword"
      />
    </div>
    <div class="login_btn" v-if="!LoginIn">
      <input type="submit" value="登录" @click="handleSubmit(1)" />
    </div>
    <div class="login_btn" v-if="LoginIn">
      <input type="submit" value="立即注册" @click="handleSubmit(2)" />
    </div>
    <div class="login_link">
      <a href="#" @click="handleLoginIn">{{ loginInHTML }}</a>
      <a href="#">找回密码</a>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/index.vue'

export default {
  name: 'MyLogin',
  components: {
    Header
  },
  data () {
    return {
      username: '',
      password: '',
      rePassword: '',
      loginInHTML: '立即注册',
      LoginIn: false
    }
  },
  methods: {
    handleSubmit (number) {
      // number == 1 表示登录
      // number == 2 表示注册
      if (number == 1) {
        const qianfangToken = {
          username: this.username,
          password: this.password
        }
        localStorage.setItem('qianfangToken', JSON.stringify(qianfangToken))
        console.log('登录成功')
        this.username = ''
        this.password = ''
        // 1. 获取 query字段
        // console.log(this.$route.query)
        // 2. 跳转到当时想要跳的页面去
        this.$router.push('/mine')
      } else {
        if (this.password == this.rePassword) {
          const qianfangToken = {
            username: this.username,
            password: this.password
          }
          localStorage.setItem('qianfangToken', JSON.stringify(qianfangToken))
          console.log('注册成功')
          this.username = ''
          this.password = ''
          this.rePassword = ''
          // 1. 获取 query字段
          // console.log(this.$route.query)
          // 2. 跳转到当时想要跳的页面去
          this.$router.push('/mine')
        } else {
          console.log('注册账号的两次密码不一样')
        }
      }
    },
    handleLoginIn () {
      this.LoginIn = !this.LoginIn
      this.LoginIn
        ? (this.loginInHTML = '立即登录')
        : (this.loginInHTML = '立即注册')
    }
  }
}
</script>

<style scoped>
#content .login_body {
  width: 100%;
}
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>
