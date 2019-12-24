import Vue from 'vue'
import App from './App'
import Api from './common/Api'
import Tips from './common/Tips'

Vue.prototype.$api = Api
Vue.prototype.$tips = Tips

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
