'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { signInWithCredentials } from '@/lib/actions/user.action';

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [data, action] = useActionState(signInWithCredentials, {
    message: '',
    success: false,
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Signing In...' : 'Sign In with credentials'}
      </Button>
    );
  };

  return (
    <form action={action}>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div className='space-y-6'>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='Enter your email' 
                        required  autoComplete='email' name='email'
                        defaultValue={signInDefaultValues.email}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' placeholder='Enter your password' 
                        required  autoComplete='current-password' name='password' 
                        defaultValue={signInDefaultValues.password}
                />
            </div>
            {
              data && !data.success && (
                <div className='text-center text-destructive'>{data.message}</div>
              )
            }
            <div className="grid w-full max-w-sm items-center gap-3">
                <SignInButton />
            </div>

            <div className='text-sm text-center text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <Link target='_self' className='link' href='/sign-up'>
                Sign Up
              </Link>
            </div>
        </div>
    </form>
  );
};

export default CredentialsSignInForm;