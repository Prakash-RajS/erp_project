import React, { useState } from "react";

export default function categoryInput({
  handleNewProjectCustomData,
  newProductData,
  newProductcustom,
  id,
  customApi,
  handleCustomChange,
}) {
  const [custom, setCustom] = useState(false);

  const changeCustom = (e) => {
    if (e.target.value !== "custom") handleCustomChange(e);
    else setCustom(true);
  };

  return (
    <>
      {custom ? (
        <input
          id={id}
          type="text"
          placeholder="Enter Custom Input"
          value={newProductcustom[id]}
          onChange={handleNewProjectCustomData}
        />
      ) : (
        <select id={id} value={newProductData[id]} onChange={changeCustom}>
          <option value="">Select Option</option>
          <option value="custom">+ Custom</option>
          {customApi.map((ele, ind) => (
            <option key={ind} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
