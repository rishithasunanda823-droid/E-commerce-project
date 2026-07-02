const comparisonReducer = (
  state = [],
  action
) => {
  switch (action.type) {

    case "ADD_TO_COMPARE":

      if (
        state.find(
          item =>
            item.id ===
            action.payload.id
        )
      ) {
        return state;
      }

      if (state.length >= 4) {
        return state;
      }

      return [
        ...state,
        action.payload,
      ];

    case "REMOVE_FROM_COMPARE":

      return state.filter(
        item =>
          item.id !==
          action.payload
      );

    case "CLEAR_COMPARE":

      return [];

    default:
      return state;
  }
};

export default comparisonReducer;