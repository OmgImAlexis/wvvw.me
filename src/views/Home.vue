<template>
    <div>
        <div class="container">
            <div v-if="error" class="error styled"><p>{{error}}</p></div>
            <template v-else>
                <template v-if="searchTerm">
                    <template v-if="searchPosts.length">
                        <post v-for="post in searchPosts" v-bind:post="post"></post>
                    </template>
                </template>
                <template v-else>
                    <template v-if="posts.length">
                        <post v-for="post in posts" v-bind:post="post"></post>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import api from '../services/api.js';

export default {
    name: 'home',
    store: ['posts', 'searchPosts', 'searchTerm', 'error', 'user'],
    data () {
        return {
        }
    },
    mounted() {
        var vm = this;
        api.get('post').then(response => {
            if (response.data.length <= 0) {
                vm.error = `There aren't any posts.`;
            } else {
                if (vm.user) {
                    vm.posts = response.data;
                } else {
                    vm.posts = response.data.filter(post => {
                        return post.published;
                    });
                }
            }
        }).catch(error => {
            vm.error = `The API isn't responding. Please check https://api.wvvw.me`;
            throw new Error(error);
        });
    }
}
</script>

<style scoped>
</style>
