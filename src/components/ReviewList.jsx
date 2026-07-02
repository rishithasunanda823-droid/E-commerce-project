import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

function ReviewList({
reviews,
productId,
onReviewDeleted,
}) {
const { user } = useAuth();

const deleteReview = (
reviewId
) => {
const allReviews =
JSON.parse(
localStorage.getItem(
"reviews"
)
) || {};


allReviews[
  productId
] = allReviews[
  productId
].filter(
  (review) =>
    review.id !==
    reviewId
);

localStorage.setItem(
  "reviews",
  JSON.stringify(
    allReviews
  )
);

toast.success(
  "Review Deleted"
);

onReviewDeleted();


};

if (
reviews.length === 0
) {
return ( <p>
No Reviews Yet </p>
);
}

return (
<>
{reviews.map(
(review) => ( <div
         key={review.id}
         className="card p-3 mb-3"
       >


        <h6>
          {"⭐".repeat(
            review.rating
          )}
        </h6>

        <strong>
          {review.name}
        </strong>

        {review.verifiedPurchase && (
          <span className="badge bg-success ms-2">
            Verified Purchase
          </span>
        )}

        <p className="mt-2">
          {
            review.comment
          }
        </p>

        <small>
          {review.date}
        </small>

        {user?.email ===
          review.userEmail && (
          <div className="mt-2">

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                deleteReview(
                  review.id
                )
              }
            >
              Delete Review
            </button>

          </div>
        )}

      </div>
    )
  )}
</>


);
}

export default ReviewList;
