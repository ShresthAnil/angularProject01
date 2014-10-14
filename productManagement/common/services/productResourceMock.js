(function () {
	"use strict";

	var app = angular
				.module ("productResourceMock", 
							["ngMockE2E"]);

	app.run(function ($httpBackend) {
		var products = [
						{
							"productId": 1,
							 "productName": "Leaf Rake",
							 "productCode": "GDN-0011",
							 "releaseDate": "March 19, 2009",
							 "description": "Leaf rake with 48-inch handle.",
							 "cost": 9.00,
							 "price": 19.95,
							 "category": "garden",
							 "tags": ["leaf", "tool"],
							 "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Leaf_Rake.png"	
						 },
						 {
							 "productId": 5,
							 "productName": "Hammer",
							 "productCode": "TBX-0048",
							 "releaseDate": "May 21, 2013",
							 "description": "Curved claw steel hammer.",
							 "cost": 1.00,
							 "price": 8.99,
							 "category": "toolbox",
							 "tags": ["tool"],
							 "imageUrl": "https://openclipart.org/image/300px/svg_to_png/4793/david_benjamin_Hammer.png"
						 },
						  {
							 "productId": 7,
							 "productName": "Saw",
							 "productCode": "XXE-0028",
							 "releaseDate": "Oct 21, 2012",
							 "description": "Rajor sharp, stainless steel saw.",
							 "cost": 5.00,
							 "price": 26.99,
							 "category": "toolbox",
							 "tags": ["tool"],
							 "imageUrl": "https://openclipart.org/image/300px/svg_to_png/170904/1340648770.png"
						 },
						  {
							 "productId": 5,
							 "productName": "Garden Cart",
							 "productCode": "TBX-0022",
							 "releaseDate": "May 21, 2013",
							 "description": "Curved claw steel hammer.",
							 "cost": 18.00,
							 "price": 50.95,
							 "category": "toolbox",
							 "tags": ["garden", "mower"],
							 "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
						 },
						  {
							 "productId": 5,
							 "productName": "Video Game Controller",
							 "productCode": "GMG-0097",
							 "releaseDate": "May 21, 2013",
							 "description": "Standard two-button video game controller.",
							 "cost": 9.00,
							 "price": 25.99,
							 "category": "toolbox",
							 "tags": ["gaming", "electronics"],
							 "imageUrl": "https://openclipart.org/image/300px/svg_to_png/191485/controller_icon.png"
						 }
						];

			var productUrl = "/api/products"

			$httpBackend.whenGET(productUrl).respond(products);

			var editingRegex = new  RegExp(productUrl + "/[0-9][0-9]*", '');

			// GET method
			$httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
				var product = {"productId": 0};
				var parameters = url.split('/');
				var length = parameters.length;
				var id = parameters[length - 1];

				if (id > 0) {
					for (var i = 0; i < products.length; i++ ) {
						if (products[i].productId == id) {
							product = products[i];
							break;
						}
					};
				}
				return [200, product, {}];

			});

			// POST method
			$httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
				var product =  angular.fromJson(data);

				if (!product.productId) {
					// new product Id
					product.productId = products[products.length - 1].productId + 1;
					products.push(product);
				}

				else {
					// Updated product
					for (var i = 0; i < products.length; i++ ) {
						if (products[i].productId == product.productId) {
							products[i] = product;
							break;
						}

					}; 
						
				}
				return [200, product, {}];

			});

			//Pass through any requests for application files
			$httpBackend.whenGET(/app/).passThrough();

	})

} ());