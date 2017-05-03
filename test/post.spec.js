import Vue from 'vue';
import test from 'ava';

import Post from '../src/components/Post.vue';

test(t => {
    const N = Vue.extend(Post);
    const vm = new N({
        propsData: {
            post: {
                title: 'Test Post',
                content: 'This is a test post.',
                tags: ['test', 'post', 'example']
            }
        }
    });
    Vue.nextTick(() => {
        t.is(vm.$el.textContent, 'This is a test post.');
    });
});
