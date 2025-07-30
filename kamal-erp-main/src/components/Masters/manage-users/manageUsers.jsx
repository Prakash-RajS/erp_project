import React, { useState, useEffect } from "react";
import "./manageUsers.css";
import CreateUser from "../create-user-manageuser/createUser";
import { toast } from "react-toastify";

export default function manageUsers() {
  const [manageAPIdata, setmanageAPIdata] = useState({});
  const [tableData, settableDate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Default: Page 1
  const rowsPerPage = 10; // Show 10 rows per page

  const [showCreateUser, setshowCreateUser] = useState(false);
  const [editCreateUser, seteditCreateUser] = useState(false);
  const [edituser, setedituser] = useState({});

  const manageFromAPI = {
    tableData: [
      {
        code: "12",
        email: "Kmamahhhhhhhhhhhzxcvvh@gmail.com",
        first_name: "kamalsslivinkishoreharishnaveen",
        last_name: "Rajsssssss",
        role: "Super Admin",
      },
      {
        code: "13",
        email: "Kmamil.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "15",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "14",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "16",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "17",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "18",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "1",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "2",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "3",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "4",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "155",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "122",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "123",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "128",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "129",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
      {
        code: "1225",
        email: "Kmama@gmail.com",
        first_name: "kamal",
        last_name: "Raj",
        role: "Super Admin",
      },
    ],
  };

  useEffect(() => {
    setmanageAPIdata(manageFromAPI);
  }, []);
  useEffect(() => {
    if (Object.keys(manageAPIdata).length > 0) {
      settableDate(manageAPIdata.tableData);
    }
  }, [manageAPIdata]);

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  console.log(totalPages);

  // Get data for current page
  const currentData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // delete list

  function deleteTask(ind) {
    const okDel = window.confirm("Are you sure you want to delete this task?");
    if (okDel) {
      setmanageAPIdata((prev) => ({
        ...prev,
        tableData: prev.tableData.filter((_, index) => index !== ind),
      }));
      toast.success("Task deleted!");
    }
  }

  const showEditUser = (code) => {
    setedituser(
      currentData.find((ele) => {
        return ele.code === code;
      })
    );
    seteditCreateUser(true);
  };

  return (
    <>
      {showCreateUser && (
        <div className="createuser-btn">
          <CreateUser
            showCreateUser={showCreateUser}
            setshowCreateUser={setshowCreateUser}
            editCreateUser={editCreateUser}
            edituser={edituser}
            setedituser={setedituser}
          />
        </div>
      )}
      {editCreateUser && (
        <div className="createuser-btn">
          <CreateUser
            showCreateUser={showCreateUser}
            setshowCreateUser={seteditCreateUser}
            editCreateUser={editCreateUser}
            edituser={edituser}
            setedituser={setedituser}
          />
        </div>
      )}
      <div
        className={`manageusers-container ${
          (showCreateUser || editCreateUser) && "blur"
        }`}
      >
        <p>Manage Users</p>
        <div className="manage-header">
          <p className="manage-headleft">
            Efficiently manage and organize user account with easy.
          </p>
          <div className="manage-headright">
            <div className="manage-search-cointainer">
              <input id="manage-focus" placeholder="Search users" />
              <label htmlFor="manage-focus">
                <svg
                  className="search-logo-manageuser"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </label>
            </div>

            <button onClick={() => setshowCreateUser(true)}>
              + Create New
            </button>
          </div>
        </div>
        <div className="manage-table-container">
          <table>
            <thead className="manage-thead">
              <tr>
                <th>email</th>
                <th id="managa-width-firstname">First Name</th>
                <th id="managa-width-lastname">Last Name</th>
                <th id="managa-width-role">Role</th>
                <th id="manage-width-action">Action</th>
              </tr>
            </thead>
            <tbody className="manage-tbody">
              {currentData.length > 0 ? (
                currentData.map((ele, ind) => (
                  <tr key={ind}>
                    <td>
                      <abbr title={ele.email}>
                        {ele.email.length < 18
                          ? ele.email
                          : ele.email.slice(0, 18) + "..."}
                      </abbr>
                    </td>
                    <td id="managa-width-firstname">
                      <abbr title={ele.first_name}>
                        {ele.first_name.length < 16
                          ? ele.first_name
                          : ele.first_name.slice(0, 16) + "..."}
                      </abbr>
                    </td>
                    <td id="managa-width-lastname">
                      <abbr title={ele.last_name}>
                        {ele.last_name.length < 16
                          ? ele.last_name
                          : ele.last_name.slice(0, 16) + "..."}
                      </abbr>
                    </td>
                    <td id="managa-width-role">
                      <abbr title={ele.role}>
                        {ele.role.length < 20
                          ? ele.role
                          : ele.role.slice(0, 20) + "..."}
                      </abbr>
                    </td>
                    <td id="manage-width-action">
                      <svg
                        className="dot-logo-manage"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                      <nav className="manageuser-dot-container">
                        <div
                          onClick={() => {
                            showEditUser(ele.code);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          onClick={() => {
                            deleteTask(ind);
                          }}
                        >
                          Delete
                        </div>
                      </nav>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No Data Found</tr>
              )}
            </tbody>
          </table>
        </div>
        <nav className="table-bottem">
          <p className="num-entries">Showing {currentData.length} entries</p>
          <div className="manage-control-box">
            <button
              className="manage-btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <nav className="num-page">
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </nav>
            <button
              className="manage-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
