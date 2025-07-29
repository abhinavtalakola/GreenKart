import React, { useState } from 'react';
import { Card, Image, Button, Icon } from 'semantic-ui-react';

const ProductCard = ({ product, onAddToCart, onProductClick }) => {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({ ...product, quantity });
  };

  const getDefaultImage = (productName) => {
    return `https://via.placeholder.com/400x300/27AE60/FFFFFF?text=${encodeURIComponent(productName)}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card fluid style={{ 
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      borderRadius: '12px',
      overflow: 'hidden',
      height: '450px'
    }} 
    onClick={() => onProductClick(product)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }}>
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <Image 
          src={imageError ? getDefaultImage(product.name) : product.image} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
          onError={handleImageError}
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
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
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
            onClick={handleAddToCart}
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
  );
};

export default ProductCard; 