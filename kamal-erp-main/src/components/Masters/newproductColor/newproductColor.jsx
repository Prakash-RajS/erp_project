import React, { useState, useEffect } from "react";
import "./newproductColor.css";

export default function newproductColor({
  newproductColor,
  setnewproductColor,
  editnewproductColor,
  setEditnewproductColor,
  editDropDown,
}) {
  const [ColorData, setColorData] = useState({
    color_name: "",
    update_color_name: "",
  });
  const handleColorDataChange = (e) => {
    setColorData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleColordataSubmit(e) {
    e.preventDefault();
    setColorData({
      color_name: "",
      update_color_name: "",
    });
    console.log(ColorData);
    setnewproductColor(false);
    setEditnewproductColor(false);
  }
  return (
    <>
      <div className="poductColor-container">
        <div className="color-head">
          <div className="color-headleft">
            <svg
              onClick={() => {
                setnewproductColor(false);
                setEditnewproductColor(false);
              }}
              className="left-logo-color"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{editnewproductColor ? "Edit" : "Add New"} Color</p>
          </div>
          <div className="color-headright">
            {editnewproductColor && (
              <div
                className="add-color-1"
                onClick={() => {
                  setnewproductColor(true);
                  setEditnewproductColor(false);
                }}
              >
                + Add New
              </div>
            )}
            {newproductColor && (
              <div
                className="add-color-2"
                onClick={() => {
                  setEditnewproductColor(true);
                  setnewproductColor(false);
                }}
              >
                Edit Existing
              </div>
            )}
          </div>
        </div>
        <div className="color-form">
          <form onSubmit={handleColordataSubmit}>
            {newproductColor ? (
              <div className="color-box">
                <label htmlFor="color_name">Color Name</label>
                <input
                  type="text"
                  value={ColorData.color_name}
                  onChange={handleColorDataChange}
                  id="color_name"
                  placeholder="Black"
                  required
                />
              </div>
            ) : (
              <>
                <div className="color-box">
                  <label htmlFor="color_name">Select Color</label>
                  <select
                    id="color_name"
                    value={ColorData.color_name}
                    onChange={handleColorDataChange}
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
                <div className="color-box">
                  <label htmlFor="update_color_name">Update Color Name</label>
                  <input
                    type="text"
                    value={ColorData.update_color_name}
                    onChange={handleColorDataChange}
                    id="update_color_name"
                    placeholder="Yellow"
                    required
                  />
                </div>
              </>
            )}

            <div className="color-submit-container">
              <nav
                onClick={() => {
                  setnewproductColor(false);
                  setEditnewproductColor(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {editnewproductColor && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
