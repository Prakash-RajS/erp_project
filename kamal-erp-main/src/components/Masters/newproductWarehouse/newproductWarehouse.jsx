import React, { useState, useEffect } from "react";
import "./newproductWarehouse.css";

export default function warehouse({
  newproductWarehouse,
  setnewproductWarehouse,
  editnewproductWarehouse,
  setEditnewproductWarehouse,
  editDropDown,
}) {
  const [warehouseData, setwarehouseData] = useState({
    warehouse_name: "",
    location: "",
    manager_name: "",
    contact_info: "",
    notes: "",
  });
  const handleWarehouseDataChange = (e) => {
    setwarehouseData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleWarehousedataSubmit(e) {
    e.preventDefault();
    setwarehouseData({
      warehouse_name: "",
      location: "",
      manager_name: "",
      contact_info: "",
      notes: "",
    });
    console.log(warehouseData);
    setnewproductWarehouse(false);
    setEditnewproductWarehouse(false);
  }
  return (
    <>
      <div className="warehouse-container">
        <div className="warehouse-head">
          <div className="warehouse-headleft">
            <svg
              onClick={() => {
                setnewproductWarehouse(false);
                setEditnewproductWarehouse(false);
              }}
              className="left-logo-warehouse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{editnewproductWarehouse ? "Edit" : "Add New"} Warehouse</p>
          </div>
          <div className="warehouse-headright">
            {editnewproductWarehouse && (
              <div
                className="add-warehouse-1"
                onClick={() => {
                  setnewproductWarehouse(true);
                  setEditnewproductWarehouse(false);
                }}
              >
                + Add New
              </div>
            )}
            {newproductWarehouse && (
              <div
                className="add-warehouse-2"
                onClick={() => {
                  setEditnewproductWarehouse(true);
                  setnewproductWarehouse(false);
                }}
              >
                Edit Existing
              </div>
            )}
          </div>
        </div>
        <div className="warehouse-form">
          <form onSubmit={handleWarehousedataSubmit}>
            {newproductWarehouse ? (
              <div className="warehouse-box">
                <label htmlFor="warehouse_name">Warehouse Name</label>
                <input
                  type="text"
                  value={warehouseData.warehouse_name}
                  onChange={handleWarehouseDataChange}
                  id="warehouse_name"
                  placeholder="e.g., Main Warehouse"
                  required
                />
              </div>
            ) : (
              <div className="warehouse-box">
                <label htmlFor="warehouse_name">Select Warehouse</label>
                <select
                  id="warehouse_name"
                  value={warehouseData.warehouse_name}
                  onChange={handleWarehouseDataChange}
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

            <div className="warehouse-box">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                value={warehouseData.location}
                onChange={handleWarehouseDataChange}
                id="location"
                placeholder="e.g., ABC Industry, TN"
                required
              />
            </div>
            <div className="warehouse-box">
              <label htmlFor="manager_name">Manager Name{"(optional)"}</label>
              <input
                type="text"
                value={warehouseData.manager_name}
                onChange={handleWarehouseDataChange}
                id="manager_name"
                placeholder="e.g., Ram"
              />
            </div>
            <div className="warehouse-box">
              <label htmlFor="contact_info">Contact Info{"(optional)"}</label>
              <input
                type="text"
                value={warehouseData.contact_info}
                onChange={handleWarehouseDataChange}
                id="contact_info"
                placeholder="Phone/Email"
              />
            </div>
            <div className="warehouse-box">
              <label htmlFor="notes">Notes {"(optional)"}</label>
              <input
                type="text"
                value={warehouseData.notes}
                onChange={handleWarehouseDataChange}
                id="notes"
                placeholder="Text Area"
              />
            </div>
            <div className="warehouse-submit-container">
              <nav
                onClick={() => {
                  setnewproductWarehouse(false);
                  setEditnewproductWarehouse(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {editnewproductWarehouse && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
