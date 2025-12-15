import * as React from 'react';

interface EmailTemplateProps {
  userName: string;
    otp: string;
}

export function verificationEmailTemp({ userName , otp }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {userName}{otp}!</h1>
    </div>
  );
}