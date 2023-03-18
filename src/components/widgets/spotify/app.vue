<template>
    <div class="header">
        <i class="fa-brands fa-spotify"></i>
        
        <searchBar 
            @open-artist="openArtist"
            @open-album="openAlbum"
            @open-playlist="openPlaylist"
        ></searchBar>

        <div v-if="user != null" class="user">
            
            <div class="dropdown" @click="userMenuOpen = !userMenuOpen" >
                <i class="fa-solid fa-caret-down"></i>
                <p>{{ user.display_name }}</p> 
                <img :src="user.images[0].url" alt="">
            </div>
            <div :class="userMenuOpen ? 'menu open' : 'menu'">
                <span @click="logOut">
                    <i class="fa-solid fa-right-from-bracket"></i>Logout
                </span>
                
            </div>
        </div>
    </div>
    <div class="body">

        <recentlyPlayed
            @open-album="openAlbum"
        ></recentlyPlayed>

        <artist-tray
            v-if="artistTrayOpen && artistTrayId != null"    
            :artistId="artistTrayId"  
            @close-artist="artistTrayOpen = false"
            @open-album="openAlbum"
        ></artist-tray>

        <playlist-tray 
            v-if="playlistTrayOpen && playlistTrayId != null" 
            :playlistId="playlistTrayId" 
            @close-playlist="playlistTrayOpen = false"
        ></playlist-tray>

        <album-tray 
            v-if="albumTrayOpen && albumTrayId != null" 
            :albumId="albumTrayId" 
            @close-album="albumTrayOpen = false"
        ></album-tray>
        
        <user-playlists @playlist-open="openPlaylist"></user-playlists>

        <user-artists @artist-open="openArtist"></user-artists>
    </div>
    <!-- <top-artists></top-artists> -->
    

    <song-tray @open-artist="openArtist" @open-album="openAlbum" @open-playlist="openPlaylist" @logged-out="loggedOut"></song-tray>
</template>

<script>

    import loader from '@/components/utilities/loading.vue'
    import songTray from './songTray.vue'
    import recentlyPlayed from './recentlyPlayed.vue'
    import userPlaylists from './userPlaylists.vue'
    import userArtists from './userArtists.vue'
    import playlistTray from './playlistTray.vue'
    import artistTray from './artistTray.vue'
    import albumTray from './albumTray.vue'
    import searchBar from './searchBar.vue'

    export default {
        name: 'spotify',
        data: function () {
            return {
                user: null,
                userMenuOpen: false,
                playlistTrayOpen: false,
                playlistTrayId: null,
                artistTrayOpen: false,
                artistTrayId: null,
                albumTrayOpen: false,
                albumTrayId: null,
            }
        },
        props: {
        },
        mounted () {
            this.getUser();

            $("<script/>", {
                src: "https://sdk.scdn.co/spotify-player.js"
            }).appendTo("body");

            window.onSpotifyWebPlaybackSDKReady = () => {
                const token = getCookie("SpotifyAccess");
                const player = new Spotify.Player({
                    name: 'Web Player',
                    getOAuthToken: cb => { cb(token); },
                });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });

                player.addListener('authentication_error', ({ message }) => {
                    console.error(message);
                });

                player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });

                // document.getElementById('togglePlay').onclick = function() {
                // player.togglePlay();
                // };
                player.connect();
            }
            
        },
        methods: {
            getUser: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getUser",
                    success: function (response) {
                        response = JSON.parse(response);

                        if(response.error){
                            return;
                        }

                        self.user = response;
                    }
                });
            },
            openPlaylist: function(id){
                this.playlistTrayId = id;
                this.playlistTrayOpen = true;

                // this.artistTrayOpen = false;
                // this.artistTrayId = null;
            },
            openArtist: function(id){
                this.artistTrayOpen = true;
                this.artistTrayId = id;

                // this.playlistTrayId = null;
                // this.playlistTrayOpen = false;
            },
            openAlbum: function(id){
                this.albumTrayOpen = true;
                this.albumTrayId = id;

                // this.playlistTrayId = null;
                // this.playlistTrayOpen = false;

                // this.artistTrayOpen = false;
                // this.artistTrayId = null;
            },
            loggedOut: function (){
                this.$emit('logged-out');
            },
            logOut: function(){
                $.ajax({
                    url: "/api/spotify/logout",
                });

                this.$emit('logged-out');
            }
            
        },
        components: {
            loader,
            songTray,
            userPlaylists,
            userArtists,
            playlistTray,
            artistTray,
            albumTray,
            searchBar,
            recentlyPlayed
        },
    }
</script>

<style scoped>

.header{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.fa-spotify{
    color: var(--spotify-green);
    font-size: 32px;
}

.user{
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
}

.user img{
    height: 36px;
    border-radius: 36px;
}

.body{
    position: relative;
    height: 100%;
    /*max-height: 600px;*/
    overflow-y: auto;
    overflow-x: hidden;
}

.tray{
    position: absolute;
    top: 0;
    right: -20px;
    height: 100%;
    width: calc(100% + 16px);
    max-width: 450px;
    background: var(--spotify-black);
    z-index: 1;
    box-shadow: -8px 0px 12px -6px rgb(0 0 0 / 66%);
    padding: 0 12px;
    display: block;
    overflow-y: auto;
    animation: fadein 0.4s;
    scroll-behavior: smooth;
}
@keyframes fadein {
    from { 
        opacity: 0; 
        width: 0;
    }
    to   { 
        opacity: 1; 
        width: calc(100% + 16px);
    }
}
.dropdown{
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 4px 16px;
    border-radius: 8px;
    transition: 0.2s;
    cursor: pointer;
    position: relative;
    top: -10px;
}

.dropdown:hover{
    box-shadow: 0px 2px 12px 0px rgb(0 0 0 / 66%);
    background: #272727;
}
.menu{
    position: absolute;
    top: 44px;
    right: 0;
    width: 180px;
    background: #272727;
    padding: 12px 12px;
    border-radius: 8px;
    z-index: 10;
    font-size: 14px;
    align-items: center;
    gap: 10px;
    flex-direction: row-reverse;
    box-shadow: 0px 2px 12px 0px rgb(0 0 0 / 66%);
    display: none;
}

.menu > *{
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 10px;
    font-size: 12px;
    padding: 4px 0;
    cursor: pointer;
    user-select: none;
}

.menu.open{
    display: flex;
}
</style>