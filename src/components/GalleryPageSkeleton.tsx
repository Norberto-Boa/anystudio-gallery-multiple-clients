export function GalleryPageSkeleton() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative left-1/2 right-1/2 -translate-x-1/2 overflow-hidden max-w-7xl rounded-3xl mt-8">
          <div className="h-[48vh] min-h-80 animate-pulse bg-neutral-200" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-neutral-200 animate-pulse ${
                index % 3 === 0 ? "h-55" : index % 3 === 1 ? "h-75" : "h-65"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
