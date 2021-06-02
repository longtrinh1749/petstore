var slideIndex = 1;
var products = [];

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("slide");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

function addToCart(productId, productSize) {
	const quantity = parseInt(document.querySelector('.product-description .product-quantity label input').value);
	let cart = getCookie("cart");
	let product;
	cart = JSON.parse(cart);
	if (!cart) {
		product = { itemid: productId, size: productSize, quantity };
		setCookie("cart", JSON.stringify([product]), 1);
	} else if (Array.isArray(cart)) {
		if (cart.length == 0) {
			product = { itemid: productId, size: productSize, quantity };
			setCookie("cart", JSON.stringify([product]), 1);
		} else {
			product = cart.find(item => item.itemid == productId && item.size == productSize);
			if (!product) {
				product = { itemid: productId, size: productSize, quantity };
				setCookie("cart", JSON.stringify([...cart, product]), 1);
			} else {
				product.quantity = parseInt(product.quantity) + quantity;
				setCookie("cart", JSON.stringify(cart), 1);
			}
		}
	}
	window.location.href = "cart.html";
}

function showProducts() {
	let productContainer = document.getElementsByClassName('product-container')[0];
	if (products.length === 0) {
		let errorAlert = document.createElement('h1');
		errorAlert.style.color = "red";
		errorAlert.style.fontWeight = "bold";
		errorAlert.style.textAlign = "center";
		errorAlert.innerText = "Product not found ...";
		let errorImg = document.createElement('img');
		errorImg.src = "ImgSource/test_img/product_not_found.gif";
		productContainer.appendChild(errorImg);
		productContainer.appendChild(errorAlert);
		productContainer.style.flexDirection = "column";
		productContainer.style.justifyContent = "center";
		productContainer.style.alignItems = "center";
		return;
	}
	productContainer.innerHTML = "";
	productContainer.innerHTML += `
		<div class="product-gallery">
			<div class="slides">
				<div class="slide fade">
					<img src="${products[0].imageurl === "" ? "./ImgSource/shop_img_1.jpg" : products[0].imageurl}" alt="pd" style="width: 100%;">
				</div>
				<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
				<a class="next" onclick="plusSlides(1)">&#10095;</a>
			</div>
			<div class="dots" style="text-align:center">
				<span class="dot active" onclick="currentSlide(1)"></span>
			</div>
		</div>
		<div class="product-description">
			<h2 class="title">${products[0].name}</h2>
			<div class="price">
				${products[0].discount > 0 ? `<span>$${products[0].price.toFixed(2)}</span> $${(products[0].price - products[0].price * products[0].discount / 100).toFixed(2)}` : `$${products[0].price.toFixed(2)}`}
			</div>
			<p class="description">
				${products[0].description}
			</p>
			<div class="product-highlight">
				<h5><strong>Size</strong></h5>
				<div class="custom-choose">
				</div>
			</div>
			<div class="product-quantity">
				<label for="quantity">
					Quantity
					<input type="number" name="quantity" min="1" max="${products[0].quantity}" value="1" oninput="checkQuantity(${products[0].quantity})">
				</label>
				<div class="add-to-cart">
					Add To Cart
					<i class="fas fa-shopping-bag"></i>
				</div>
			</div>
		</div>
	`
	let customSizeDiv = productContainer.querySelector('.custom-choose');
	for (let i = 0; i < products.length; i++) {
		let p = products[i];
		let sizeRadioInput = document.createElement('input');
		sizeRadioInput.type = "radio";
		sizeRadioInput.id = i;
		sizeRadioInput.value = p.size;
		sizeRadioInput.name = "size";
		sizeRadioInput.addEventListener('click', function () {
			changeSize(i);
		})
		if (i == 0) sizeRadioInput.checked = "true";

		let sizeLabel = document.createElement('label');
		sizeLabel.setAttribute('for', i);
		sizeLabel.innerText = p.size;

		customSizeDiv.appendChild(sizeRadioInput);
		customSizeDiv.appendChild(sizeLabel);
	}
	let addToCartBtn = document.querySelector('.product-description .product-quantity .add-to-cart')
	addToCartBtn.onclick = function () {
		addToCart(products[0].id, products[0].size)
	}

	showSlides(slideIndex);
}

function changeSize(index) {
	let priceDiv = document.querySelector('.product-description .price');
	let quantityInput = document.querySelector('.product-description .product-quantity label input');
	let addToCartBtn = document.querySelector('.product-description .product-quantity .add-to-cart')

	priceDiv.innerHTML = products[index].discount > 0
		? `<span>$${products[index].price.toFixed(2)}</span> 
		$${(products[index].price - products[index].price * products[index].discount / 100).toFixed(2)}`
		: `$${products[index].price.toFixed(2)}`

	quantityInput.setAttribute('max', products[index].quantity)
	quantityInput.addEventListener('input', function () {
		checkQuantity(products[index].quantity)
	})
	quantityInput.value = 1;
	addToCartBtn.onclick = function () {
		addToCart(products[index].id, products[index].size)
	}
}

function checkQuantity(quantity) {
	let quantityInput = document.querySelector('.product-description .product-quantity label input');
	const value = quantityInput.value;
	if (value > quantity) {
		quantityInput.value = quantity;
	} else if (value < 1) {
		quantityInput.value = 1;
	}
}

window.onload = async function () {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	const name = urlParams.get('name');
	if (id) {
		products = await getProductsById(id);
	} else if (name) {
		products = await getProductsByName(name);
	}
	// products = getSampleProducts();
	showProducts();
}