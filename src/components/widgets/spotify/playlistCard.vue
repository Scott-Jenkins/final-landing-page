<template>
    
    <div :class="isPlaying ? 'playlist playing' : 'playlist'">
        <div class="thumb">
            <img :src="playlist.images[1] != null ? playlist.images[1] .url : playlist.images[0] .url" :alt="playlist.name">
            <i @click="playPlaylist" class="fa-solid fa-circle-play"></i>
        </div>
        <div class="info">
            <p class="name" @click="openPlaylist">{{ playlist.name }}</p>
            <p class="author">By {{ playlist.owner.display_name }}</p>
        </div>
        
    </div>
        
</template>

<script>

    import loader from '@/components/utilities/loading.vue'

    export default {
        name: 'spotify',
        data: function () {
            return {
                isPlaying: false
            }
        },
        props: {
            playlist: Object
        },
        mounted () {
            setInterval(() => {
                this.isPlaying = window.currentlyPlayingContent == this.playlist.uri;
            }, 500);
        },
        methods: {
            openPlaylist: function(){
                this.$emit("playlist-open", this.playlist.id);
            },
            playPlaylist: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/play",
                    data: {
                        "context_uri": self.playlist.uri,
                        "position": 0
                    },
                });
            },
        },
        components: {
            loader,
        },
    }
</script>

<style scoped>

.playlist{
    background: #272727;
    border-radius: 6px;
    padding: 10px;
    transition: 0.2s;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.664);
    display: flex;
    flex-direction: column;
}
.playlist.playing {
    color: var(--spotify-green);
    font-weight: 600;
}
.playlist:hover{
    transform: translateY(-6px);
}
.playlist img{
    height: 120px;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 0px black;
}

.name:hover{
    text-decoration: underline;
    cursor: pointer;
}
.author{
    opacity: 0.6;
    user-select: none;
    margin: 0;
}

.thumb{
    position: relative;
    display: flex;
}

.thumb i{
    opacity: 0;
    position: absolute;
    bottom: 0;
    right: 10px;
    color: var(--spotify-green);
    font-size: 42px;
    filter: drop-shadow(2px 4px 6px #0000007a);
    transition: 0.2s;
}

.thumb:hover i{
    opacity: 1;
    bottom: 10px;
}

.info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

</style>