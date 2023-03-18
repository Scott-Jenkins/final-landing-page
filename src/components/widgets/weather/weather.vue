<template>
<div id="weather">
    <loader v-if="currentWeather == null"/>
    <div v-else>
        <h1 class="title">{{currentWeather.name}}</h1>

        <span class="temp">
            {{truncNum(currentWeather.main.temp)}}
            <img :src="returnImg(currentWeather.weather[0].icon)">
        </span>
        <p class="description">{{currentWeather.weather[0].description}}</p>
        
        <span class="hi-low">
            <p>Lows of {{truncNum(currentWeather.main.temp_min)}}</p>
            <p>Highs of {{truncNum(currentWeather.main.temp_max)}}</p>
            <p class="humidity">Humidity: {{currentWeather.main.humidity}}%</p>
        </span>
    </div>
    <div class="forecast">
        <forecast v-for="(item, index) in currentForecast" v-bind:weather="item" v-bind:simple="isSimple" :index="index"/>
    </div>
    <!-- <div class="footer" @click="toggleSimple()"> 
        <div v-if="isSimple">
            <i class="fas fa-angle-down"></i>
            Show More
        </div>
        <div v-else>
            <i class="fas fa-angle-up"></i>
            Show Less
        </div>
    </div> -->
</div>
</template>

<script>

import forecast from './forecast.vue';
import loader from '@/components/utilities/loading.vue'

export default {
    name: 'Weather',
    components: {
        forecast,
        loader
    },
    data: function () {
        return {
            display: true,
            longitude: null,
            latitude: null,
            currentWeather: null,
            currentForecast: null,
            isSimple: true,
        }
    },
    mounted () {
        this.getLocation();
        this.isSimpleView();
    },
    methods:{
        getLocation: function() {
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
            }
        },
        showPosition: function(position) {
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
        
            var self = this;
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?APPID=ea8837df503db1cc47357bc3289f366e&lat="+ this.latitude +"&lon="+ this.longitude +"&units=metric",
                context: document.body
            }).done(function(content) {
                self.currentWeather = content;
                localStorage.setItem("location", content.name);
            });

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?APPID=ea8837df503db1cc47357bc3289f366e&lat="+ this.latitude +"&lon="+ this.longitude +"&units=metric",
                context: document.body
            }).done(function(content) {
                var forecast = [];
                for (let index = 0; index < content.list.length; index += 8) {
                    forecast.push(content.list[index]);
                }
                self.currentForecast = forecast;
            });
        },
        returnImg: function(img){
            return "http://openweathermap.org/img/wn/" + img + ".png"
        },
        truncNum: function(num){
            return Math.trunc(num) + "°C";
        },
        isSimpleView: function(){
            var view = localStorage.getItem("weatherSimple");

            if (view != null)
                this.isSimple = view;
        },
        toggleSimple: function(){
            this.isSimple = !this.isSimple;
            localStorage.setItem("weatherSimple", this.isSimple);
        }
    },
}
</script>

<style scoped>
    #weather{
        position: relative;
        padding-bottom: 36px;
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #weather::before{
        background-image: url("/src/assets/weatherBg.jpg");
        background-position: center;
        opacity: 0.4;
        content: " ";
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        height: 100%;
        border-radius: var(--border-radius);
    }

    .temp{
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .forecast{
        margin: 0 -20px -36px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }

    .footer{
        padding: 6px 24px;
        cursor: pointer;
        z-index: 48;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>

