<template>
    <div id="spotify">
        <div v-if="loggedIn == false" class="logged-out">
            <i class="fa-brands fa-spotify"></i>
            <a href="/api/spotify/login" class="btn">
                Login
            </a>
        </div>
        <app v-else @logged-out="loggedIn = false"></app>
    </div>
    
</template>

<script>
import $ from "jquery";
    import app from './app.vue';

    export default {
        name: 'spotify',
        data: function () {
            return {
                loggedIn: false
            }
        },
        props: {
        },
        mounted () {
            var self = this;
            $.ajax({
                url: "/api/spotify/isLoggedIn",
                success: function (response) {
                    self.loggedIn = response;
                }
            });
            
        },
        methods: {
            
        },
        components: {
            app,
        },
    }
</script>

<style>
#spotify{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    --spotify-green: #1db954;
    --spotify-black: #191414;
    background: var(--spotify-black);
    color: white;
    min-height: 650px;
    position: relative;
}

#spotify *::-webkit-scrollbar-thumb {
    background-color: #363636;
}

#spotify .section{
    margin-bottom: 24px;
}

#spotify .btn{
    color: white !important;
    text-decoration: none;
    background: #1db954;
    padding: 6px 16px;
    border-radius: 4px;
}

#spotify .logged-out{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 42px;
}

#spotify .logged-out i{
    color: var(--spotify-green);
    font-size: 120px;
}

#spotify *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

#spotify.expanded .player{
    position: absolute;
    top: 68px;
    width: calc(100% - 40px);
    height: calc(100% - 134px);
    flex-direction: column;
    background: rgb(39,39,39);
    background: linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(25,20,20,1) 70%);
    border: none;
}

#spotify.expanded .player .currently-playing{
    width: 80%;
    flex-direction: column;
    text-align: center;
}

#spotify.expanded .player .currently-playing .thumb{
    width: 100%;
    height: auto;
}

#spotify.expanded .player .currently-playing .thumb .fa-circle-chevron-up{
    rotate: 180deg;
}

#spotify.expanded .player .currently-playing .thumb img{
    height: auto;
}

#spotify.expanded .player .currently-playing .time{
    padding-top: 12px;
}
</style>