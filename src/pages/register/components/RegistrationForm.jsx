import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (password?.length >= 12) strength += 25;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength += 25;
    if (/\d/?.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/?.test(password)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-error';
    if (passwordStrength < 70) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value?.trim()) {
          error = 'Full name is required';
        } else if (value?.trim()?.length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value?.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value?.length < 8) {
          error = 'Password must be at least 8 characters';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData?.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
      if (formData?.confirmPassword) {
        const confirmError = validateField('confirmPassword', formData?.confirmPassword);
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    }
    
    if (name === 'confirmPassword' && formData?.password) {
      let error = value !== formData?.password ? 'Passwords do not match' : '';
      setErrors(prev => ({ ...prev, confirmPassword: error }));
    }
    
    let error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const newErrors = {};
    Object.keys(formData)?.forEach(key => {
      let error = validateField(key, formData?.[key]);
      if (error) newErrors[key] = error;
    });
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms of service';
    }
    
    if (!agreedToPrivacy) {
      newErrors.privacy = 'You must agree to the privacy policy';
    }
    
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/chat-interface');
    }, 2000);
  };

  const isFormValid = () => {
    return (formData?.fullName?.trim() &&
    formData?.email?.trim() &&
    formData?.password &&
    formData?.confirmPassword &&
    formData?.password === formData?.confirmPassword &&
    agreedToTerms &&
    agreedToPrivacy && Object.keys(errors)?.every(key => !errors?.[key]));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        description="We'll send a verification link to this email"
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      {formData?.password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground caption">Password Strength:</span>
            <span className={`font-medium caption ${passwordStrength < 40 ? 'text-error' : passwordStrength < 70 ? 'text-warning' : 'text-success'}`}>
              {getPasswordStrengthLabel()}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
              style={{ width: `${passwordStrength}%` }}
            />
          </div>
        </div>
      )}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="space-y-3 md:space-y-4 pt-2">
        <Checkbox
          label={
            <span className="text-sm md:text-base">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={(e) => {
                  e?.preventDefault();
                }}
              >
                Terms of Service
              </button>
            </span>
          }
          checked={agreedToTerms}
          onChange={(e) => {
            setAgreedToTerms(e?.target?.checked);
            if (e?.target?.checked) {
              setErrors(prev => ({ ...prev, terms: '' }));
            }
          }}
          error={errors?.terms}
        />

        <Checkbox
          label={
            <span className="text-sm md:text-base">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={(e) => {
                  e?.preventDefault();
                }}
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={agreedToPrivacy}
          onChange={(e) => {
            setAgreedToPrivacy(e?.target?.checked);
            if (e?.target?.checked) {
              setErrors(prev => ({ ...prev, privacy: '' }));
            }
          }}
          error={errors?.privacy}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isFormValid() || isLoading}
        className="mt-6 md:mt-8"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;