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
    store: ['posts', 'searchPosts', 'searchTerm', 'error'],
    data () {
        return {
        }
    },
    mounted() {
        var vm = this;
        api.get('post').then(function(response) {
            if (response.data.length <= 0) {
                vm.error = `There aren't any posts.`;
            } else {
                vm.posts = response.data;
            }
        }).catch(function(error) {
            vm.error = `The API isn't responding. Please check https://api.wvvw.me`;
            throw new Error(error);
        });
    }
}
</script>

<style scoped>
</style>
