
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

type ResetPasswordInputs = {
  email: string;
};

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordInputs>();
  const [emailSent, setEmailSent] = React.useState(false);

  const onSubmit = async (data: ResetPasswordInputs) => {
    await resetPassword(data.email);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md text-center space-y-6">
              <h1 className="text-3xl font-bold">Check Your Email</h1>
              <p className="text-muted-foreground">
                We've sent password reset instructions to your email address. 
                Please check your inbox and follow the link.
              </p>
              <div className="flex justify-center">
                <Link to="/login">
                  <Button variant="outline">Return to Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-muted-foreground mt-2">Enter your email to reset your password</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    } 
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Remember your password?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;
