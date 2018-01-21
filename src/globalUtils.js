/**
 * Created by yangxk on 2018-1-21.
 */
export default {
  install(Vue, options) {
    Vue.prototype.$fetchGet = (url, data) => {
      return window.fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        return res.json()
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
