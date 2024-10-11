import React from "react";

function Detail({ params }: { params: { postNumber: number } }) {
  return <div>Detail {params.postNumber}</div>;
}

export default Detail;
