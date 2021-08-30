let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Blue Ribbon Toaster White Bread 700g',
        tag: 'bread',
        price: 13,
        inCart: 0
    }, 
    {
        name: 'Darling Fresh Full Cream Milk Bottle 2L',
        tag: 'milk',
        price: 28,
        inCart: 0
    }, 
    {
        name: 'Classic 1 Tomatoes Pack 1kg Valid',
        tag: 'tomatoes',
        price: 39,
        inCart: 0
    }, 
    {
        name: 'Strawberries Pack 400g',
        tag: 'strawberries',
        price: 49,
        inCart: 0
    }, 
    {
        name: 'Nulaid Extra Large Eggs 18 Pack',
        tag: 'eggs',
        price: 42,
        inCart: 0
    }, 
    {
        name: 'BUTTERIFIC BUTTER SPREAD 500GR',
        tag: 'butter',
        price: 62,
        inCart: 0
    } 
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers) 
    { localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsIncart');
    cartItems =  JSON.parse(cartItems);
   
    if(cartItems != null) {

       if(cartItems[product.tag] == undefined) {
           cartItems = {
               ...cartItems,
               [product.tag]: product
           }
           }
           cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
     cartItems = {
        [product.tag]: product
         }
    }
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" 
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">
                $${item.inCart * item.price},00
                </div>
            `;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
        Basket Total
    </h4>
    <h4 class="basketTotal">
    $${cartCost},00
    </h4>
    `;
}
}
onLoadCartNumbers();
displayCart();