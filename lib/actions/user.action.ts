'use server';

import { auth, signIn, signOut } from '@/auth';
import { signInFormSchema, signUpFormSchema } from '../validator';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { formatError } from '../utils';
import prisma from '../db/prisma';
import { hash } from '../encrypt';

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error: any) {
    if (error?.name === 'NEXT_REDIRECT') {
        throw error;
    }
    return { success: false, message: 'Invalid email or password' };
  }
}


export async function signOutUser() {
  await signOut();
}

export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    });

    const plainPassword = user.password;

    user.password = await hash(user.password);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}