import { Modal, Image, Header, Button, Icon, Grid, Segment, Input } from 'semantic-ui-react';
import { useState } from 'react';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}?v=${Date.now()}`;
};

function ProductDetailModal({ product, open, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose} size="large" style={{ borderRadius: '12px' }}>
      <Modal.Header style={{ 
        background: 'var(--primary-green)', 
        color: 'white',
        borderBottom: 'none'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Product Details</span>
          <Button 
            icon 
            circular 
            size="mini"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
            onClick={onClose}
          >
            <Icon name="close" />
          </Button>
        </div>
      </Modal.Header>
      
      <Modal.Content>
        <Grid>
          <Grid.Column width={8}>
            <div style={{ 
              height: '400px', 
              overflow: 'hidden', 
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image 
                src={getImageUrl(product.image)} 
                style={{ 
                  width: '85%', 
                  height: '85%', 
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/27AE60/FFFFFF?text=Image+Not+Found';
                }}
              />
            </div>
          </Grid.Column>
          
          <Grid.Column width={8}>
            <div style={{ padding: '0 1rem' }}>
              <Header as="h2" style={{ 
                color: '#333',
                marginBottom: '1rem'
              }}>
                {product.name}
              </Header>
              
              <div style={{
                background: 'linear-gradient(45deg, var(--primary-green), #2ecc71)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '24px',
                fontWeight: 'bold',
                display: 'inline-block',
                marginBottom: '1rem',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
              }}>
                ₹{product.price} / {product.unit}
              </div>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                color: '#666',
                marginBottom: '1.5rem'
              }}>
                {product.description}
              </p>
              
              {/* Unit Display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.5rem',
                padding: '12px 16px',
                background: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #d4edda'
              }}>
                <Icon name="tag" color="green" />
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: 'var(--primary-green)' 
                }}>
                  Unit: {product.unit}
                </span>
              </div>
              
              {/* Quantity Controls */}
              <Segment style={{ 
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <Header as="h4" style={{ marginBottom: '1rem' }}>
                  <Icon name="shopping cart" color="green" />
                  Select Quantity
                </Header>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#666' }}>
                    Quantity:
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <Button 
                      icon 
                      size="small"
                      style={{
                        background: '#f8f9fa',
                        border: 'none',
                        borderRadius: 0,
                        padding: '12px 16px'
                      }}
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
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
                        width: '60px',
                        textAlign: 'center',
                        border: 'none',
                        padding: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: 'white'
                      }}
                    />
                    <Button 
                      icon 
                      size="small"
                      style={{
                        background: '#f8f9fa',
                        border: 'none',
                        borderRadius: 0,
                        padding: '12px 16px'
                      }}
                      onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                    >
                      <Icon name="plus" />
                    </Button>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    (Max: 10)
                  </span>
                </div>
                <div style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  Total: ₹{(product.price * quantity).toFixed(2)}
                </div>
              </Segment>
              
              <Segment style={{ 
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px'
              }}>
                <Header as="h4" style={{ marginBottom: '0.5rem' }}>
                  <Icon name="info circle" color="green" />
                  Product Information
                </Header>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Stock:</strong> <span style={{ color: 'green' }}>In Stock</span></p>
                  <p><strong>Delivery:</strong> Free delivery on orders above ₹500</p>
                  <p><strong>Unit:</strong> {product.unit}</p>
                </div>
              </Segment>
              
              <div style={{ marginTop: '2rem' }}>
                <Grid columns={2}>
                  <Grid.Column>
                    <Button 
                      fluid 
                      size="large"
                      color="green" 
                      style={{
                        background: 'var(--primary-green)',
                        border: 'none',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '15px'
                      }}
                      onClick={handleAddToCart}
                    >
                      <Icon name="cart plus" />
                      Add to Cart ({quantity})
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button 
                      fluid 
                      size="large"
                      color="blue"
                      style={{
                        background: '#3498db',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '15px'
                      }}
                    >
                      <Icon name="heart outline" />
                      Wishlist
                    </Button>
                  </Grid.Column>
                </Grid>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default ProductDetailModal;