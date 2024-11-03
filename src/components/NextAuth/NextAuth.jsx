'use client'
import { signIn} from 'next-auth/react';
import React from 'react';

const GoogleLoginButton = () => {
    const handleSignIn = () => {
        signIn('google');
      };
  return (
    <button onClick={handleSignIn} className="google-login-button">
      Đăng nhập bằng Google
    </button>
  );
};

export default GoogleLoginButton;