import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "./UserProfile";
import { ModeToggle } from "./ModeToogle";

export default function Header() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Services",
      description:
        "HomeEase connects you with trusted providers to make life easier..",
      items: [
        {
          title: "Explore Services",
          href: "/services",
          roles: ["Customer", "ServiceProvider", "Admin"],
        },
        {
          title: "View Bookings",
          href: "/bookings",
          roles: ["Customer"],
        },
        {
          title: "My Services",
          href: "/dashboards",
          roles: ["ServiceProvider"],
        },
        {
          title: "Manage Bookings",
          href: "/recordings",
          roles: ["ServiceProvider"],
        },
        {
          title: "Manage All Services",
          href: "/recordings",
          roles: ["Admin"],
        },
      ],
    },
    {
      title: "HomeEase",
      description: "HomeEase connects you with trusted services, effortlessly.",
      items: [
        {
          title: "About us",
          href: "/about",
          roles: ["Customer", "ServiceProvider", "Admin"],
        },
        {
          title: "Contact us",
          href: "/contact",
          roles: ["Customer", "ServiceProvider", "Admin"],
        },
      ],
    },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto z-40 fixed top-0 left-0 bg-background">
      <div className="relative mx-auto min-h-10 flex sm:gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="flex items-center lg:justify-start">
          <h3 className="text-2xl  tracking-wide leading-tight p-4 font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            <Link>HomeEase</Link>
          </h3>
        </div>
        <div className="justify-center items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <Link to={item.href}>
                        <Button variant="ghost">{item.title}</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-start">
                            {item.items?.map((subItem) =>
                              isLoggedIn ? (
                                subItem.roles.includes(user.role[0]) ? (
                                  <Link
                                    to={subItem.href}
                                    key={subItem.title}
                                    className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                  >
                                    <span>{subItem.title}</span>
                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                  </Link>
                                ) : (
                                  console.log("")
                                )
                              ) : subItem.roles.length === 3 ? (
                                <Link
                                  to={subItem.href}
                                  key={subItem.title}
                                  className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                >
                                  <span>{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </Link>
                              ) : (
                                console.log("Dont show item")
                              )
                            )}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {isLoggedIn ? (
          <div className="flex justify-end w-full gap-4">
            <UserProfile />
            <div className="border-r hidden md:inline"></div>
            <ModeToggle />
          </div>
        ) : (
          <div className="flex justify-end w-full gap-1 sm:gap-4">
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
            <div className="border-r hidden md:inline"></div>
            <div className="hidden sm:inline">
              <ModeToggle />
            </div>
          </div>
        )}

        <div className="flex w-12 shrink lg:hidden items-end justify-center">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg p-4 container gap-4">
              <div className="flex justify-end sm:hidden">
                <ModeToggle />
              </div>
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) =>
                        isLoggedIn ? (
                          subItem.roles.includes(user.role[0]) ? (
                            <Link
                              to={subItem.href}
                              key={subItem.title}
                              className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                            >
                              <span>{subItem.title}</span>
                              <MoveRight className="w-4 h-4 text-muted-foreground" />
                            </Link>
                          ) : (
                            console.log("Dont display")
                          )
                        ) : subItem.roles.length === 3 ? (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            className="flex justify-between items-center"
                          >
                            <span className="text-muted-foreground">
                              {subItem.title}
                            </span>
                            <MoveRight className="w-4 h-4 stroke-1" />
                          </Link>
                        ) : (
                          console.log("Dont show")
                        )
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
