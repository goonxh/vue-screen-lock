# vue-screen-lock

```js
npm i vue-screen-lock -D
```

### In your project:

```js
import vueScreenLock from 'vue-screen-lock/src/index';
import 'vue-screen-lock/src/lock.css';
Vue.use(vueScreenLock);
```

Use the component:

```vue
<template>
    <div id="app">
        <p @click='lock()'>Click me</p>
    </div>
</template>

<script>
export default {
    data() {
        return  {
        }
    },
    created() {
    },
    methods: {
        lock() {
            this.$screenLock('lock', {
                width: '300px', // 解锁区域宽度
                height: '300px', // 解锁区域高度
                firstLock: window.sessionStorage.getItem('PASSWORD')?false:true,  // 检查是否是第一次进入锁屏页面
            });
        }
    }
}
</script>
```

## Demo

[demo](https://goonxh.github.io/vue-screen-lock/)
