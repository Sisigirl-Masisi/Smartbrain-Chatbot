import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginRedirect = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 md:mt-8 text-center">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Already have an account?
      </p>
      <Button
        variant="outline"
        size="lg"
        onClick={() => navigate('/login')}
        iconName="LogIn"
        iconPosition="left"
        fullWidth
      >
        Sign In to Your Account
      </Button>
    </div>
  );
};

export default LoginRedirect;