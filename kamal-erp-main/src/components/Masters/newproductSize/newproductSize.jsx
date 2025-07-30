import React, { useState, useEffect } from "react";
import "./newproductSize.css";

export default function newproductSize({
  newproductSize,
  setnewproductSize,
  editnewproductSize,
  setEditnewproductSize,
  editDropDown,
}) {
  const [sizeData, setsizeData] = useState({
    size_name: "",
    update_size_name: "",
  });
  const handleSizeDataChange = (e) => {
    setsizeData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleSizedataSubmit(e) {
    e.preventDefault();
    setsizeData({
      size_name: "",
      update_size_name: "",
    });
    console.log(sizeData);
    setnewproductSize(false);
    setEditnewproductSize(false);
  }
  return (
    <>
      <div className="size-container">
        <div className="size-head">
          <div className="size-headleft">
            <svg
              onClick={() => {
                setnewproductSize(false);
                setEditnewproductSize(false);
              }}
              className="left-logo-size"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{editnewproductSize ? "Edit" : "Add New"} Size</p>
          </div>
          <div className="size-headright">
            {editnewproductSize && (
              <div
                className="add-size-1"
                onClick={() => {
                  setnewproductSize(true);
                  setEditnewproductSize(false);
                }}
              >
                + Add New
              </div>
            )}
            {newproductSize && (
              <div
                className="add-size-2"
                onClick={() => {
                  setEditnewproductSize(true);
                  setnewproductSize(false);
                }}
              >
                Edit Existing
              </div>
            )}
          </div>
        </div>
        <div className="size-form">
          <form onSubmit={handleSizedataSubmit}>
            {newproductSize ? (
              <div className="size-box">
                <label htmlFor="size_name">Size Name</label>
                <input
                  type="text"
                  value={sizeData.size_name}
                  onChange={handleSizeDataChange}
                  id="size_name"
                  placeholder="Small"
                  required
                />
              </div>
            ) : (
              <>
                <div className="size-box">
                  <label htmlFor="size_name">Select Size</label>
                  <select
                    id="size_name"
                    value={sizeData.size_name}
                    onChange={handleSizeDataChange}
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
                <div className="size-box">
                  <label htmlFor="update_size_name">Update Size Name</label>
                  <input
                    type="text"
                    value={sizeData.update_size_name}
                    onChange={handleSizeDataChange}
                    id="update_size_name"
                    placeholder="Medium"
                    required
                  />
                </div>
              </>
            )}

            <div className="size-submit-container">
              <nav
                onClick={() => {
                  setnewproductSize(false);
                  setEditnewproductSize(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {editnewproductSize && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
