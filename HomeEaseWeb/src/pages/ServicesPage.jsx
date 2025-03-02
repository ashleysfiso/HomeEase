import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowRight,
  Home,
  Building2,
  Brush,
  Package2,
  AppWindowIcon as Window,
  Flower2,
  Search,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { getServices } from "@/api";
import ServicesSkeletonLoader from "@/components/SkeletonLoader/ServicesSkeletonLoader";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        setServices(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header Section */}
      <PageHeader
        title="Services"
        backgroundImage="/images/page-header-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services, company name or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <ServicesSkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  {/*<div
                  className={`${service.iconBg} ${service.iconColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  {service.icon}
                </div>*/}
                  <h3 className="text-xl font-bold">{service.serviceName}</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>

                  {/* Provider Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <Avatar>
                        <AvatarImage
                          src={service.imgURL}
                          alt={service.companyName}
                        />
                        <AvatarFallback>
                          {service.companyName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{service.companyName}</h4>
                        {/*<div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{service.provider.rating}</span>
                        </div>*/}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <Badge variant="secondary" className="justify-start">
                        From R{service.rate}
                      </Badge>
                      <Badge variant="outline" className="justify-start">
                        {service.availability}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link
                    to={`booking/${service.serviceId}/${service.serviceProviderId}`}
                  >
                    <Button>Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
