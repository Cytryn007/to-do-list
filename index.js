var newListButton = document.getElementById('new-list');
var data = [];
var createUniqueId = function (uniqueId) {
    var possibleCharacters = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM0123456789';
    for (var i = 0; i < 12; i++) {
        var charIndex = Math.floor(Math.random() * possibleCharacters.length);
        uniqueId += possibleCharacters[charIndex]        
    }
    return uniqueId;
};

function TasksList() { //konstruktor
    this.content = this.createList();
}

TasksList.prototype.createList = function () {
    var list = document.createElement('ul');
    
    //metoda push dodaje do tablicy
    //metoda pop usuwa z tablicy

   var uniqueId = createUniqueId('list');
   data.push({
       listId: uniqueId,
       todos: [],
   });
    list.setAttribute('id', uniqueId);
    list.classList.add('list');
    this.createButton(list);
    document.getElementById('app').appendChild(list);
    return list;
}

TasksList.prototype.createButton = function (list) {
    var button = document.createElement('button');
    button.classList.add('button');
    button.innerHTML = 'dodaj zadanie';
    list.appendChild(button);

    var addNewTask = function () {
        console.log(this);
        var title = prompt('wpisz tytuł zadania'); // wywołuje pole do wpisywania
        new Task(title, 'przygotować się do szkoły', false, 3, list);
    };

    button.addEventListener('click', addNewTask.bind(this));
}


newListButton.addEventListener('click', function(){
    new TasksList();
    
    localStorage.setItem('data', JSON.stringify(data));
});

// var list = new TasksList();
// var list2 = new TasksList();
// var list3 = new TasksList();

// new TasksList();
// new TasksList();
// new TasksList();


// console.log(list, list2, list3); //pojawia się w konsoli

function Task(header, text, state, id, list) {
    this.header = header;
    this.text = text;
    this.state = state;
    this.id = id;
    this.list = list;

   

    this.create();
}

Task.prototype.create = function () {
    var uniqueId = createUniqueId('item'); 
    var task = {
        header: this.header,
        id: uniqueId,
        text: this.text,
    };
    var id = this.list.id;
    
    data.forEach(function (item) {
        if (item.listId === id) {
            return item.todos.push(task);
        }
    });

    var element = document.createElement('li');
    var label = document.createElement('label');
    label.setAttribute('for', uniqueId);
    // label.innerHTML = 'ok';
    var box = document.createElement('input');
    box.type = 'checkbox';
    box.setAttribute('id', uniqueId);
    var headerbox = document.createElement("span");
    headerbox.innerHTML = this.header;
    element.appendChild(headerbox);
    element.insertAdjacentElement('afterbegin', label);
    element.insertAdjacentElement('afterbegin', box);
    this.list.appendChild(element);
}

data = JSON.parse(localStorage.getItem('data')) || [];

data.forEach(function (list) {
    new TasksList(list.listId);
})

console.log(JSON.parse(localStorage.getItem('data')));