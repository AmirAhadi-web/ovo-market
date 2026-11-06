import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-x py-4 md:py-6">
      <Skeleton className="h-[300px] w-full rounded-2xl sm:h-[340px] lg:h-[400px]" />
      <div className="mt-8 grid grid-cols-4 gap-3 md:grid-cols-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="mt-8 h-7 w-48" />
      <div className="mt-5">
        <ProductGridSkeleton count={10} />
      </div>
    </div>
  );
}
