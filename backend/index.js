const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('GreenKart API is running...');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is required!');
  process.exit(1);
}

const sampleProducts = [
  { name: 'Fresh Apples', price: 120, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/apples.jpg', description: 'Fresh and juicy red apples' },
  { name: 'Organic Bananas', price: 60, unit: 'dozen', category: 'fresh-produce', image: '/images/fresh-produce/banana.avif', description: 'Organic yellow bananas' },
  { name: 'Fresh Tomatoes', price: 40, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/tomatoes.avif', description: 'Fresh red tomatoes' },
  { name: 'Fresh Carrots', price: 30, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/carrot.avif', description: 'Fresh orange carrots' },
  { name: 'Fresh Onions', price: 25, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/onion.avif', description: 'Fresh white onions' },
  { name: 'Fresh Potatoes', price: 35, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/potato.avif', description: 'Fresh potatoes' },
  { name: 'Fresh Spinach', price: 20, unit: 'bunch', category: 'fresh-produce', image: '/images/fresh-produce/spinach.avif', description: 'Fresh green spinach' },
  { name: 'Fresh Bell Peppers', price: 80, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/bell-peppers.avif', description: 'Fresh colorful bell peppers' },
  { name: 'Fresh Broccoli', price: 45, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/broccoli.avif', description: 'Fresh green broccoli' },
  { name: 'Fresh Cucumber', price: 30, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/cucumber.avif', description: 'Fresh cucumbers' },
  { name: 'Fresh Garlic', price: 50, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/garlic.jpg', description: 'Fresh garlic bulbs' },
  { name: 'Fresh Ginger', price: 70, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/ginger.avif', description: 'Fresh ginger root' },
  { name: 'Fresh Grapes', price: 150, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/grapes.avif', description: 'Fresh sweet grapes' },
  { name: 'Fresh Lemon', price: 40, unit: 'dozen', category: 'fresh-produce', image: '/images/fresh-produce/lemon.avif', description: 'Fresh lemons' },
  { name: 'Fresh Mango', price: 100, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/mango.jpg', description: 'Fresh ripe mangoes' },
  { name: 'Fresh Orange', price: 80, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/orange.avif', description: 'Fresh juicy oranges' },
  { name: 'Fresh Pineapple', price: 120, unit: 'piece', category: 'fresh-produce', image: '/images/fresh-produce/pineapple.avif', description: 'Fresh sweet pineapple' },
  { name: 'Fresh Pomegranate', price: 200, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/pomegranate.jpg', description: 'Fresh pomegranates' },
  { name: 'Fresh Strawberry', price: 300, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/strawberry.avif', description: 'Fresh sweet strawberries' },
  { name: 'Fresh Watermelon', price: 50, unit: 'piece', category: 'fresh-produce', image: '/images/fresh-produce/watermelon.jpg', description: 'Fresh juicy watermelon' },
  { name: 'Fresh Bringal', price: 60, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/bringal.jpg', description: 'Fresh eggplant' },
  { name: 'Fresh Lady\'s Finger', price: 40, unit: 'kg', category: 'fresh-produce', image: '/images/fresh-produce/lady\'s finger.jpg', description: 'Fresh okra' },
  { name: 'Fresh Drumstick', price: 35, unit: 'bunch', category: 'fresh-produce', image: '/images/fresh-produce/drumstick.jpg', description: 'Fresh moringa pods' },

  { name: 'Fresh Milk (1L)', price: 65, unit: 'liter', category: 'dairy', image: '/images/dairy/milk.jpg', description: 'Fresh whole milk' },
  { name: 'Fresh Butter', price: 120, unit: 'pack', category: 'dairy', image: '/images/dairy/butter.jpg', description: 'Fresh butter' },
  { name: 'Fresh Curd', price: 45, unit: 'pack', category: 'dairy', image: '/images/dairy/curd.jpg', description: 'Fresh curd' },
  { name: 'Fresh Ghee', price: 200, unit: 'pack', category: 'dairy', image: '/images/dairy/ghee.jpg', description: 'Pure ghee' },
  { name: 'Fresh Kulfi', price: 25, unit: 'piece', category: 'dairy', image: '/images/dairy/kulfi.jpg', description: 'Traditional kulfi' },
  { name: 'Fresh Lassi', price: 30, unit: 'glass', category: 'dairy', image: '/images/dairy/lassi.jpg', description: 'Sweet lassi' },
  { name: 'Fresh Milkshake', price: 50, unit: 'glass', category: 'dairy', image: '/images/dairy/milkshake.jpg', description: 'Chocolate milkshake' },
  { name: 'Fresh Paneer', price: 180, unit: 'kg', category: 'dairy', image: '/images/dairy/paneer.jpg', description: 'Fresh paneer' },

  { name: 'Whole Grain Bread', price: 45, unit: 'pack', category: 'bakery', image: '/images/bakery/bread.jpeg', description: 'Healthy whole grain bread' },
  { name: 'Fresh Cake', price: 250, unit: 'piece', category: 'bakery', image: '/images/bakery/cake.jpg', description: 'Fresh chocolate cake' },
  { name: 'Fresh Cookies', price: 80, unit: 'pack', category: 'bakery', image: '/images/bakery/cookie.jpg', description: 'Fresh baked cookies' },
  { name: 'Fresh Croissant', price: 35, unit: 'piece', category: 'bakery', image: '/images/bakery/croissant.jpg', description: 'Buttery croissant' },
  { name: 'Fresh Donut', price: 25, unit: 'piece', category: 'bakery', image: '/images/bakery/donut.jpg', description: 'Glazed donut' },
  { name: 'Fresh Muffin', price: 30, unit: 'piece', category: 'bakery', image: '/images/bakery/muffin.jpg', description: 'Blueberry muffin' },
  { name: 'Fresh Puff Pastry', price: 40, unit: 'piece', category: 'bakery', image: '/images/bakery/puff-pastry.jpg', description: 'Flaky puff pastry' },
  { name: 'Fresh Waffle', price: 50, unit: 'piece', category: 'bakery', image: '/images/bakery/waffle.jpg', description: 'Crispy waffle' },

  { name: 'Bru Coffee', price: 150, unit: 'pack', category: 'beverages', image: '/images/beverages/bru.jpg', description: 'Bru coffee powder' },
  { name: 'Fresh Orange Juice', price: 80, unit: 'liter', category: 'beverages', image: '/images/beverages/orange-juice.jpg', description: 'Fresh orange juice' },
  { name: 'Taj Tea', price: 120, unit: 'pack', category: 'beverages', image: '/images/beverages/taj.jpg', description: 'Taj tea bags' },
  { name: 'Thums Up', price: 35, unit: 'bottle', category: 'beverages', image: '/images/beverages/thums.jpeg', description: 'Thums Up soft drink' },

  { name: 'Good Day Cookies', price: 30, unit: 'pack', category: 'snacks', image: '/images/snacks/good-day.jpg', description: 'Good Day cookies' },
  { name: 'Hide & Seek', price: 25, unit: 'pack', category: 'snacks', image: '/images/snacks/hide-seek.jpg', description: 'Hide & Seek cookies' },
  { name: 'Kurkure', price: 20, unit: 'pack', category: 'snacks', image: '/images/snacks/kurkure.jpg', description: 'Kurkure snacks' },
  { name: 'Lays Chips', price: 20, unit: 'pack', category: 'snacks', image: '/images/snacks/lays.webp', description: 'Lays potato chips' },
  { name: 'Moong Dal', price: 80, unit: 'kg', category: 'snacks', image: '/images/snacks/moong-dal.webp', description: 'Moong dal' },
  { name: 'Munch Chocolate', price: 10, unit: 'piece', category: 'snacks', image: '/images/snacks/munch.jpg', description: 'Munch chocolate' },
  { name: 'Nutri Choice', price: 35, unit: 'pack', category: 'snacks', image: '/images/snacks/nutri.jpg', description: 'Nutri Choice biscuits' },
  { name: 'Pringles', price: 50, unit: 'can', category: 'snacks', image: '/images/snacks/pringles.jpg', description: 'Pringles chips' },

  { name: 'Air Freshener', price: 150, unit: 'bottle', category: 'household', image: '/images/household/air.jpg', description: 'Room air freshener' },
  { name: 'Colin Cleaner', price: 80, unit: 'bottle', category: 'household', image: '/images/household/colin.jpg', description: 'Colin floor cleaner' },
  { name: 'Domex Cleaner', price: 120, unit: 'bottle', category: 'household', image: '/images/household/domex.jpg', description: 'Domex bathroom cleaner' },
  { name: 'Harpic Cleaner', price: 100, unit: 'bottle', category: 'household', image: '/images/household/harpic.jpg', description: 'Harpic toilet cleaner' },
  { name: 'Lizol Cleaner', price: 90, unit: 'bottle', category: 'household', image: '/images/household/lizol.jpg', description: 'Lizol floor cleaner' },
  { name: 'Mop', price: 200, unit: 'piece', category: 'household', image: '/images/household/mop.jpg', description: 'Cleaning mop' },
  { name: 'Scotch Tape', price: 30, unit: 'roll', category: 'household', image: '/images/household/scotch.jpg', description: 'Scotch adhesive tape' },
  { name: 'Vim Cleaner', price: 70, unit: 'bottle', category: 'household', image: '/images/household/vim.jpg', description: 'Vim dish cleaner' },

  { name: 'Colgate Toothpaste', price: 45, unit: 'tube', category: 'personal-care', image: '/images/personal/colgate.jpg', description: 'Colgate toothpaste' },
  { name: 'Dove Soap', price: 35, unit: 'bar', category: 'personal-care', image: '/images/personal/dove.jpg', description: 'Dove beauty soap' },
  { name: 'Head & Shoulders', price: 180, unit: 'bottle', category: 'personal-care', image: '/images/personal/head.jpg', description: 'Head & Shoulders shampoo' },
  { name: 'Nivea Cream', price: 120, unit: 'tube', category: 'personal-care', image: '/images/personal/nivea.jpg', description: 'Nivea moisturizing cream' }
];

async function seedProductsIfEmpty() {
  try {
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      await Product.insertMany(sampleProducts);
    }
  } catch (error) {
    console.error('Error checking/seeding products:', error);
  }
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  
  await seedProductsIfEmpty();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});
