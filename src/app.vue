<template>
    <div>
        <div id="header">
            <form>
                <input v-model="searchTerm" id="globalSearch" type="text" placeholder="Search..." name="searchTerm">
            </form>
            <nav class="nav">
                <ul>
                    <li><a href="https://api.wvvw.me/">API (Alpha)</a></li>
                    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
                    <li><router-link :to="{ name: 'about' }">About</router-link></li>
                    <li><router-link :to="{ name: 'contact' }">Contact</router-link></li>
                    <li><a href="https://github.com/omgimalexis">Github</a></li>
                </ul>
            </nav>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Fuse from 'fuse.js';

var f = null;

export default {
    name: 'app',
    store: ['posts', 'searchPosts', 'searchTerm', 'error'],
    data () {
        return {
        }
    },
    mounted() {
        var vm = this;
        f = new Fuse([], {
            keys: ['title', 'content', 'tags'],
            shouldSort: true
        });
    },
    watch: {
        searchTerm() {
            var vm = this;
            if (f.list.length === 0 && vm.posts.length > 0){
                f.set(JSON.parse(JSON.stringify(vm.posts)));
            }
            vm.searchPosts = f.search(vm.searchTerm);
            if (vm.searchTerm && vm.searchPosts.length === 0) {
                vm.error = 'No posts found!';
            } else {
                vm.error = null;
            }
        }
    }
}
</script>

<style>
/* http://www.paulirish.com/2012/box-sizing-border-box-ftw/ */
html {
    box-sizing: border-box;
}

*, *:before, *:after {
    box-sizing: inherit;
}

/* My CSS */
body {
    background-color: #292929;
    color: #dfdfdf;
    font: 11px Arial, sans-serif;
    line-height: 1.43;
    margin: 0;
}
input[type="text"]{
    font-family: monospace;
}
input:focus {
    outline:none;
}
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

a, a.button:hover {
    color: white;
    text-decoration: none;
}

a:hover {
    color: grey;
    text-decoration: underline;
}

img {
    max-width: 100%;
}

.container {
    max-width: 900px;
    margin: 0 auto 20px auto;
}
.styled {
    background-color: #333;
    border: 1px solid #222;
    border-radius: 3px;
    padding: 10px;
}
.post {
    margin-bottom: 10px;
}
.post p {
    font-size: 12px;
}
.error {
    background-color: #964747;
}
.button {
    background: -webkit-linear-gradient(top, #4b4b4b, #454545);
    box-shadow: 0 1px 0 hsla(0,0%,0%,.1);
    border: 1px solid #303030;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    color: #fff;
    margin: 6px 8px 6px 0;
    text-align: center;
}
.button:hover {
    background: -webkit-linear-gradient(top, #38434b, #353c44);
    cursor: pointer;
    cursor: hand;
}
.button:disabled {
    color: rgb(84, 84, 84);
}
h1.title, h2.title {
    margin: 0;
}
#header{
    background-color: #333;
    border-bottom: 1px solid #222;
    margin-bottom: 10px;
    text-align: right;
}

#globalSearch {
    position: absolute;
    left: 100px;
    width: 500px;
    padding: 5px;
    height: 45px;
    border: 0;
    background-color: rgb(51, 51, 51);
    color: white;
    font-size: 20px;
}

nav.nav {
    margin-right: 20px;
}

nav.nav li {
    display: inline;
}

nav.nav li a{
    display: inline-block;
    padding: 15px 10px;
}

nav.nav li a:hover {
    text-decoration: none;
    color: white;
    background-color: grey;
}

code {
    padding: 0 2px;
}

pre {
    padding: 10px;
}

pre code {
    padding: 0;
}

pre, code {
    background-color: rgb(41, 41, 41);
    /* BEGIN word wrap */
    /* Need all the following to word wrap instead of scroll box */
    /* This will override the overflow:auto if present */
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    /* END word wrap */
}

/* https://perishablepress.com/perfect-pre-tags/ */
code, samp, kbd {
    text-align: left;
    color: #8C8C8C;
}
pre code {
    font-size: 11px;
}
pre {
    padding: 0.1em 0.5em 0.3em 0.7em;
    border-left: 11px solid #ccc;
    overflow: auto;
}
/* target IE7 and IE6 */
*:first-child+html pre {
    padding-bottom: 2em;
    overflow-y: hidden;
    overflow: visible;
    overflow-x: auto;
}
* html pre {
    padding-bottom: 2em;
    overflow: visible;
    overflow-x: auto;
}
/* https://perishablepress.com/perfect-pre-tags/ */

.comment .content p {
    margin-top: 0;
}

@media (max-width: 920px) {
    #header form {
        display: none;
    }
}
</style>
