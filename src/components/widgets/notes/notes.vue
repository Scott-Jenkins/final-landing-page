<template>
    <div>
        <h2>Notes</h2>

        <div class="notes">
            <div class="note"></div>
            <div class="add note">
                <i class="fas fa-plus"></i>
            </div>
        </div>

        
    </div>
    
</template>

<script>
export default {
  name: 'notes',
  props:{
  },
  methods:{
        
    },
}
</script>

<style scoped>

    .note {
        background: wheat;
        min-width: 200px;
        max-width: 800px;
        height: 200px;
        border-bottom-right-radius: 50px;
        position: relative;
        padding: 20px;
        color: #333;
    }

        .note::before {
            position: absolute;
            background: #00000021;
            border-bottom-right-radius: 50px;
            width: 50px;
            height: 50px;
            bottom: 0px;
            right: 0px;
            content: "";
        }


        .note:after {
            position: absolute;
            background: #00000021;
            border-bottom-right-radius: 50px;
            width: 50px;
            height: 50px;
            bottom: 0px;
            right: 0px;
            content: "";
        }

        .notes{
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
        }
</style>
div 