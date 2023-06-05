<template>
  <footer id="footer">
    <ul>
      <router-link to="/film" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kerwinactive' : ''">
          <i class="iconfont icon-miaomiaodianying"></i>
          <p>电影</p>
        </li>
      </router-link>
      <router-link
        custom
        v-slot="{ navigate, isActive }"
        to="/cinema"
        active-class="kerwinactive"
      >
        <li @click="navigate" :class="isActive ? 'kerwinactive' : ''">
          <i class="iconfont icon-miaomiaoyingyuan"></i>
          <p>影院</p>
        </li>
      </router-link>
      <router-link
        custom
        v-slot="{ navigate, isActive }"
        to="/mine"
        active-class="kerwinactive"
      >
        <li @click="navigate" :class="isActive ? 'kerwinactive' : ''">
          <i class="iconfont icon-miaomiaowode1"></i>
          <p>我的</p>
        </li>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'MyTabBar'
}
</script>

<style scoped>
#footer {
  width: 100%;
  height: 50px;
  background: white;
  border-top: 2px #ebe8e3 solid;
  position: fixed;
  left: 0;
  bottom: 0;
}
#footer ul {
  display: flex;
  text-align: center;
  height: 50px;
  align-items: center;
}
#footer ul li {
  flex: 1;
  height: 40px;
}
#footer ul li.active {
  color: #f03d37;
}
.kerwinactive {
  color: #f03d37;
}
#footer ul i {
  font-size: 20px;
}
#footer ul p {
  font-size: 12px;
  line-height: 18px;
}
</style>
