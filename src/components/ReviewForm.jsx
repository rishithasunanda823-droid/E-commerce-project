import { useState } from "react";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

function ReviewForm({
productId,
onReviewAdded,
}) {
const { user } = useAuth();

const [rating, setRating] =
useState(5);

const [comment, setComment] =
useState("");

const handleSubmit = (
e
) => {
e.preventDefault();


if (!user) {
  toast.error(
    "Please login first"
  );
  return;
}

const allReviews =
  JSON.parse(
    localStorage.getItem(
      "reviews"
    )
  ) || {};

if (
  !allReviews[productId]
) {
  allReviews[
    productId
  ] = [];
}

const alreadyReviewed =
  allReviews[
    productId
  ].find(
    (review) =>
      review.userEmail ===
      user.email
  );

if (alreadyReviewed) {
  toast.error(
    "You already reviewed this product"
  );
  return;
}

const review = {
  id: Date.now(),
  userEmail:
    user.email,
  name: user.name,
  rating,
  comment,
  verifiedPurchase: true,
  date:
    new Date().toLocaleDateString(),
};

allReviews[
  productId
].push(review);

localStorage.setItem(
  "reviews",
  JSON.stringify(
    allReviews
  )
);

toast.success(
  "Review Added"
);

setRating(5);
setComment("");

onReviewAdded();


};

return ( <div className="card p-4 mb-4">


  <h4>
    Write Review
  </h4>

  <form
    onSubmit={
      handleSubmit
    }
  >

    <input
      className="form-control mb-3"
      value={
        user?.name || ""
      }
      disabled
    />

    <select
      className="form-select mb-3"
      value={rating}
      onChange={(e) =>
        setRating(
          Number(
            e.target.value
          )
        )
      }
    >
      <option value="5">
        ⭐⭐⭐⭐⭐
      </option>

      <option value="4">
        ⭐⭐⭐⭐
      </option>

      <option value="3">
        ⭐⭐⭐
      </option>

      <option value="2">
        ⭐⭐
      </option>

      <option value="1">
        ⭐
      </option>
    </select>

    <textarea
      className="form-control mb-3"
      rows="4"
      placeholder="Write Review"
      value={comment}
      onChange={(e) =>
        setComment(
          e.target.value
        )
      }
      required
    />

    <button className="btn btn-primary">
      Submit Review
    </button>

  </form>

</div>


);
}

export default ReviewForm;
