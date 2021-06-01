async function getAllProducts() {
	let productList = []
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
	return productList;
}

async function getProductsById(id) {
	try {
		const res = await fetch(`http://localhost:3000/items/getById?itemId=${id}`);
		if (res) {
			data = await res.json();
			return data;
		} 
		return [];
	} catch (error) {
		console.log(error);
		return []
	}
}

async function getProductsByName(name) {
	let productList = []
	try {
		const res = await fetch(`http://localhost:3000/items/getByName?itemName=${name}`);
		if (res) {
			data = await res.json();
			data.forEach(item => {
				if (productList.findIndex(product => product.name.localeCompare(item.name) === 0) === -1) {
					productList.push(item);
				}
			})
			return productList;
		}
		return []
	} catch (error) {
		console.log(error);
		return []
	}
}

async function getProductByIdAndSize(id, size) {
	try {
		const res = await fetch(`http://localhost:3000/items/getByIdAndSize?itemId=${id}&itemSize=${size}`);
		if (res){
			data = await res.json();
			return data;
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

function getAllSampleProducts() {
	return [
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
	];
}

function getSampleProducts() {
	return [
		{
			description: 'The Pop Up Bowl was designed for convenience. Made of silicone, its collapsible design allows it to be flattened and extended with ease. This makes it ideal to carry with you on holiday or to the dog park!',
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			size: 'M',
			price: 45,
			quantity: 27,
			discount: 0,
		},
		{
			description: 'The Pop Up Bowl was designed for convenience. Made of silicone, its collapsible design allows it to be flattened and extended with ease. This makes it ideal to carry with you on holiday or to the dog park!',
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			size: 'L',
			price: 46,
			quantity: 30,
			discount: 10,
		},
		{
			description: 'The Pop Up Bowl was designed for convenience. Made of silicone, its collapsible design allows it to be flattened and extended with ease. This makes it ideal to carry with you on holiday or to the dog park!',
			id: "1",
			imageurl: "ImgSource/shop_img_1.jpg",
			name: "Collapsible Dog Bowl",
			size: 'XL',
			price: 47,
			quantity: 10,
			discount: 15,
		},
	]
}