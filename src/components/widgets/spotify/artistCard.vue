<template>

    <div :class="isPlaying ? 'artist playing' : 'artist'">
        <div class="thumb">
            <img :src="artist.images[2].url" :alt="artist.name">
            <i class="fa-solid fa-circle-play"></i>
        </div>

        <p class="name" @click="openArtist" :title="artist.name">{{ artist.name }}</p>
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
            artist: Object
        },
        mounted () {
            setInterval(() => {
                this.isPlaying = window.currentlyPlayingContent == this.artist.uri;
            }, 500);
        },
        methods: {
            openArtist: function(){

                this.$emit("artist-open", this.artist.id);
            },
        },
        components: {
            loader,
        },
    }
</script>

<style scoped>

.artist{
    background: #272727;
    border-radius: 6px;
    padding: 10px;
    transition: 0.2s;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.664);
    width: 140px;
}

.artist.playing {
    color: var(--spotify-green);
    font-weight: 600;
}
.artist:hover{
    transform: translateY(-6px);
}
.artist img{
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 100px;
    box-shadow: 0px 2px 12px 0px black;
}

.name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    text-align: center;
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