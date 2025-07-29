import { Container, Header, Grid, Card, Image, Button, Icon, Checkbox, Segment, Label } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../api';
import ProductDetailModal from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}?v=${Date.now()}`;
};

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { key: 'all', label: 'All Products', value: 'all' },
    { key: 'best-sellers', label: '🔥 Best Sellers', value: 'best-sellers' },
    { key: 'fresh-produce', label: 'Fresh Produce', value: 'fresh-produce' },
    { key: 'beverages', label: 'Beverages', value: 'beverages' },
    { key: 'snacks', label: 'Snacks', value: 'snacks' },
    { key: 'household', label: 'Household', value: 'household' },
    { key: 'bakery', label: 'Bakery', value: 'bakery' },
    { key: 'personal-care', label: 'Personal Care', value: 'personal-care' },
    { key: 'dairy', label: 'Dairy', value: 'dairy' }
  ];

  const bestSellerCategoryMapping = {
    'Fresh Apples': 'fresh-produce',
    'Fresh Milk (1L)': 'dairy',
    'Organic Bananas': 'fresh-produce',
    'Whole Grain Bread': 'bakery'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchQueryFromNav = searchParams.get('search');
    if (searchQueryFromNav) {
      setSearchQuery(searchQueryFromNav);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.includes('best-sellers')) {
      filtered = filtered.filter(product => product.category === 'best-sellers');
    } else if (!selectedCategories.includes('all')) {
      filtered = filtered.filter(product => {
        const isInSelectedCategory = selectedCategories.includes(product.category);
        
        const isBestSellerInThisCategory = product.category === 'best-sellers' && 
          bestSellerCategoryMapping[product.name] && 
          selectedCategories.includes(bestSellerCategoryMapping[product.name]);
        
        return isInSelectedCategory || isBestSellerInThisCategory;
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategories, sortBy, searchQuery]);

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else if (category === 'best-sellers') {
      setSelectedCategories(['best-sellers']);
    } else {
      const newCategories = selectedCategories.filter(cat => cat !== 'all' && cat !== 'best-sellers');
      if (newCategories.includes(category)) {
        setSelectedCategories(newCategories.filter(cat => cat !== category));
      } else {
        setSelectedCategories([...newCategories, category]);
      }
    }
  };

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalAddToCart = (productWithQuantity) => {
    addToCart(productWithQuantity, productWithQuantity.quantity);
    handleModalClose();
  };

  const getProductCountText = () => {
    const count = filteredProducts.length;
    return count === 1 ? '1 product found' : `${count} products found`;
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    navigate('/products');
  };

  if (loading) {
    return (
      <Container style={{ marginTop: '2rem' }}>
        <Header as='h2'>Loading products...</Header>
      </Container>
    );
  }

  return (
    <Container fluid style={{ marginTop: '2rem', padding: '0 2rem' }}>
      <Header as='h1' style={{ color: '#21ba45', marginBottom: '2rem', textAlign: 'center' }}>
        Our Products
      </Header>

      <Grid>
        <Grid.Column width={3}>
          <Segment style={{ position: 'sticky', top: '2rem' }}>
            <Header as='h3' style={{ color: '#21ba45', marginBottom: '1.5rem', borderBottom: '2px solid #21ba45', paddingBottom: '0.5rem' }}>
              Categories
            </Header>
            
            {categories.map((category) => (
              <div key={category.key} style={{ marginBottom: '1rem' }}>
                <Checkbox
                  label={category.label}
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                  style={{ fontSize: '1rem' }}
                />
              </div>
            ))}

            <Header as='h4' style={{ marginTop: '2rem', marginBottom: '1rem', color: '#21ba45' }}>
              Sort By
            </Header>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                marginBottom: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </Segment>
        </Grid.Column>

        <Grid.Column width={13}>
          <Segment style={{ marginBottom: '2rem' }}>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Header as='h4' style={{ margin: 0, color: '#666' }}>
                  {getProductCountText()}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                {searchQuery && (
                  <Button 
                    basic 
                    size='small' 
                    onClick={clearSearch}
                    style={{ color: '#21ba45' }}
                  >
                    <Icon name='times' />
                    Clear Search
                  </Button>
                )}
              </Grid.Column>
            </Grid>
          </Segment>

          <Grid columns={4} stackable>
            {filteredProducts.map((product) => (
              <Grid.Column key={product._id}>
                <Card 
                  fluid 
                  style={{ 
                    height: '450px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  <div style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image 
                      src={getImageUrl(product.image)} 
                      style={{ 
                        width: '90%', 
                        height: '90%', 
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/27AE60/FFFFFF?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <Card.Content style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card.Header style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{product.name}</span>
                        {product.category === 'best-sellers' && (
                          <Label color='red' size='tiny'>
                            🔥
                          </Label>
                        )}
                      </div>
                    </Card.Header>
                    <Card.Meta style={{ marginBottom: '0.5rem' }}>
                      <span style={{ color: '#21ba45', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        ₹{product.price}
                      </span>
                      {product.unit && (
                        <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                          / {product.unit}
                        </span>
                      )}
                    </Card.Meta>
                    <Card.Description style={{ 
                      flex: 1, 
                      fontSize: '0.9rem', 
                      color: '#666',
                      lineHeight: '1.4',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra style={{ padding: '1rem' }}>
                    <Button
                      primary
                      fluid
                      size='large'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      style={{ 
                        backgroundColor: '#21ba45', 
                        borderColor: '#21ba45',
                        fontWeight: 'bold'
                      }}
                    >
                      <Icon name='cart plus' />
                      Add to Cart
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <Segment textAlign='center' style={{ marginTop: '2rem', padding: '3rem' }}>
              <Header as='h3' style={{ color: '#666' }}>
                No products found
              </Header>
              <p style={{ color: '#999' }}>Try adjusting your filters or search terms</p>
              {searchQuery && (
                <Button 
                  primary 
                  onClick={clearSearch}
                  style={{ marginTop: '1rem' }}
                >
                  Clear Search
                </Button>
              )}
            </Segment>
          )}
        </Grid.Column>
      </Grid>

      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onClose={handleModalClose}
        onAddToCart={handleModalAddToCart}
      />
    </Container>
  );
}

export default Products;