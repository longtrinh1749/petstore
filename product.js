var slideIndex = 1;

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

function addToCart() {
	console.log("Add to Cart");
}

function showProduct(product) {

}

async function getProductById(id) {
	try {
		const res = await fetch(`http://localhost:3000/items/getById?itemId=${id}`);
		if (res) {
			data = await res.json();
			return data
		}
	} catch (error) {
		console.log(error);
	}
	return null;
}

function getSampleProduct() {
	return [
		{
			description: 'The Pop Up Bowl was designed for convenience. Made of silicone, its collapsible design allows it to be flattened and extended with ease. This makes it ideal to carry with you on holiday or to the dog park!',
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			size: 'M',
			price: 45,
			quantity: 27,
			discount: 20,
		},
		{
			description: 'The Pop Up Bowl was designed for convenience. Made of silicone, its collapsible design allows it to be flattened and extended with ease. This makes it ideal to carry with you on holiday or to the dog park!',
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			size: 'L',
			price: 45,
			quantity: 27,
			discount: 20,
		},
		{
			description: 'The Pop Up Bowl was designed for convenience. Made of silicone, its collapsible design allows it to be flattened and extended with ease. This makes it ideal to carry with you on holiday or to the dog park!',
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			size: 'XL',
			price: 45,
			quantity: 27,
			discount: 20,
		},
	]
}

window.onload = async function () {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	const product = await getProductById(id);
	console.log(product);
	// showProduct(product);
	showSlides(slideIndex);
}