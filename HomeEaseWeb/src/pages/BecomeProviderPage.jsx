import React from "react";
import { Building2, Mail, Phone, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/PageHeader";
import { Form } from "react-router-dom";
import { CreateServiceProviderApplication } from "@/api";
import { useNavigation, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");
  const companyName = formData.get("companyName");
  const experience = formData.get("experience");

  try {
    const result = await CreateServiceProviderApplication({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      companyName: companyName,
      experience: experience,
    });

    return redirect("/becomeaprovider/success");
  } catch (error) {
    console.log(error);
    window.alert(error.message);
  }
}

export default function BecomeProviderPage() {
  const navigation = useNavigation();
  return (
    <>
      <PageHeader
        title="Become a Service Provider"
        backgroundImage="/images/page-header-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Become a Provider", href: "/becomeaprovider" },
        ]}
      />
      <div className="max-w-3xl py-10 mx-auto px-4">
        <div className="space-y-6">
          <Form method="post" replace>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Provider Information</CardTitle>
                <CardDescription>
                  Fill out the form below to apply as a service provider on our
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="firstName"
                        className="pl-9"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="lastName"
                        className="pl-9"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="email"
                        className="pl-9"
                        placeholder="you@example.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="phoneNumber"
                        className="pl-9"
                        placeholder="0712345678"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="companyName"
                        className="pl-9"
                        placeholder="Your Company"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Experience
                  </label>
                  <Textarea
                    name="experience"
                    placeholder="Describe your experience, skills, and the services you offer..."
                    className="min-h-[120px]"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Include details about your experience, qualifications, and
                    the areas you serve.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={navigation.state === "submitting"}
                  className="w-full"
                >
                  {" "}
                  {navigation.state === "submitting" ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    ""
                  )}
                  Submit Application
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </div>
      </div>
    </>
  );
}
