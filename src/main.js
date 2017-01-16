import Vue from 'vue';
import VueStash from 'vue-stash';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import marked from 'marked';
import routes from './routes.js';
import store from './store.js';
import App from './App.vue';

Vue.mixin({
    methods: {
        marked: function(input) {
            return marked(input);
        }
    }
});

import Post from './components/Post.vue';
Vue.component('post', Post)

Vue.use(VueStash);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes,
    mode: 'history'
});

const app = new Vue({
    router: router,
    data: { store },
    render: h => h(App)
}).$mount('#app');
