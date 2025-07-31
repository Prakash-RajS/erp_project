import React, { useState, useEffect } from "react";
import "./createUser.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function createUser({
  showCreateUser,
  setshowCreateUser,
  editCreateUser,
  edituser,
  setedituser,
}) {
  const [ApiManageUser, setApiManageUser] = useState({});
  const [branch, setBranch] = useState([]);
  const manageUserFormAi = {
    branch: ["Chennai", "Mumbai"],
  };
  useEffect(() => {
    setApiManageUser(manageUserFormAi);
  }, []);
  useEffect(() => {
    if (Object.keys(ApiManageUser).length > 0) {
      setBranch(ApiManageUser.branch);
    }
  }, [ApiManageUser]);
  const [createUserForm, setcreateUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    branch: "",
    department: "",
    role: "",
    reporting_to: "",
    available_branches: "",
    employee_id: "",
  });
  useEffect(() => {
    setcreateUserForm((prev) => {
      return { ...prev, ...edituser };
    });
  }, [edituser]);

  const handleCreateUserChange = (e) => {
    setcreateUserForm((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  console.log(createUserForm);

  // function handleCreateUserSubmit(e) {
  //   e.preventDefault();
  //   setcreateUserForm({
  //     first_name: "",
  //     last_name: "",
  //     email: "",
  //     contact_number: "",
  //     branch: "",
  //     department: "",
  //     role: "",
  //     reporting_to: "",
  //     available_branches: "",
  //     employee_id: "",
  //   });
  //   setshowCreateUser(false);
  // }
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    const persistedAuth = JSON.parse(localStorage.getItem("persist:root") || "{}");
    const authState = JSON.parse(persistedAuth.auth || "{}");
    const token = authState?.user?.token;

    const fetchDepartmentsAndRoles = async () => {
      try {
        const [deptRes, roleRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/departments/", {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/roles/", {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        setDepartmentList(deptRes.data.departments || []);
        setRoleList(roleRes.data.roles || []);
      } catch (err) {
        console.error("Error fetching departments/roles:", err);
        toast.error("Failed to load dropdown data");
      }
    };

    fetchDepartmentsAndRoles();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      const persistedAuth = JSON.parse(localStorage.getItem("persist:root") || "{}");
      const authState = JSON.parse(persistedAuth.auth || "{}");
      const token = authState?.user?.token;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/branches/", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        setBranchList(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("Failed to load branches");
      }
    };

    fetchBranches();
  }, []);
  const handleFormChange = (e) => {
    const { id, value } = e.target;

    if (
      [
        "basics",
        "hra",
        "conveyance_allowance",
        "medical_allowance",
        "other_allowances",
        "bonus",
        "taxes",
        "pf",
        "esi",
        "gross_salary",
        "net_salary",
      ].includes(id)
    ) {
      setcreateUserForm((prev) => ({ ...prev, [id]: putComma(value) }));
    } else {
      setcreateUserForm((prev) => ({ ...prev, [id]: value }));
    }

    if (id === "department") {
      const deptId = parseInt(value);
      const filtered = roleList.filter((role) => role.department === deptId);
      setFilteredRoles(filtered);
      setcreateUserForm((prev) => ({ ...prev, designation: "" }));
    }
  };
  const [filteredRoles, setFilteredRoles] = useState([]);

  useEffect(() => {
    if (createUserForm.department && roleList.length > 0) {
      const rolesForDept = roleList.filter(
        (role) => role.department === parseInt(createUserForm.department)
      );
      setFilteredRoles(rolesForDept);
    } else {
      setFilteredRoles([]);
    }
  }, [createUserForm.department, roleList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const persistedAuth = JSON.parse(localStorage.getItem("persist:root") || "{}");
    const authState = JSON.parse(persistedAuth.auth || "{}");
    const token = authState?.user?.token;

    const formData = {
      first_name: createUserForm.first_name,
      last_name: createUserForm.last_name || "",
      email: createUserForm.email,
      profile: {
        phone: createUserForm.phone,
        role: createUserForm.role,
        profilePic: createUserForm.profilePic,
        contact_number: createUserForm.contact_number,
        department: createUserForm.department,
        branch: createUserForm.branch,
        // 🔥 Convert CSV to list
        available_branches: createUserForm.available_branches
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        reporting_to: createUserForm.reporting_to,
        employee_id: createUserForm.employee_id,
      },
    };

    try {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("http://127.0.0.1:8000/api/users/", formData, config);
      console.log("User created:", response.data);
      toast.success("User created successfully");
      // Reset the form
      setcreateUserForm({
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        branch: "",
        department: "",
        role: "",
        reporting_to: "",
        available_branches: "",
        employee_id: "",
        designation: "",
      });
      setedituser({});
      // Optionally reset form or navigate
      // setCreateUserForm(initialFormState);
       navigate("/?tab=manageUsers");
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response?.data) {
        toast.error("Failed to create user: " + JSON.stringify(error.response.data));
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="createuser-container">
      <svg
        className="x-logo-createuser"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        onClick={() => {
          setshowCreateUser(false);
          setedituser({});
        }}
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
      <div className="createuser-head">
        <p>{editCreateUser ? "Edit" : "Create New"} Branch Users</p>
      </div>
      <div className="createuser-body">
        <form onSubmit={handleSubmit}>
          <div className="createuser-content">
            <div className="createuser-box">
              <label htmlFor="first_name">
                First Name<sup>*</sup>
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="First Name"
                value={createUserForm.first_name}
                onChange={handleCreateUserChange}
                required
              />
            </div>
            <div className="createuser-box">
              <label htmlFor="last_name">
                Last Name<sup>*</sup>
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={createUserForm.last_name}
                onChange={handleCreateUserChange}
                required
              />
            </div>
          </div>
          <div className="createuser-content">
            <div className="createuser-box">
              <label htmlFor="email">
                Email<sup>*</sup>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="stackly@gmail.com"
                value={createUserForm.email}
                onChange={handleCreateUserChange}
                required
              />
            </div>
            <div className="createuser-box">
              <label htmlFor="contact_number">Contact Number</label>
              <input
                id="contact_number"
                name="contact_number"
                className="increment-decrement-createuser"
                type="number"
                placeholder="9134554123"
                value={createUserForm.contact_number}
                onChange={handleCreateUserChange}
              />
            </div>
          </div>
          <div className="createuser-content">
            <div className="createuser-box">
              <label htmlFor="branch">
                Branch<sup>*</sup>
              </label>

              <select
                id="branch"
                name="branch"
                className="candidate-input"
                onChange={handleFormChange}
                value={createUserForm.branch}
                required
              >
                <option value="">Select a branch</option>
                {branchList.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="createuser-box">
              <label htmlFor="department">
                Department<sup>*</sup>
              </label>
              <select
                id="department"
                name="department"
                value={createUserForm.department}
                onChange={handleFormChange}
                className="candidate-input"
                required
              >
                <option value="">Select Department</option>
                {departmentList.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.department_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="createuser-content">
            <div className="createuser-box">
              <label htmlFor="role">
                role<sup>*</sup>
              </label>
              <select
                id="designation"
                name="designation"
                value={createUserForm.designation}
                onChange={handleFormChange}
                className="candidate-input"
                required
              >
                <option value="">Select role</option>
                {filteredRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="createuser-box">
              <label htmlFor="reporting_to">Reporting To</label>
              <input
                id="reporting_to"
                name="reporting_to"
                type="text"
                placeholder="9134554123"
                value={createUserForm.reporting_to}
                onChange={handleCreateUserChange}
              />
            </div>
          </div>
          <div className="createuser-content">
            <div className="createuser-box">
              <label htmlFor="available_branches">Available Branches</label>
              <input
                id="available_branches"
                name="available_branches"
                type="text"
                placeholder="e.g., Chennai,Mumbai"
                value={createUserForm.available_branches}
                onChange={handleCreateUserChange}
              />
            </div>
            <div className="createuser-box">
              <label htmlFor="employee_id">Employee ID</label>
              <input
                id="employee_id"
                name="employee_id"
                type="text"
                placeholder="Enter Employee ID"
                onChange={handleCreateUserChange}
                value={createUserForm.employee_id}
              />
            </div>
          </div>
          <div className="createuser-submit-container">
            <nav>
              <button
                onClick={() => setshowCreateUser(false)}
                className="createuser-cancel"
              >
                Cancel
              </button>
              <button type="submit" className="createuser-save">
                Save
              </button>
            </nav>
          </div>
        </form>
      </div>
    </div>
  );
}

