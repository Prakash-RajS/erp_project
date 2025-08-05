// import React, { useState } from "react";

// export default function categoryInput({
//   handleNewProjectCustomData,
//   newProductData,
//   newProductcustom,
//   id,
//   customApi,
//   handleCustomChange,
// }) {
//   const [custom, setCustom] = useState(false);

//   const changeCustom = (e) => {
//     if (e.target.value !== "custom") handleCustomChange(e);
//     else setCustom(true);
//   };

//   return (
//     <>
//       {custom ? (
//         <input
//           id={id}
//           type="text"
//           placeholder="Enter Custom Input"
//           value={newProductcustom[id]}
//           onChange={handleNewProjectCustomData}
//         />
//       ) : (
//         <select
//           id={id}
//           value={newProductData[id] || ""}
//           onChange={(e) => handleCustomChange(e)}
//           required
//         >
//           <option value="">Select Option</option>
//           {customApi.map((item, idx) => (
//             <option key={idx} value={item.name}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//       )}
//     </>
//   );
// }
import React, { useState } from "react";

export default function CategoryInput({
  handleNewProjectCustomData,
  newProductData,
  newProductcustom,
  id,
  customApi,
  handleCustomChange,
}) {
  const [custom, setCustom] = useState(false);

  const changeCustom = (e) => {
    if (e.target.value !== "custom") {
      handleCustomChange(e);
    } else {
      setCustom(true);
    }
  };

  return (
    <>
      {custom ? (
        <input
          id={id}
          type="text"
          placeholder="Enter Custom Input"
          value={newProductcustom?.[id] || ""}
          onChange={handleNewProjectCustomData}
        />
      ) : (
        <select
          id={id}
          value={newProductData?.[id] || ""}
          onChange={changeCustom}
          required
        >
          <option value="">Select Option</option>

          {/* Confirm customApi is an array */}
          {Array.isArray(customApi) &&
            customApi.map((item, idx) => (
              <option key={idx} value={item.id}>
                {item.name}
              </option>
            ))}

          {/* Custom Option */}
          <option value="custom">Custom</option>
        </select>
      )}
    </>
  );
}
