import Vue from 'vue';
import test from 'ava';
import {ObjectId} from 'bson';

import Post from '../src/components/Post.vue';

// Helper function that mounts and returns the rendered text
const getRenderedText = (Component, propsData, child) => {
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({propsData}).$mount();
    if (child) {
        return vm.$el.querySelector(child).textContent.trim();
    }
    return vm.$el.textContent.trim();
};

test('post no author', t => {
    const post = {
        title: 'Test Post',
        content: 'This is a test post.',
        tags: ['test', 'post', 'example'],
        published: true
    };

    t.is(getRenderedText(Post, {
        post
    }, '.title'), 'Test Post');

    t.is(getRenderedText(Post, {
        post
    }, '.content'), 'This is a test post.');
});

test('post with author', t => {
    const post = {
        title: 'Test Post',
        content: 'This is a test post.',
        tags: ['test', 'post', 'example'],
        published: true,
        author: {
            _id: new ObjectId(),
            username: 'xo'
        }
    };

    t.is(getRenderedText(Post, {
        post
    }, '.title'), 'Test Post');

    t.is(getRenderedText(Post, {
        post
    }, '.content'), 'This is a test post.');
});
