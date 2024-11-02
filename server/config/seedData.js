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
    rating: 5,
    comments: ["John Doe: Great product!", "Jane Smith: Amazing phone"]
  },
  {
    brand: "Rolex",
    model: "Submariner",
    productType: "Watches",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Luxury diving watch with premium materials",
    condition: "Like new",
    price: 15000,
    rating: 4,
    comments: ["Watch Collector: Classic timepiece"]
  },
  {
    brand: "Tiffany",
    model: "Diamond Ring",
    productType: "Jewelry",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "18k gold ring with 1 carat diamond",
    condition: "New",
    price: 5000,
    rating: 5,
    comments: []
  },
  {
    brand: "Samsung",
    model: "Galaxy S23",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "High-performance smartphone with stunning display",
    condition: "New",
    price: 899,
    rating: 4,
    comments: ["TechGuru: Excellent performance!", "Sarah Lee: Battery life is impressive."]
  },
  {
    brand: "Nike",
    model: "Air Max 270",
    productType: "Footwear",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Comfortable and stylish sneakers for everyday wear",
    condition: "New",
    price: 150,
    rating: 5,
    comments: ["SneakerHead: Love the design!", "Mike Brown: Very comfortable."]
  },
  {
    brand: "Sony",
    model: "WH-1000XM4",
    productType: "Electronics",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Noise-canceling wireless headphones with superior sound quality",
    condition: "Used",
    price: 250,
    rating: 4,
    comments: ["AudioLover: Great sound but minor scratches."]
  },
  {
    brand: "Levi's",
    model: "501 Original",
    productType: "Clothing",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Classic straight-fit jeans with timeless style",
    condition: "New",
    price: 60,
    rating: 5,
    comments: []
  },
  {
    brand: "Dell",
    model: "XPS 13",
    productType: "Computers",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Ultra-portable laptop with high-resolution display",
    condition: "Like new",
    price: 1200,
    rating: 5,
    comments: ["WorkPro: Perfect for my needs!", "Emily Clark: Sleek and powerful."]
  },
  {
    brand: "Canon",
    model: "EOS R5",
    productType: "Cameras",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Professional mirrorless camera with 45MP sensor",
    condition: "New",
    price: 3900,
    rating: 5,
    comments: ["Photographer99: Exceptional image quality!"]
  },
  {
    brand: "Gucci",
    model: "GG Marmont Bag",
    productType: "Accessories",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Elegant leather handbag with iconic GG hardware",
    condition: "Like new",
    price: 2200,
    rating: 4,
    comments: ["Fashionista: Stylish and versatile."]
  },
  {
    brand: "Microsoft",
    model: "Surface Pro 9",
    productType: "Computers",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "2-in-1 laptop with touchscreen and detachable keyboard",
    condition: "New",
    price: 1300,
    rating: 5,
    comments: ["StudentLife: Perfect for school and work."]
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
    rating: 4,
    comments: ["MusicFan: Great sound quality."]
  },
  {
    brand: "Adidas",
    model: "Ultraboost 21",
    productType: "Footwear",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "High-performance running shoes with responsive cushioning",
    condition: "New",
    price: 180,
    rating: 5,
    comments: ["RunnerJoe: Best running shoes I've owned."]
  },
  {
    brand: "Panasonic",
    model: "Lumix GH5",
    productType: "Cameras",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Professional mirrorless camera for videography and photography",
    condition: "Like new",
    price: 1400,
    rating: 4,
    comments: ["VideographerPro: Excellent for video projects."]
  },
  {
    brand: "Cartier",
    model: "Tank Française",
    productType: "Watches",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Classic rectangular watch with stainless steel bracelet",
    condition: "New",
    price: 8000,
    rating: 5,
    comments: ["LuxuryLover: Timeless design."]
  },
  {
    brand: "Sony",
    model: "PlayStation 5",
    productType: "Gaming",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Next-gen gaming console with immersive graphics",
    condition: "New",
    price: 499,
    rating: 5,
    comments: ["GamerX: Best console ever!", "Alex P.: Fast loading times."]
  },
  {
    brand: "Lululemon",
    model: "Align Leggings",
    productType: "Clothing",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Premium yoga leggings with buttery-soft fabric",
    condition: "New",
    price: 98,
    rating: 5,
    comments: ["YogaEnthusiast: Perfect for workouts."]
  },
  {
    brand: "Tesla",
    model: "Model 3",
    productType: "Automotive",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Electric sedan with impressive range and autopilot features",
    condition: "Used",
    price: 35000,
    rating: 4,
    comments: ["EcoDriver: Smooth and efficient."]
  },
  {
    brand: "Samsung",
    model: 'QLED TV 55"',
    productType: "Home Appliances",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "55-inch QLED Smart TV with vibrant colors and smart features",
    condition: "New",
    price: 700,
    rating: 5,
    comments: ["HomeTheater: Stunning picture quality."]
  },
  {
    brand: "Apple",
    model: 'MacBook Pro 16"',
    productType: "Computers",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Powerful laptop with M1 Pro chip for professionals",
    condition: "Like new",
    price: 2500,
    rating: 5,
    comments: ["DeveloperDan: Handles all my coding needs."]
  },
  {
    brand: "Patagonia",
    model: "Down Jacket",
    productType: "Clothing",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Warm and lightweight down jacket for outdoor activities",
    condition: "Used",
    price: 200,
    rating: 4,
    comments: ["OutdoorMike: Keeps me warm in cold weather."]
  },
  {
    brand: "Breitling",
    model: "Navitimer",
    productType: "Watches",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Pilot watch with chronograph functions and robust design",
    condition: "New",
    price: 9500,
    rating: 5,
    comments: ["AviationFan: Perfect for flying enthusiasts."]
  },
  {
    brand: "Omega",
    model: "Seamaster",
    productType: "Watches",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Diving watch with stainless steel case and sapphire crystal",
    condition: "Like new",
    price: 5000,
    rating: 5,
    comments: ["DiverDave: Reliable and stylish."]
  },
  {
    brand: "Herman Miller",
    model: "Aeron Chair",
    productType: "Furniture",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Ergonomic office chair with breathable mesh and adjustable settings",
    condition: "New",
    price: 1200,
    rating: 5,
    comments: ["OfficePro: Great for long working hours."]
  },
  {
    brand: "Dyson",
    model: "V11 Vacuum",
    productType: "Home Appliances",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Powerful cordless vacuum cleaner with intelligent suction control",
    condition: "New",
    price: 700,
    rating: 5,
    comments: ["CleanHouse: Makes cleaning effortless."]
  },
  {
    brand: "Canon",
    model: "PIXMA TS9120",
    productType: "Electronics",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "All-in-one wireless printer with high-quality photo printing",
    condition: "New",
    price: 250,
    rating: 4,
    comments: ["HomeOffice: Excellent print quality."]
  },
  {
    brand: "The North Face",
    model: "ThermoBall Jacket",
    productType: "Clothing",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Insulated jacket with lightweight warmth and water resistance",
    condition: "Used",
    price: 150,
    rating: 4,
    comments: ["HikerHelen: Perfect for outdoor adventures."]
  },
  {
    brand: "Nintendo",
    model: "Switch OLED",
    productType: "Gaming",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Enhanced Nintendo Switch with vibrant OLED display",
    condition: "New",
    price: 350,
    rating: 5,
    comments: ["GamerAlex: Love the new screen quality!"]
  },
  {
    brand: "Fossil",
    model: "Gen 6 Smartwatch",
    productType: "Electronics",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Smartwatch with fitness tracking and customizable watch faces",
    condition: "Like new",
    price: 200,
    rating: 4,
    comments: ["FitnessFan: Helps me keep track of my workouts."]
  },
  {
    brand: "Lego",
    model: "Star Wars Millennium Falcon",
    productType: "Toys",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Detailed LEGO set of the iconic Millennium Falcon",
    condition: "New",
    price: 800,
    rating: 5,
    comments: ["BuilderBob: A must-have for Star Wars fans."]
  },
  {
    brand: "KitchenAid",
    model: "Stand Mixer",
    productType: "Home Appliances",
    year: 2022,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Versatile stand mixer with multiple attachments for baking",
    condition: "Used",
    price: 300,
    rating: 5,
    comments: ["BakerBella: Makes baking so much easier!"]
  },
  {
    brand: "Sony",
    model: "Bravia 4K TV",
    productType: "Home Appliances",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "55-inch 4K Ultra HD smart TV with HDR and streaming capabilities",
    condition: "New",
    price: 650,
    rating: 5,
    comments: ["MovieNight: Incredible picture and sound."]
  },
  {
    brand: "Microsoft",
    model: "Xbox Series X",
    productType: "Gaming",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Next-generation gaming console with powerful performance",
    condition: "New",
    price: 499,
    rating: 5,
    comments: ["GamerJoe: Seamless gaming experience."]
  },
  {
    brand: "Casio",
    model: "G-Shock DW5600",
    productType: "Watches",
    year: 2024,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Durable and shock-resistant digital watch with multiple features",
    condition: "New",
    price: 100,
    rating: 4,
    comments: ["AdventureAmy: Perfect for outdoor activities."]
  },
  {
    brand: "Burberry",
    model: "Classic Trench Coat",
    productType: "Clothing",
    year: 2023,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/IPhone_14_Pro_vector.svg",
    description: "Iconic trench coat made from premium materials",
    condition: "Like new",
    price: 2000,
    rating: 5,
    comments: ["FashionForward: Timeless and elegant."]
  }
];

async function seedDatabase() {
  try {
    // Създаване на тестов потребител
    const testUser = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "123456"
    });

    console.log("Test user created:", testUser.email);

    // Изтриване на всички съществуващи продукти
    await Product.deleteMany({});
    console.log("Cleaned up old products");

    // Добавяне на creator към всеки продукт
    const productsWithCreator = seedProducts.map(product => ({
      ...product,
      creator: testUser._id
    }));

    // Създаване на новите продукти
    const createdProducts = await Product.create(productsWithCreator);
    console.log(`Created ${createdProducts.length} products`);

    return { success: true, message: "Database seeded successfully!" };
  } catch (error) {
    console.error("Seeding error:", error);
    return { success: false, message: error.message };
  }
}

module.exports = { seedDatabase };
