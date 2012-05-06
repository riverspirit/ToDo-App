/**
 * Simple todo list
 * 
 * @author Saurabh aka JSX <saurabh@rebugged.com>
 * @license MIT License
 * http://rebugged.com/
 * 
 */
var todo = function(){
    this.empty_cells = [];

    if (localStorage.getItem('todo_data') == null)
    {
        var todo_data = [];
        localStorage.setItem('todo_data', JSON.stringify(todo_data));
    }
    

    this.clearStorage = function()
    {
        var clearConfirm = confirm("Delete all the items?");
        if (clearConfirm)
        {
            localStorage.clear();
            window.location.reload();
        }
    }
    

    this.saveToDo = function(this_todo)
    {
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        if (todo_data == null)
        {
            todo_data = [];
        }

        todo_data[this_todo.name] = this_todo.value;
        
        if (this_todo.value)
        {
            this.empty_cells[this_todo.name] = undefined;
        }
        else
        {
            this.empty_cells[this_todo.name] = 'empty';
        }

        localStorage.setItem('todo_data', JSON.stringify(todo_data));
    }


    this.showToDoCells = function()
    {
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        for (this_todo_index in todo_data)
        {
            var val = todo_data[this_todo_index];
            if (val)
            {
                document.write('<div class="todoCellDiv" id="cellDiv-'+this_todo_index+'">\n\
                                <input type="text" name="'+this_todo_index+'" onkeyup="todoObj.saveToDo(this)" onkeypress="todoObj.catchKeyPress(event, this)" value="'+val+'" />\n\
                                <input type="button" class="todoStatus" name="status-'+this_todo_index+'" onclick="todoObj.changeTodoStatus(this)" value="" />\n\
                                </div>');
            }
            
        }
    }


    this.addNewToDo = function()
    {
        var todo_data = JSON.parse(localStorage.getItem('todo_data'));
        var next_index = todo_data.length;

        if (next_index == undefined)
        {
            next_index = 0;
        }

        if (this.countEmptyCells() == 0)
        {
            this.empty_cells[next_index] = 'empty';
            var newCell = document.createElement('input');
            newCell.type = 'text';
            newCell.name = next_index;
            newCell.setAttribute('onkeyup', 'todoObj.saveToDo(this)');
            newCell.setAttribute('onkeypress', 'todoObj.catchKeyPress(event, this)');

            var todoStatusBtn = document.createElement('input');
            todoStatusBtn.type = 'button';
            todoStatusBtn.className = 'todoStatus';
            todoStatusBtn.name = 'status-'+next_index;
            todoStatusBtn.style.marginLeft = '5px';
            todoStatusBtn.setAttribute('onclick', 'todoObj.changeTodoStatus(this)');

            
            var todoCellDiv = document.createElement('div');
            todoCellDiv.className = "todoCellDiv";
            todoCellDiv.id = 'cellDiv-'+next_index;
            todoCellDiv.appendChild(newCell);
            todoCellDiv.appendChild(todoStatusBtn);
            

            var container = document.getElementById('container');
            container.appendChild(todoCellDiv);
        }
        //this.highlightEmptyCells('spotlight');
    }

    this.catchKeyPress = function(event, element)
    {
        this.unHighlightCells('spotlight');
        var shiftPressed = event.shiftKey ? true : false;
        
        if (event.keyCode == 13 && element.value != '' && element.tagName == 'INPUT')
        {
             // Add a new todo box when enter key is pressed
            this.addNewToDo();
        }
        else if (event.keyCode == 46 && !element.value && element.tagName == 'INPUT')
        {
            // If the cell is empty and delete key is pressed, the cell is deleted
            var container = document.getElementById('container');
            var cellDiv = document.getElementById('cellDiv-'+element.name);
            container.removeChild(cellDiv);
            this.empty_cells[element.name] = undefined;
        }
        else if (event.keyCode == 46 && shiftPressed && element.tagName == 'INPUT')
        {
            // If shift + delete is pressed, the cell is deleted even if it is not empty
            var deleteConfirm = confirm("Delete this entry?");
            if (deleteConfirm)
            {
                var todo_data = JSON.parse(localStorage.getItem('todo_data'));
                todo_data[element.name] = '';
                localStorage.setItem('todo_data', JSON.stringify(todo_data));
                var container = document.getElementById('container');
                var cellDiv = document.getElementById('cellDiv-'+element.name);
                container.removeChild(cellDiv);
                this.empty_cells[element.name] = undefined;
            }
        }
        else if (event.charCode == 78 && shiftPressed)
        {
            // Shift + N to add new todo cell
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
    
    this.highlightEmptyCells = function(highlightClass)
    {
        var all_cells = document.getElementsByTagName('input');
        for (var cell in all_cells)
        {
            if (!all_cells[cell].value)
            {
                all_cells[cell].classList.add(highlightClass);
                all_cells[cell].focus();
            }
        }
    }
    
    this.unHighlightCells = function(classToBeRemoved)
    {
        var cells = document.getElementsByTagName('input');
        for (var cell in cells)
        {
            if (cells.hasOwnProperty(cell))
            {
                cells[cell].classList.remove(classToBeRemoved);
            }
        }
    }
    
    this.getListName = function(element)
    {
        var listName = prompt("Enter name for the list:-");
        if (listName)
        {
            element.innerHTML = listName;
            var todo_app_data = JSON.parse(localStorage.getItem('todo_app'));
            if (!todo_app_data)
            {
                todo_app_data = {};
            }
            todo_app_data.listName = listName;
            localStorage.setItem('todo_app', JSON.stringify(todo_app_data));
        }
    }
    
    this.setListName = function()
    {
        var todo_app_data = JSON.parse(localStorage.getItem('todo_app'));
        if (todo_app_data && todo_app_data.listName)
        {
            document.getElementById('listName').innerHTML = todo_app_data.listName;
        }
    }
    
    this.changeTodoStatus = function(element)
    {
        if (element.className == 'todoStatus')
        {
            element.classList.remove('todoStatus');
            element.classList.add('todoCompleted');
        }
        else if (element.className == 'todoCompleted')
        {
            element.classList.remove('todoCompleted');
            element.classList.add('todoStatus');
        }
        //console.log(element.className)
    }
}

var todoObj = new todo;
if(document.readyState === 'complete')
{
    todoObj.setListName();
}
else
{
    window.addEventListener('DOMContentLoaded', function() {todoObj.setListName();}, false);
}

