import React from "react";

const WithDefaultFilter = (filter) => (OriginalComponent) => {
  return <OriginalComponent filter={filter} />;
};

export default WithDefaultFilter;
