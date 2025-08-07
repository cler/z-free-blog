import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) => {
 
  const { searchParams } = props;
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/";

  // 监测 auth() 函数执行耗时
  const session = await auth();
  if (session) {
    redirect(callbackUrl);
  }

  return (
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-4">
            <CardTitle className="text-center">登录</CardTitle>
            <CardDescription className="text-center">
              请选择一种登录方式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CredentialsSignInForm />
          </CardContent>
        </Card>
      </div>
  );
};

export default SignIn;
