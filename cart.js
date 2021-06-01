function getCart() {
    let cart = getCookie('cart');
    return JSON.parse(cart);
}

/**
 * 
 * @param {Array} cart 
 */
function printCart(cart) {
	const itemList = document.getElementsByClassName('cart-body')[0];
	itemList.innerHTML = "";
	cart.forEach(product => {
		const id = product.id;
		const size = product.size;
		const quantity = product.quantity;
		itemList.innerHTML += `
		<tr>
			<th class="item-remove">
				<a href="#" class="link-orange" onclick="removeProduct(${id})">
					<i class="fas fa-minus-square"></i>
				</a>
			</th>
			<td>
				<div class="item-product">
					<span class="img-wrap">
						<img src="ImgSource/item-1.jpg" alt="image">
					</span>
					<span>Rubber Dumbell</span>
				</div>
			</td>
			<td><strong class="item-size">${size}</strong></td>
			<td><strong class="item-price">$75.00</strong></td>
			<td><input type="number" name="quantity" min="1" value="${quantity}"></td>
			<td><strong class="item-total">$75.00</strong></td>
		</tr>
		`
	})
}

function updateCart(){

}

function removeProduct(productId) {
	console.log(productId);
}

function checkOut() {

}

window.onload = function () {
    let cart = getCart();
    printCart(cart);
}