import { Container, Header, Button, Icon, Grid, Segment, Image, Card, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api';
import hero from '../assets/hero.png';
import ProductDetailModal from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}?v=${Date.now()}`;
};

function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [freshProduce, setFreshProduce] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllBestSellers, setShowAllBestSellers] = useState(false);
  const [showAllFreshProduce, setShowAllFreshProduce] = useState(false);
  const [showAllBeverages, setShowAllBeverages] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [allProductsRes, beveragesRes, produceRes] = await Promise.all([
          API.get('/products'),
          API.get('/products/category/beverages'),
          API.get('/products/category/fresh-produce')
        ]);

        const allProducts = allProductsRes.data;
        const bestSellers = [
          ...freshProduceProducts.slice(0, 2),
          ...bakeryProducts.slice(0, 1),
          ...dairyProducts.slice(0, 1)
        ];
        
        setBestSellers(bestSellers);
        setBeverages(beveragesRes.data);
        setFreshProduce(produceRes.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error details:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value);
      if (value > 0 && value <= 10) {
        setQuantity(value);
      }
    };
  
    const handleProductAddToCart = (e) => {
      e.stopPropagation();
      e.preventDefault();
      addToCart(product, quantity);
    };
  
    return (
      <Grid.Column key={product._id}>
        <Card fluid style={{ 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          cursor: 'pointer',
          borderRadius: '12px',
          overflow: 'hidden'
        }} 
        onClick={() => handleProductClick(product)}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}>
          <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
            <Image 
              src={getImageUrl(product.image)} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/27AE60/FFFFFF?text=Image+Not+Found';
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(39, 174, 96, 0.8), rgba(39, 174, 96, 0.4))',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
              <Button 
                circular 
                icon 
                size="large"
                style={{
                  background: 'white',
                  color: 'var(--primary-green)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                <Icon name="eye" />
              </Button>
            </div>
          </div>
          <Card.Content style={{ padding: '1.2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.8rem'
            }}>
              <Card.Header style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                margin: 0,
                flex: 1,
                color: '#333'
              }}>
                {product.name}
              </Card.Header>
              <div style={{
                background: 'linear-gradient(45deg, var(--primary-green), #2ecc71)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(39, 174, 96, 0.3)'
              }}>
                ₹{product.price}
              </div>
            </div>
            <Card.Meta style={{ 
              color: '#666',
              fontSize: '0.95rem',
              lineHeight: '1.4',
              marginBottom: '1rem'
            }}>
              {product.description}
            </Card.Meta>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1rem',
              padding: '8px 12px',
              background: '#e8f5e8',
              borderRadius: '8px',
              border: '1px solid #d4edda'
            }}>
              <Icon name="tag" color="green" size="small" />
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-green)' 
              }}>
                {product.unit}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1rem',
              padding: '8px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>
                Qty:
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <Button 
                  icon 
                  size="mini"
                  style={{
                    background: '#f8f9fa',
                    border: 'none',
                    borderRadius: 0,
                    padding: '8px 12px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                >
                  <Icon name="minus" />
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max="10"
                  style={{
                    width: '50px',
                    textAlign: 'center',
                    border: 'none',
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <Button 
                  icon 
                  size="mini"
                  style={{
                    background: '#f8f9fa',
                    border: 'none',
                    borderRadius: 0,
                    padding: '8px 12px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (quantity < 10) setQuantity(quantity + 1);
                  }}
                >
                  <Icon name="plus" />
                </Button>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <Button 
                fluid 
                color="green" 
                style={{
                  background: 'var(--primary-green)',
                  border: 'none',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                onClick={handleProductAddToCart}
              >
                <Icon name="cart plus" />
                Add to Cart
              </Button>
              <Button 
                icon 
                color="blue"
                style={{
                  background: '#3498db',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name="heart outline" />
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 60, textAlign: 'center', padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid var(--primary-green)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <Header as="h3" style={{ color: 'var(--primary-green)' }}>
            Loading products...
          </Header>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 60 }}>
      <div
        style={{
          width: '100%',
          height: '500px',
          background: `url(${hero}) center center/cover no-repeat`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '3rem 2rem',
            borderRadius: 18,
            textAlign: 'center',
            color: '#fff',
            maxWidth: 600,
            width: '100%',
          }}
        >
          <Header as="h1" style={{ fontSize: '3.5rem', marginBottom: 10, color: '#fff' }}>
            Fresh Groceries, Delivered Fast
          </Header>
          <Header as="h3" style={{ color: '#fff', fontWeight: 400, marginBottom: 30 }}>
            Shop the best quality products at unbeatable prices
          </Header>
          <Button
            as={Link}
            to="/products"
            size="huge"
            style={{ background: 'var(--primary-green)', color: '#fff' }}
            icon
            labelPosition="right"
          >
            Shop Now
            <Icon name="shopping cart" />
          </Button>
        </div>
      </div>

      <Container style={{ marginTop: 50, marginBottom: 50 }}>
        <Header as="h2" textAlign="center" style={{ 
          marginBottom: 30, 
          color: 'var(--primary-green)',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Best Sellers
        </Header>
        <Grid columns={4} stackable doubling>
          {(showAllBestSellers ? bestSellers : bestSellers.slice(0, 4)).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
        {bestSellers.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button
              size="large"
              style={{
                background: showAllBestSellers ? '#6c757d' : 'var(--primary-green)',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
              }}
              onClick={() => setShowAllBestSellers(!showAllBestSellers)}
            >
              <Icon name={showAllBestSellers ? 'chevron up' : 'chevron down'} />
              {showAllBestSellers ? 'Show Less' : `View More (${bestSellers.length - 4} more)`}
            </Button>
          </div>
        )}
      </Container>

      <Container style={{ marginTop: 50, marginBottom: 50 }}>
        <Header as="h2" textAlign="center" style={{ 
          marginBottom: 30, 
          color: 'var(--primary-green)',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Fresh Produce
        </Header>
        <Grid columns={4} stackable doubling>
          {(showAllFreshProduce ? freshProduce : freshProduce.slice(0, 4)).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
        {freshProduce.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button
              size="large"
              style={{
                background: showAllFreshProduce ? '#6c757d' : 'var(--primary-green)',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
              }}
              onClick={() => setShowAllFreshProduce(!showAllFreshProduce)}
            >
              <Icon name={showAllFreshProduce ? 'chevron up' : 'chevron down'} />
              {showAllFreshProduce ? 'Show Less' : `View More (${freshProduce.length - 4} more)`}
            </Button>
          </div>
        )}
      </Container>

      <Container style={{ marginTop: 50, marginBottom: 50 }}>
        <Header as="h2" textAlign="center" style={{ 
          marginBottom: 30, 
          color: 'var(--primary-green)',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Beverages
        </Header>
        <Grid columns={4} stackable doubling>
          {(showAllBeverages ? beverages : beverages.slice(0, 4)).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
        {beverages.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button
              size="large"
              style={{
                background: showAllBeverages ? '#6c757d' : 'var(--primary-green)',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
              }}
              onClick={() => setShowAllBeverages(!showAllBeverages)}
            >
              <Icon name={showAllBeverages ? 'chevron up' : 'chevron down'} />
              {showAllBeverages ? 'Show Less' : `View More (${beverages.length - 4} more)`}
            </Button>
          </div>
        )}
      </Container>

      <Segment style={{ 
        background: '#2c3e50', 
        color: '#fff', 
        margin: 0, 
        borderRadius: 0,
        padding: '3rem 0'
      }}>
        <Container>
          <Grid columns={4} stackable>
            <Grid.Column>
              <Header as="h3" style={{ color: '#fff', marginBottom: '1rem' }}>
                <Icon name="leaf" style={{ color: 'var(--primary-green)' }} />
                GreenKart
              </Header>
              <p style={{ color: '#bdc3c7', lineHeight: '1.6', marginBottom: '1rem' }}>
                Your trusted source for fresh, organic groceries delivered right to your doorstep.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button circular icon size="small" style={{ background: '#3498db', color: '#fff' }}>
                  <Icon name="facebook f" />
                </Button>
                <Button circular icon size="small" style={{ background: '#1da1f2', color: '#fff' }}>
                  <Icon name="twitter" />
                </Button>
                <Button circular icon size="small" style={{ background: '#e1306c', color: '#fff' }}>
                  <Icon name="instagram" />
                </Button>
              </div>
            </Grid.Column>

            <Grid.Column>
              <Header as="h4" style={{ color: '#fff', marginBottom: '1rem' }}>
                Quick Links
              </Header>
              <List style={{ color: '#bdc3c7' }}>
                <List.Item>
                  <List.Icon name="angle right" style={{ color: 'var(--primary-green)' }} />
                  <List.Content>
                    <Link to="/products" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                      All Products
                    </Link>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="angle right" style={{ color: 'var(--primary-green)' }} />
                  <List.Content>
                    <Link to="/cart" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                      Shopping Cart
                    </Link>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="angle right" style={{ color: 'var(--primary-green)' }} />
                  <List.Content>
                    <Link to="/profile" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                      My Account
                    </Link>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column>
              <Header as="h4" style={{ color: '#fff', marginBottom: '1rem' }}>
                Customer Service
              </Header>
              <List style={{ color: '#bdc3c7' }}>
                <List.Item>
                  <List.Icon name="phone" style={{ color: 'var(--primary-green)' }} />
                  <List.Content>
                    <div>+91 1234567899</div>
                    <div style={{ fontSize: '0.9rem', color: '#95a5a6' }}>24/7 Support</div>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="mail" style={{ color: 'var(--primary-green)' }} />
                  <List.Content>
                    <div>support@greenkart.com</div>
                    <div style={{ fontSize: '0.9rem', color: '#95a5a6' }}>Email Support</div>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="clock" style={{ color: 'var(--primary-green)' }} />
                  <List.Content>
                    <div>Mon - Sun: 6AM - 10PM</div>
                    <div style={{ fontSize: '0.9rem', color: '#95a5a6' }}>Delivery Hours</div>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column>
              <Header as="h4" style={{ color: '#fff', marginBottom: '1rem' }}>
                Stay Updated
              </Header>
              <p style={{ color: '#bdc3c7', marginBottom: '1rem' }}>
                Subscribe to our newsletter for exclusive offers and updates.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    border: '1px solid #34495e',
                    borderRadius: '4px',
                    background: '#34495e',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
                <Button 
                  size="small" 
                  style={{ 
                    background: 'var(--primary-green)', 
                    color: '#fff',
                    border: 'none'
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </Grid.Column>
          </Grid>

          <div style={{ 
            borderTop: '1px solid #34495e', 
            marginTop: '2rem', 
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ color: '#bdc3c7', fontSize: '0.9rem' }}>
              © 2025 GreenKart. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
              <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Shipping Policy</a>
              <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Return Policy</a>
            </div>
          </div>
        </Container>
      </Segment>

      <ProductDetailModal 
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default Home;
