<template>
  <div>
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
    <MyLoading v-if="isLoading"></MyLoading>
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
        class="van-cel"
      >
        <!-- 电影图片 -->
        <img :src="data.poster" />
        <div class="direFa">
          <!-- 电影名字 -->
          <div class="title">{{ data.name }} {{ data.filmType.name }}</div>
          <div class="content">
            <!-- 观众评分 -->
            <div>
              <span style="color: red" v-if="data.grade">观众评分：{{ data.grade }}</span>
              <span v-else>暂无评分</span>
            </div>
            <!-- 电影上映时间 -->
            <div>
              <span>{{ data.premiereAt | dataFilter }} 上映</span>
            </div>
            <!-- 主演 -->
            <div class="actors">主演： {{ data.actors | actorsFilter }}</div>
            <!-- 电影时长 -->
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'

import http from '@/util/http.js'

// 定义全局过滤器
Vue.filter('actorsFilter', (data) => {
  // console.log()
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})
Vue.filter('dataFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
export default {
  name: 'NowPlaying',
  data () {
    return {
      datalist: [],
      // 上拉加载
      loading: false,
      finished: false,
      current: 1,
      total: 0,
      prevCityId: -1,
      isLoading: false
      // 下拉刷新
      // refreshing: false
    }
  },
  // activated 替换 mounted ：（activated，在keep-alive组件被激活时调用）
  activated () {
    const cityId = this.$store.state.city.cityId
    if (this.prevCityId === cityId) {
      return
    }
    this.isLoading = true
    http({
      url: `/gateway?cityId=${this.$store.state.city.cityId}&pageNum=1&pageSize=10&type=1&k=5196770`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
      this.isLoading = false
      this.prevCityId = cityId
    })
  },
  methods: {
    // 上拉加载
    onLoad () {
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      axios({
        url:
          'https://m.maizuo.com/gateway?cityId=' +
          this.$store.state.city.cityId +
          '&pageNum=' +
          this.current +
          '&pageSize=10&type=1&k=5196770',
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
    },
    // 下拉刷新
    // onRefresh () {
    //   this.finished = true
    //   console.log('下拉刷新了')
    //   // setTimeout(() => {
    //   // this.finished = false
    //   // }, 1000)
    // },
    handleChangePage (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.van-cell {
  line-height: 20px;
}
.van-list {
  padding-bottom: 1.5556rem;
  .van-cel {
    overflow: hidden;
    padding: 15px;
    img {
      width: 66px;
      float: left;
    }
    .title {
      font-size: 0.8889rem;
    }
    .content {
      font-size: 0.7222rem;
      color: gray;
      .actors {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200px;
      }
    }
    .direFa {
      padding-left: 4.7222rem;
      padding-top: 0.1667rem;
      padding-bottom: 0.1111rem;
    }
  }
}
.hidden {
  visibility: hidden;
}
</style>
