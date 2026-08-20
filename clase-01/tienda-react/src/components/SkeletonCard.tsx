
export default function SkeletonCard() {
    return(
        <div className="w-64 animate-pulse rounded-xl border p-4" aria-hidden="true">
            <div className="mb-3 aspect-square rounded bg-gray-200"></div>
            <div className="mb-2 h-3 w-1/3 rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
    );
}