<template>
  <div class="city_body">
    <div class="city_list">
      <MyLoading v-if="isLoading"></MyLoading>
      <div class="city_hot" v-else>
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li
            v-for="item in hotList"
            :key="item.id"
            @click="handleToCity(item.name, item.cityId)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.type">
          <h2>{{ item.type }}</h2>
          <ul>
            <li
              v-for="itemList in item.list"
              :key="itemList.cityId"
              @click="handleToCity(itemList.name, itemList.cityId)"
            >
              {{ itemList.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.type"
          @touchstart="handleToIndex(index)"
        >
          {{ item.type }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from '@/util/http.js'

export default {
  name: 'MyCity',
  data () {
    return {
      cityList: [],
      indexList: [],
      hotList: [],
      isLoading: true
    }
  },
  mounted () {
    const cityList = window.localStorage.getItem('cityList')
    const hotList = window.localStorage.getItem('hotList')
    if (cityList && hotList) {
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
      // 让 Loading 加载框消失
      this.isLoading = false
    } else {
      http({
        url: '/gateway?k=1132003',
        headers: {
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then((res) => {
        // console.log(res.data.data.cities)
        this.renderCity(res.data.data.cities)
        // 让 Loading 加载框消失
        this.isLoading = false
      })
    }
  },

  methods: {
    // 对请求过来的city数据进行改造
    renderCity (list) {
      const letterList = []
      // 利用 ASCLL值 添加26个大写字母
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      // 对每个大写字母进行遍历，又对list进行过滤，把拼音首字母一样的放到一起
      letterList.forEach((letter) => {
        const newList = list.filter(
          (item) => item.pinyin[0].toUpperCase() === letter
        )
        if (newList.length > 0) {
          this.cityList.push({ type: letter, list: newList })
          this.indexList.push(letter)
        }
      })
      // 热门城市
      for (let i = 0; i < list.length; i++) {
        if (list[i].isHot === 1) {
          this.hotList.push(list[i])
        }
      }
      // console.log(this.hotList)
      window.localStorage.setItem('cityList', JSON.stringify(this.cityList))
      window.localStorage.setItem('hotList', JSON.stringify(this.hotList))
    },
    // 点击城市字母索引跳转
    handleToIndex (index) {
      const h2 = this.$refs.city_sort.getElementsByTagName('h2')
      console.log(h2[index].offsetTop + 20)
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop - 20
    },
    // 点击城市跳转到正在热映页面，更新状态管理
    handleToCity (name, cityId) {
      this.$store.commit('city/CITY_INFO', { name, cityId })
      window.localStorage.setItem('nowCityName', name)
      window.localStorage.setItem('nowCityCityId', cityId)
      this.$router.push('/film/nowplaying')
    }
  }
}
</script>

<style scoped lang="less">
#content .city_body {
  margin-top: 27px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 28px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 18px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
.city_body .city_index ul li {
  margin-bottom: 5px;
}
</style>
