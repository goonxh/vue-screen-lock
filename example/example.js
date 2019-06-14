import Vue from 'vue';
import example from './example.vue';
import '../src/lock.css';
import ScreenLock from '../src/index.js';
Vue.use(ScreenLock);

new Vue({
    render: h => h(example),
}).$mount('#app');