window.onload = function () {
    let cart = getCart();
    printCart(cart);
}

function getCart() {
    let cart = getCookie('cart');
    return JSON.parse(cart);
}

/**
 * 
 * @param {Array} cart 
 */
function printCart(cart) {

}

function removeProduct(productId) {
    
}