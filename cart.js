var cart = [];
const TAX = 0;

function getCart() {
	let cart = getCookie('cart');
	if (cart) return JSON.parse(cart);
	return [];
}

/**
 * 
 * @param {Array} cart 
 */
async function printCart(cart) {
	const itemList = document.getElementsByClassName('cart-body')[0];
	const subTotalSpan = document.getElementById('sub-total');
	const totalSpan = document.getElementById('total');
	let subTotal = 0;

	if (cart.length === 0) {
		let errorAlert = document.createElement('h1');
		errorAlert.setAttribute('style', 'color: red; font-weight: bold; text-align: center;')
		errorAlert.innerText = 'Your cart is empty ...'
		itemList.parentElement.parentElement.appendChild(errorAlert)
		document.getElementById('checkout-btn').disabled = true;
		return;
	}

	itemList.innerHTML = "";
	for (item of cart) {
		const product = await getProductByIdAndSize(item.itemid, item.size);
		if (product) {
			let row = document.createElement('tr');

			let heading = document.createElement('th');
			heading.className = 'item-remove';
			let removeBtn = document.createElement('a');
			removeBtn.className = 'link-orange';
			removeBtn.innerHTML = `<i class="fas fa-minus-square"></i>`;
			removeBtn.addEventListener('click', function () {
				let removeItemModal = document.getElementById('remove-item-modal');
				removeItemModal.style.display = "block";
				let closeModal = document.getElementById('close-remove-item-modal');
				closeModal.onclick = () => removeItemModal.style.display = "none";
				let cancelModal = document.getElementById('cancel-remove-btn');
				cancelModal.onclick = () => removeItemModal.style.display = "none";
				let removeItemBtn = document.getElementById('remove-item-btn');
				removeItemBtn.onclick = () => {
					itemList.removeChild(row);
					removeItemModal.style.display = "none"
					updateCart();
				}
			})
			heading.appendChild(removeBtn);
			row.appendChild(heading);

			let itemIdData = document.createElement('td');
			itemIdData.innerHTML = `<strong class="item-id">${item.itemid}</strong>`;
			row.appendChild(itemIdData);
			let itemProductData = document.createElement('td');
			itemProductData.innerHTML = `
			<div class="item-product">
				<span class="img-wrap">
					<img src="${product.imageurl || 'ImgSource/logo/logo-black.png'}" alt="image">
				</span>
				<span>${product.name}</span>
			</div>
			`
			row.appendChild(itemProductData);

			let itemSizeData = document.createElement('td');
			itemSizeData.innerHTML = `<strong class="item-size">${item.size}</strong>`;
			row.appendChild(itemSizeData);

			let itemPriceData = document.createElement('td');
			itemPriceData.innerHTML = `<strong class="item-price">$${product.price.toFixed(2)}</strong>`;
			row.appendChild(itemPriceData);

			let itemQuantityData = document.createElement('td');
			let itemQuantityInput = document.createElement('input');
			itemQuantityInput.className = 'item-quantity';
			itemQuantityInput.type = 'number';
			itemQuantityInput.name = 'quantity';
			itemQuantityInput.min = 1;
			itemQuantityInput.max = product.quantity;
			itemQuantityInput.value = item.quantity;
			itemQuantityInput.addEventListener('input', function () {
				const newQuantity = itemQuantityInput.value;
				itemPriceTotalData.innerHTML = `<strong class="item-total">$${(product.price * newQuantity).toFixed(2)}`
				updateCart();
			})
			itemQuantityData.appendChild(itemQuantityInput);
			row.appendChild(itemQuantityData)

			let itemPriceTotalData = document.createElement('td');
			itemPriceTotalData.innerHTML = `<strong class="item-total">$${(product.price * item.quantity).toFixed(2)}</strong>`;
			row.appendChild(itemPriceTotalData);

			itemList.appendChild(row);
			subTotal += product.price * item.quantity;
		}
	}
	subTotalSpan.innerText = `$${subTotal.toFixed(2)}`;
	totalSpan.innerText = `$${(subTotal + TAX).toFixed(2)}`;
}

