import React, { useState, useEffect } from "react";
import "./newproductTaxCode.css";

export default function newproductTaxCode({
  newproduct_tax_code,
  setnewproduct_tax_code,
  setnewproduct_edit_tax_code,
  newproduct_edit_tax_code,

  editDropDown,
}) {
  const [taxCodeData, settaxCodeData] = useState({
    tax_name: "",
    tax_percentage: "",
    description: "",
  });
  const handleTaxDataChange = (e) => {
    settaxCodeData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleTaxDataSubmit(e) {
    e.preventDefault();
    settaxCodeData({
      tax_name: "",
      tax_percentage: "",
      description: "",
    });

    setnewproduct_tax_code(false);
    setnewproduct_edit_tax_code(false);
  }

  return (
    <>
      <div className="tax-code-cointainer">
        <div className="tax-code-head">
          <div className="tax-code-headleft">
            <svg
              onClick={() => {
                setnewproduct_tax_code(false);
                setnewproduct_edit_tax_code(false);
              }}
              className="left-logo-tax-code"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{newproduct_edit_tax_code ? "Edit" : "Add New"}Tax Code</p>
          </div>
          <div className="tax-code-headright">
            {newproduct_edit_tax_code && (
              <div
                className="add-tax-code-1"
                onClick={() => {
                  setnewproduct_tax_code(true);
                  setnewproduct_edit_tax_code(false);
                }}
              >
                + Add Tax Code
              </div>
            )}
            {newproduct_tax_code && (
              <div
                className="add-tax-code-2"
                onClick={() => {
                  setnewproduct_edit_tax_code(true);
                  setnewproduct_tax_code(false);
                }}
              >
                Edit Tax Code
              </div>
            )}
          </div>
        </div>
        <div className="tax-code-form">
          <form onSubmit={handleTaxDataSubmit}>
            {newproduct_tax_code ? (
              <div className="tax-code-box">
                <label htmlFor="tax_name">Tax Name</label>
                <input
                  type="text"
                  value={taxCodeData.tax_name}
                  onChange={handleTaxDataChange}
                  id="tax_name"
                  placeholder="e.g., GST"
                  required
                />
              </div>
            ) : (
              <div className="tax-code-box">
                <label htmlFor="tax_name">Tax Name</label>
                <select
                  id="tax_name"
                  value={taxCodeData.tax_name}
                  onChange={handleTaxDataChange}
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

            <div className="tax-code-box">
              <label htmlFor="tax_percentage">Tax Percentage {"(%)"}</label>
              <input
                className="increment-decrement-tax-code"
                type="number"
                value={taxCodeData.tax_percentage}
                onChange={handleTaxDataChange}
                id="tax_percentage"
                placeholder="e.g., 18"
                required
              />
            </div>
            <div className="tax-code-box">
              <label htmlFor="description">Description {"(optional)"}</label>
              <input
                type="text"
                value={taxCodeData.description}
                onChange={handleTaxDataChange}
                id="description"
                placeholder="Text Area"
              />
            </div>
            <div className="tax-code-submit-container">
              <nav
                onClick={() => {
                  setnewproduct_tax_code(false);
                  setnewproduct_edit_tax_code(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {newproduct_edit_tax_code && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
