import React, { useState, useEffect } from "react";
import "./createNewCustomer.css";

export default function createNewCoustomer({
  setshowAddCustomer,
  editShowAddCustom,
  editAddCustomData,
  seteditAddCustomData,
}) {
  const [customIndustry, setCustomIndustry] = useState(false);
  const [customPayment, setCustomPayment] = useState(false);
  const [customCreditTerm, setcustomCreditTerm] = useState(false);

  const [NewCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    customer_type: "",
    customer_id: "",
    status: "",
    assigned_sales_rep: "",
    email: "",
    phone_number: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    company_name: "",
    industry: "",
    location: "",
    gst_tax_id: "",
    credit_limit: "",
    available_limit: "",
    billing_address: "",
    shipping_address: "",
    payment_terms: "",
    credit_term: "",
  });

  const [APIsalesREP, setAPIsalesREP] = useState({});
  const [salesREP, setSalesREP] = useState([]);
  const [last_edit_date, setlast_edit_date] = useState([]);

  const salesRepfromApi = {
    salesREP: ["Sans", "Mandy", "Director", "Saala"],
    last_edit_date: ["08/05/2025"],
  };

  useEffect(() => {
    setAPIsalesREP(salesRepfromApi);
  }, []);
  useEffect(() => {
    if (Object.keys(APIsalesREP).length > 0) {
      setSalesREP(APIsalesREP.salesREP);
      setlast_edit_date(APIsalesREP.last_edit_date);
    }
  }, [APIsalesREP]);

  const handleNewCustomerDataChange = (e) => {
    setNewCustomer((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  // Edit data call
  useEffect(() => {
    setNewCustomer((prev) => {
      return { ...prev, ...editAddCustomData };
    });
  }, [editAddCustomData]);

  //date
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  // NewCustomer.last_edit_date = formattedDate;

  const changeCustomIndustry = (e) => {
    setNewCustomer((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    if (e.target.value === "custom") {
      setCustomIndustry(true);
      e.target.value = "";
    }
  };
  const changeCustomPayment = (e) => {
    setNewCustomer((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    if (e.target.value === "custom") {
      setCustomPayment(true);
      e.target.value = "";
    }
  };
  const changeCustomCreditTerm = (e) => {
    setNewCustomer((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    if (e.target.value === "custom") {
      setcustomCreditTerm(true);
      e.target.value = "";
    }
  };

  function handlecreateNewCustomerReset(e) {
    e.preventDefault();
    setNewCustomer({
      first_name: "",
      last_name: "",
      customer_type: "",
      customer_id: "",
      status: "",
      assigned_sales_rep: "",
      email: "",
      phone_number: "",
      address: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      company_name: "",
      industry: "",
      location: "",
      gst_tax_id: "",
      credit_limit: "",
      available_limit: "",
      billing_address: "",
      shipping_address: "",
      payment_terms: "",
      credit_term: "",
    });
  }
  function handlecreateNewCustomerSubmit(e) {
    e.preventDefault();
    setNewCustomer({
      first_name: "",
      last_name: "",
      customer_type: "",
      customer_id: "",
      status: "",
      assigned_sales_rep: "",
      email: "",
      phone_number: "",
      address: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      company_name: "",
      industry: "",
      location: "",
      gst_tax_id: "",
      credit_limit: "",
      available_limit: "",
      billing_address: "",
      payment_terms: "",
      credit_term: "",
      shipping_address: "",
    });
    console.log(NewCustomer);

    setshowAddCustomer(false);
  }
  return (
    <>
      <div className="createNewCustomer-container">
        <form onSubmit={handlecreateNewCustomerSubmit}>
          <div className="createNewCustomer-tit">
            <p>{editShowAddCustom ? "Edit" : "Create New"} Customer</p>
            <div
              onClick={() => {
                setshowAddCustomer(false);
                seteditAddCustomData({});
              }}
              className="close-createNewCustomer-container"
            >
              <svg
                className="circle-x-logo-createNewCustomer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
              <nav>Close</nav>
            </div>
          </div>
          <nav className="createNewCustomer-subtit">Basic Info</nav>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="first_name">
                First Name<sup>*</sup>
              </label>
              <input
                value={NewCustomer.first_name}
                onChange={handleNewCustomerDataChange}
                id="first_name"
                type="text"
                placeholder="First Name"
                required
              />
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="last_name">Last Name</label>
              <input
                value={NewCustomer.last_name}
                onChange={handleNewCustomerDataChange}
                id="last_name"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="customer_type">
                Customer Type<sup>*</sup>
              </label>
              <select
                id="customer_type"
                value={NewCustomer.customer_type}
                onChange={handleNewCustomerDataChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
                <option value="Organization">Organization</option>
              </select>
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="customer_id">
                Customer ID {"(Auto Generate)"}
              </label>
              <input
                value={NewCustomer.customer_id}
                onChange={handleNewCustomerDataChange}
                id="customer_id"
                type="text"
                placeholder="Auto Generate"
                disabled
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="status">Customer status</label>
              <select
                value={NewCustomer.status}
                onChange={handleNewCustomerDataChange}
                id="status"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="assigned_sales_rep">Assigned Sales Rep</label>
              <select
                id="assigned_sales_rep"
                value={NewCustomer.assigned_sales_rep}
                onChange={handleNewCustomerDataChange}
              >
                <option value="">Select Sales Rep</option>
                {salesREP.map((ele, ind) => (
                  <option key={ind}>{ele}</option>
                ))}
              </select>
            </div>
          </div>
          <nav className="createNewCustomer-subtit">Contact Information</nav>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="email">
                Email<sup>*</sup>
              </label>
              <input
                value={NewCustomer.email}
                onChange={handleNewCustomerDataChange}
                id="email"
                type="email"
                placeholder="e.g., john@acme.com"
                required
              />
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="phone_number">
                Phone Number<sup>*</sup>
              </label>
              <input
                className="increment-decrement-createNewCustomer"
                value={NewCustomer.phone_number}
                onChange={handleNewCustomerDataChange}
                id="phone_number"
                type="number"
                placeholder="+91 1234567890"
                required
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="address">Address</label>
              <input
                value={NewCustomer.address}
                onChange={handleNewCustomerDataChange}
                id="address"
                type="text"
                placeholder="123 Industrial Way, Chicago, IL, 60601, USA"
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="street">
                Street<sup>*</sup>
              </label>
              <input
                value={NewCustomer.street}
                onChange={handleNewCustomerDataChange}
                id="street"
                type="text"
                placeholder="e.g., 123 Industrial Way"
                required
              />
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="city">
                City<sup>*</sup>
              </label>
              <input
                value={NewCustomer.city}
                onChange={handleNewCustomerDataChange}
                id="city"
                type="text"
                placeholder="e.g., Chicago"
                required
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="state">
                State<sup>*</sup>
              </label>
              <input
                value={NewCustomer.state}
                onChange={handleNewCustomerDataChange}
                id="state"
                type="text"
                placeholder="e.g., IL"
                required
              />
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="zip_code">
                Zip Code<sup>*</sup>
              </label>
              <input
                className="increment-decrement-createNewCustomer"
                value={NewCustomer.zip_code}
                onChange={handleNewCustomerDataChange}
                id="zip_code"
                type="number"
                placeholder="e.g., 60601"
                required
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="country">
                Country<sup>*</sup>
              </label>
              <input
                value={NewCustomer.country}
                onChange={handleNewCustomerDataChange}
                id="country"
                type="text"
                placeholder="e.g., USA"
                required
              />
            </div>
          </div>
          {NewCustomer.customer_type !== "Individual" &&
          NewCustomer.customer_type !== "" ? (
            <>
              <nav className="createNewCustomer-subtit">
                Company Information
              </nav>
              <div className="createNewCustomer-input-container">
                <div className="createNewCustomer-input-box">
                  <label htmlFor="company_name">
                    Company Name<sup>*</sup>
                  </label>
                  <input
                    value={NewCustomer.company_name}
                    onChange={handleNewCustomerDataChange}
                    id="company_name"
                    type="text"
                    placeholder="e.g., Acme Corp"
                    required
                  />
                </div>
                <div className="createNewCustomer-input-box">
                  <label htmlFor="industry">Industry</label>
                  {customIndustry ? (
                    <input
                      value={NewCustomer.industry}
                      onChange={handleNewCustomerDataChange}
                      id="industry"
                      placeholder="Industry Name"
                      type="text"
                    />
                  ) : (
                    <select
                      id="industry"
                      value={NewCustomer.industry}
                      onChange={changeCustomIndustry}
                    >
                      <option value="">Select Industry</option>
                      <option value="custom">+ Custom</option>
                      <option value="Technology">Technology</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Construction">Construction</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Energy">Energy</option>
                      <option value="Media & Comms">Media & Comms</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="createNewCustomer-input-container">
                <div className="createNewCustomer-input-box">
                  <label htmlFor="location">
                    Location<sup>*</sup>
                  </label>
                  <input
                    value={NewCustomer.location}
                    onChange={handleNewCustomerDataChange}
                    id="location"
                    type="text"
                    placeholder="e.g., Chicago, IL"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <nav className="createNewCustomer-subtit">Financial Info</nav>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="payment_terms">Payment Terms</label>
              {customPayment ? (
                <input
                  id="payment_terms"
                  name="payment_terms"
                  value={NewCustomer.payment_terms}
                  onChange={handleNewCustomerDataChange}
                  placeholder="Net 30"
                />
              ) : (
                <select
                  value={NewCustomer.payment_terms}
                  onChange={changeCustomPayment}
                  id="payment_terms"
                  name="payment_terms"
                >
                  <option value="">Select Payment Terms</option>
                  <option value="custom">+ Custom</option>
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 45">Net 45</option>
                  <option value="Net 60">Net 60</option>
                  <option value="Due on Receipt">Due on Receipt</option>
                </select>
              )}
            </div>

            <div className="createNewCustomer-input-box">
              <label htmlFor="credit_term">Credit Term</label>
              {customCreditTerm ? (
                <input
                  id="credit_term"
                  name="credit_term"
                  value={NewCustomer.credit_term}
                  onChange={handleNewCustomerDataChange}
                  placeholder="Terms"
                />
              ) : (
                <select
                  id="credit_term"
                  name="credit_term"
                  value={NewCustomer.credit_term}
                  onChange={changeCustomCreditTerm}
                >
                  <option value="">Select Credit Term</option>
                  <option value="custom">+Custom</option>
                  <option value="Standard">Standard</option>
                  <option value="Extended">Extended</option>
                  <option value="Advance">Advance</option>
                  <option value="Prepaid">Prepaid</option>
                  <option value="COD (Cash on Delivery)">
                    COD (Cash on Delivery)
                  </option>
                </select>
              )}
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="gst_tax_id">GST/Tax ID</label>
              <input
                value={NewCustomer.gst_tax_id}
                onChange={handleNewCustomerDataChange}
                id="gst_tax_id"
                type="text"
                placeholder="e.g., US-123456789"
              />
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="credit_limit">Credit Limit</label>
              <input
                className="increment-decrement-createNewCustomer"
                value={NewCustomer.credit_limit}
                onChange={handleNewCustomerDataChange}
                id="credit_limit"
                type="number"
                placeholder="50,000"
              />
            </div>
            <div className="createNewCustomer-input-box">
              <label htmlFor="available_limit">
                Available Limit {"(Auto-calculated)"}
              </label>
              <input
                value={NewCustomer.available_limit}
                onChange={handleNewCustomerDataChange}
                id="available_limit"
                type="number"
                placeholder="45,000"
                disabled
              />
            </div>
          </div>
          <nav className="createNewCustomer-subtit">Addresses</nav>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="billing_address">Billing Address</label>
              <input
                value={NewCustomer.billing_address}
                onChange={handleNewCustomerDataChange}
                id="billing_address"
                type="text"
                placeholder="123 Industrial Way, Chicago, IL, 60601, USA"
              />
            </div>
          </div>
          <div className="createNewCustomer-input-container">
            <div className="createNewCustomer-input-box">
              <label htmlFor="shipping_address">Shipping Address</label>
              <input
                value={NewCustomer.shipping_address}
                onChange={handleNewCustomerDataChange}
                id="shipping_address"
                type="text"
                placeholder="456 Warehouse Lane, Chicago, IL, 60602, USA"
              />
            </div>
          </div>
          <p className="createNewCustomer-editdate">
            Last edited:<span> {last_edit_date} </span>| ByAdmin
          </p>
          <div className="createNewCustomer-submit-container">
            <nav onClick={handlecreateNewCustomerReset}>Discard</nav>
            <button onClick={() => seteditAddCustomData({})}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
