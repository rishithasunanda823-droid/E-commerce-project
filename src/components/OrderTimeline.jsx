function OrderTimeline({
  status,
}) {
  const steps = [
    "Order Placed",
    "Packed",
    "Shipped",
    "Delivered",
  ];

  const currentIndex =
    steps.indexOf(status);

  return (
    <div className="my-4">

      <div className="d-flex justify-content-between">

        {steps.map(
          (step, index) => (
            <div
              key={step}
              className="text-center flex-fill"
            >

              <div
                className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center ${
                  index <=
                  currentIndex
                    ? "bg-success text-white"
                    : "bg-secondary text-white"
                }`}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                {index <=
                currentIndex
                  ? "✓"
                  : index + 1}
              </div>

              <small>
                {step}
              </small>

            </div>
          )
        )}
      </div>

    </div>
  );
}

export default OrderTimeline;