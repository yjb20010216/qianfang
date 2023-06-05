// 1- 对于数据请求的封装
// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url:
//           'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=5196770',
//     headers: {
//       'X-Client-Info':
//             '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }
// function httpForDetail (params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=5501344`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }

// export default {
//   httpForDetail,
//   httpForList
// }
// 2- 对于数据请求的封装
import axios from 'axios'

const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info':
    '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}'
  }
})

export default http
