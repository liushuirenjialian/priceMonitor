import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import './assets/iconfont/iconfont.css'
import '@/permission'
Vue.use(ElementUI)



Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
        el: '#app4',
        router,
        store,
        render: h => h(App)
    }
});

export const bootstrap = [
    vueLifecycles.bootstrap,
];

export function mount(props) {
    createDomElement();
    return vueLifecycles.mount(props);
}

export const unmount = [
    vueLifecycles.unmount,
];

function createDomElement() {
    // Make sure there is a div for us to render into
    let el = document.getElementById('app4');

    if (!el) {
        let content = document.getElementById('content');
        el = document.createElement('div');
        el.id = 'app4';
        content.appendChild(el);
    }
    return el;
}