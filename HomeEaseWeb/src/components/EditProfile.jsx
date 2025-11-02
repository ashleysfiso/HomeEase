import React, { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetUserProfile } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import ProfileSkeleton from "./SkeletonLoader/ProfileSkeletonLoader";
import { EditUserProfile } from "@/api";
import MyLoader from "./MyLoader";
import { useToast } from "@/hooks/use-toast";
import { UpdatePassword } from "@/api";
import ImageUpload from "./ImageUpload";

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const userId = user?.userId;
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await GetUserProfile(userId);

        setUserInfo({
          firstName: res.firstName || "",
          lastName: res.lastName || "",
          phoneNumber: res.phoneNumber || "",
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Edit profile error:", err);
      }
    };
    if (userId) {
      loadUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { firstName, lastName, phoneNumber } = userInfo;

    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await EditUserProfile({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      });
      setUserInfo({
        firstName: res.user.firstName || "",
        lastName: res.user.lastName || "",
        phoneNumber: res.user.phoneNumber || "",
      });
      setIsSubmitting(false);
      toast({ description: res.message });
    } catch (error) {
      setIsSubmitting(false);
      alert(error.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all the fields.");
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      alert(
        "Password must be at least 8 characters long and contain uppercase, lowercase, and a number."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Example API call
      const res = await UpdatePassword({
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      toast({ description: "Password updated successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsSubmitting(false);
    } catch (error) {
      alert(error.message);
      console.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="container mt-14 mx-auto max-w-2xl p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="user-info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="user-info">User Info</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              {user.role.includes("ServiceProvider") && (
                <TabsTrigger value="upload-logo">Upload Logo</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="user-info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={userInfo.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={userInfo.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                      value={userInfo.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting && <MyLoader />}Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      value={passwordData["currentPassword"]}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      value={passwordData["newPassword"]}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      value={passwordData["confirmPassword"]}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm text-muted-foreground">
                      Password must be at least 8 characters long and contain at
                      least one uppercase letter, one lowercase letter, and one
                      number.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isSubmitting}
                    onClick={handlePasswordSubmit}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting && <MyLoader />} Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="upload-logo" className="space-y-4">
              <ImageUpload
                onUploadComplete={(url) => {
                  console.log("Upload complete:", url);
                }}
                maxSizeMB={5}
                acceptedFormats={["image/jpeg", "image/png", "image/gif"]}
                type="Logo"
                id={user?.userId}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
