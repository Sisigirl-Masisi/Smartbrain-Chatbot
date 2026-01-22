import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TrustSignals from './components/TrustSignals';
import LoginRedirect from './components/LoginRedirect';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - SmartBrain Chatbot</title>
        <meta name="description" content="Create your SmartBrain account to access AI-powered conversations and intelligent query processing capabilities." />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8 lg:p-10">
            <RegistrationHeader />
            
            <RegistrationForm />
            
            <SocialRegistration />
            
            <LoginRedirect />
          </div>

          <TrustSignals />

          <div className="mt-6 md:mt-8 text-center">
            <p className="text-xs md:text-sm text-muted-foreground caption">
              By creating an account, you agree to receive important updates and notifications about your SmartBrain account.
              <br className="hidden md:block" />
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;