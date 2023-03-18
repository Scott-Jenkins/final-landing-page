<template>
  <div class="day small" :data-index="index">
    <span class="header">
      <div class="day-of-week">
          {{getDate(weather.dt)}}
      </div>
      <span class="temp">
          {{truncNum(weather.main.temp)}}
          <img :src="returnImg(weather.weather[0].icon)">
      </span>
    </span>
    
    <span class="hi-low">
      <p>Lows of {{truncNum(weather.main.temp_min)}}</p>
      <p>Highs of {{truncNum(weather.main.temp_max)}}</p>
      <p class="humidity">Humidity: {{weather.main.humidity}}%</p>
    </span>
    
  </div>
</template>

<script>
export default {
  name: 'forecast',
  props:{
    weather: Object,
    simple: Boolean,
    index: Number
  },
  methods:{
        getDate: function(value) {
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
          var dayNum = new Date(value * 1000).getDay();
          return days[dayNum];
        },
        returnImg: function(img){
            return "http://openweathermap.org/img/wn/" + img + ".png";
        },
        truncNum: function(num){
            return Math.trunc(num) + "°C";
        }
    },
}
</script>

<style scoped>

.day{
    padding: 20px;
    box-shadow: var(--shadow);
    position: relative;
    z-index: 1;
    user-select: none;
}

.day[data-index="4"], .day[data-index="4"]:before{
  border-bottom-right-radius: var(--border-radius);
}

.day[data-index="0"], .day[data-index="0"]:before{
  border-bottom-left-radius: var(--border-radius);
}

.day:before{
    opacity: 0.6;
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: 100%;
    background:var(--background);
    z-index: -1;
}
.day > *{
  z-index: 2;
}
.day-of-week{
    font-size: 18px;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temp{
  font-size: 26px;
  display: flex;
  align-items: center;
  padding-left: 12px;
}

/* .small{
  width: 50px;
} */

.small .header{
  flex-direction: column-reverse;
}

.small .header > *{
  font-size:12px;
}
.hi-low{
  opacity: 0;
  top: calc(100% - 28px);
  transition: 0.4s;
  display: block;
  position: absolute;
  background: var(--background);
  padding: 4px 14px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
}

.hi-low:before{
  content: "";
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 12px 16px;
    border-color: transparent transparent var(--background) transparent;
}
.day:hover .hi-low{
  opacity: 1;
  top: calc(100% - 10px);
  
}
</style>
