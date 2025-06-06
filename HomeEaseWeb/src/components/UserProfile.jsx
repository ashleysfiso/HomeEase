import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, redirect } from "react-router-dom";
import axiosInstance from "@/axiosInstance";

export default function UserProfile() {
  const { setUser, user, setIsLoggedIn } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("Auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
      return redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 text-white">
            <AvatarImage src="https://github.com/shadcn.pn" />
            <AvatarFallback className="bg-[#5C6BC0] font-medium">
              {user?.userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user?.role.includes("ServiceProvider") && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.userName}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={""} alt={user?.userName} />
              <AvatarFallback className="rounded-lg"></AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.userName}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut />
          <Link to={"/"} onClick={handleLogout}>
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