function updateCart() {
	let subTotal = 0;
	let newCart = [];
	const itemList = document.getElementsByClassName('cart-body')[0].children;
	const subTotalSpan = document.getElementById('sub-total');
	const totalSpan = document.getElementById('total');

	for (item of itemList) {
		const itemid = item.querySelector('.item-id').innerHTML;
		const size = item.querySelector('.item-size').innerHTML;
		const quantity = item.querySelector('.item-quantity').value;
		const itemTotalPrice = parseFloat(item.querySelector('.item-total').innerHTML.substring(1));
		subTotal += parseFloat(itemTotalPrice);
		newCart.push({ itemid, size, quantity })
	}

	subTotalSpan.innerText = `$${subTotal.toFixed(2)}`;
	totalSpan.innerText = `$${(subTotal + TAX).toFixed(2)}`;
	setCookie("cart", JSON.stringify(newCart), 1);
}

function checkout() {
	let cartFormModal = document.getElementById('cart-form-modal');
	cartFormModal.style.display = 'block';
	let closeModal = document.getElementById('close-cart-form-modal');
	closeModal.onclick = () => cartFormModal.style.display = "none";
	let cancelModal = document.getElementById('cancel-cart-form-btn');
	cancelModal.onclick = () => cartFormModal.style.display = "none";
}

function submitOrder() {
	if (checkInputOrder()) {
		let cartFormModal = document.getElementById('cart-form-modal');
		let orderSuccessAlert = document.getElementById('order-success-alert');
		const name = document.getElementById('cart-name').value.trim();
		const email = document.getElementById('cart-email').value.trim();
		const phoneno = document.getElementById('cart-phonenumber').value.trim();
		const note = document.getElementById('cart-note').value.trim();
		const order = { name, email, phoneno, note, itemIdList: getCart() }
		console.log(JSON.stringify(order));
		postOrder(order)
			.then(res => {
				console.log(res);
				setTimeout(() => { cartFormModal.style.display = 'none'; }, 2000);
				orderSuccessAlert.style.display = 'block';
			}).catch(err => {
				console.log(err);
			})

	}
}

function checkInputOrder() {
	checkName();
	checkEmail();
	checkPhoneNumber();
	return checkName() && checkEmail() && checkPhoneNumber();
}

function checkName() {
	const regex = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
	let cartName = document.getElementById('cart-name').value;
	let nameAlert = document.getElementById('name-alert');
	if (!regex.test(cartName) || cartName.trim().length == 0) {
		nameAlert.innerHTML = "Ex. James Stephen"
		nameAlert.style.display = 'block';
	} else {
		nameAlert.innerHTML = "";
		nameAlert.style.display = 'none';
	}
	return regex.test(cartName) && cartName.trim().length > 0;
}

function checkEmail() {
	const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let cartEmail = document.getElementById('cart-email').value;
	let emailAlert = document.getElementById('email-alert');
	if (!regex.test(cartEmail) || cartEmail.trim().length == 0) {
		emailAlert.innerHTML = "Ex. example@gmail.com"
		emailAlert.style.display = 'block';
	} else {
		emailAlert.innerHTML = "";
		emailAlert.style.display = 'none';
	}
	return regex.test(cartEmail) && cartEmail.trim().length > 0;
}

function checkPhoneNumber() {
	const regex = /^\d{10}$/;
	let cartPhoneNumber = document.getElementById('cart-phonenumber').value;
	let phonenumberAlert = document.getElementById('phonenumber-alert');
	if (!regex.test(cartPhoneNumber)) {
		phonenumberAlert.innerHTML = "Ex. 0839050683";
		phonenumberAlert.style.display = 'block';
	} else {
		phonenumberAlert.innerHTML = "";
		phonenumberAlert.style.display = 'none';
	}
	return regex.test(cartPhoneNumber)
}

window.onload = async function () {
	cart = getCart();
	await printCart(cart);
}