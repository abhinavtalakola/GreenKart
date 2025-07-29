import { Container, Header, Grid, Card, Image, Button, Icon, Segment, Divider, Label, Message, Progress } from 'semantic-ui-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}?v=${Date.now()}`;
};

function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getCartSubtotal,
    getDeliveryFee,
    getTotalWithDelivery,
    getSavings,
    isEligibleForFreeDelivery
  } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Order placed successfully! Thank you for shopping with GreenKart.');
      clearCart();
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  const CartItem = ({ item }) => (
    <Card fluid style={{ 
      marginBottom: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e9ecef'
    }}>
      <Card.Content>
        <Grid>
          <Grid.Column width={4}>
            <div style={{ 
              height: '120px', 
              overflow: 'hidden', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8f9fa'
            }}>
              <Image 
                src={getImageUrl(item.image)} 
                style={{ 
                  width: '90%', 
                  height: '90%', 
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x150/27AE60/FFFFFF?text=Image+Not+Found';
                }}
              />
            </div>
          </Grid.Column>
          
          <Grid.Column width={8}>
            <div style={{ padding: '0 1rem' }}>
              <Header as="h4" style={{ marginBottom: '0.5rem', color: '#333' }}>
                {item.name}
              </Header>
              <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ 
                  color: '#21ba45', 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem' 
                }}>
                  ₹{item.price}
                </span>
                {item.unit && (
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>
                    / {item.unit}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Label size="tiny" color="blue">
                  In Stock
                </Label>
                <Label size="tiny" color="green">
                  Free Delivery
                </Label>
              </div>
            </div>
          </Grid.Column>
          
          <Grid.Column width={4}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <Button 
                    icon 
                    size="mini"
                    style={{ background: '#f8f9fa', border: '1px solid #ddd' }}
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <Icon name="minus" />
                  </Button>
                  <span style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1.1rem',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <Button 
                    icon 
                    size="mini"
                    style={{ background: '#f8f9fa', border: '1px solid #ddd' }}
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                  >
                    <Icon name="plus" />
                  </Button>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>
                  Max: 10
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.3rem',
                  color: '#21ba45'
                }}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              
              <Button 
                icon 
                size="small"
                color="red"
                style={{ background: '#dc3545', border: 'none' }}
                onClick={() => removeFromCart(item._id)}
              >
                <Icon name="trash" />
                Remove
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: 80, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container textAlign="center">
          <div style={{ marginBottom: '2rem' }}>
            <Icon name="shopping cart" size="huge" style={{ color: '#ccc', marginBottom: '1rem' }} />
            <Header as="h2" style={{ color: '#666', marginBottom: '1rem' }}>
              Your cart is empty
            </Header>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              size="large" 
              primary 
              onClick={() => navigate('/products')}
              style={{ 
                background: '#21ba45', 
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px'
              }}
            >
              <Icon name="shopping bag" />
              Start Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotalWithDelivery();
  const savings = getSavings();
  const isFreeDelivery = isEligibleForFreeDelivery();
  const remainingForFreeDelivery = 500 - subtotal;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: '#f8f9fa' }}>
      <Container style={{ padding: '2rem 0' }}>
        <Header as="h1" textAlign="center" style={{ 
          marginBottom: '2rem', 
          color: '#333',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          <Icon name="shopping cart" style={{ color: '#21ba45' }} />
          Shopping Cart ({cartItems.length} items)
        </Header>

        <Grid>
          <Grid.Column width={12}>
            <Segment style={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Header as="h3" style={{ color: '#333', margin: 0 }}>
                  Cart Items ({cartItems.length})
                </Header>
                <Button 
                  color="red" 
                  basic 
                  onClick={clearCart}
                  style={{ borderColor: '#dc3545', color: '#dc3545' }}
                >
                  <Icon name="trash" />
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </Segment>
          </Grid.Column>

          <Grid.Column width={4}>
            <Segment style={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '2rem',
              position: 'sticky',
              top: '100px'
            }}>
              <Header as="h3" style={{ color: '#333', marginBottom: '1.5rem' }}>
                Order Summary
              </Header>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#21ba45' }}>
                    <span>Delivery Savings</span>
                    <span>-₹{savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Delivery Fee</span>
                  <span style={{ color: isFreeDelivery ? '#21ba45' : '#666' }}>
                    {isFreeDelivery ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {!isFreeDelivery && remainingForFreeDelivery > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <Message size="tiny" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <Icon name="info circle" />
                      Add ₹{remainingForFreeDelivery.toFixed(2)} more for FREE delivery
                    </Message>
                    <Progress 
                      value={subtotal} 
                      total={500} 
                      size="tiny" 
                      color="green"
                      style={{ marginBottom: '0.5rem' }}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
                      {Math.round((subtotal / 500) * 100)}% to free delivery
                    </div>
                  </div>
                )}
              </div>

              <Divider />

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#21ba45' }}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                {isFreeDelivery && (
                  <div style={{ fontSize: '0.9rem', color: '#21ba45', textAlign: 'center', marginTop: '0.5rem' }}>
                    <Icon name="check circle" />
                    Free Delivery Applied!
                  </div>
                )}
              </div>

              <Button 
                fluid 
                size="large" 
                primary 
                loading={loading}
                disabled={loading}
                onClick={handleCheckout}
                style={{ 
                  background: '#21ba45', 
                  border: 'none',
                  padding: '15px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                <Icon name="credit card" />
                Proceed to Checkout
              </Button>

              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <Button 
                  basic 
                  fluid 
                  onClick={() => navigate('/products')}
                  style={{ borderColor: '#21ba45', color: '#21ba45' }}
                >
                  <Icon name="arrow left" />
                  Continue Shopping
                </Button>
              </div>

              <Divider />

              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Icon name="shield" />
                  Secure Checkout
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Icon name="truck" />
                  Fast Delivery
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Icon name="undo" />
                  Easy Returns
                </div>
                <div>
                  <Icon name="credit card" />
                  Multiple Payment Options
                </div>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default Cart;