import React, { useState, useEffect } from "react";
import "./newproductSupplier.css";

export default function newproductSupplier({
  newproductSupplier,
  setnewproductSupplier,
  editnewproductSupplier,
  setEditnewproductSupplier,
  editDropDown,
}) {
  const [supplierData, setsupplierData] = useState({
    supplier_name: "",
    contact_person: "",
    phone_number: "",
    email_adderss: "",
    address: "",
  });
  const handleSupplierDataChange = (e) => {
    setsupplierData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  function handleSupplierdataSubmit(e) {
    e.preventDefault();
    setsupplierData({
      supplier_name: "",
      contact_person: "",
      phone_number: "",
      email_adderss: "",
      address: "",
    });
    console.log(supplierData);
    setnewproductSupplier(false);
    setEditnewproductSupplier(false);
  }
  return (
    <>
      <div className="suppliers-container">
        <div className="supplier-head">
          <div className="supplier-headleft">
            <svg
              onClick={() => {
                setnewproductSupplier(false);
                setEditnewproductSupplier(false);
              }}
              className="left-logo-supplier"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p>{editnewproductSupplier ? "Edit" : "Add New"} Supplier</p>
          </div>
          <div className="supplier-headright">
            {editnewproductSupplier && (
              <div
                className="add-supplier-1"
                onClick={() => {
                  setnewproductSupplier(true);
                  setEditnewproductSupplier(false);
                }}
              >
                + Add New
              </div>
            )}
            {newproductSupplier && (
              <div
                className="add-supplier-2"
                onClick={() => {
                  setEditnewproductSupplier(true);
                  setnewproductSupplier(false);
                }}
              >
                Edit Existing
              </div>
            )}
          </div>
        </div>
        <div className="supplier-form">
          <form onSubmit={handleSupplierdataSubmit}>
            {newproductSupplier ? (
              <div className="supplier-box">
                <label htmlFor="supplier_name">Supplier Name</label>
                <input
                  type="text"
                  value={supplierData.supplier_name}
                  onChange={handleSupplierDataChange}
                  id="supplier_name"
                  placeholder="Acme Audio Supplies Ltd."
                  required
                />
              </div>
            ) : (
              <div className="supplier-box">
                <label htmlFor="supplier_name">Select Supplier</label>
                <select
                  id="supplier_name"
                  value={supplierData.supplier_name}
                  onChange={handleSupplierDataChange}
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

            <div className="supplier-box">
              <label htmlFor="contact_person">Contact Person</label>
              <input
                type="text"
                value={supplierData.contact_person}
                onChange={handleSupplierDataChange}
                id="contact_person"
                placeholder="Rahul"
                required
              />
            </div>
            <div className="supplier-box">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                className="increment-decrement-supplier"
                type="number"
                value={supplierData.phone_number}
                onChange={handleSupplierDataChange}
                id="phone_number"
                placeholder="+91 96555 55555"
                required
              />
            </div>
            <div className="supplier-box">
              <label htmlFor="email_adderss">Email Adderss</label>
              <input
                type="email"
                value={supplierData.email_adderss}
                onChange={handleSupplierDataChange}
                id="email_adderss"
                placeholder="rahul@gmail.com"
                required
              />
            </div>
            <div className="supplier-box">
              <label htmlFor="address">Adderss</label>
              <input
                type="text"
                value={supplierData.address}
                onChange={handleSupplierDataChange}
                id="address"
                placeholder=" 123 Electronics Street, Mumbai"
                required
              />
            </div>
            <div className="supplier-submit-container">
              <nav
                onClick={() => {
                  setnewproductSupplier(false);
                  setEditnewproductSupplier(false);
                }}
              >
                Canael
              </nav>
              <button type="submit">Create</button>
              {editnewproductSupplier && <div>Remove</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
