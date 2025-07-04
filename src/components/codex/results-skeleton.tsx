"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-6 w-3/4 mt-2" />
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-2/3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-56" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/6" />
        </CardContent>
      </Card>
    </div>
  );
}
