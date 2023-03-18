<template>
    <div class="searchArea">
        <input type="text" class="search" placeholder="Search Widgets" v-model="query" @keyup="searchWidgets">
        <div class="clear" @click="clearSearch">
            <i class="fas fa-times"></i>
            Clear
        </div>
    </div>
    <table class="widgets">
        <thead>
            <tr>
                <td class="name">
                    Name
                </td>
                <td class="width">
                    Width
                </td>
                <td class="order" @click="sortArray">
                    Order
                    <i class="fa fa-chevron-down"></i>
                </td>
                <td class="is-active">
                    Active
                </td>
            </tr>
        </thead>
        <tbody class="widget-table">

            <tr class="widget row" v-for="(component, index) in components" :style="'order: ' + component.order + '; width: ' + component.width + '%;'" :index="index">

                <td class="name">
                    <div>
                        <!--<i class="fa-solid fa-grip-vertical"></i>-->
                        {{ component.name }}
                    </div>
                </td>

                <td class="width">
                    <div>
                        <input type="range" v-model="component.width" @change="saveLayout()">
                        <input type="number" min="1" v-model="component.width" @change="saveLayout()">
                    </div>
                </td>

                <td class="order">
                    <div>
                        <input type="number" min="1" v-model="component.order" @change="saveLayout()">
                    </div>
                </td>

                <td class="isActive">
                    <div>
                        <div :class="component.active ? 'active on' : 'active'"
                            @click="component.active = !component.active" @change="saveLayout()"></div>
                    </div>
                </td>

            </tr>
        </tbody>

    </table>

</template>

<script>

export default {
    name: 'componentsLayout',
    props: {
        componentsOriginal: Array
    },
    data: function () {
        return {
            components: [],
            query: null
        }
    },
    methods: {
        saveLayout: function () {
            var widgets = JSON.stringify(this.components);
            localStorage.setItem("widgets", widgets);
        },
        searchWidgets: function () {
            var query = this.query;

            if (query == null || query == '') {
                $(".widget.row").show();
                return;
            }


            $(".widget.row").each(function (index, element) {
                var name = $(".name", this).text().toLowerCase();

                if (name.includes(query) == false)
                    $(this).hide()
                else
                    $(this).show()
            });
        },
        sortArray: function () {
            var rawObject = [];

            this.components.forEach(comp => {
                rawObject.push(comp);
            });

            rawObject.reverse();

            this.components = rawObject;
        },
        clearSearch: function () {
            this.query = null;
            this.searchWidgets();
        }
    },
    mounted() {
        var rawObject = [];// = this.componentsOriginal;

        // this.componentsOriginal.forEach(comp => {
        //     rawObject.push(comp);
        // });

        // rawObject = rawObject.sort(function (a, b) { return a.order - b.order; });
        // this.components = rawObject;
        this.components = this.componentsOriginal;
    },
    updated: function () {
        this.$nextTick(function () {

            var self = this;

            //dragula([document.querySelector('.widgets .widget-table')]).on('drop', function (el) {
                
            //    var index = $(el).attr("index");
            //    var sibling = $(el).next();
            //    var newIndex = sibling.attr("index")
            //    self.components[index].order = newIndex;
            //});

        })
    },
}
</script>

<style scoped>
.searchArea {
    position: relative;
    margin-bottom: 14px;
}

.widgets {
    width: 100%;
}

table {
    border-spacing: 0;
}

.search {
    width: -webkit-fill-available;
    background-color: #ffffff3b;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    padding: 8px 12px;
    color: var(--font);
}

.clear {
    position: absolute;
    right: 16px;
    top: 8px;
    color: var(--brand-red);
    font-weight: 800;
    cursor: pointer;
}

.row {
    color: var(--font);
    padding: 10px 16px;
    margin-bottom: 12px;
    border-radius: 8px;
    text-transform: capitalize;
    font-size: 12px;
}

label {
    padding-bottom: 12px;
}

.name {
    width: 150px;
    font-size: 12px;
}

.name .fa-grip-vertical {
    padding-right: 8px;
}

.active {
    background: grey;
    width: 48px;
    height: 24px;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    transition: 0.4s;
}

.active:before {
    content: " ";
    background: white;
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(100% - 4px);
    aspect-ratio: 1 / 1;
    border-radius: 100px;
}

.active.on {
    background: #48cfad;
}

.active.on:before {
    right: 2px;
    left: auto;
}

.order {
    align-items: flex-end;
}

.order i {
    font-size: 12px;
}

.order label {
    padding-right: 24px;
}

.width div {
    display: flex;
    align-items: center;
}

td {
    padding: 0;
}

td>div {
    padding: 8px 12px;
    background: #ffffff3b;
    margin: 4px 0;
    display: flex;
    align-items: center;
    height: 24px;
}

td.name>div {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    text-transform: capitalize;
}

td.isActive>div {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>
