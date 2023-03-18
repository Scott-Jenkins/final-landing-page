<template>

    <div class="bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" v-model="query" @keyup="search" placeholder="What do you want to listen to?">
        <i class="fa-solid fa-xmark" @click="query = null"></i>
        <div v-if="query != null && resultsOpen" class="results" @blur="resultsOpen = null">


            <h4>Tracks</h4>
            <div class="tracks">
               

                <song 
                    v-if="trackResults != null"
                    v-for="(song, index) in trackResults.items" 
                    :track="song" 
                    :parent-uri="song.album.uri" 
                    :index="index"
                    :cover="song.album.images[2].url"
                    :track-name="song.name"
                    :id="song.id"
                    @open-album="openAlbum"
                ></song>
            </div>

            <h4>Artists</h4>
            <div class="artists">
                <artistCard 
                        v-if="artistResults != null" 
                        v-for="artist in artistResults.items" 
                        :artist="artist" 
                        @artist-open="openArtist"
                ></artistCard>
            </div>
            
            <h4>Albums</h4>
            <div class="albums">
                <albumCard 
                    v-if="albumResults != null"
                    v-for="album in albumResults.items" 
                    :album="album"
                    @open-album="openAlbum">
                </albumCard>
            </div>

            <h4>Playlists</h4>
            <div class="playlists">
                <playlistCard 
                    v-if="playlistResults != null"
                    v-for="playlist in playlistResults.items" 
                    :playlist="playlist"
                    @playlist-open="openPlaylist">
                </playlistCard>
            </div>
            
        </div>
    </div>
   
</template>

<script>

    import loader from '@/components/utilities/loading.vue'
    import artistCard from './artistCard.vue';
    import song from './track.vue';
    import playlistCard from './playlistCard.vue';
    import albumCard from './albumCard.vue';

    export default {
        name: 'track',
        data: function () {
            return {
                query: null,
                resultsOpen: false,
                artistResults: null,
                trackResults: null,
                playlistResults: null,
                albumResults: null
            }
        },
        props: {
        },
        mounted () {

        },
        methods: {
            search: function(){
                var self = this;

                this.resultsOpen = true;

               
                $.ajax({
                    url: "/api/spotify/search?type=track,album,artist,playlist&limit=8&q=" + self.query,
                    success: function (response) {

                        response = JSON.parse(response);

                        self.artistResults = response.artists;
                        self.trackResults = response.tracks;
                        self.playlistResults = response.playlists;
                        self.albumResults = response.albums;
                    }
                });

                $(".results", this.$el).blur(function (e) { 
                    self.query = null;
                });
            },
            openArtist: function(id){
                this.resultsOpen = false;
                this.query = null;
                this.$emit("open-artist", id);
            },
            openAlbum: function(id){
                this.resultsOpen = false;
                this.query = null;
                this.$emit("open-album", id);
            },
            openPlaylist: function(id){
                this.resultsOpen = false;
                this.query = null;
                this.$emit("open-playlist", id);
            }
        },
        computed: { 

        },
        components: {
            loader,
            artistCard,
            song,
            playlistCard,
            albumCard
        },
    }
</script>

<style scoped>
.bar{
    background-color: white;
    padding: 4px 12px;
    border-radius: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    margin: 0 20px;
    color: #272727;
    position: relative;
}

.bar input{
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    width: 100%;
}

h4{
    margin: 0;
    color: white;
    padding: 0 10px;
}

.results{
    position: absolute;
    left: 24px;
    width: calc(100% - 58px);
    height: 570px;
    background: #272727;
    padding: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    top: 32px;
    z-index: 10;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.664);
    animation-delay: 0.2s;
    animation: slideIn 0.2s;
    overflow-y: auto;
}
@keyframes slideIn {
    from { 
        height: 0;
    }
    to   { 
        height: 400px;
    }
}

.artists, .albums, .playlists{
    display: flex;
    gap: 8px;
    overflow-x: auto;
}

/deep/ .artists .artist, /deep/ .albums .album, /deep/ .playlists .playlist{
    background: none;
    width: 78px;
    box-shadow: none;
    color: white;
}

/deep/ .artists .artist img, /deep/ .albums .album img, /deep/ .playlists .playlist img{
    height: 78px;
    width: 78px;
}


.tracks{
    display: flex;
    color: white;
    flex-direction: column;
    max-height: 150px;
    overflow: hidden;
}

/deep/ .name{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

/deep/ .author{
    display: none;
}
</style>