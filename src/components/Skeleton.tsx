interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/40 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}
