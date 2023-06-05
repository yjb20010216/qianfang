import http from '@/util/http'

const state = {
  // 城市名字
  name: window.localStorage.getItem('nowCityName') || '北京',
  // 城市Id
  cityId: window.localStorage.getItem('nowCityCityId') || 110100,
  // 城市列表数据
  cinemaList: []
}

const mutations = {
  CITY_INFO (state, payload) {
    state.name = payload.name
    state.cityId = payload.cityId
  },
  // 城市列表数据
  changeCinemaData (state, data) {
    state.cinemaList = data
  }
}

// 支持异步
const actions = {
  // 这里面参数是 store，其他行为里面是 state
  getCinemaData (store, cityId) {
    return http({
      url: `/gateway?cityId=${cityId}&ticketFlag=1&k=944313`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      store.commit('changeCinemaData', res.data.data.cinemas)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
