<template>
<div id="todos">
    <div class="todos">
        <div class="todo" v-for="items in todos">
            <i @click="deleteItem(items.name)" class="far fa-trash-alt" data-toggle="tooltip" data-placement="right" title="Delete Item"></i>
            <a>
                <span>
                    <p class="name">{{items.name}}</p>
                    <p>
                        
                        {{items.dueDate}}
                        
                    </p>
                </span>
                <span class="icons">
                    <p>
                        <i v-if="compareDates(items.dueDate)" class="overdue fas fa-exclamation-triangle" title="Overdue"></i> 
                    </p>
                    <p>
                        <i v-if="items.important" class="fas fa-exclamation" title="Important"></i> 
                    </p>
                </span>
                
                
            </a>
        </div>
        <div class="add-item" >
            <span @click="openPopup">
                Add Item
                <i class="fas fa-plus"></i>
            </span>
        </div>
    </div>
</div>
  
</template>

<script>

export default {
  name: 'todo',
  data: function () {
    return {
        todos: []
    }
  },
  methods: {
    openPopup: function(){
        var self = this

        new swal({
            title: 'Add Todo',
            html:
            `<input type="text" id="swal-input1" class="swal2-input" placeholder="Name">
                <input type="date" id="swal-input2" name="" id="" class="swal2-input">
                <span>
                <label for="swal-input3" >Important</label>
                <input type="checkbox" id="swal-input3" name="" id="" class="swal2-input">
                </span>
                `,
            preConfirm: function () {
            return new Promise(function (resolve) {
                resolve([
                $('#swal-input1').val(),
                $('#swal-input2').val()
                ])
            })
            },
            onOpen: function () {
            $('#swal-input1').focus()
            }
        }).then(function (result) {

            var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

            if(document.querySelector("#swal-input3").checked){
                var setImportant = true
            } else {
                var setImportant = false
            }

            var newItem = 
            {
            'name': result.value[0],
            'dueDate': result.value[1],
            'important': setImportant
            };

            oldItems.push(newItem);
            self.todos = oldItems
            localStorage.setItem('itemsArray', JSON.stringify(oldItems));
        })
    },
    ArrayToJson: function(){
        var todos = localStorage.getItem('itemsArray');
        if(todos != null) {
            todos = JSON.parse(todos);
        } else{
            todos = [{
                name: 'Add a new note to get started',
                important: true
            }];
        }

        this.todos = todos;
    },
    ArrayToStorage: function(){
        localStorage.setItem("itemsArray", JSON.stringify(this.todos) )
    },
    deleteItem: function(item){

        var self = this

        var olditems = JSON.parse(localStorage.getItem('itemsArray')) || []
        console.log(item)
        $.each(olditems, function (indexInArray, valueOfElement) { 
            if (item === valueOfElement.name){
                olditems.splice(indexInArray, 1)
                console.log('delete this ' + item)
                self.todos = olditems
                self.ArrayToStorage()
            }
        });

        Swal.fire({
            toast: true,
            text: 'Todo Deleted',
            position: 'bottom-end',
        })
    },
    compareDates: function(date){
        var today = moment().format('L');
        
        if (moment(today).isAfter(date)){
            return true;
        }
    },
  },
  mounted (){
    this.ArrayToJson();
  }
}
</script>

<style scoped>
    p{
        margin: 4px 0;
    }

    p.name{
        font-size: 14px;
    }

    .todos{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .todo{
        position: relative;
        border-left: 1px solid transparent;
        padding: 6px 12px;
        background: var(--widget-background);
        border-radius: 12px;
        box-shadow: var(--shadow);
        transition: 0.4s;
        user-select: none;
    }

    .todo:hover{
        transform: translateY(-6px);
    }

    .add-item span{
        flex-direction: row;
        justify-content: flex-end;
    }

    .add-item{
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
    }

    .add-item span i{
        padding-left: 12px;
        display: flex;
        align-items: center;
    }
    /* .todo:hover{
        border-left: 1px solid var(--primary);
    } */

    .fa-trash-alt{
        position: absolute;
        top: 18px;
        right: 12px;
        opacity: 0;
        transition: 0.2s;
    }

    .todo:hover .fa-trash-alt{
        opacity: 1;
    }

    .fa-exclamation{
        color: var(--brand-red);
    }

  span{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  a{
    display: flex;
    justify-content: space-between;
  }

  .icons{
    flex-direction: row;
    padding-right: 16px;
  }

  .icons p{
    width: 30px;
    text-align: center;
    font-size: 24px;
  }

  .fa-exclamation-triangle{
    color:#ed5565;
  }
</style>
