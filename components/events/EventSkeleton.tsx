export default function EventSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300" />

      {/* Content skeleton */}
      <div className="p-5">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
        
        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Meta info */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-3" />

        {/* Button */}
        <div className="h-10 bg-gray-300 rounded-lg" />
      </div>
    </div>
  )
}