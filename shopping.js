var productList = [];
var currentPage = 1;
const PRODUCTS_PER_PAGE = 12;

async function getAllProducts() {
	try {
		const res = await fetch('http://localhost:3000/items/all');
		if (res) {
			data = await res.json();
			data.forEach(item => {
				if (productList.findIndex(product => product.name.localeCompare(item.name) === 0) === -1) {
					productList.push(item);
				}
			})
		}
	} catch (error) {
		console.log(error);
	}
}

function getAllSampleProducts() {
	return (productList = [
		{
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			price: 45,
			discount: 20,
		},
		{
			id: "2",
			imageurl: "ImgSource/shop_img_2.jpg",
			name: "Lounger",
			price: 85,
			discount: 10,
		},
		{
			id: "3",
			imageurl: "ImgSource/shop_img_3.jpg",
			name: "Active Pet Dog Harness",
			price: 250,
			discount: 30,
		},
		{
			id: "4",
			imageurl: "ImgSource/shop_img_4.jpg",
			name: "Sara's Doggie Treat",
			price: 45,
			discount: 0,
		},
		{
			id: "5",
			imageurl: "ImgSource/shop_img_5.jpg",
			name: "Little Scoop For Ultra",
			price: 35,
			discount: 0,
		},
		{
			id: "6",
			imageurl: "ImgSource/shop_img_6.jpg",
			name: "Double Feeding Bowls",
			price: 95,
			discount: 0,
		},
		{
			id: "7",
			imageurl: "ImgSource/shop_img_7.jpg",
			name: "Small Pet Drink Bottle",
			price: 25,
			discount: 0,
		},
		{
			id: "8",
			imageurl: "ImgSource/shop_img_8.jpg",
			name: "Cat Scratch Apple Toy",
			price: 90,
			discount: 10,
		},
		{
			id: "9",
			imageurl: "ImgSource/shop_img_9.jpg",
			name: "Mouse Cat Toy 10cm",
			price: 55,
			discount: 0,
		},
		{
			id: "10",
			imageurl: "ImgSource/shop_img_10.jpg",
			name: "Dogs Name Tag",
			price: 70,
			discount: 0,
		},
		{
			id: "11",
			imageurl: "ImgSource/shop_img_11.jpg",
			name: "Slow Feeder Bowl",
			price: 50,
			discount: 0,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
		{
			id: "12",
			imageurl: "ImgSource/shop_img_12.jpg",
			name: "Dog Blanket With Cushion",
			price: 90,
			discount: 20,
		},
	]);
}

/**
 * 
 * @param {String} name 
 * @returns {Array}
 */
function getProductsByName(name) {
	let result = productList.filter(product => {
		const productName = product.name.toLowerCase();
		return productName.toLowerCase().includes(name);
	});
	return result
}

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

function addToCart(productId) {
	let product;
	let cart = getCookie("cart");
	cart = JSON.parse(cart);
	if (!cart) {
		product = { id: productId, quantity: 1 };
		setCookie("cart", JSON.stringify([product]), 1);
	} else if (Array.isArray(cart)) {
		if (cart.length == 0) {
			product = { id: productId, quantity: 1 };
			setCookie("cart", JSON.stringify([product]), 1);
		} else {
			product = cart.find((item) => item.id === productId);
			if (!product) {
				product = { id: productId, quantity: 1 };
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
	window.location.href = `product.html?name=${value}`
}

function autocomplete(input) {
	var currentFocus;
	const limit = 5;
	input.addEventListener("input", function (e) {
		const val = this.value.toLowerCase();
		const result = getProductsByName(val);
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
				b.innerHTML += `<img src="${imageurl}" width="50">`;
				b.innerHTML += `<strong>${name.substr(0, val.length)}</strong>`;
				b.innerHTML += name.substr(val.length);
				b.addEventListener("click", function (e) {
					input.value = name;
					closeAllLists();
					setTimeout(() => {
						window.location.href = `product.html?id=${product.id}`
					}, 1000)
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
                        <img src="${product.imageurl == "" ? "./ImgSource/shop_img_1.jpg" : product.imageurl}" alt="${product.id}">
                    </a>
                    ${product.discount ? `<span class="product-discount-label">-${product.discount}%</span>` : ""}
                </div>
                <div class="product-content">
                    <h3 class="name">
                        <a href="product.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <div class="price">
                    ${product.discount > 0 ? `<span>$${product.price.toFixed(2)}</span> $${(product.price - product.price * product.discount / 100).toFixed(2)}` : `$${product.price.toFixed(2)}`}
                    </div>
                </div>
                <div class="add-to-cart" onclick="addToCart(${product.id})">
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
}

function numPages() {
	return Math.ceil(productList.length / PRODUCTS_PER_PAGE);
}

window.onload = async function () {
	// await getAllProducts();
	getAllSampleProducts();
	autocomplete(document.getElementById('product-to-search'));
	changePage(1);
};
