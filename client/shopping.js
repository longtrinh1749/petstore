var productList = [];
var currentPage = 1;
const PRODUCTS_PER_PAGE = 12;

function sortProductList() {
	const TYPE = document.getElementById("sort-product").value;
	switch (TYPE) {
		case "1":
			productList.sort(compareName);
			break;
		case "2":
			productList.sort(compareDiscount);
			break;
		case "3":
			productList.sort(comparePriceAscending);
			break;
		case "4":
			productList.sort(comparePriceDescending);
			break;
		default:
			break;
	}
	changePage(1);
}

function compareName(productA, productB) {
	const nameA = productA.name.toUpperCase();
	const nameB = productB.name.toUpperCase();
	return nameA.localeCompare(nameB);
}

function compareDiscount(productA, productB) {
	const discountA = productA.discount;
	const discountB = productB.discount;
	return discountA === discountB
		? productA.name.localeCompare(productB.name)
		: discountB - discountA;
}

function comparePriceAscending(productA, productB) {
	const priceA = productA.price;
	const priceB = productB.price;
	return priceA === priceB
		? productA.name.localeCompare(productB.name)
		: priceA - priceB;
}

function comparePriceDescending(productA, productB) {
	const priceA = productA.price;
	const priceB = productB.price;
	return priceA === priceB
		? productA.name.localeCompare(productB.name)
		: priceB - priceA;
}

function addToCart(productId, productSize) {
	let product;
	let cart = getCookie("cart");
	cart = JSON.parse(cart);
	if (!cart) {
		product = { itemid: productId, size: productSize, quantity: 1 };
		setCookie("cart", JSON.stringify([product]), 1);
	} else if (Array.isArray(cart)) {
		if (cart.length == 0) {
			product = { itemid: productId, size: productSize, quantity: 1 };
			setCookie("cart", JSON.stringify([product]), 1);
		} else {
			product = cart.find(item => item.itemid === productId);
			if (!product) {
				product = { itemid: productId, size: productSize, quantity: 1 };
				setCookie("cart", JSON.stringify([...cart, product]), 1);
			} else {
				product.quantity += 1;
				setCookie("cart", JSON.stringify([...cart]), 1);
			}
		}
	}
	window.location.href = "cart.html";
}

function searchProducts() {
	let input = document.getElementById("product-to-search");
	let value = input.value.trim();
	if (value === "") return;
	window.location.href = `product.html?name=${value}`
}

