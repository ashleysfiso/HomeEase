import { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getServices } from "@/api";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import ServicesSkeletonLoader from "@/components/SkeletonLoader/ServicesSkeletonLoader";

export default function Component() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: [0, 100],
    rating: 0,
  });
  const [sortBy, setSortBy] = useState("price");

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

  const filteredProducts = useMemo(() => {
    return services.filter((service) => {
      if (selectedFilters.category.length === 0) {
        return true;
      }
      if (
        selectedFilters.category.includes(service.serviceName.toLowerCase())
      ) {
        return true;
      }
      /*if (product.rating < selectedFilters.rating) {
          return false;
        }*/
    });
    /*.sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        } else {
          return b.rating - a.rating;
        }
      })*/
  }, [selectedFilters, sortBy, services]);

  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      });
    } else if (type === "priceRange") {
      setSelectedFilters({
        ...selectedFilters,
        priceRange: value,
      });
    } else if (type === "rating") {
      setSelectedFilters({
        ...selectedFilters,
        rating: value,
      });
    }
  };
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleButtonClick = () => {
    navigate("/booking");
  };
  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-4 py-20">
      <div className="bg-background rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid gap-6">
          <div>
            <h3 className="text-base font-medium mb-2">Category</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("cleaning")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "cleaning")
                  }
                />
                Cleaning Services
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("plumbing")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "plumbing")
                  }
                />
                Plumbing
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("painting")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "painting")
                  }
                />
                Painting
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("carwash")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "carwash")
                  }
                />
                Vehicle Care
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("outdoor")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "outdoor")
                  }
                />
                Outdoor & Gardening
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Services</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="w-4 h-4" />
                Sort by: {sortBy === "price" ? "Price" : "Rating"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={handleSortChange}
              >
                <DropdownMenuRadioItem value="price">
                  Price
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rating">
                  Rating
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <ServicesSkeletonLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((service, index) => (
              <div
                key={index}
                className="bg-background rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={service.imgURL}
                  alt={service.serviceName}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-base text-nowrap overflow-hidden text-ellipsis font-semibold mb-2">
                    {service.serviceName}
                  </h3>
                  <p className="flex flex-row gap-2 text-sm items-center">
                    <span className="text-muted-foreground">By</span>{" "}
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{service.companyName}</span>
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {/*<StarIcon className="w-5 h-5 fill-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>*/}
                    </div>
                    {/*<span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>*/}
                  </div>
                  <div>
                    <Link
                      to={`booking/${service.serviceId}/${service.serviceProviderId}`}
                    >
                      <Button>Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
