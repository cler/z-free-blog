import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatError(error: any): string {
  console.log(error);
  if (error.name === 'ZodError' && error.issues) {
    // Handle Zod error - issues 是一个数组
    const fieldErrors = error.issues.map((issue: any) => {
      const fieldName = issue.path.length > 0 ? issue.path.join('.') : 'Field';
      return `${fieldName}: ${issue.message}`;
    });

    return fieldErrors.join('; ');
  } else if (error.name === 'ZodError' && error.errors) {
    // Handle legacy Zod error format (fallback)
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const message = error.errors[field].message;
      return typeof message === 'string' ? message : JSON.stringify(message);
    });

    return fieldErrors.join('. ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
}
