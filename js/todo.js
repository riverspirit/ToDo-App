if (localStorage.getItem('todo_data') == null)
{
    var todo_data = [];
    localStorage.setItem('todo_data', JSON.stringify(todo_data));
}

function clearStorage()
{
    localStorage.clear();
    window.location.reload();
}

function saveToDo(todo)
{
    console.log('in saveToDo');
    var todo_data = JSON.parse(localStorage.getItem('todo_data'));
    console.log(todo_data);
    if (todo_data == null)
    {
        todo_data = [];
    }
    
    todo_data[todo.name] = todo.value;
    
    localStorage.setItem('todo_data', JSON.stringify(todo_data));
}

function showToDoCells()
{
    var count = 1;
    var todo_data = JSON.parse(localStorage.getItem('todo_data'));
    for (this_todo_index in todo_data)
    {
        var val = todo_data[this_todo_index];
        console.log(this_todo_index+' > '+val);
        
        document.write('<input type="text" name="'+this_todo_index+'" onkeyup="saveToDo(this)" value="'+val+'" /><br/>');
    }
}


function addNewToDo()
{
    console.log('addNewToDo called')
    var todo_data = JSON.parse(localStorage.getItem('todo_data'));
    var next_index = todo_data.length;

    if (next_index == undefined)
    {
        next_index = 0;
    }
    //var newCell = '<div class="cell"><input type="text" name="'+next_index+'" onkeyup="saveToDo(this)" /></div>';
    var newCell = document.createElement('input');
    newCell.type = 'text';
    newCell.name = next_index;
    //newCell.keyup = saveToDo(this);
    newCell.addEventListener('keyup', saveToDo(newCell));
    var container = document.getElementById('container');
    //container.innerHTML = container.innerHTML + newCell;
    container.appendChild(newCell);
}

function al(x) {alert(x)}

document.getElementsByTagName('input').addEventListener('click', al('kk'));