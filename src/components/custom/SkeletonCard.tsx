import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card className="w-full max-w-xs py-0 pb-9">
      <div className="aspect-video  rounded-t-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </CardHeader>
      <CardContent className="min-w-80">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[175px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
