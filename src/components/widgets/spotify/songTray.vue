<template>
    <div v-if="playbackState != null" class="player">
        <div class="currently-playing">

            <div class="thumb">
                <img @click="openContext" :src="playbackState.item.album.images[1].url" alt="">
                <!-- <i @click="toggleExpanded" class="fa-solid fa-circle-chevron-up"></i> -->
            </div>

            <div class="info">
                <p @click="openAlbum" class="song-name">{{ playbackState.item.name }}</p>
                <p @click="openArtist" class="artist-name">{{ playbackState.item.album.artists[0].name }}</p>
            </div>

        </div>

        <div class="state">
            <div class="options">
                <i @click="toggleShuffle" :class="playbackState.shuffle_state == true ? 'fa-solid fa-shuffle active' : 'fa-solid fa-shuffle'"></i>

                <i @click="prevSong" class="fa-sharp fa-solid fa-backward-step"></i>

                <i @click="togglePlayback(true)" v-if="playbackState.is_playing == false" class="fa-solid fa-circle-play"></i>
                <i @click="togglePlayback(false)" v-else class="fa-sharp fa-solid fa-circle-pause"></i>

                <i @click="nextSong" class="fa-sharp fa-solid fa-forward-step"></i>

                <i @click="toggleRepeat" :class="playbackState.repeat_state == 'context' ? 'fa-solid fa-repeat active' : 'fa-solid fa-repeat'"></i>
            </div>
            

            <div class="time">

                <p>{{ currentTime }}</p>

                <div class="progress-bar">
                    <input type="range" class="slider" @change="changePosition" v-model="currentProgress" min="0" max="100">
                </div>

                <p>{{ currentDuration }}</p>

            </div>
        </div>
        <div class="volume">
            <span>
                <i :class="currentVolume" @click="setVolume(0)"></i>
                <input type="range" class="slider" @change="setVolume" v-model="playbackState.device.volume_percent" min="0" max="100">
            </span>
        </div>
    </div>
    <div @click="deviceTrayOpen = !deviceTrayOpen; getDevices();" @blur="deviceTrayOpen = false" class="device">
        Currently Playing On: {{playbackState != null ? playbackState.device.name : '' }}
        <div v-if="deviceTrayOpen" class="deviceTray">
            <div v-for="device in devices" :class="device.is_active ? 'device-item active' : 'device-item'" @click="setDevice(device.id)">
                <i :class="deviceClass(device.type)"></i>
                <p>
                    {{ device.name }}
                </p>
                
            </div>
        </div>
    </div>
</template>

<script>

    import loader from '@/components/utilities/loading.vue'

    export default {
        name: 'spotify',
        data: function () {
            return {
                playbackState: null,
                currentProgress : null,
                currentTime: null,
                currentDuration: null,
                devices: null,
                deviceTrayOpen: false
            }
        },
        props: {
        },
        mounted () {
            this.getPlayback();
            
            setInterval(() => {
                this.getPlayback();
            }, 1000);
        },
        methods: {
            getPlayback: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getPlayer",
                    timeout: 2000,
                    success: function (response) {

                        if(response == "")
                            return;

                        response = JSON.parse(response);
                        
                        if(response.error){
                            //self.$emit("logged-out");
                            return;
                        }
                            

                        self.playbackState = response;

                        if(response.item != null){
                            window.currentlyPlayingSong = response.item.id;
                            window.isCurrentlyPlaying = response.is_playing;
                            window.currentlyPlayingContent = response.context.uri;
                        }
                            
                    }
                });
                
            },
            togglePlayback: function(play){

                this.playbackState.is_playing = !this.playbackState.is_playing;

                $.ajax({
                    url: "/api/spotify/togglePlayback?play=" + play,
                });
            },
            prevSong: function(){
                $.ajax({
                    url: "/api/spotify/prev",
                });
            },
            nextSong: function(){
                $.ajax({
                    url: "/api/spotify/next",
                });
            },
            openArtist: function(){
                this.$emit("open-artist", this.playbackState.item.album.artists[0].id)
            },
            openAlbum: function(){
                this.$emit("open-album", this.playbackState.item.album.id)
            },
            openContext: function(){
                if(window.currentlyPlayingContent.startsWith("spotify:playlist:")){
                    this.$emit("open-playlist", window.currentlyPlayingContent.replace("spotify:playlist:", ""))
                } else {
                    this.$emit("open-album", window.currentlyPlayingContent.replace("spotify:album:", ""))
                }
            },
            changePosition: function(e){
                var percentage =  '0.' + ('00' + e.currentTarget.value).substr(-2);
                var newPosition = this.playbackState.item.duration_ms * percentage;

                $.ajax({
                    url: "/api/spotify/changePosition?position=" + Math.trunc(newPosition),
                });
            },
            setVolume: function(e){

                var val = e;

                if(e.currentTarget != null)
                    val = e.currentTarget.value
                
                $.ajax({
                    url: "/api/spotify/changeVolume?percent=" + val,
                });
            },
            setDevice: function(id){
                //console.log(id)
                $.ajax({
                    url: "/api/spotify/changeDevice",
                    data: {
                        id: id
                    }
                });
            },
            getDevices: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getDevices",
                    success: function (response) {
                        response = JSON.parse(response);
                        self.devices = response.devices;

                    }
                });
                
            },
            deviceClass: function(type){
                if(type == "Smartphone")
                    return"fa-solid fa-mobile";

                if(type == "Computer")
                    return"fa-solid fa-computer";

                return"fa-solid fa-headset";

            },
            toggleShuffle: function(){
                var self = this;

                $.ajax({
                    url: "/api/spotify/toggleShuffle?val=" + !this.playbackState.shuffle_state,
                });
            },
            toggleRepeat: function(){

                var self = this;

                $.ajax({
                    url: "/api/spotify/toggleRepeat?val=" + (self.playbackState.repeat_state == 'context' ? 'off' : 'context'),
                });
            },
            toggleExpanded: function (){
                $('#spotify').toggleClass('expanded')
            }
        },
        computed: {
            currentProgress: function () {
                if(this.playbackState == null)
                    return null;

                var percentage = (this.playbackState.progress_ms / this.playbackState.item.duration_ms) * 100;

                return percentage;
            },
            currentTime: function (){
                if(this.playbackState == null)
                    return null;

                var tempTime = moment.duration(this.playbackState.progress_ms);

                var seconds = tempTime.seconds();

                if(seconds < 10)
                    seconds = "0" + seconds;
                
                return tempTime.minutes() + ":" + seconds;
            },
            currentDuration: function (){
                if(this.playbackState == null)
                    return null;

                var tempTime = moment.duration(this.playbackState.item.duration_ms);
                
                var seconds = tempTime.seconds();

                if(seconds < 10)
                    seconds = "0" + seconds;
                
                return tempTime.minutes() + ":" + seconds;
            },
            currentVolume: function(){
                var v = this.playbackState.device.volume_percent;

                if(v > 70){
                    return "fa-solid fa-volume-high";
                } else if (v > 20){
                    return "fa-solid fa-volume-low";
                } else if (v > 0){
                    return "fa-solid fa-volume-off";
                } else{
                    return "fa-solid fa-volume-xmark";
                }
            }
        },
        components: {
            loader,
        },
    }
