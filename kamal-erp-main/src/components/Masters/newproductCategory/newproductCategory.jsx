import React, { useState, useEffect } from "react";
import "./newproductCategory.css";

export default function newproductCategory({
  newproductCategory,
  setnewproductCategory,
  editnewproductCategory,
  setEditnewproductCategory,
  editDropDown,
}) {
  const [CategoryData, setCategoryData] = useState({
    category_name: "",
    update_category_name: "",
  });
  const handleCategoryDataChange = (e) => {
    setCategoryData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleCategorydataSubmit(e) {
    e.preventDefault();
    setCategoryData({
      category_name: "",
      update_category_name: "",
    });
    console.log(CategoryData);
    setnewproductCategory(false);
    setEditnewproductCategory(false);
  }
  return (
    <>
      <div className="productCategory-container">
        <div className="category-head">
          <div className="category-headleft">
            <svg
              onClick={() => {
                setnewproductCategory(false);
                setEditnewproductCategory(false);
              }}
              className="left-logo-category"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{editnewproductCategory ? "Edit" : "Add New"} Category</p>
          </div>
          <div className="category-headright">
            {editnewproductCategory && (
              <div
                className="add-category-1"
                onClick={() => {
                  setnewproductCategory(true);
                  setEditnewproductCategory(false);
                }}
              >
                + Add New
              </div>
            )}
            {newproductCategory && (
              <div
                className="add-category-2"
                onClick={() => {
                  setEditnewproductCategory(true);
                  setnewproductCategory(false);
                }}
              >
                Edit Existing
              </div>
            )}
          </div>
        </div>
        <div className="category-form">
          <form onSubmit={handleCategorydataSubmit}>
            {newproductCategory ? (
              <div className="category-box">
                <label htmlFor="category_name">Category Name</label>
                <input
                  type="text"
                  value={CategoryData.category_name}
                  onChange={handleCategoryDataChange}
                  id="category_name"
                  placeholder="Electronics"
                  required
                />
              </div>
            ) : (
              <>
                <div className="category-box">
                  <label htmlFor="category_name">Select Category</label>
                  <select
                    id="category_name"
                    value={CategoryData.category_name}
                    onChange={handleCategoryDataChange}
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
                <div className="category-box">
                  <label htmlFor="update_category_name">
                    Update Category Name
                  </label>
                  <input
                    type="text"
                    value={CategoryData.update_category_name}
                    onChange={handleCategoryDataChange}
                    id="update_category_name"
                    placeholder="Fashion"
                    required
                  />
                </div>
              </>
            )}

            <div className="category-submit-container">
              <nav
                onClick={() => {
                  setnewproductCategory(false);
                  setEditnewproductCategory(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {editnewproductCategory && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
