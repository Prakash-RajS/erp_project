import React, { useState, useEffect } from "react";
import "./newproductUOM.css";

export default function newproductUOM({
  newProductUOM,
  setnewProductUOM,
  editNewproductUOM,
  seteditNewproductUOM,
  editDropDown,
}) {
  const [uomData, setuomData] = useState({
    uom_name: "",
    items: "",
    description: "",
  });
  const handleUOMDataChange = (e) => {
    setuomData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleUOMdataSubmit(e) {
    e.preventDefault();
    setuomData({
      uom_name: "",
      items: "",
      description: "",
    });
    console.log(uomData);

    setnewProductUOM(false);
    seteditNewproductUOM(false);
  }
  return (
    <>
      <div className="uom-maon-container">
        <div className="uom-head">
          <div className="uom-headleft">
            <svg
              onClick={() => {
                setnewProductUOM(false);
                seteditNewproductUOM(false);
              }}
              className="left-logo-uom"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{editNewproductUOM ? "Edit" : "Add New"} UOM</p>
          </div>
          <div className="uom-headright">
            {editNewproductUOM && (
              <div
                className="add-uom-1"
                onClick={() => {
                  setnewProductUOM(true);
                  seteditNewproductUOM(false);
                }}
              >
                + Add UOM
              </div>
            )}
            {newProductUOM && (
              <div
                className="add-uom-2"
                onClick={() => {
                  seteditNewproductUOM(true);
                  setnewProductUOM(false);
                }}
              >
                Edit UOM
              </div>
            )}
          </div>
        </div>
        <div className="uom-form">
          <form onSubmit={handleUOMdataSubmit}>
            {newProductUOM ? (
              <div className="uom-box">
                <label htmlFor="uom_name">UOM Name</label>
                <input
                  type="text"
                  value={uomData.uom_name}
                  onChange={handleUOMDataChange}
                  id="uom_name"
                  placeholder="e.g., Box"
                  required
                />
              </div>
            ) : (
              <div className="uom-box">
                <label htmlFor="uom_name">UON Name</label>
                <select
                  id="uom_name"
                  value={uomData.uom_name}
                  onChange={handleUOMDataChange}
                  required
                >
                  <option value="">Select Option</option>
                  {editDropDown.map((ele, ind) => (
                    <option key={ind} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="uom-box">
              <label htmlFor="items">No.of Items</label>
              <input
                className="increment-decrement-uom"
                type="number"
                value={uomData.items}
                onChange={handleUOMDataChange}
                id="items"
                placeholder="e.g., 10"
                required
              />
            </div>
            <div className="uom-box">
              <label htmlFor="description">Description {"(optional)"}</label>
              <input
                type="text"
                value={uomData.description}
                onChange={handleUOMDataChange}
                id="description"
                placeholder="Text Area"
              />
            </div>
            <div className="uom-submit-container">
              <nav
                onClick={() => {
                  setnewProductUOM(false);
                  seteditNewproductUOM(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {editNewproductUOM && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
