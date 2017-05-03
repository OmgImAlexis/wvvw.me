import Vue from 'vue';
import VueStash from 'vue-stash';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes';
import store from './store';
import App from './app.vue';
import Post from './components/Post.vue';

Vue.component('post', Post);

Vue.use(VueStash);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    router,
    data: {
        store
    },
    render: h => h(App)
}).$mount('#app');
