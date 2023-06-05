<template>
  <div>
    <MyLoading v-if="isLoading"></MyLoading>
    <div class="detailBox" v-else>
      <Header title="电影详情">
        <i
          class="iconfont icon-miaomiaoxiangzuojiantou"
          @click="handleToBack"
        ></i>
      </Header>
      <div
        :style="{ backgroundImage: 'url(' + filmInfo.poster + ')' }"
        class="poster"
      ></div>
      <!-- 电影内容 -->
      <div class="content">
        <!-- 电影名字 -->
        <div>{{ filmInfo.name }} {{filmInfo.filmType.name }}</div>
        <!-- 电影详情信息 -->
        <div>
          <div class="detail-text">{{ filmInfo.category }}</div>
          <div class="detail-text">
            {{ filmInfo.premiereAt | dataFilter }}上映
          </div>
          <div class="detail-text">
            {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
          </div>
          <div
            class="detail-text"
            style="line-height: 20px"
            :class="isHidden ? 'hidden' : ''"
          >
            {{ filmInfo.synopsis }}
          </div>
          <div style="text-align: center">
            <i
              class="iconfont"
              @click="isHidden = !isHidden"
              :class="
                isHidden
                  ? 'icon-miaomiaoxiangxiajiantou'
                  : 'icon-miaomiaoxiangshangjiantou'
              "
            ></i>
          </div>
        </div>
        <!-- 演职人员 -->
        <div>
          <div>演职人员</div>
          <detailSwiper :perView="4" name="actors" class="detailActors">
            <detailSwiperItem
              v-for="(data, index) in filmInfo.actors"
              :key="index"
            >
              <div
                :style="{ backgroundImage: 'url(' + data.avatarAddress + ')' }"
                class="avatar"
              ></div>
              <div style="font-size: 14px">
                {{ data.name }} ({{ data.role }})
              </div>
            </detailSwiperItem>
          </detailSwiper>
        </div>
        <!-- 剧照 -->
        <div>
          <div>剧照</div>
          <detailSwiper :perView="2" name="photos" class="detailPhotos">
            <detailSwiperItem
              v-for="(data, index) in filmInfo.photos"
              :key="index"
            >
              <div
                :style="{ backgroundImage: 'url(' + data + ')' }"
                class="avatar"
                @click="clickBig(index)"
              ></div>
            </detailSwiperItem>
          </detailSwiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import { ImagePreview } from 'vant'

import detailSwiper from '../../components/Detail/detailSwiper.vue'
import detailSwiperItem from '../../components/Detail/detailSwiperItem.vue'
import Header from '../../components/Header/index.vue'
import http from '@/util/http'

// 在 export default 外面定义全局过滤器 （date）参数是需要过滤的数据
Vue.filter('dataFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

export default {
  name: 'MyDetail',
  components: {
    detailSwiper,
    detailSwiperItem,
    Header
  },
  data () {
    return {
      filmInfo: {},
      isLoading: true,
      isHidden: false
    }
  },
  activated () {
    // console.log(this.$route.params.filmId)
    http({
      url: `/gateway?filmId=${this.$route.params.filmId}&k=5501344`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      this.isLoading = false
      this.filmInfo = res.data.data.film
      // console.log(res.data.data.film)
    })
  },
  methods: {
    handleToBack () {
      // console.log(this.$router)
      this.$router.back()
    },
    // 剧照图片点击预览放大
    clickBig (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>

<style scoped lang="less">
.detailBox {
  padding-bottom: 50px;
}
.poster {
  width: 100%;
  height: 11.666667rem;
  background-position: center;
  background-size: cover;
}
.content {
  padding: 0.833333rem;
}
.content .detail-text {
  color: #797d82;
  font-size: 13px;
  margin-top: 0.222222rem;
}
.hidden {
  overflow: hidden;
  height: 30px;
}
.avatar {
  width: 100%;
  height: 4.722222rem;
  background-position: center;
  background-size: cover;
}
.detailActors {
  padding-left: 20px;
  padding-top: 3px;
}
.detailPhotos {
  padding-left: 69px;
  padding-top: 3px;
}
</style>
