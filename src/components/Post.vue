<template>
    <div v-bind:class="['post', 'styled', (post.published ? '' : 'unpublished')]">
        <template v-if="post.published || (!post.published && user)">
            <h1 class="title">{{post.title}}</h1>
            <div class="content" v-html="marked(post.content)"></div>
            <span class="meta">
                <a v-bind:href="post.permalink">{{new Date(post.date).toISOString()}}</a>
                <span class="owner">by <a v-bind:href="'/user/' + owner.id">{{owner.name}}</a></span>
            </span>
        </template>
        <template v-else>᠎᠎
            <p class="content">This post hasn't been published yet.</p>
        </template>᠎᠎᠎
    </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
    name: 'post',
    props: {
        post: {
            type: String
        },
        user: {
            type: Object
        }
    },
    computed: {
        owner() {
            var vm = this;
            var hasName = 'name' in vm.post.owner && !!Object.keys(vm.post.owner.name).length;
            var hasId = 'id' in vm.post.owner;
            return {
                name: hasName ? vm.post.owner.name : 'anonymous',
                id: hasId ? vm.post.owner.id : 'anonymous'
            };
        }
    }
})
</script>
