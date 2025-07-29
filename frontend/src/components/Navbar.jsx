import { Menu, Icon, Input, Label } from 'semantic-ui-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <Menu
      pointing
      secondary
      style={{
        borderRadius: 0,
        margin: 0,
        padding: 0,
        minHeight: 60,
        background: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}
    >
      <Menu.Item
        as={Link}
        to="/"
        header
        style={{ 
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          color: 'var(--primary-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 200
        }}
      >
        GreenKart <Icon name="leaf" style={{ color: 'var(--primary-green)', marginLeft: 8 }} />
      </Menu.Item>

      <div style={{ 
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 500,
        width: '100%',
        padding: '0 10px'
      }}>
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <Input
            fluid
            transparent
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '20px',
              padding: '8px 10px 8px 14px',
              background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              height: '36px',
              lineHeight: '36px'
            }}
            iconPosition="left"
            icon={
              <Icon 
                name="search" 
                link 
                onClick={handleSearch}
                style={{ 
                  color: 'var(--primary-green)',
                  marginLeft: '12px'
                }}
              />
            }
          />
        </form>
      </div>
      
      <Menu.Menu position="right" style={{ margin: 0, minWidth: 200 }}>
        <Menu.Item
          as={Link}
          to="/products"
          active={location.pathname === '/products'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="shopping basket" /> Products
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/cart"
          active={location.pathname === '/cart'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Icon name="cart" /> Cart
          {getCartCount() > 0 && (
            <Label 
              circular 
              color="red" 
              size="mini"
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}
            >
              {getCartCount()}
            </Label>
          )}
        </Menu.Item>
        {isAuthenticated && (
          <Menu.Item
            as={Link}
            to="/profile"
            active={location.pathname === '/profile'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="user" /> Profile
          </Menu.Item>
        )}
        {isAuthenticated ? (
          <Menu.Item
            onClick={handleLogout}
            style={{ 
              color: '#e74c3c', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="sign-out" /> Logout
          </Menu.Item>
        ) : (
          <Menu.Item
            onClick={handleLogin}
            style={{ 
              color: 'var(--primary-green)', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="sign-in" /> Login
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Navbar;