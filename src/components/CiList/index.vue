<template>
  <div class="cinema_body" ref="cinema_body">
    <MyLoading v-if="isLoading"></MyLoading>
    <ul v-else>
      <div class="pullDownMsg" v-if="isPullDownMsg">{{ pullDownMsg }}</div>
      <li v-for="item in cinemaList" :key="item.cinemaId">
        <div>
          <span>{{ item.name }}</span>
          <span class="q">
            <span class="price">{{ item.lowPrice / 100 }}元起</span>
          </span>
        </div>
        <div class="address">{{ item.address }}</div>
        <span class="jilu">距离未知</span>
        <!-- <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import http from '@/util/http.js'

export default {
  name: 'MyCiList',
  data () {
    return {
      cinemaList: [],
      pullDownMsg: '',
      isPullDownMsg: false,
      isLoading: true,
      prevCityId: -1
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
      url: `/gateway?cityId=${cityId}&ticketFlag=1&k=8553610`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then((res) => {
      // console.log(res.data.data.cinemas)
      this.cinemaList = res.data.data.cinemas
      // 让 Loading 加载框消失
      this.isLoading = false
      this.prevCityId = cityId
      this.$nextTick(() => {
        const scroll = new BScroll(this.$refs.cinema_body, {
          click: true,
          probeType: 1
        })

        // 顶部下拉刷新会执行（要下拉超过30的距离）
        scroll.on('scroll', (pos) => {
          if (pos.y > 10) {
            // console.log('scroll')
            this.isPullDownMsg = true
            this.pullDownMsg = '正在刷新'
          }
        })

        // 滚动动作结束之后会执行
        scroll.on('touchEnd', (pos) => {
          if (pos.y > 10) {
            this.pullDownMsg = '刷新完成'
            setTimeout(() => {
              this.pullDownMsg = ''
              this.isPullDownMsg = false
            }, 1000)
          }
        })
      })
    })
  }
}
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  float: right;
  color: #f03d37;
  margin-right: 10px;
}
.cinema_body .price {
  font-size: 15px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 243px;
}

.jilu {
  font-size: 13px;
  color: #666;
  float: right;
  margin-right: 10px;
  margin-top: -24px;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.cinema_body .pullDownMsg {
  padding-top: 5px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
