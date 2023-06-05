<template>
 <div>
    <!-- 搜索影院 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 离你最近 -->
    <div class="fromZuiJing">
      <div>离你最近</div>
    </div>
    <!-- 展示搜索出来的城市列表 -->
    <ul v-if="value">
      <li v-for="data in computedCinemaList" :key="data.cinemaId">
        <div class="left">
          <div class="cinema_name">{{ data.name }}</div>
          <div class="cinema_text">{{ data.address }}</div>
        </div>

        <div class="rigth cinema_name">
          <div style="color:red;">￥{{ data.lowPrice / 100 }} 起</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MySearch',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {},
    onCancel () {
      this.$router.back()
    }
  },
  activated () {
    this.$store.dispatch('city/getCinemaData', window.localStorage.getItem('nowCityCityId') || 110100)
  },
  computed: {
    computedCinemaList () {
      return this.$store.state.city.cinemaList.filter(
        item =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      )
    }
  }
}
</script>

<style scoped lang='less'>
li {
  padding: 0.833333rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 14.777778rem;
  }
  .cinema_name {
    font-size: 15px;
  }
  .cinema_text {
    color: #797d82;
    font-size: 12px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.fromZuiJing{
  padding-left: 10px;
}
.box {
  //   height: 40.333333rem;
  overflow: hidden;
  position: relative;
  // 修正滚动条的位置
}
</style>
