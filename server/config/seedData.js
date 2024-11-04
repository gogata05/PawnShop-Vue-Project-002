const Product = require("../models/Product");
const User = require("../models/User");

const seedProducts = [
  {
    brand: "Apple",
    model: "iPhone 14 Pro",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Latest iPhone model with advanced features and great camera",
    condition: "New",
    price: 999,
    rating: 15,
    comments: [
      {
        text: "Great product!",
        author: "John Doe",
        createdAt: new Date("2024-03-15")
      },
      {
        text: "Amazing phone",
        author: "Jane Smith",
        createdAt: new Date("2024-03-14")
      }
    ]
  },
  {
    brand: "Rolex",
    model: "Submariner",
    productType: "Watches",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Rolex-Submariner.jpg",
    description: "Luxury diving watch with premium materials",
    condition: "Like new",
    price: 15000,
    rating: 14,
    comments: [
      {
        text: "Classic timepiece",
        author: "Watch Collector",
        createdAt: new Date("2023-06-12")
      }
    ]
  },
  {
    brand: "Tiffany",
    model: "Diamond Ring",
    productType: "Jewelry",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Ring_Ruby.jpg",
    description: "18k gold ring with 1 carat diamond",
    condition: "New",
    price: 5000,
    rating: 15,
    comments: []
  },
  {
    brand: "Samsung",
    model: "Galaxy S23",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Samsung_Galaxy_S23_Ultra%2C_512_GB%2C_Lavender_20230416_HOF00318_RAW-Export_cens.png",
    description: "High-performance smartphone with stunning display",
    condition: "New",
    price: 899,
    rating: 14,
    comments: [
      {
        text: "Excellent performance!",
        author: "TechGuru",
        createdAt: new Date("2023-09-05")
      },
      {
        text: "Battery life is impressive.",
        author: "Sarah Lee",
        createdAt: new Date("2023-08-22")
      }
    ]
  },
  {
    brand: "Nike",
    model: "Air Max 270",
    productType: "Clothing",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Nike_Air_Max_1.png",
    description: "Comfortable and stylish sneakers for everyday wear",
    condition: "New",
    price: 150,
    rating: 5,
    comments: [
      {
        text: "Love the design!",
        author: "SneakerHead",
        createdAt: new Date("2024-01-10")
      },
      {
        text: "Very comfortable.",
        author: "Mike Brown",
        createdAt: new Date("2024-02-15")
      }
    ]
  },
  {
    brand: "Sony",
    model: "WH-1000XM4",
    productType: "Electronics",
    year: 2022,
    imgUrl: "https://m.media-amazon.com/images/I/41-dEzQ-SsL._AC_SL1080_.jpg",
    description: "Noise-canceling wireless headphones with superior sound quality",
    condition: "Used",
    price: 250,
    rating: 14,
    comments: [
      {
        text: "Great sound but minor scratches.",
        author: "AudioLover",
        createdAt: new Date("2023-11-20")
      }
    ]
  },
  {
    brand: "Levi's",
    model: "501 Original",
    productType: "Clothing",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/61K0FlHa0SL._AC_SX679_.jpg",
    description: "Classic straight-fit jeans with timeless style",
    condition: "New",
    price: 60,
    rating: 15,
    comments: []
  },
  {
    brand: "Dell",
    model: "XPS 13",
    productType: "Electronics",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/51Fwu64IFvL._AC_.jpg",
    description: "Ultra-portable laptop with high-resolution display",
    condition: "Like new",
    price: 1200,
    rating: 10,
    comments: [
      {
        text: "Perfect for my needs!",
        author: "WorkPro",
        createdAt: new Date("2024-04-01")
      },
      {
        text: "Sleek and powerful.",
        author: "Emily Clark",
        createdAt: new Date("2024-03-28")
      }
    ]
  },
  {
    brand: "Canon",
    model: "EOS R5",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/81R7ewwBg3L._AC_SL1500_.jpg",
    description: "Professional mirrorless camera with 45MP sensor",
    condition: "New",
    price: 3900,
    rating: 10,
    comments: [
      {
        text: "Exceptional image quality!",
        author: "Photographer99",
        createdAt: new Date("2023-12-05")
      }
    ]
  },
  {
    brand: "Gucci",
    model: "GG Marmont Bag",
    productType: "Clothing",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/81HWpvrsISL._AC_SL1500_.jpg",
    description: "Elegant leather handbag with iconic GG hardware",
    condition: "Like new",
    price: 2200,
    rating: 10,
    comments: [
      {
        text: "Stylish and versatile.",
        author: "Fashionista",
        createdAt: new Date("2024-05-10")
      }
    ]
  },
  {
    brand: "Microsoft",
    model: "Surface Pro 9",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/5165MJQZNCL._AC_SL1000_.jpg",
    description: "2-in-1 laptop with touchscreen and detachable keyboard",
    condition: "New",
    price: 1300,
    rating: 10,
    comments: [
      {
        text: "Perfect for school and work.",
        author: "StudentLife",
        createdAt: new Date("2023-07-18")
      }
    ]
  },
  {
    brand: "Bose",
    model: "SoundLink Revolve",
    productType: "Electronics",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Portable Bluetooth speaker with 360-degree sound",
    condition: "Used",
    price: 120,
    rating: 11,
    comments: [
      {
        text: "Great sound quality.",
        author: "MusicFan",
        createdAt: new Date("2023-10-12")
      }
    ]
  },
  {
    brand: "Adidas",
    model: "Ultraboost 21",
    productType: "Clothing",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/71Cy2jLJeVL._AC_SL1500_.jpg",
    description: "High-performance running shoes with responsive cushioning",
    condition: "New",
    price: 180,
    rating: 5,
    comments: [
      {
        text: "Best running shoes I've owned.",
        author: "RunnerJoe",
        createdAt: new Date("2024-06-22")
      }
    ]
  },
  {
    brand: "Panasonic",
    model: "Lumix GH5",
    productType: "Electronics",
    year: 2022,
    imgUrl: "https://m.media-amazon.com/images/I/61jB87lEjQL._AC_SL1080_.jpg",
    description: "Professional mirrorless camera for videography and photography",
    condition: "Like new",
    price: 1400,
    rating: 7,
    comments: [
      {
        text: "Excellent for video projects.",
        author: "VideographerPro",
        createdAt: new Date("2023-08-30")
      }
    ]
  },
  {
    brand: "Cartier",
    model: "Tank Française",
    productType: "Watches",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/81v8fSPjA8L._SL1500_.jpg",
    description: "Classic rectangular watch with stainless steel bracelet",
    condition: "New",
    price: 8000,
    rating: 5,
    comments: [
      {
        text: "Timeless design.",
        author: "LuxuryLover",
        createdAt: new Date("2024-07-05")
      }
    ]
  },
  {
    brand: "Sony",
    model: "PlayStation 5",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/51NbBH89m1L._AC_SL1500_.jpg",
    description: "Next-gen gaming console with immersive graphics",
    condition: "New",
    price: 499,
    rating: 7,
    comments: [
      {
        text: "Best console ever!",
        author: "GamerX",
        createdAt: new Date("2024-03-10")
      },
      {
        text: "Fast loading times.",
        author: "Alex P.",
        createdAt: new Date("2024-04-12")
      }
    ]
  },
  {
    brand: "Lululemon",
    model: "Align Leggings",
    productType: "Clothing",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/61Isb40O6wL._AC_SX569_.jpg",
    description: "Premium yoga leggings with buttery-soft fabric",
    condition: "New",
    price: 98,
    rating: 5,
    comments: [
      {
        text: "Perfect for workouts.",
        author: "YogaEnthusiast",
        createdAt: new Date("2023-05-25")
      }
    ]
  },
  {
    brand: "Tesla",
    model: "Model 3",
    productType: "Other",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg",
    description: "Electric sedan with impressive range and autopilot features",
    condition: "Used",
    price: 35000,
    rating: 1,
    comments: [
      {
        text: "Smooth and efficient.",
        author: "EcoDriver",
        createdAt: new Date("2023-09-15")
      }
    ]
  },
  {
    brand: "Samsung",
    model: "QLED TV 55",
    productType: "Electronics",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/717pBTEzwnL._AC_SL1500_.jpg",
    description: "55-inch QLED Smart TV with vibrant colors and smart features",
    condition: "New",
    price: 700,
    rating: 5,
    comments: [
      {
        text: "Stunning picture quality.",
        author: "HomeTheater",
        createdAt: new Date("2024-02-20")
      }
    ]
  },
  {
    brand: "Apple",
    model: 'MacBook Pro 16"',
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/51F5AOfbAkL._AC_SL1500_.jpg",
    description: "Powerful laptop with M1 Pro chip for professionals",
    condition: "Like new",
    price: 2500,
    rating: 15,
    comments: [
      {
        text: "Handles all my coding needs.",
        author: "DeveloperDan",
        createdAt: new Date("2023-10-30")
      }
    ]
  },
  {
    brand: "Patagonia",
    model: "Down Jacket",
    productType: "Clothing",
    year: 2022,
    imgUrl: "https://m.media-amazon.com/images/I/61eBsCP7JUL._AC_SX679_.jpg",
    description: "Warm and lightweight down jacket for outdoor activities",
    condition: "Used",
    price: 200,
    rating: 1,
    comments: [
      {
        text: "Keeps me warm in cold weather.",
        author: "OutdoorMike",
        createdAt: new Date("2023-04-18")
      }
    ]
  },
  {
    brand: "Breitling",
    model: "Navitimer",
    productType: "Watches",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/71KKEgaO3ML._AC_SY679_.jpg",
    description: "Pilot watch with chronograph functions and robust design",
    condition: "New",
    price: 9500,
    rating: 15,
    comments: [
      {
        text: "Perfect for flying enthusiasts.",
        author: "AviationFan",
        createdAt: new Date("2024-01-22")
      }
    ]
  },
  {
    brand: "Omega",
    model: "Seamaster",
    productType: "Watches",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/71pJkTA-88L._AC_SY679_.jpg",
    description: "Diving watch with stainless steel case and sapphire crystal",
    condition: "Like new",
    price: 5000,
    rating: 15,
    comments: [
      {
        text: "Reliable and stylish.",
        author: "DiverDave",
        createdAt: new Date("2023-12-10")
      }
    ]
  },
  {
    brand: "Herman Miller",
    model: "Aeron Chair",
    productType: "Other",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/7194RcPKLOL._AC_SL1500_.jpg",
    description: "Ergonomic office chair with breathable mesh and adjustable settings",
    condition: "New",
    price: 1200,
    rating: 15,
    comments: [
      {
        text: "Great for long working hours.",
        author: "OfficePro",
        createdAt: new Date("2024-05-18")
      }
    ]
  },
  {
    brand: "Dyson",
    model: "V11 Vacuum",
    productType: "Electronics",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/41XyJOWin0L._AC_.jpg",
    description: "Powerful cordless vacuum cleaner with intelligent suction control",
    condition: "New",
    price: 700,
    rating: 15,
    comments: [
      {
        text: "Makes cleaning effortless.",
        author: "CleanHouse",
        createdAt: new Date("2023-11-25")
      }
    ]
  },
  {
    brand: "Canon",
    model: "PIXMA TS9120",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/812wImcyXrL._AC_SL1500_.jpg",
    description: "All-in-one wireless printer with high-quality photo printing",
    condition: "New",
    price: 250,
    rating: 14,
    comments: [
      {
        text: "Excellent print quality.",
        author: "HomeOffice",
        createdAt: new Date("2023-07-30")
      }
    ]
  },
  {
    brand: "The North Face",
    model: "ThermoBall Jacket",
    productType: "Clothing",
    year: 2022,
    imgUrl: "https://m.media-amazon.com/images/I/61cGkUIgmwL._AC_SX522_.jpg",
    description: "Insulated jacket with lightweight warmth and water resistance",
    condition: "Used",
    price: 150,
    rating: 14,
    comments: [
      {
        text: "Perfect for outdoor adventures.",
        author: "HikerHelen",
        createdAt: new Date("2024-03-20")
      }
    ]
  },
  {
    brand: "Nintendo",
    model: "Switch OLED",
    productType: "Watches",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/71ZvqI8yj1L._AC_SL1500_.jpg",
    description: "Enhanced Nintendo Switch with vibrant OLED display",
    condition: "New",
    price: 350,
    rating: 15,
    comments: [
      {
        text: "Love the new screen quality!",
        author: "GamerAlex",
        createdAt: new Date("2024-04-05")
      }
    ]
  },
  {
    brand: "Fossil",
    model: "Gen 6 Smartwatch",
    productType: "Electronics",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/51sOvjEd0BL._AC_SL1000_.jpg",
    description: "Smartwatch with fitness tracking and customizable watch faces",
    condition: "Like new",
    price: 200,
    rating: 14,
    comments: [
      {
        text: "Helps me keep track of my workouts.",
        author: "FitnessFan",
        createdAt: new Date("2023-06-28")
      }
    ]
  },
  {
    brand: "Lego",
    model: "Star Wars Millennium Falcon",
    productType: "Other",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/81rKf-KHzwL._AC_SL1500_.jpg",
    description: "Detailed LEGO set of the iconic Millennium Falcon",
    condition: "New",
    price: 800,
    rating: 15,
    comments: [
      {
        text: "A must-have for Star Wars fans.",
        author: "BuilderBob",
        createdAt: new Date("2024-01-15")
      }
    ]
  },
  {
    brand: "KitchenAid",
    model: "Stand Mixer",
    productType: "Electronics",
    year: 2022,
    imgUrl: "https://m.media-amazon.com/images/I/61llbkDjldL._AC_SL1500_.jpg",
    description: "Versatile stand mixer with multiple attachments for baking",
    condition: "Used",
    price: 300,
    rating: 15,
    comments: [
      {
        text: "Makes baking so much easier!",
        author: "BakerBella",
        createdAt: new Date("2023-05-10")
      }
    ]
  },
  {
    brand: "Sony",
    model: "Bravia 4K TV",
    productType: "Electronics",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/819-1jfnSgL._AC_SL1500_.jpg",
    description: "55-inch 4K Ultra HD smart TV with HDR and streaming capabilities",
    condition: "New",
    price: 650,
    rating: 5,
    comments: [
      {
        text: "Incredible picture and sound.",
        author: "MovieNight",
        createdAt: new Date("2024-07-20")
      }
    ]
  },
  {
    brand: "Microsoft",
    model: "Xbox Series X",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/51mwv0GwH2L._AC_SL1500_.jpg",
    description: "Next-generation gaming console with powerful performance",
    condition: "New",
    price: 499,
    rating: 15,
    comments: [
      {
        text: "Seamless gaming experience.",
        author: "GamerJoe",
        createdAt: new Date("2023-09-05")
      }
    ]
  },
  {
    brand: "Casio",
    model: "G-Shock DW5600",
    productType: "Watches",
    year: 2024,
    imgUrl: "https://m.media-amazon.com/images/I/61DDeVD+-NL._AC_SX425_.jpg",
    description: "Durable and shock-resistant digital watch with multiple features",
    condition: "New",
    price: 100,
    rating: 14,
    comments: [
      {
        text: "Perfect for outdoor activities.",
        author: "AdventureAmy",
        createdAt: new Date("2024-02-14")
      }
    ]
  },
  {
    brand: "Burberry",
    model: "Classic Trench Coat",
    productType: "Other",
    year: 2023,
    imgUrl: "https://m.media-amazon.com/images/I/718CwPljE1L._AC_SX466_.jpg",
    description: "Iconic trench coat made from premium materials",
    condition: "Like new",
    price: 2000,
    rating: 15,
    comments: [
      {
        text: "Timeless and elegant.",
        author: "FashionForward",
        createdAt: new Date("2024-08-01")
      }
    ]
  }
];

async function seedDatabase() {
  try {
    const testUser = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "123456"
    });

    console.log("Test user created:", testUser.email);

    await Product.deleteMany({});
    console.log("Cleaned up old products");

    const productsWithCreator = seedProducts.map(product => ({
      ...product,
      creator: testUser._id
    }));

    const createdProducts = await Product.create(productsWithCreator);
    console.log(`Created ${createdProducts.length} products`);

    return { success: true, message: "Database seeded successfully!" };
  } catch (error) {
    console.error("Seeding error:", error);
    return { success: false, message: error.message };
  }
}

module.exports = { seedDatabase };
