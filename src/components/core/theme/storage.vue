<template>
    <div id="storage">
        <div class="storage">
            <h2>Total: <span>{{totalSize}}</span></h2>
        </div>
        <table>
            <tbody>
                <tr v-for="(item, index) in storageItems" class="item">
                    <td class="name">

                        <div>
                            {{item.name}}
                        </div>
                        
                    </td>

                    <td class="length">
                        
                        <div>
                            {{getLength(item.content, index)}}
                        </div>
                        
                    </td>

                    <td class="warning">
                        
                        <div v-if="item.warningMsg != null">
                            {{item.warningMsg}}
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div v-else></div>
                        
                    </td>

                    <td class="delete" @click="deleteItem(item.name)">
                        
                        <div>
                            <i class="far fa-trash-alt" title="Delete"></i>
                        </div>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'storage',
    props: {
    },
    data: function () {
        return {
            storageItems: this.getItems(),
            totalSize: this.getTotal()
        }
    },
    mounted() {
    },
    methods: {
        getItems: function () {
            var keys = Object.keys(localStorage);
            var i = keys.length;

                var items = []
            while (i--) {
                var item = {
                    name: keys[i],
                    content: localStorage.getItem(keys[i])
                }
                items.push(item);
            }
            return items;
            

        },
        getLength: function(str, index){
            var size = encodeURI(str).split(/%..|./).length - 1;
            size = size / 1000;


            if(size > 1000){
                this.storageItems[index].warningMsg = 'Please consider compressing and re-uploading images'
            }

            return size.toLocaleString('en', {useGrouping:true}) + ' kb';
        },
        getTotal: function(){
            var size = new Blob(Object.values(localStorage)).size;
            size = Math.round(size / 1000);
            return size.toLocaleString('en', {useGrouping:true}) + ' kb';
        },
        deleteItem: function(name){
            localStorage.removeItem(name);
            this.storageItems = this.getItems();
        }
    },
}
</script>

<style scoped>

.storage span{
    color: var(--primary);
}

table{
    width: 100%;
    border-spacing: 0px;
}

td {
    padding: 0;
    font-size: 12px;
}

td>div {
    padding: 8px 12px;
    background: #ffffff3b;
    margin: 4px 0;
    display: flex;
    align-items: center;
    height: 24px;
}

td.name{
    width: 150px;
    text-transform: capitalize;
}

td.name>div {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
td.length{
    width: 100px;
}
td.length>div {
    justify-content: end;
}

td.warning>div {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

td.delete{
    width: 42px;
}

td.delete>div{
    border-radius: 10px;
    color: white;
    background: var(--brand-red);
    padding: 4px;
    border: 4px solid var(--background);
    justify-content: center;
}
.warning{
    color: var(--brand-red);
    font-weight: calc(var(--font-weight) + 200) !important;
}

.warning i {
    font-size: 16px;
    padding-left: 4px;
}
</style>