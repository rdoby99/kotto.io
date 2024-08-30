import { Skeleton } from "@/components/ui/skeleton";

interface ListProps {
  classes: string;
}

export default function VocabListSkeleton({ classes }: ListProps) {
  return (
    <div className={`flex flex-col gap-2 ${classes}`}>
      <Skeleton className="w-[50%] h-[20px]" />
      <Skeleton className="w-full h-[20px]" />
      <Skeleton className="w-full h-[20px]" />
      <Skeleton className="w-full h-[20px]" />
      <Skeleton className="w-full h-[20px]" />
      <Skeleton className="w-full h-[20px] mb-4" />
      <div className="mb-4 flex justify-between">
        <Skeleton className="w-[100px] h-[20px]" />
        <div className="flex gap-2">
          <Skeleton className="w-[100px] h-[20px]" />
          <Skeleton className="w-[100px] h-[20px]" />
        </div>
      </div>
      <Skeleton className="w-full h-[20px]" />
    </div>
  );
}
