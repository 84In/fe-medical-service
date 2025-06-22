import { Service } from "@/types";
import { getServiceSlug } from "@/utils/slugify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";

export function ServiceCard({ service }: { service: Service }) {
  const serviceSlug = getServiceSlug(service);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={service.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
          alt={service.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <Badge
          variant="outline"
          className="w-fit mb-2 bg-blue-50 text-blue-700 border-blue-200"
        >
          {service.serviceType.name}
        </Badge>
        <CardTitle className="text-lg">
          <Link
            href={`/dich-vu/${serviceSlug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {service.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {service.descriptionShort}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-500">
          <FileText className="h-4 w-4 mr-1" />
          <span>Chi tiết dịch vụ</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dich-vu/${serviceSlug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
