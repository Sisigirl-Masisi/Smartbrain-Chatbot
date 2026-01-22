import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const mockCredentials = {
    email: 'user@smartbrain.com',
    password: 'SmartBrain2026!'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (authError) {
      setAuthError('');
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setAuthError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        navigate('/chat-interface');
      } else {
        setAuthError(`Invalid credentials. Please use:\nEmail: ${mockCredentials?.email}\nPassword: ${mockCredentials?.password}`);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented soon.');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {authError && (
        <div className="p-4 rounded-lg bg-error/10 border border-error/20 flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-error font-medium mb-1">Authentication Failed</p>
            <p className="text-xs text-error/80 whitespace-pre-line">{authError}</p>
          </div>
        </div>
      )}
      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={handleCheckboxChange}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors focus-ring rounded"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;