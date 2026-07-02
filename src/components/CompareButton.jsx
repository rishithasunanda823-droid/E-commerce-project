import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addToCompare,
  removeFromCompare,
} from "../redux/actions";

function CompareButton({
  product,
}) {

  const dispatch =
    useDispatch();

const comparison =
  useSelector(
    (state) =>
      state.comparison || []
  );

const exists =
  (comparison || []).some(
    (item) =>
      item.id ===
      product.id
  );

const handleClick = () => {

  console.log("COMPARE CLICKED");
  console.log(product);

  if (exists) {

    dispatch(
      removeFromCompare(
        product.id
      )
    );

  } else {

    if (
      comparison.length >= 4
    ) {
      alert(
        "Maximum 4 products can be compared"
      );
      return;
    }

    dispatch(
      addToCompare(
        product
      )
    );
  }
};

  return (

    <button
    className={`btn w-100 ${
        exists
        ? "btn-danger"
        : "btn-outline-dark"
    }`}
    onClick={handleClick}
    >
      {exists
        ? "Remove Compare"
        : "Compare"}
    </button>
  );
}

export default CompareButton;