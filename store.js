if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready(){

    var removeCartItemButtons = document.getElementsByClassName('remove-item')
    for (var remove = 0; remove < removeCartItemButtons.length; remove++) {
        var button = removeCartItemButtons[remove]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputButton = document.getElementsByClassName('cart-quantity-input')
    for (var quantity = 0; quantity < quantityInputButton.length; quantity++) {
        var quantityInput = quantityInputButton[quantity]
        quantityInput.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart')
    for (var add = 0; add < addToCartButtons.length; add++) {
        var addtocart = addToCartButtons[add]
        addtocart.addEventListener('click', addToCartClick)
    }

}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal(){
    var addToCartItemButtons = document.getElementsByClassName('td')[0]
    var cartRows = addToCartItemButtons.getElementsByClassName('cart-Info')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        console.log(cartRow)
        var priceElement = cartRow.getElementsByClassName('shop-item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseInt(priceElement.innerText.replace('₱', '').replace(',', ''))
        var quantity = quantityElement.value
        subtotal = total + (price * quantity)
        total = total + (price * quantity) + 200
        
    
    }

    if(subtotal > 20000){
       total = total - 200
    }
    if (quantity < 1) {
        console.log('mababa sir')
        
    }
    console.log(quantity)
    console.log(subtotal)
   
    document.getElementsByClassName('cart-sub-price')[0].innerText = '₱ ' + numberWithCommas(subtotal)
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱ ' + numberWithCommas(total)
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
       
    }
   
    updateCartTotal()
}

function addToCartClick(event){
    var addcart = event.target
    var shopitem = addcart.parentElement
    var itemname = shopitem.getElementsByClassName('item-name')[0].innerText
    var itemprice = shopitem.getElementsByClassName('add-to-cart')[0].innerText
    var itemimage = shopitem.getElementsByClassName('item-image')[0].src
    AddtoDisplayCart(itemname, itemimage, itemprice)
    updateCartTotal()
    console.log(updateCartTotal())
}

function AddtoDisplayCart(itemname, itemimage, itemprice){
    var toCart = document.createElement('div')
    var cartitem = document.getElementsByClassName('td')[0]
    var cartitemname = document.getElementsByClassName('shop-item-title')
    for (var i = 0; i < cartitemname.length; i++){
        if(cartitemname[i].innerText == itemname){
            alert('item is in the cart already!')
            return
        }
    }
    var cartInfoContent = `
        <tr>
        <td>
            <div class="cart-Info">
            <img class="shop-item-image" src="${itemimage}" height="100" width="100">
            <div class="cart-Detail">
                <p class="shop-item-title">${itemname}</p>
                <small class="shop-item-price">${itemprice}</small><br>
                <input class="cart-quantity-input" type="number" value="1">
                <button class="remove-item" type="button">Remove</button>
            </div>
            </div>
        </td>
        </tr>`
    toCart.innerHTML = cartInfoContent
    cartitem.append(toCart)
    toCart.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem)
    toCart.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateCartTotal)

}