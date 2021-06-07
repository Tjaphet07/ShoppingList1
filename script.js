const alert = document.querySelector('.status');
const form = document.querySelector('.form-control');
const groceryItem = document.getElementById('grocery-item');
const submitBtn = document.querySelector('.submit-btn');
const list = document.querySelector('.grocery-list');
const groceryListItems = document.querySelector('.grocery-list-items');


form.addEventListener('submit', addItems);

function addItems(e) {
    e.preventDefault();
    const value = groceryItem.value;
    if(value !== '' && value.length <= 13) {
        list.style.visibility = 'visible';
        groceryListItems.innerHTML += `
            <li>
                <h4>${value}</h4>
                <div class="btn-conatainer">
                    <button id="del" class="fas fa-trash"></button>
                </div>
                </li>
        `;

        displayAlert('item successfully added', 'green');
        setDefaults();
    }  
    else if(value.length > 13) {
        displayAlert('enter an item here', 'red');
    }
    else if(value == '') {
        displayAlert('please enter an item', 'red');
    }
} 

function displayAlert(text, action) {
    alert.style.visibility = 'visible';
    alert.textContent = text;
alert.classList.add(`status-${action}`);

setTimeout(function(){
    alert.textcontent = '';
    alert.classList.remover(`status-${action}`);
    }, 1000);
}

function deleteItem(e) {
    if(e.target.id === 'del') {
        e.target.parentElement.parentElement.remove();
        displayAlert('item successfully removed', 'red');
    }
}

groceryListItems.addEventListener('click', deleteItem);