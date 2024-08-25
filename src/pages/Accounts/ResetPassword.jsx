import React, { useState } from 'react';
import { PasswordInput, Button, Container, Title, Alert } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = new URLSearchParams(location.search).get('token');  // Extract token from URL

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      await axios.post('/user/password-reset-link', { resetToken, password });
      setError('');
      navigate('/password-reset-success');
    } catch (error) {
      setError('Failed to reset password');
    }
  };
  

  return (
    <Container size="xs">
      <Title align="center">Reset Password</Title>
      <PasswordInput
        label="New Password"
        placeholder="Enter new password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        required
        mt="md"
      />
      {error && <Alert color="red">{error}</Alert>}
      <Button fullWidth mt="md" onClick={handleSubmit}>
        Reset Password
      </Button>
    </Container>
  );
}

export default ResetPassword;
