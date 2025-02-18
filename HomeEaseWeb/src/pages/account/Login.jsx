import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { loginUser } from "../../api";
import { useAuth } from "@/contexts/AuthContext";
import { Link, ScrollRestoration } from "react-router-dom";

let setUserInsideAction;

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(formData);
  try {
    const userData = await loginUser({ email, password });
    setUserInsideAction(userData);
    console.log(userData);
    return redirect("/");
  } catch (error) {
    return error.message;
  }
}

export default function LogInPage() {
  const { setUser } = useAuth();
  setUserInsideAction = setUser;
  const errorMessage = useActionData();
  const navigation = useNavigation();
  return (
    <div>
      <ScrollRestoration />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <CardDescription>
                  {errorMessage ? (
                    <div className="text-red-500">{errorMessage}</div>
                  ) : (
                    <div>Enter your email below to login to your account</div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form method="post" replace>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                    <Button
                      disabled={navigation.state === "submitting"}
                      type="submit"
                      className="w-full"
                    >
                      {navigation.state === "submitting"
                        ? "Logging In..."
                        : "Login"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Login with Google
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/register"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
