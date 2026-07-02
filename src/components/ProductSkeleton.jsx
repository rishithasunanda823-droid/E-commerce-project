function ProductSkeleton() {
  return (
    <div className="card h-100 shadow-sm">

      <div
        className="placeholder-glow p-3"
      >
        <span
          className="placeholder col-12"
          style={{
            height: "250px",
            display: "block",
          }}
        ></span>
      </div>

      <div className="card-body">

        <p className="placeholder-glow">
          <span className="placeholder col-12"></span>
        </p>

        <p className="placeholder-glow">
          <span className="placeholder col-8"></span>
        </p>

        <p className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </p>

        <button
          className="btn btn-primary disabled w-100"
        >
          Loading...
        </button>

      </div>

    </div>
  );
}

export default ProductSkeleton;