<template>
    <div class="tray">
        <div v-if="playlist != null" class="header">
            <i @click="closePlaylist" class="fa-solid fa-xmark"></i>
            <img :src="playlist.images[0].url" alt="">
            <div class="info">
                <p class="playlist-name">{{ playlist.name }}</p>
                <p class="playlist-details">{{ playlist.tracks.total}} songs</p>
            </div>
        </div>
        <div v-if="playlist != null" class="list">
            <song v-for="(song, index) in playlist.tracks.items" 
            :track="song.track" 
            :parent-uri="playlist.uri" 
            :index="index"
            :cover="song.track.album.images[2].url"
            :artist-name="song.track.artists[0].name"
            :track-name="song.track.name"
            :id="song.track.id"
            
            ></song>
        </div>
    </div>
   
</template>

<script>

    import loader from '@/components/utilities/loading.vue';
    import song from './track.vue';

    export default {
        name: 'spotify',
        data: function () {
            return {
                playlist: null
            }
        },
        props: {
            playlistId: Number
        },
        mounted () {
            this.getPlaylist();

            //this.scrollPlayingSongIntoView();
        },
        methods: {
            getPlaylist: function(){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getPlaylist?id=" + self.playlistId,
                    success: function (response) {
                        self.playlist = JSON.parse(response);
                        self.scrollPlayingSongIntoView();
                    }
                });
            },
            closePlaylist: function(){
                this.$emit("close-playlist");
            },
            scrollPlayingSongIntoView: function (){
                

                setTimeout(() => {
                    var elem = this.$el.querySelector('.track.playing');

                    if(elem == null)
                        return;

                    var topPos = elem.offsetTop
                    scrollTo(this.$el, topPos - 100); 
                }, 100);
                  
                
                    
                function scrollTo(element, to) {
                    element.scrollTop = to;
                }
            }
        },
        watch: {
            playlistId: function (value, oldValue) { 
                this.playlist = null;
                this.getPlaylist();
            }
        },
        components: {
            loader,
            song
        },
    }
</script>

<style scoped>


.fa-xmark{
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 22px;
    color: var(--brand-red);
}

.header{
    padding-top:12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.header img{
    height: 180px;
}

.info{
    text-align: center;
}
.playlist-name{
    font-size: 22px;
}
.info p{
    margin: 8px 0;
}

.list{
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: revert;
    padding-bottom: 8px;
}
</style>