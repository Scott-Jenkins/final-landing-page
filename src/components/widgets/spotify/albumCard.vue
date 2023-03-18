<template>
    
    <div :class="isPlaying ? 'album playing' : 'album'">
        <div class="thumb">
            <img :src="album.images[1] != null ? album.images[1].url : album.images[0].url" :alt="album.name">
            <i @click="playalbum" class="fa-solid fa-circle-play"></i>
        </div>
        
        <p class="name" @click="openAlbum">{{ album.name }}</p>
        <p class="author">{{ releaseDate }}</p>
    </div>
        
</template>

<script>

    import loader from '@/components/utilities/loading.vue'

    export default {
        name: 'spotify',
        data: function () {
            return {
                isPlaying: false,
                releaseDate: ''
            }
        },
        props: {
            album: Object
        },
        mounted () {
            setInterval(() => {
                this.isPlaying = window.currentlyPlayingContent == this.album.uri;
            }, 500);
        },
        methods: {
            openAlbum: function(){
                this.$emit("open-album", this.album.id);
            },
            playalbum: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/play",
                    data: {
                        "context_uri": self.album.uri,
                        "position": 0
                    },
                });
            },
        },
        computed: {
            releaseDate: function () {
                return moment(this.album.release_date).format('YYYY');
            }
        },
        components: {
            loader,
        },
    }
</script>

<style scoped>

.album{
    background: #272727;
    border-radius: 10px;
    padding: 10px;
    transition: 0.2s;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.664);
    width: 120px;
}
.album.playing {
    color: var(--spotify-green);
    font-weight: 600;
}
.album:hover{
    transform: translateY(-6px);
}
.album img{
    width: 120px;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 0px black;
}
.name{
    overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
}
.name:hover{
    text-decoration: underline;
    cursor: pointer;
}
.author{
    opacity: 0.6;
    user-select: none;
}

.thumb{
    position: relative;
    display: flex;
    justify-content: center;
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

</style>