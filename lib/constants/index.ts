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

export const DEFAULT_SPECIALTIES = [
  { emoji: '🚀', title: '性能优化', description: '专注于代码优化和用户体验提升' },
  { emoji: '🎨', title: 'UI/UX设计', description: '注重界面美观和交互体验' },
  { emoji: '⚡', title: '快速开发', description: '高效开发流程和项目交付' }
]