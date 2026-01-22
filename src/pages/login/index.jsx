import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';

const Login = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
              <Icon name="Brain" size={40} color="var(--color-primary)" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground text-center">
              Sign in to continue your intelligent conversations
            </p>
          </div>

          <LoginForm />

          <div className="mt-6">
            <SocialLogin />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={handleCreateAccount}
                className="text-primary hover:text-primary/80 font-semibold transition-colors focus-ring rounded"
              >
                Create Account
              </button>
            </p>
          </div>

          <TrustSignals />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground caption">
            By signing in, you agree to our{' '}
            <button className="text-primary hover:underline focus-ring rounded">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-primary hover:underline focus-ring rounded">
              Privacy Policy
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground caption">
            &copy; {new Date()?.getFullYear()} SmartBrain. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;