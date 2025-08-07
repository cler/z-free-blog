export const APP_NAME = "Z-Free-Blog";

export const APP_DESCRIPTION = "A free blog platform for developers";

export const AUTH_SECRET = process.env.NEXTAUTH_SECRET || "CPK0M2rCQF5hRVxpzJrW7l2b1aL/AFweEzArg6AS2Rc=";


export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}