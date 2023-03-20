<template>

    <Sidebar v-on:edit="canEdit = !canEdit" v-bind:components="enabledComponents" />
    <additionalMedia></additionalMedia>
    <div class="main">
        <Weather v-if="enabledComponents.weather.active" :style="getStyle(enabledComponents.weather)" />
        <timeOverview v-if="enabledComponents.timeOverview.active" :style="getStyle(enabledComponents.timeOverview)" />
        <news v-if="enabledComponents.news.active" :style="getStyle(enabledComponents.news)" />
        <bookmarks v-if="enabledComponents.bookmarks.active" :style="getStyle(enabledComponents.bookmarks)" />
        <todos v-if="enabledComponents.todoList.active" :style="getStyle(enabledComponents.todoList)" />
        <webTesting v-if="enabledComponents.webTesting.active" :style="getStyle(enabledComponents.webTesting)" />
        <crypto v-if="enabledComponents.cryptoCurrency.active" :style="getStyle(enabledComponents.cryptoCurrency)" />
        <football v-if="enabledComponents.footballScores.active" :style="getStyle(enabledComponents.footballScores)" />
        <spotify v-if="enabledComponents.spotify.active" :style="getStyle(enabledComponents.spotify)" />
        <!-- <notes v-if="enabledComponents[5].active" :style="getStyle(5)" /> -->
        <!-- <div v-for="(component, index) in enabledComponents" :is="component.name"  :style="getStyle(index)" ></div> -->

    </div>

    <img v-if="user.useBackgroundImage" :src="user.backgroundImage" id="background-img" />

    <div id="loading">
        <div class="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    
</template>

<script>
import $ from "jquery";
import {getUser, setTheme, getCSS} from "/src/helper.js";

import Sidebar from './components/core/sidebar.vue'
import additionalMedia from './components/widgets/additionalMedia/additionalMedia.vue'
import Weather from './components/widgets/weather/weather.vue'
import Loader from './components/utilities/loading.vue'
import timeOverview from './components/widgets/time-overview/time-overview.vue'
import news from './components/widgets/news/news.vue'
import bookmarks from './components/widgets/bookmarks/bookmarks.vue'
import todos from './components/widgets/todo/todo.vue'
import notes from './components/widgets/notes/notes.vue'
import webTesting from './components/widgets/developer-tools/web-testing.vue'
import crypto from './components/widgets/cryptocurrency/cryptocurrency.vue'
import football from './components/widgets/football-scores/football.vue'
import spotify from './components/widgets/spotify/spotify.vue'

var components = {
    Sidebar,
    additionalMedia,
    Weather,
    Loader,
    timeOverview,
    news,
    bookmarks,
    todos,
    notes,
    webTesting,
    crypto,
    football,
    spotify
}

export default {
    name: 'App',
    components: components,
    data: function () {
        return {
            canEdit: false,
            html: 'Edit Mode',
            user: getUser(),
            enabledComponents: {
                "weather":{
                    "name": "Weather",
                    "active": true,
                    "width": 50,
                    "order": 1
                },
                "timeOverview":{
                    "name": "Time Overview",
                    "active": true,
                    "width": 30,
                    "order": 2
                },
                "news":{
                    "name": "News",
                    "active": true,
                    "width": 50,
                    "order": 3
                },
                "bookmarks":{
                    "name": "Bookmarks",
                    "active": true,
                    "width": "100",
                    "order": 7
                },
                "todoList":{
                    "name": "Todo List",
                    "active": true,
                    "width": 53,
                    "order": 4
                },
                "webTesting":{
                    "name": "Web Testing",
                    "active": false,
                    "width": 25,
                    "order": 7
                },
                "cryptoCurrency":{
                    "name": "Crypto Currency",
                    "active": false,
                    "width": "75",
                    "order": 8
                },
                "footballScores":{
                    "name": "Football Scores",
                    "active": true,
                    "width": "100",
                    "order": 6
                },
                "spotify": {
                    "name": "Spotify",
                    "active": true,
                    "width": "50",
                    "order": 0
                }
            },
            background: null,
            scripts: [
                // 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
                // '//cdn.jsdelivr.net/npm/sweetalert2@11',
                // 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.16.0/codemirror.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.16.0/mode/javascript/javascript.min.js',
                'https://cookieconsent.popupsmart.com/src/js/popper.js'
            ]
        }
    },
    mounted() {
        this.addScripts();
        setTheme();
        this.getWidgets();
    },
    methods: {
        addScripts: function(){

            $.each(this.scripts, function (indexInArray, valueOfElement) { 
                $("<script/>", {
                    src: valueOfElement
                }).appendTo("body")
            });

            $("#customCSS").text(getCSS());

            setTimeout(() => {
                window.start.init({ Palette: "palette6", Mode: "floating left", Theme: "classic", Time: "5", })
            }, 1000);
        },
        getStyle: function (item) {
            return `width: calc(${item.width}% - 52px); order: ${item.order}`
        },
        getWidgets: function () {

            var widgets = localStorage.getItem("widgets");
            if (widgets != null) {
                this.enabledComponents = JSON.parse(widgets);
            }
        },
    },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.16.0/codemirror.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');


:root {
    --primary: #ff5252;
    --background: #e3e3e3;
    --font: #333;
    --shadow: 5px 0px 10px 0px #2424240f;
    --darken-background: #0000002e;
    --border-radius: 16px;
    --brand-red: #ed5565;
    --brand-green: #55ed8f;
    --background-opacity: 80%;
}

body {
    margin: 0;
    background-color: var(--background);
    color: var(--font);
    font-family: 'Poppins', sans-serif;
    font-weight: var(--font-weight);
}

input {
    font-family: 'Poppins', sans-serif;
}

    .main {
        position: fixed;
        height: -webkit-fill-available;
        width: calc(100% - 150px);
        right: 0;
        padding: 50px;
        padding-right: 75px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 24px;
        overflow: auto;
    }

@media (max-width: 1600px){
    .main {
        padding: 32px;
        padding-right: 60px;
        width: calc(100% - 120px);
    }
}

@media (max-width: 900px){

    .main{
        flex-wrap: nowrap;
        flex-direction: column;
    }

    .main > * {
        width: 100% !important;
    }
}

.main>* {
    background: var(--widget-background);
    box-shadow: var(--shadow);
    border-radius: var(--border-radius);
    padding: 20px;
    max-width: calc(100% - 40px);
}

h1 {
    margin: 0;
}

hr {
    background: var(--darken-background);
    height: 2px;
    border: none;
    margin: 18px 0;
}

i {
    cursor: pointer;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: var(--font) var(--background);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 12px;
}

*::-webkit-scrollbar-track {
    background: transparent;
}

*::-webkit-scrollbar-thumb {
    background-color: var(--font);
    border-radius: 10px;
}

#background-img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: var(--background-opacity);
}


/* Hide scrollbar for Chrome, Safari and Opera */
.main::-webkit-scrollbar {
    display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
/* * {
    -ms-overflow-style: none;
    scrollbar-width: none;
} */
</style>
