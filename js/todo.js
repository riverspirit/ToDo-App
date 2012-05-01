window.empty_element_present = false;
var todo = function(){
    this.empty_cells = [];

    if (localStorage.getItem('todo_data') == null)
    {
        var todo_data = [];
        localStorage.setItem('todo_data', JSON.stringify(todo_data));
    }

    this.clearStorage = function()
    {
        localStorage.clear();
        window.location.reload();
    }

    this.saveToDo = function(this_todo)
    {
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        console.log(this_todo.value);
        if (todo_data == null)
        {
            todo_data = [];
        }

        todo_data[this_todo.name] = this_todo.value;
        
        //this.empty_cells.splice(this_todo.name, 1);
        if (this_todo.value)
        {
            this.empty_cells[this_todo.name] = undefined;
        }
        else
        {
            this.empty_cells[this_todo.name] = 'empty';
        }

        console.log('count - '+this.countEmptyCells());

        localStorage.setItem('todo_data', JSON.stringify(todo_data));
    }

    this.showToDoCells = function()
    {
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        for (this_todo_index in todo_data)
        {
            var val = todo_data[this_todo_index];
            //console.log(this_todo_index+' > '+val);

            document.write('<input type="text" name="'+this_todo_index+'" onkeyup="todoObj.saveToDo(this)" onkeypress="todoObj.catchKeyPress(event, this)" value="'+val+'" /><br/>');
        }
    }


    this.addNewToDo = function()
    {
        console.log('addnew '+this.empty_cells);
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        var next_index = todo_data.length;

        if (next_index == undefined)
        {
            next_index = 0;
        }

        this.empty_cells[next_index] = 'empty';
        console.log(this.empty_cells);
        var newCell = document.createElement('input');
        newCell.type = 'text';
        newCell.name = next_index;
        newCell.setAttribute('onkeyup', 'todoObj.saveToDo(this)');
        newCell.setAttribute('onkeypress', 'todoObj.catchKeyPress(event, this)');

        var container = document.getElementById('container');
        container.appendChild(newCell);

    }

    this.catchKeyPress = function(event, element)
    {
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        //console.log('catchkeypress '+window.empty_element_present);
        
        if (element.value != '' && event.keyCode == 13 && this.countEmptyCells() == 0) // enter key
        {
            this.addNewToDo();
        }
    }
    
    this.countEmptyCells = function()
    {
        var count = 0;
        for (var cell in this.empty_cells)
        {
            if (this.empty_cells[cell] == 'empty')
            {
                count++;
            }
        }
        return count;
    }
}

var todoObj = new todo;