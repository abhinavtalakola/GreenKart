import { Container, Header, Grid, Segment, Button, Icon, Form, Input, Label } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Profile() {
  const [user, setUser] = useState({
    email: '',
    name: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEditForm(user);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await API.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setEditForm(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await API.put('/auth/profile', editForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(editForm);
        setIsEditing(false);
      } else {
        setUser(editForm);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordUpdate = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await API.put('/auth/change-password', {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setShowPasswordForm(false);
        alert('Password updated successfully!');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    }
  };

  return (
    <Container fluid style={{ marginTop: '6rem', padding: '0 2rem' }}>
      <Header as="h1" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Icon name="user circle" />
        My Profile
      </Header>
      
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Header as="h3" style={{ marginBottom: '1.5rem' }}>
              <Icon name="user" />
              Account Information
            </Header>
            
            {!isEditing ? (
              <div>
                <Grid columns={2} stackable>
                  <Grid.Column>
                    <div style={{ marginBottom: '1rem' }}>
                      <Label size="large">Name</Label>
                      <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{user.name}</p>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <Label size="large">Email</Label>
                      <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{user.email}</p>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div style={{ marginBottom: '1rem' }}>
                      <Label size="large">Phone</Label>
                      <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                        {user.phone || 'Not set'}
                      </p>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <Label size="large">Address</Label>
                      <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                        {user.address || 'Not set'}
                      </p>
                    </div>
                  </Grid.Column>
                </Grid>
                <div style={{ marginTop: '1rem' }}>
                  <Button primary onClick={handleEdit}>
                    <Icon name="edit" />
                    Edit Profile
                  </Button>
                  <Button onClick={() => setShowPasswordForm(true)} style={{ marginLeft: '0.5rem' }}>
                    <Icon name="lock" />
                    Change Password
                  </Button>
                </div>
              </div>
            ) : (
              <Form>
                <Grid columns={2} stackable>
                  <Grid.Column>
                    <Form.Field>
                      <label>Name</label>
                      <Input 
                        value={editForm.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <Input 
                        value={editForm.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Phone</label>
                      <Input 
                        value={editForm.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Address</label>
                      <Input 
                        value={editForm.address} 
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your address"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
                <div style={{ marginTop: '1rem' }}>
                  <Button primary onClick={handleSave}>
                    <Icon name="save" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} style={{ marginLeft: '0.5rem' }}>
                    <Icon name="cancel" />
                    Cancel
                  </Button>
                </div>
              </Form>
            )}

            {showPasswordForm && (
              <Segment style={{ marginTop: '2rem' }}>
                <Header as="h4">
                  <Icon name="lock" />
                  Change Password
                </Header>
                <Form>
                  <Form.Field>
                    <label>Current Password</label>
                    <Input 
                      type="password"
                      value={passwordForm.currentPassword} 
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      placeholder="Enter current password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>New Password</label>
                    <Input 
                      type="password"
                      value={passwordForm.newPassword} 
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm New Password</label>
                    <Input 
                      type="password"
                      value={passwordForm.confirmPassword} 
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </Form.Field>
                  <div style={{ marginTop: '1rem' }}>
                    <Button primary onClick={handlePasswordUpdate}>
                      <Icon name="save" />
                      Update Password
                    </Button>
                    <Button onClick={() => setShowPasswordForm(false)} style={{ marginLeft: '0.5rem' }}>
                      <Icon name="cancel" />
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Segment>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Profile;