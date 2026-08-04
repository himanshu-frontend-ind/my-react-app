import SkeletonCard from "./SkeletonCard"

function SkeletonList({ count = 8 }) {
  return (
    <div className="movie-list">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonList