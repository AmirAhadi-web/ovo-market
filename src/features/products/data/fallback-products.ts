import type { Product } from "../types/product";

/**
 * Small offline snapshot of the DummyJSON catalog.
 * Used ONLY when the remote API is unreachable so the app stays usable.
 * Prices are sample USD values, handled exactly like live API data.
 */
export const fallbackProducts: Product[] = [
  {
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "category": "beauty",
    "price": 9.99,
    "discountPercentage": 10.48,
    "rating": 2.56,
    "stock": 99,
    "brand": "Essence",
    "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    ]
  },
  {
    "id": 2,
    "title": "Eyeshadow Palette with Mirror",
    "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    "category": "beauty",
    "price": 19.99,
    "discountPercentage": 18.19,
    "rating": 2.86,
    "stock": 34,
    "brand": "Glamour Beauty",
    "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    ]
  },
  {
    "id": 3,
    "title": "Powder Canister",
    "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    "category": "beauty",
    "price": 14.99,
    "discountPercentage": 9.84,
    "rating": 4.64,
    "stock": 89,
    "brand": "Velvet Touch",
    "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
    ]
  },
  {
    "id": 4,
    "title": "Red Lipstick",
    "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    "category": "beauty",
    "price": 12.99,
    "discountPercentage": 12.16,
    "rating": 4.36,
    "stock": 91,
    "brand": "Chic Cosmetics",
    "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
    ]
  },
  {
    "id": 5,
    "title": "Red Nail Polish",
    "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    "category": "beauty",
    "price": 8.99,
    "discountPercentage": 11.44,
    "rating": 4.32,
    "stock": 79,
    "brand": "Nail Couture",
    "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp"
    ]
  },
  {
    "id": 6,
    "title": "Calvin Klein CK One",
    "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    "category": "fragrances",
    "price": 49.99,
    "discountPercentage": 1.89,
    "rating": 4.37,
    "stock": 29,
    "brand": "Calvin Klein",
    "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
    ]
  },
  {
    "id": 7,
    "title": "Chanel Coco Noir Eau De",
    "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    "category": "fragrances",
    "price": 129.99,
    "discountPercentage": 16.51,
    "rating": 4.26,
    "stock": 58,
    "brand": "Chanel",
    "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
    ]
  },
  {
    "id": 8,
    "title": "Dior J'adore",
    "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    "category": "fragrances",
    "price": 89.99,
    "discountPercentage": 14.72,
    "rating": 3.8,
    "stock": 98,
    "brand": "Dior",
    "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp"
    ]
  },
  {
    "id": 9,
    "title": "Dolce Shine Eau de",
    "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    "category": "fragrances",
    "price": 69.99,
    "discountPercentage": 0.62,
    "rating": 3.96,
    "stock": 4,
    "brand": "Dolce & Gabbana",
    "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp"
    ]
  },
  {
    "id": 10,
    "title": "Gucci Bloom Eau de",
    "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    "category": "fragrances",
    "price": 79.99,
    "discountPercentage": 14.39,
    "rating": 2.74,
    "stock": 91,
    "brand": "Gucci",
    "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp"
    ]
  },
  {
    "id": 11,
    "title": "Annibale Colombo Bed",
    "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    "category": "furniture",
    "price": 1899.99,
    "discountPercentage": 8.57,
    "rating": 4.77,
    "stock": 88,
    "brand": "Annibale Colombo",
    "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
    ]
  },
  {
    "id": 12,
    "title": "Annibale Colombo Sofa",
    "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    "category": "furniture",
    "price": 2499.99,
    "discountPercentage": 14.4,
    "rating": 3.92,
    "stock": 60,
    "brand": "Annibale Colombo",
    "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
    ]
  },
  {
    "id": 13,
    "title": "Bedside Table African Cherry",
    "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    "category": "furniture",
    "price": 299.99,
    "discountPercentage": 19.09,
    "rating": 2.87,
    "stock": 64,
    "brand": "Furniture Co.",
    "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp"
    ]
  },
  {
    "id": 14,
    "title": "Knoll Saarinen Executive Conference Chair",
    "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    "category": "furniture",
    "price": 499.99,
    "discountPercentage": 2.01,
    "rating": 4.88,
    "stock": 26,
    "brand": "Knoll",
    "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
    ]
  },
  {
    "id": 15,
    "title": "Wooden Bathroom Sink With Mirror",
    "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    "category": "furniture",
    "price": 799.99,
    "discountPercentage": 8.8,
    "rating": 3.59,
    "stock": 7,
    "brand": "Bath Trends",
    "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp"
    ]
  },
  {
    "id": 16,
    "title": "Apple",
    "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    "category": "groceries",
    "price": 1.99,
    "discountPercentage": 12.62,
    "rating": 4.19,
    "stock": 8,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 17,
    "title": "Beef Steak",
    "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    "category": "groceries",
    "price": 12.99,
    "discountPercentage": 9.61,
    "rating": 4.47,
    "stock": 86,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 18,
    "title": "Cat Food",
    "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    "category": "groceries",
    "price": 8.99,
    "discountPercentage": 9.58,
    "rating": 3.13,
    "stock": 46,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 19,
    "title": "Chicken Meat",
    "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
    "category": "groceries",
    "price": 9.99,
    "discountPercentage": 13.7,
    "rating": 3.19,
    "stock": 97,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 20,
    "title": "Cooking Oil",
    "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    "category": "groceries",
    "price": 4.99,
    "discountPercentage": 9.33,
    "rating": 4.8,
    "stock": 10,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 21,
    "title": "Cucumber",
    "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    "category": "groceries",
    "price": 1.49,
    "discountPercentage": 0.16,
    "rating": 4.07,
    "stock": 84,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 22,
    "title": "Dog Food",
    "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    "category": "groceries",
    "price": 10.99,
    "discountPercentage": 10.27,
    "rating": 4.55,
    "stock": 71,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 23,
    "title": "Eggs",
    "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    "category": "groceries",
    "price": 2.99,
    "discountPercentage": 11.05,
    "rating": 2.53,
    "stock": 9,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 24,
    "title": "Fish Steak",
    "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    "category": "groceries",
    "price": 14.99,
    "discountPercentage": 4.23,
    "rating": 3.78,
    "stock": 74,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 25,
    "title": "Green Bell Pepper",
    "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    "category": "groceries",
    "price": 1.29,
    "discountPercentage": 0.16,
    "rating": 3.25,
    "stock": 33,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 26,
    "title": "Green Chili Pepper",
    "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    "category": "groceries",
    "price": 0.99,
    "discountPercentage": 1,
    "rating": 3.66,
    "stock": 3,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 27,
    "title": "Honey Jar",
    "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    "category": "groceries",
    "price": 6.99,
    "discountPercentage": 14.4,
    "rating": 3.97,
    "stock": 34,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 28,
    "title": "Ice Cream",
    "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    "category": "groceries",
    "price": 5.49,
    "discountPercentage": 8.69,
    "rating": 3.39,
    "stock": 27,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 29,
    "title": "Juice",
    "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    "category": "groceries",
    "price": 3.99,
    "discountPercentage": 12.06,
    "rating": 3.94,
    "stock": 50,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 30,
    "title": "Kiwi",
    "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    "category": "groceries",
    "price": 2.49,
    "discountPercentage": 15.22,
    "rating": 4.93,
    "stock": 99,
    "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 61,
    "title": "Hand Blender",
    "description": "The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.",
    "category": "kitchen-accessories",
    "price": 34.99,
    "discountPercentage": 17.02,
    "rating": 3.86,
    "stock": 84,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 62,
    "title": "Ice Cube Tray",
    "description": "The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.",
    "category": "kitchen-accessories",
    "price": 5.99,
    "discountPercentage": 0.63,
    "rating": 4.71,
    "stock": 13,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 63,
    "title": "Kitchen Sieve",
    "description": "The Kitchen Sieve is a versatile tool for sifting and straining dry and wet ingredients. Its fine mesh design ensures smooth results in your cooking and baking.",
    "category": "kitchen-accessories",
    "price": 7.99,
    "discountPercentage": 18.91,
    "rating": 3.09,
    "stock": 68,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 64,
    "title": "Knife",
    "description": "The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.",
    "category": "kitchen-accessories",
    "price": 14.99,
    "discountPercentage": 18.86,
    "rating": 3.26,
    "stock": 7,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 65,
    "title": "Lunch Box",
    "description": "The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it's perfect for on-the-go dining.",
    "category": "kitchen-accessories",
    "price": 12.99,
    "discountPercentage": 10.34,
    "rating": 4.93,
    "stock": 94,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 66,
    "title": "Microwave Oven",
    "description": "The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.",
    "category": "kitchen-accessories",
    "price": 89.99,
    "discountPercentage": 12.13,
    "rating": 4.82,
    "stock": 59,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 67,
    "title": "Mug Tree Stand",
    "description": "The Mug Tree Stand is a stylish and space-saving solution for organizing your mugs. Keep your favorite mugs easily accessible and neatly displayed in your kitchen.",
    "category": "kitchen-accessories",
    "price": 15.99,
    "discountPercentage": 9.25,
    "rating": 2.64,
    "stock": 88,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 68,
    "title": "Pan",
    "description": "The Pan is a versatile and essential cookware item for frying, sautéing, and cooking various dishes. Its non-stick coating ensures easy food release and cleanup.",
    "category": "kitchen-accessories",
    "price": 24.99,
    "discountPercentage": 3,
    "rating": 2.79,
    "stock": 90,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 69,
    "title": "Plate",
    "description": "The Plate is a classic and essential dishware item for serving meals. Its durable and stylish design makes it suitable for everyday use or special occasions.",
    "category": "kitchen-accessories",
    "price": 3.99,
    "discountPercentage": 7.31,
    "rating": 3.65,
    "stock": 66,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 70,
    "title": "Red Tongs",
    "description": "The Red Tongs are versatile kitchen tongs suitable for various cooking and serving tasks. Their vibrant color adds a pop of excitement to your kitchen utensils.",
    "category": "kitchen-accessories",
    "price": 6.99,
    "discountPercentage": 14.52,
    "rating": 4.42,
    "stock": 82,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 71,
    "title": "Silver Pot With Glass Cap",
    "description": "The Silver Pot with Glass Cap is a stylish and functional cookware item for boiling, simmering, and preparing delicious meals. Its glass cap allows you to monitor cooking progress.",
    "category": "kitchen-accessories",
    "price": 39.99,
    "discountPercentage": 5.7,
    "rating": 3.22,
    "stock": 40,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 72,
    "title": "Slotted Turner",
    "description": "The Slotted Turner is a kitchen utensil designed for flipping and turning food items. Its slotted design allows excess liquid to drain, making it ideal for frying and sautéing.",
    "category": "kitchen-accessories",
    "price": 8.99,
    "discountPercentage": 13.35,
    "rating": 3.4,
    "stock": 88,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 73,
    "title": "Spice Rack",
    "description": "The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.",
    "category": "kitchen-accessories",
    "price": 19.99,
    "discountPercentage": 12.09,
    "rating": 4.87,
    "stock": 79,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 74,
    "title": "Spoon",
    "description": "The Spoon is a versatile kitchen utensil for stirring, serving, and tasting. Its ergonomic design and durable construction make it an essential tool for every kitchen.",
    "category": "kitchen-accessories",
    "price": 4.99,
    "discountPercentage": 1.53,
    "rating": 4.03,
    "stock": 59,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 75,
    "title": "Tray",
    "description": "The Tray is a functional and decorative item for serving snacks, appetizers, or drinks. Its stylish design makes it a versatile accessory for entertaining guests.",
    "category": "kitchen-accessories",
    "price": 16.99,
    "discountPercentage": 7.48,
    "rating": 4.62,
    "stock": 71,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 76,
    "title": "Wooden Rolling Pin",
    "description": "The Wooden Rolling Pin is a classic kitchen tool for rolling out dough for baking. Its smooth surface and sturdy handles make it easy to achieve uniform thickness.",
    "category": "kitchen-accessories",
    "price": 11.99,
    "discountPercentage": 9.75,
    "rating": 2.92,
    "stock": 80,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 77,
    "title": "Yellow Peeler",
    "description": "The Yellow Peeler is a handy tool for peeling fruits and vegetables with ease. Its bright yellow color adds a cheerful touch to your kitchen gadgets.",
    "category": "kitchen-accessories",
    "price": 5.99,
    "discountPercentage": 12.48,
    "rating": 4.24,
    "stock": 35,
    "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp"
    ],
    "brand": "عمومی"
  },
  {
    "id": 78,
    "title": "Apple MacBook Pro 14 Inch Space Grey",
    "description": "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
    "category": "laptops",
    "price": 1999.99,
    "discountPercentage": 4.69,
    "rating": 3.65,
    "stock": 24,
    "brand": "Apple",
    "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp"
    ]
  },
  {
    "id": 79,
    "title": "Asus Zenbook Pro Dual Screen Laptop",
    "description": "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
    "category": "laptops",
    "price": 1799.99,
    "discountPercentage": 11.14,
    "rating": 3.95,
    "stock": 45,
    "brand": "Asus",
    "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp"
    ]
  },
  {
    "id": 80,
    "title": "Huawei Matebook X Pro",
    "description": "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
    "category": "laptops",
    "price": 1399.99,
    "discountPercentage": 9.38,
    "rating": 4.98,
    "stock": 75,
    "brand": "Huawei",
    "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp"
    ]
  },
  {
    "id": 81,
    "title": "Lenovo Yoga 920",
    "description": "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
    "category": "laptops",
    "price": 1099.99,
    "discountPercentage": 6.55,
    "rating": 2.86,
    "stock": 40,
    "brand": "Lenovo",
    "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp"
    ]
  },
  {
    "id": 82,
    "title": "New DELL XPS 13 9300 Laptop",
    "description": "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
    "category": "laptops",
    "price": 1499.99,
    "discountPercentage": 11.89,
    "rating": 2.67,
    "stock": 74,
    "brand": "Dell",
    "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp"
    ]
  },
  {
    "id": 83,
    "title": "Blue & Black Check Shirt",
    "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
    "category": "mens-shirts",
    "price": 29.99,
    "discountPercentage": 15.35,
    "rating": 3.64,
    "stock": 38,
    "brand": "Fashion Trends",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp"
    ]
  },
  {
    "id": 84,
    "title": "Gigabyte Aorus Men Tshirt",
    "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
    "category": "mens-shirts",
    "price": 24.99,
    "discountPercentage": 0.94,
    "rating": 3.18,
    "stock": 90,
    "brand": "Gigabyte",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp"
    ]
  },
  {
    "id": 85,
    "title": "Man Plaid Shirt",
    "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
    "category": "mens-shirts",
    "price": 34.99,
    "discountPercentage": 19.5,
    "rating": 3.46,
    "stock": 82,
    "brand": "Classic Wear",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp"
    ]
  },
  {
    "id": 86,
    "title": "Man Short Sleeve Shirt",
    "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
    "category": "mens-shirts",
    "price": 19.99,
    "discountPercentage": 6.83,
    "rating": 2.9,
    "stock": 2,
    "brand": "Casual Comfort",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp"
    ]
  },
  {
    "id": 87,
    "title": "Men Check Shirt",
    "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
    "category": "mens-shirts",
    "price": 27.99,
    "discountPercentage": 11.38,
    "rating": 2.72,
    "stock": 95,
    "brand": "Urban Chic",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/thumbnail.webp"
    ]
  },
  {
    "id": 88,
    "title": "Nike Air Jordan 1 Red And Black",
    "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
    "category": "mens-shoes",
    "price": 149.99,
    "discountPercentage": 4.12,
    "rating": 4.77,
    "stock": 7,
    "brand": "Nike",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp"
    ]
  },
  {
    "id": 89,
    "title": "Nike Baseball Cleats",
    "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
    "category": "mens-shoes",
    "price": 79.99,
    "discountPercentage": 18.04,
    "rating": 3.88,
    "stock": 12,
    "brand": "Nike",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/thumbnail.webp"
    ]
  },
  {
    "id": 90,
    "title": "Puma Future Rider Trainers",
    "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
    "category": "mens-shoes",
    "price": 89.99,
    "discountPercentage": 4.2,
    "rating": 4.9,
    "stock": 90,
    "brand": "Puma",
    "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp"
    ]
  }
];
