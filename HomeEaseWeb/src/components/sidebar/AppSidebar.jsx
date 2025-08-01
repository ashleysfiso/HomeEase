import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  Wrench,
  Users,
  ClipboardList,
  Briefcase,
  Hammer,
  Star,
  History,
} from "lucide-react";

import { NavMain } from "./MainNav";

import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "../UserProfile";

let name;
let email;

const data = {
  user: {
    name: name,
    email: email,
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      role: "ServiceProvider",
    },
    {
      title: "Admin Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      role: "Admin",
    },
    {
      title: "Manage Services",
      url: "/dashboard/manage-services",
      icon: ClipboardList,
      role: "Admin",
    },
    {
      title: "Manage Service Providers",
      url: "/dashboard/manage-service-providers",
      icon: Users,
      role: "Admin",
    },
    {
      title: "Bookings",
      url: "/dashboard/manage-bookings",
      icon: Briefcase,
      role: "Admin",
    },
    {
      title: "My Services",
      url: "/dashboard/my-services",
      icon: Hammer,
      role: "ServiceProvider",
    },
    {
      title: "My Bookings",
      url: "/dashboard/my-bookings",
      icon: Briefcase,
      role: "ServiceProvider",
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: Star,
      role: "Admin",
    },
    {
      title: "My Reviews",
      url: "/dashboard/my-reviews",
      icon: Star,
      role: "ServiceProvider",
    },
    {
      title: "Audit Logs",
      url: "/dashboard/audit-logs",
      icon: History,
      role: "Admin",
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [aname, setAName] = useState();
  const [aemail, setAEmail] = useState();

  useEffect(() => {
    if (aname) {
      name = user?.userName;
      email = user?.email;
      setAName(user?.userName);
      console.log(aname);
      setIsLoading(true);
    }
  }, [aname]);
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <img
                  src="/images/HomeEase.png"
                  className="w-10 h-10 object-contain"
                />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h3 className="flex text-xl  tracking-wide leading-tight font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    <Link to="/dashboard">HomeEase</Link>
                  </h3>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
