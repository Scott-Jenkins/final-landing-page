<template>
<div>
    <input type="text" v-model="user.name" @change="updateName()">
    <p>It is currently <span>{{minutes}}</span> minutes past <span>{{hour}}</span> in the <span>{{timeOfDay}}</span></p>
</div>
</template>

<script>
import {getUser, setUser} from "/src/helper.js";

export default {
  name: 'time-overview',
  data: function () {
    return {
      user: getUser,
      minutes: null,
      hour: null,
      timeOfDay: null,
    }
  },
  methods: {
    getTime: function(){

        var d = new Date();
        this.hour = d.getHours();
        this.minutes = d.getMinutes();

        if (this.hour >= 0) 
            this.timeOfDay = "morning";
    
        if (this.hour > 12) 
            this.timeOfDay = "afternoon";
    
        if (this.hour > 17)
            this.timeOfDay = "evening";
    
        if (this.hour > 12)
            this.hour = this.hour - 12;
    },
    updateName: function (){
        var user = getUser;

        user.name = this.user.name;

        setUser(user);
    }
  },
  mounted (){
    this.getTime();

    setInterval(() => {
        this.getTime();
    }, 5000);
  }
}
</script>

<style scoped>
  span{
    color: var(--primary);
  }

  p{
    font-size: 24px;
    user-select: none;
  }

  input{
    background: none;
    border: none;
    color: var(--font);
    font-size: 36px;
  }

  input:active, input:focus{
    border: none;
  }
</style>