function autocomplete(input) {
	var currentFocus;
	const limit = 5;
	input.addEventListener("input", function (e) {
		const val = this.value.toLowerCase();
		const result = productList.filter(product => product.name.toLowerCase().includes(val));
		closeAllLists();
		if (!val) return false;
		currentFocus = -1;
		let a = document.createElement("div");
		a.setAttribute("id", "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		let count = 0;
		for (let i = 0; i < result.length; i++) {
			const product = result[i];
			const name = product.name;
			const imageurl = product.imageurl;
			if (count == limit) break;
			if (name.substr(0, val.length).toLowerCase() == val.toLowerCase()) {
				let b = document.createElement("div");
				b.innerHTML += `<img src="${imageurl == "" ? "ImgSource/logo/logo-black.png" : imageurl}" width="50">`;
				b.innerHTML += `<strong>${name.substr(0, val.length)}</strong>`;
				b.innerHTML += name.substr(val.length);
				b.addEventListener("click", function (e) {
					input.value = name;
					closeAllLists();
					window.location.href = `product.html?id=${product.id}`
				});
				a.appendChild(b);
				count++;
			}
		}
	});

	input.addEventListener("keydown", function (e) {
		var x = document.getElementById("autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) {
			// If the UP key is pressed, make the current item more visible
			currentFocus--;
			addActive(x);
		} else if (e.keyCode == 13) {
			// If the ENTER key is pressed, prevent the form from being submitted
			e.preventDefault();
			if (currentFocus > -1) {
				// Simulate a click on the "active" item
				if (x) x[currentFocus].click();
			}
		}
	});

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(x) {
		x.forEach(elem => elem.classList.remove("autocomplete-active"))
	}
	function closeAllLists(elem) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (let i = 0; i < x.length; i++) {
			if (elem != x[i] && elem != input) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

function prevPage() {
	if (currentPage > 1) {
		currentPage--;
		changePage(currentPage);
	}
}

function nextPage() {
	if (currentPage < numPages()) {
		currentPage++;
		changePage(currentPage);
	}
}

function changePage(page) {
	let productListDiv = document.getElementsByClassName("product-list")[0];
	let nextBtn = document.getElementsByClassName("n-pag")[0];
	let prevBtn = document.getElementsByClassName("p-pag")[0];
	let pagBtnList = document.getElementsByClassName("m-pag-list")[0];
	let productQuantity = document.getElementById("quantity");
	let countStart = document.getElementById("count-start");
	let countEnd = document.getElementById("count-end");
	let count = 0;

	if (page < 1) page = 1;
	if (page > numPages()) page = numPages();

	if (productList.length === 0) {
		countStart.innerText = 0;
		countEnd.innerText = 0;
		productQuantity.innerText = 0;
		productListDiv.innerHTML = '<h1 style="color: red; font-weight: bold; text-align: center;">Error from server ...</h1>';
		prevBtn.classList.add("disabled");
		nextBtn.classList.add("disabled");
		return;
	}

	productListDiv.innerHTML = "";
	pagBtnList.innerHTML = "";
	currentPage = page;
	productQuantity.innerText = productList.length;
	countStart.innerText = (page - 1) * PRODUCTS_PER_PAGE + 1;

	for (let i = (page - 1) * PRODUCTS_PER_PAGE; i < page * PRODUCTS_PER_PAGE && i < productList.length; i++) {
		let product = productList[i];
		productListDiv.innerHTML += `
        <div class="product-wrapper">
            <div class="product-grid">
                <div class="product-image">
                    <a href="product.html?id=${product.id}" class="image">
                        <img src="${product.imageurl || "ImgSource/logo/logo-black.png"}" alt="${product.id}">
                    </a>
                    ${product.discount > 0 ? `<span class="product-discount-label">-${product.discount}%</span>` : ""}
                </div>
                <div class="product-content">
                    <h3 class="name">
                        <a href="product.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <div class="price">
                    ${product.discount > 0 ? `<span>$${product.price.toFixed(2)}</span> $${(product.price - product.price * product.discount / 100).toFixed(2)}` : `$${product.price.toFixed(2)}`}
                    </div>
                </div>
                <div class="add-to-cart">
                    Add To Cart
                    <i class="fas fa-shopping-bag"></i>
                </div>
            </div>
        </div>
        `;
		count++;
	}

	countEnd.innerText = (page - 1) * PRODUCTS_PER_PAGE + count;

	for (let i = 0; i < productList.length / PRODUCTS_PER_PAGE; i++) {
		let pagBtn = document.createElement("a");
		pagBtn.setAttribute("class", i + 1 == page ? "m-pag active" : "m-pag");
		pagBtn.innerText = i + 1;
		pagBtn.onclick = function () {
			changePage(i + 1);
		};
		pagBtnList.appendChild(pagBtn);
	}

	page == 1
		? prevBtn.classList.add("disabled")
		: prevBtn.classList.remove("disabled");
	page == numPages()
		? nextBtn.classList.add("disabled")
		: nextBtn.classList.remove("disabled");

	const addToCartBtns = document.getElementsByClassName('add-to-cart');
	for (let i = 0; i < addToCartBtns.length; i++) {
		const addToCartBtn = addToCartBtns[i];
		addToCartBtn.addEventListener('click', function () {
			addToCart(productList[i].id, productList[i].size)
		})
	}
}

function numPages() {
	return Math.ceil(productList.length / PRODUCTS_PER_PAGE);
}

window.onload = async function () {
	productList = await getAllProducts();
	// productList = getAllSampleProducts();
	autocomplete(document.getElementById('product-to-search'));
	changePage(1);
};
