var productList = [];
var currentPage = 1;
const PRODUCTS_PER_PAGE = 12;

function getProductList() {
    return productList = [
        {
            id: "1",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "2",
            img: "ImgSource/shop_img_2.jpg",
            title: "Lounger",
            price: 85,
            discount: 0.1,
        },
        {
            id: "3",
            img: "ImgSource/shop_img_3.jpg",
            title: "Active Pet Dog Harness",
            price: 250,
            discount: 0.3,
        },
        {
            id: "4",
            img: "ImgSource/shop_img_4.jpg",
            title: "Sara's Doggie Treat",
            price: 45,
            discount: 0,
        },
        {
            id: "5",
            img: "ImgSource/shop_img_5.jpg",
            title: "Little Scoop For Ultra",
            price: 35,
            discount: 0,
        },
        {
            id: "6",
            img: "ImgSource/shop_img_6.jpg",
            title: "Double Feeding Bowls",
            price: 95,
            discount: 0,
        },
        {
            id: "7",
            img: "ImgSource/shop_img_7.jpg",
            title: "Small Pet Drink Bottle",
            price: 25,
            discount: 0,
        },
        {
            id: "8",
            img: "ImgSource/shop_img_8.jpg",
            title: "Cat Scratch Apple Toy",
            price: 90,
            discount: 0.1,
        },
        {
            id: "9",
            img: "ImgSource/shop_img_9.jpg",
            title: "Mouse Cat Toy 10cm",
            price: 55,
            discount: 0,
        },
        {
            id: "10",
            img: "ImgSource/shop_img_10.jpg",
            title: "Dogs Name Tag",
            price: 70,
            discount: 0,
        },
        {
            id: "11",
            img: "ImgSource/shop_img_11.jpg",
            title: "Slow Feeder Bowl",
            price: 50,
            discount: 0,
        },
        {
            id: "12",
            img: "ImgSource/shop_img_12.jpg",
            title: "Dog Blanket With Cushion",
            price: 90,
            discount: 0.2,
        },
        {
            id: "13",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "14",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "15",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "16",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "17",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "18",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "19",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
        {
            id: "20",
            img: "ImgSource/shop_img_1.jpg",
            title: "Collapsible Dog Bowl",
            price: 45,
            discount: 0.2,
        },
    ]
}

function sortProductList() {
    const TYPE = document.getElementById('sort-product').value;
    switch (TYPE) {
        case "1":
            productList.sort(compareName);
            break;
        case "2":
            productList.sort(compareDiscount);
            break;
        case "3":
            productList.sort(comparePriceAscending)
            break;
        case "4":
            productList.sort(comparePriceDescending)
            break;
        default:
            break;
    }
    changePage(1);
}

function compareName(productA, productB) {
    const titleA = productA.title.toUpperCase();
    const titleB = productB.title.toUpperCase();
    return titleA.localeCompare(titleB);
}

function compareDiscount(productA, productB) {
    const discountA = productA.discount;
    const discountB = productB.discount;
    return discountA === discountB ?
        productA.title.localeCompare(productB.title) :
        discountB - discountA;
}

function comparePriceAscending(productA, productB) {
    const priceA = productA.price;
    const priceB = productB.price;
    return priceA === priceB ?
        productA.title.localeCompare(productB.title) :
        priceA - priceB;
}

function comparePriceDescending(productA, productB) {
    const priceA = productA.price;
    const priceB = productB.price;
    return priceA === priceB ?
        productA.title.localeCompare(productB.title) :
        priceB - priceA;
}

function addToCart(productId) {
    let product;
    let cart = getCookie('cart');
    cart = JSON.parse(cart);
    if (!cart) {
        product = { id: productId, quantity: 1 }
        setCookie('cart', JSON.stringify([product]), 1);
    }
    else if (Array.isArray(cart)) {
        if (cart.length == 0) {
            product = { id: productId, quantity: 1 }
            setCookie('cart', JSON.stringify([product]), 1);
        } else {
            product = cart.find(item => item.id === productId);
            if (!product) {
                product = { id: productId, quantity: 1 }
                setCookie('cart', JSON.stringify([...cart, product]), 1);
            } else {
                product.quantity += 1;
                setCookie('cart', JSON.stringify([...cart]), 1);
            }
        }
    }
    window.location.href = "cart.html"
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
    let productQuantity = document.getElementById('quantity');
    let countStart = document.getElementById('count-start');
    let countEnd = document.getElementById('count-end');
    let count = 0;

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    productListDiv.innerHTML = "";
    pagBtnList.innerHTML = "";
    currentPage = page;
    productQuantity.innerText = productList.length;
    countStart.innerText = (page - 1) * PRODUCTS_PER_PAGE + 1;

    for (let i = (page - 1) * PRODUCTS_PER_PAGE; i < (page * PRODUCTS_PER_PAGE) && i < productList.length; i++) {
        let product = productList[i];
        productListDiv.innerHTML += `
        <div class="product-wrapper">
            <div class="product-grid">
                <div class="product-image">
                    <a href="product.html?id=${product.id}" class="image">
                        <img src="${product.img}">
                    </a>
                    ${product.discount ? `<span class="product-discount-label">-${product.discount * 100}%</span>` : ""}
                </div>
                <div class="product-content">
                    <h3 class="title">
                        <a href="product.html?id=${product.id}">${product.title}</a>
                    </h3>
                    <div class="price">
                    ${product.discount > 0
                ? `<span>$${product.price.toFixed(2)}</span> $${(product.price - product.price * product.discount).toFixed(2)}`
                : `$${product.price.toFixed(2)}`}
                    </div>
                </div>
                <div class="add-to-cart" onclick="addToCart(${product.id})">
                    Add To Cart
                    <i class="fas fa-shopping-bag"></i>
                </div>
            </div>
        </div>
        `
        count++;
    }

    countEnd.innerText = (page - 1) * PRODUCTS_PER_PAGE + count;

    for (let i = 0; i < productList.length / PRODUCTS_PER_PAGE; i++) {
        let pagBtn = document.createElement('a');
        pagBtn.setAttribute('class', i + 1 == page ? 'm-pag active' : 'm-pag');
        pagBtn.innerText = i + 1;
        pagBtn.onclick = function () {
            changePage(i + 1);
        }
        pagBtnList.appendChild(pagBtn);
    }

    page == 1 ? prevBtn.classList.add("disabled") : prevBtn.classList.remove("disabled")
    page == numPages() ? nextBtn.classList.add("disabled") : nextBtn.classList.remove("disabled")
}

function numPages() {
    return Math.ceil(productList.length / PRODUCTS_PER_PAGE);
}

window.onload = function () {
    getProductList();
    changePage(1);
}