function ProductRating({ rating }) {
  const stars = Math.round(
    rating?.rate || 0
  );

  return (
    <div className="mb-2">

      <div>
        {"⭐".repeat(stars)}
      </div>

      <small>
        {rating?.rate} (
        {rating?.count} Reviews)
      </small>

    </div>
  );
}

export default ProductRating;