</script>

<style scoped>

.player{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 -20px -20px;
    padding: 20px;
    gap: 36px;
    background: #272727;
    border-top: 1px solid #343434;
}
.currently-playing{
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 220px;
    cursor: pointer;
    justify-content: space-between;
}

.currently-playing img, .currently-playing .thumb{
    height: 80px;
    position: relative;
}
.thumb .fa-circle-chevron-up{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    opacity: 0.6;
    display: none;
}

.thumb .fa-circle-chevron-up:hover{
    opacity: 1;
}

.currently-playing .thumb:hover .fa-circle-chevron-up{
    display: block;
}
.currently-playing .info{
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
}

.currently-playing .info p{
    margin: 0;
}

.currently-playing .info .song-name{
    font-size: 14px;
}

.currently-playing .info .artist-name{
    opacity: 0.6;
}
.state{
    width: 100%;
}

.state .options{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    font-size: 20px;
    width: 100%;
}

.state .fa-circle-play, .state .fa-circle-pause{
    font-size: 36px;
}

.state .fa-repeat, .state .fa-shuffle{
    opacity: 0.6;
    transition: 0.2s;
}
.state .fa-repeat:hover, .state .fa-shuffle:hover{
    opacity: 1;
}
.state i.active{
    color: var(--spotify-green);
    opacity: 1;
    position: relative;
}

.state i.active:after{
    content: "";
    width: 4px;
    height: 4px;
    background: var(--spotify-green);
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
}
.time{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
}
.time p{
    margin: 0;
}
.time .progress-bar{
    width: 100%;
    display: flex;
}
.slider{
    width: 100%;
    --track-color: rgba(255, 255, 255, 0.1);
}
input[type="range"] { 
    margin: auto;
    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    height: 12px;
    cursor: pointer;
    background: none;
}

input[type="range"]::-webkit-slider-runnable-track {
    background: var(--spotify-black);
    height: 6px;
    border-radius: 6px;
}
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px; /* 1 */
    height: 10px;
    background: var(--spotify-green);
    border-radius: 12px;
    position: relative;
    top: -2px;
}


.device{
    width: 100%;
    background: var(--spotify-green);
    margin: 0 -20px;
    position: relative;
    bottom: -22px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    padding: 4px 20px;
    font-size: 12px;
    cursor: pointer;
}

.deviceTray{
    position: absolute;
    bottom: 40px;
    left: 40px;
    width: 180px;
    background: #272727;
    padding: 12px 12px;
    border-radius: 8px;
    box-shadow: 0px 2px 12px 0px rgb(0 0 0 / 66%);
}

.deviceTray:after {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 24px solid #272727;
    position: absolute;
    bottom: -22px;
    filter: drop-shadow(0px 8px 14px rgb(0 0 0 / 66%));
}

.device-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 0;
    transition: 0.2s;
}

.device-item.active{
    color: var(--spotify-green);
}

.device-item:hover{
    transform: translateY(-4px);
}

.device-item p {
    margin: 0;
}

.device-item i{
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
}


.volume{
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding-bottom: 30px;
    width: 125px;
}
.volume span{
    display: flex;
    gap: 10px;
    width: 200px;
    align-items: center;
}
</style>