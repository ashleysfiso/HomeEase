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
import {
  Form,
  Link,
  redirect,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import { registerUser } from "../../api";
import { useAuth } from "@/contexts/AuthContext";

let setUserInsideAction;

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const phoneNumber = formData.get("email");
  console.log(formData);

  try {
    const data = await registerUser({
      username,
      email,
      phoneNumber,
      password,
    });
    console.log("Log Data from register action", data);
    setUserInsideAction(data);
    return redirect("/");
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default function Register() {
  const { setUser } = useAuth();
  setUserInsideAction = setUser;
  const navigation = useNavigation();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <ScrollRestoration />
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign up</CardTitle>
              <CardDescription>
                Enter your credentials below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="post" replace>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                      placeholder="0712345678"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                      title="Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character."
                      required
                    />
                  </div>
                  <Button
                    disabled={navigation.state === "submitting"}
                    type="submit"
                    className="w-full"
                  >
                    {navigation.state === "submitting"
                      ? "Signing Up"
                      : "Sign Up"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
