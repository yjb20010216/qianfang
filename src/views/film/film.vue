<template>
  <div id="main">
    <Header title="电影"></Header>

    <div id="content">
      <div class="movie_menu">
        <!-- 城市 -->
        <router-link
          class="city_name"
          to="/film/city"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div @click="navigate" :class="isActive ? 'filmactive' : ''">
            <span class="citySpan">{{ $store.state.city.name }}</span
            ><i class="iconfont icon-miaomiaoxiajiantou"></i>
          </div>
        </router-link>

        <!-- 正在热映--即将上映 -->
        <div class="hot_swtich">
          <router-link
            class="hot_item"
            to="/film/nowplaying"
            custom
            v-slot="{ navigate, isActive }"
            ><div @click="navigate" :class="isActive ? 'filmactive' : ''">
              正在热映
            </div>
          </router-link>
          <router-link
            class="hot_item"
            to="/film/comingsoon"
            custom
            v-slot="{ navigate, isActive }"
            ><div @click="navigate" :class="isActive ? 'filmactive' : ''">
              即将上映
            </div></router-link
          >
        </div>

        <!-- 搜索 -->
        <router-link
          class="search_entry"
          to="/film/search"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div @click="navigate" :class="isActive ? 'filmactive' : ''">
            <i class="iconfont icon-miaomiaosousuo"></i>
          </div>
        </router-link>
      </div>
      <!-- 上面四个 router-link 显示的位置 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- 底部状态栏 -->
    <TabBar></TabBar>

    <!-- 电影详情路由，不同于上面四个，此路由需要覆盖 content 类 -->
    <!-- <router-view name="detail"></router-view> -->
  </div>
</template>

<script>
import { Dialog } from 'vant'

import Header from '../../components/Header/index.vue'
import TabBar from '../../components/TabBar/index.vue'
// import { messageBox } from '../../components/JS/index'
export default {
  name: 'MyFilm',
  components: {
    Header,
    TabBar
  },
  mounted () {
    if (!window.localStorage.getItem('nowCityName')) {
      Dialog.alert({
        title: '选择城市',
        message: `目前城市：${this.$store.state.city.name}` || '暂未选择',
        theme: 'round-button',
        showCancelButton: true,
        confirmButtonText: '去选择城市'
      })
        .then(() => {
          this.$router.push('/film/city')
          // console.log('去选择城市')
        })
        .catch(() => {
        // console.log('取消')
        })
    }

    // 定位弹窗
    // setTimeout(() => {
    //   messageBox({
    //     title: '定位',
    //     content: '北京',
    //     cancel: '取消',
    //     ok: '切换城市',
    //     handleOk () {
    //       // window.localStorage.setItem('nowNm', nm)
    //       // window.localStorage.setItem('nowId', id)
    //       // window.location.reload()
    //       console.log(this)
    //       // this.$router.push('/film/city')
    //     },
    //     handleCancel () {
    //       console.log('取消')
    //     }
    //   })
    // }, 2000)
  }
}
</script>

<style lang="less">
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
.filmactive {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.citySpan {
  margin-right: 3px;
}
</style>
