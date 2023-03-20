<template>
<div class="colour-options">
    <div class="colour">
        <label>Primary</label>
        <span>
            <input type="color" v-model="theme.primary" @change="updateTheme">
            <input type="text" v-model="theme.primary" @change="updateTheme">
        </span>
    </div>
    <div class="colour">
        <label>Background</label>
        <span>
            <input type="color" v-model="theme.background" @change="updateTheme">
            <input type="text" v-model="theme.background" @change="updateTheme">
        </span>
    </div>
    <div class="colour">
        <label>Font Colour</label>
        <span>
            <input type="color" v-model="theme.font" @change="updateTheme">
            <input type="text" v-model="theme.font" @change="updateTheme">
        </span>
    </div>
    <div class="colour">
        <label>Widget Background</label>
        <span>
            <input type="color" v-model="theme.widgetBackground" @change="updateTheme">
            <input type="text" v-model="theme.widgetBackground" @change="updateTheme">
        </span>
    </div>
    <div class="colour">
        <label>Font Weight</label>
        <span>
            <input type="number" v-model="theme.fontWeight" @change="updateTheme" step="100" min="100" max="900"> 
        </span>
    </div>
    
</div>
 <hr/>

    <h3>Box Shadow</h3>
    <div class="colour-options">
        <div class="shadow-option">
            <label>X</label>
            <input type="number" v-model="theme.shadow.x" @change="updateTheme">
        </div>
        <div class="shadow-option">
            <label>Y</label>
            <input type="number" v-model="theme.shadow.y" @change="updateTheme">
        </div>
        <div class="shadow-option">
            <label>Blur</label>
            <input type="number" v-model="theme.shadow.blur" @change="updateTheme">
        </div>
        <div class="shadow-option">
            <label>Spread</label>
            <input type="number" v-model="theme.shadow.spread" @change="updateTheme">
        </div>
        <div class="colour">
            <label>Colour</label>
            <span>
                <input type="color" v-model="theme.shadow.colour" @change="updateTheme">
                <input type="text" v-model="theme.shadow.colour" @change="updateTheme">
            </span>
        </div>
    </div>
    <hr/>

    <h3>Border Radius</h3>
    <div class="colour-options">
        <div class="shadow-option">
            <label>PX</label>
            <input type="number" v-model="theme.borderRadius" @change="updateTheme">
        </div>
    </div>

</template>

<script>
import {getTheme, setTheme} from "/src/helper.js";
export default {
  name: 'color-scheme',
  data: function () {
    return {
      theme: getTheme()
    }
  },
  methods: {
    updateTheme: function(){
        setTheme(this.theme);
    }
  }
}
</script>

<style scoped>
    .colour{
        display: flex;
        flex-direction: column;
    }

    .colour label{
        padding-bottom: 6px;
    }

    .colour span{
        display: flex;
    }
    .colour span input[type="color"]{
        aspect-ratio: 1 / 1;
        aspect-ratio: 1 / 1;
        height: 40px;
        width: auto;
    }
    .colour span input, .shadow-option > *{
        border: none;
        background: #ffffff3b;
        color: var(--font);
        width: 100%;
        min-height: 38px;
    }

    .colour-options{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
    }

    .shadow-option{
        display: flex;
    }

    .shadow-option > *{
        height: 36px;
        text-align: right;
    }

    .shadow-option label{
        width: auto;
        padding: 1px 16px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>