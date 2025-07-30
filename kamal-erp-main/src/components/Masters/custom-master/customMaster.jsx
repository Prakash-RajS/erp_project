import React, { useState, useEffect } from "react";
import "./customMaster.css";
import { toast } from "react-toastify";
import CreateNewCustomer from "../create-new-customer/createNewCustomer";
import CustomImport from "../custom-Import/customImport";
import CustomDuplicates from "../custom-merge-duplicates/customDuplicates";

export default function customMaster() {
  const [selectStatus, setselectStatus] = useState("");
  const [selectCustomer, setselectCustomer] = useState("");
  const [selectSales, setselectSales] = useState("");

  const [ApiCustomMaster, setApiCustomMaster] = useState({});
  const [customMaster, setcustomMaster] = useState([]);

  const [searchSalseRep, setsearchSalseRep] = useState([]);

  const [customCurrentPage, setcustomCurrentPage] = useState(1);
  const customRowsPerPage = 10;

  // add new customer
  const [showAddCustomer, setshowAddCustomer] = useState(false);
  const [editShowAddCustom, seteditShowAddCustom] = useState(false);
  const [editAddCustomData, seteditAddCustomData] = useState({});
  //Import
  const [showCustomImport, setshowCustomImport] = useState(false);
  //merge duplicates
  const [showCustomDuplicates, setshowCustomDuplicates] = useState(false);
  const customFromAPI = {
    customMaster: [
      {
        id: "1",
        customer_id: "CUS0001",
        first_name: "Rose",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Inactive",
        credit_limit: "50000",
        city: "chennai",
      },
      {
        id: "2",
        customer_id: "CUS0001",
        first_name: "Rose",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "3",
        customer_id: "CUS0001",
        first_name: "Rose",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "4",
        customer_id: "CUS0002",
        first_name: "Sans",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "5",
        customer_id: "CUS0003",
        first_name: "Saala",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "6",
        customer_id: "CUS0004",
        first_name: "Mandy",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "7",
        customer_id: "CUS0005",
        first_name: "Director",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "8",
        customer_id: "CUS0006",
        first_name: "Havock",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "9",
        customer_id: "CUS0005",
        first_name: "Director",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "10",
        customer_id: "CUS0005",
        first_name: "Director",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
      {
        id: "11",
        customer_id: "CUS0005",
        first_name: "Director",
        company_name: "Acme Corp",
        customer_type: "Business",
        email: "rose@gmail.com",
        status: "Active",
        credit_limit: "50,000",
        city: "chennai",
      },
    ],
    searchSalseRep: ["Michael", "Michael", "Michael"],
  };
  useEffect(() => {
    setApiCustomMaster(customFromAPI);
  }, []);
  useEffect(() => {
    if (Object.keys(ApiCustomMaster).length > 0) {
      setcustomMaster(ApiCustomMaster.customMaster);
      setsearchSalseRep(ApiCustomMaster.searchSalseRep);
    }
  }, [ApiCustomMaster]);

  //page calculation
  const totalPages = Math.ceil(customMaster.length / customRowsPerPage);

  const currentData = customMaster.slice(
    (customCurrentPage - 1) * customRowsPerPage,
    customCurrentPage * customRowsPerPage
  );

  const handleNext = () => {
    if (customCurrentPage < totalPages) {
      setcustomCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrev = () => {
    if (customCurrentPage > 1) {
      setcustomCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // delete list

  function deleteCustomer(ind) {
    const okDel = window.confirm("Are you sure you want to delete this task?");
    if (okDel) {
      setApiCustomMaster((prev) => ({
        ...prev,
        customMaster: prev.customMaster.filter((_, index) => index !== ind),
      }));
      toast.success("Task deleted!");
    }
  }
  //edit
  const showEditCustomer = (id) => {
    seteditAddCustomData(
      currentData.find((ele) => {
        return ele.id === id;
      })
    );
  };

  function resetSearchBox() {
    setselectCustomer("");
    setselectSales("");
    setselectStatus("");
    console.log(selectCustomer, selectSales, selectStatus);
  }

  return (
    <>
      {showAddCustomer ? (
        <CreateNewCustomer
          setshowAddCustomer={setshowAddCustomer}
          editShowAddCustom={editShowAddCustom}
          editAddCustomData={editAddCustomData}
          seteditAddCustomData={seteditAddCustomData}
        />
      ) : editShowAddCustom ? (
        <CreateNewCustomer
          setshowAddCustomer={seteditShowAddCustom}
          editShowAddCustom={editShowAddCustom}
          editAddCustomData={editAddCustomData}
          seteditAddCustomData={seteditAddCustomData}
        />
      ) : showCustomImport ? (
        <CustomImport
          setshowCustomImport={setshowCustomImport}
          setcustomMaster={setcustomMaster}
        />
      ) : showCustomDuplicates ? (
        <CustomDuplicates
          setshowCustomDuplicates={setshowCustomDuplicates}
          customMaster={customMaster}
        />
      ) : (
        <div className="customMaster-container">
          <div className="customMaster-header">
            <p>Custom Master</p>{" "}
            <nav>
              <button onClick={() => setshowAddCustomer(true)}>
                + Add New Custom
              </button>
              <button onClick={() => setshowCustomImport(true)}>Import</button>
              <button onClick={() => setshowCustomDuplicates(true)}>
                Merge Duplicates
              </button>
            </nav>
          </div>
          <div className="customMaster-search-box">
            <label htmlFor="searchByID">
              <svg
                className="customMaster-search-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </label>

            <input id="searchByID" placeholder="Search by Customer..." />
          </div>
          <div className="customMaster-clearfilter">
            <p onClick={resetSearchBox}>Clear Filter</p>
          </div>
          <div className="customMaster-search-category">
            <div className="customMaster-input-box">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={selectStatus}
                onChange={(e) => setselectStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="customMaster-input-box">
              <label htmlFor="customer_type">Customer Type</label>
              <select
                id="customer_type"
                value={selectCustomer}
                onChange={(e) => setselectCustomer(e.target.value)}
              >
                <option value="">All</option>
                <option value="Business">Business</option>
                <option value="Individual">Individual</option>
                <option value="Organization">Organization</option>
              </select>
            </div>

            <div className="customMaster-input-box">
              <label htmlFor="sales_rep">Sales Rep</label>
              <select
                id="sales_rep"
                value={selectSales}
                onChange={(e) => setselectSales(e.target.value)}
              >
                <option value="">All</option>
                {searchSalseRep.map((ele, ind) => (
                  <option key={ind} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="customMaster-table-cointainer">
            <table>
              <thead className="customMaster-thead">
                <tr>
                  <th id="custom_tData_width_id">Customer ID</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th id="custom_tData_width_type">Customer Type</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th id="custom_tData_width_limit">Credit Limit</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="customMaster-tbody">
                {currentData.length > 0 ? (
                  currentData.map((ele, ind) => (
                    <tr key={ind}>
                      <td id="custom_tData_width_id">{ele.customer_id}</td>
                      <td>{ele.first_name}</td>
                      <td>{ele.company_name}</td>
                      <td id="custom_tData_width_type">{ele.customer_type}</td>
                      <td>{ele.email}</td>
                      <td>
                        <div
                          className={
                            ele.status === "Active"
                              ? "customMaster-Status-active"
                              : "customMaster-Status-inactive"
                          }
                        >
                          {ele.status}
                        </div>
                      </td>
                      <td id="custom_tData_width_limit">{ele.credit_limit}</td>
                      <td>{ele.city}</td>
                      <td className="customMaster-action-cointainer">
                        <svg
                          onClick={() => {
                            showEditCustomer(ele.id);
                            seteditShowAddCustom(true);
                          }}
                          className="edit-customMaster-logo"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                        </svg>
                        <svg
                          onClick={() => {
                            deleteCustomer(ind);
                          }}
                          className="delete-customMaster-logo"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No Data Found</p>
                )}
              </tbody>
            </table>
          </div>
          <nav className="customMaster-table-bottem">
            <p className="customMaster-num-entries">
              Showing {currentData.length} entries
            </p>
            <div className="customMaster-manage-control-box">
              <button
                className="customMaster-manage-btn"
                onClick={handlePrev}
                disabled={customCurrentPage === 1}
              >
                Prev
              </button>
              <nav className="customMaster-num-page">
                {" "}
                Page {customCurrentPage} of {totalPages}{" "}
              </nav>
              <button
                className="customMaster-manage-btn"
                onClick={handleNext}
                disabled={customCurrentPage === totalPages}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
