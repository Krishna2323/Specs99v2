export const setStateToPayload = (
  state,
  action,
  stateName,
  prevStateOption = false
) => {
  state[stateName] = action.payload[stateName] || state[stateName];
  state[stateName + "IsLoading"] = action.payload[stateName + "IsLoading"];
  state[stateName + "IsError"] = action.payload[stateName + "IsError"];
  state[stateName + "Message"] = action.payload[stateName + "Message"];
};
