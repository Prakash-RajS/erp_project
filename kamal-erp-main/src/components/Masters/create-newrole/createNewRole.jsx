import React, { useState, useEffect } from "react";
import "./createNewRole.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateNewRole({

  setShowNewRole,
  editRole,
  editRoleOnly,
  setEditRole,
  setEditRoleOnly,
}) {
  const persistedAuth = JSON.parse(localStorage.getItem("persist:root"));
  const authState = JSON.parse(persistedAuth.auth || "{}");
  const token = authState?.user?.token;
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  

  const [inputRoleAccess, setinputRoleAccess] = useState({
    role: "",
    description: "",
    department: "",
    branch: "",
    access: {
      dashboard: {
        fullAccess: false,
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
      task: {
        fullAccess: false,
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
      projectTracker: {
        fullAccess: false,
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
      onboarding: {
        fullAccess: false,
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
      attendance: {
        fullAccess: false,
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
    },
  });

  useEffect(() => {
  if (editRoleOnly && editRole && Object.keys(editRole).length > 0) {
    const defaultAccess = {
      dashboard: { fullAccess: false, view: false, create: false, edit: false, delete: false },
      task: { fullAccess: false, view: false, create: false, edit: false, delete: false },
      projectTracker: { fullAccess: false, view: false, create: false, edit: false, delete: false },
      onboarding: { fullAccess: false, view: false, create: false, edit: false, delete: false },
      attendance: { fullAccess: false, view: false, create: false, edit: false, delete: false },
    };

    // Merge existing permissions over defaultAccess
    const safePermissions = { ...defaultAccess, ...(editRole.permissions || {}) };

    setinputRoleAccess((prev) => ({
      ...prev,
      role: editRole.role || "",
      description: editRole.description || "",
      department: editRole.department || "",
      branch: editRole.branch || "",
      access: safePermissions,
    }));
  }
}, [editRoleOnly, editRole]);


  const handleInputRoleChange = (e, pageName) => {
    setinputRoleAccess((prev) => {
      return {
        ...prev,
        access: {
          ...prev.access,
          [pageName]: {
            ...prev.access[pageName],
            [e.target.id]: e.target.checked,
          },
        },
      };
    });
  };

  useEffect(() => {
    const fetchBranches = async () => {
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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/departments/", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Departments fetched:", response.data);
        setDepartmentList(response.data.departments); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Failed to load departments");
      }
    };

    fetchDepartments();
  }, []);


  const handleResetinputbox = () => {
    setinputRoleAccess((prev) => {
      return {
        ...prev,
        access: {
          dashboard: {
            fullAccess: false,
            view: false,
            create: false,
            edit: false,
            delete: false,
          },
          task: {
            fullAccess: false,
            view: false,
            create: false,
            edit: false,
            delete: false,
          },
          projectTracker: {
            fullAccess: false,
            view: false,
            create: false,
            edit: false,
            delete: false,
          },
          onboarding: {
            fullAccess: false,
            view: false,
            create: false,
            edit: false,
            delete: false,
          },
          attendance: {
            fullAccess: false,
            view: false,
            create: false,
            edit: false,
            delete: false,
          },
        },
      };
    });
  };

//   const resetRoleForm = () => {
//   setinputRoleAccess({
//     department: "",
//     branch: "",
//     role: "",
//     description: "",
//     access: {
//       dashboard: {
//         fullAccess: false,
//         view: false,
//         create: false,
//         edit: false,
//         delete: false,
//       },
//       task: {
//         fullAccess: false,
//         view: false,
//         create: false,
//         edit: false,
//         delete: false,
//       },
//       projectTracker: {
//         fullAccess: false,
//         view: false,
//         create: false,
//         edit: false,
//         delete: false,
//       },
//       onboarding: {
//         fullAccess: false,
//         view: false,
//         create: false,
//         edit: false,
//         delete: false,
//       },
//       attendance: {
//         fullAccess: false,
//         view: false,
//         create: false,
//         edit: false,
//         delete: false,
//       },
//     },
//   });

//   // setEditRole(null);
//   // setEditRoleOnly(false);
//   // setShowNewRole(false);
// };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { department, branch, role, description, access } = inputRoleAccess;

  if (!department || !branch || !role?.trim() || !description?.trim()) {
    toast.error("Please fill in all required fields.");
    return;
  }

  const hasPermission = Object.values(access).some((perm) =>
    Object.values(perm).some((val) => val === true)
  );

  if (!hasPermission) {
    toast.error("Please assign at least one permission.");
    return;
  }

  try {
    if (!token) throw new Error("No authentication token found");

    const config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    const data = {
      department,
      branch,
      role,
      description,
      permissions: access,
    };

    let res;

    if (editRoleOnly && editRole?.id) {
      // ✅ Edit mode → use PUT
      res = await axios.put(`http://127.0.0.1:8000/api/roles/${editRole.id}/`, data, config);
      toast.success("Role updated successfully!");
    } else {
      // ✅ Create mode → use POST
      res = await axios.post("http://127.0.0.1:8000/api/roles/", data, config);
      toast.success("Role created successfully!");
    }
    // resetRoleForm();
   
  } catch (err) {
    const message =
      err.response?.data?.role?.[0] ||
      err.response?.data?.message ||
      "Failed to save role.";
    console.error("Role save failed", err.response?.data || err.message);
    toast.error(message);
  }
};

  return (
    <div className="create-newrole-cointainer">
      <div className="create-role-head">
        <p>{editRoleOnly ? "Edit" : "Create"} Roles</p>
        <svg
          className="x-logo-create-role"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          onClick={() => setShowNewRole(false)}
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="create-role-content">
          <div className="create-role-grid grid grid-cols-2 gap-6 w-full">
            <div className="create-role-box">
              <label htmlFor="department">Select Department<sup>*</sup></label>
              <select
                id="department"
                name="department"
                value={inputRoleAccess.department || ""}
                onChange={(e) =>
                  setinputRoleAccess((prev) => ({
                    ...prev,
                    department: parseInt(e.target.value), // or e.target.value if your backend accepts string IDs
                  }))
                }
                required
              >
                <option value="">Select a department</option>
                {departmentList.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-role-box">
              <label htmlFor="branch">Select Branch<sup>*</sup></label>
              <select
                id="branch"
                name="branch"
                value={inputRoleAccess.branch || ""}
                onChange={(e) =>
                  setinputRoleAccess((prev) => ({
                    ...prev,
                    branch: parseInt(e.target.value), // or just e.target.value if your backend doesn't need an integer
                  }))
                }
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

            <div className="create-role-box">
              <label htmlFor="role_name">Role Name<sup>*</sup></label>
              <input
                id="role_name"
                name="role_name"
                type="text"
                placeholder="Enter Role Name"
                value={inputRoleAccess.role}
                onChange={(e) =>
                  setinputRoleAccess((prev) => ({ ...prev, role: e.target.value }))
                }
                required
              />
            </div>

            <div className="create-role-box">
              <label htmlFor="description">Description<sup>*</sup></label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter Description"
                value={inputRoleAccess.description}
                onChange={(e) =>
                  setinputRoleAccess((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
        </div>
        <div className="create-role-content">
          <div className="role-permission-title">
            <p>Permission</p>
            <button type="reset" onClick={handleResetinputbox}>
              Reset
            </button>
          </div>
        </div>
        <div className="create-role-table">
          <table>
            <thead className="ceate-role-head">
              <tr>
                <th>Menus</th>
                <th>Full Access</th>
                <th>View</th>
                <th>Create</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="ceate-role-body">
              {[
                "dashboard",
                "task",
                "projectTracker",
                "onboarding",
                "attendance",
              ].map((page, ind) => (
                <tr key={ind}>
                  <td>
                    {page
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </td>
                  <td id="check-role">
                    <input
                      id="fullAccess"
                      type="checkbox"
                      checked={inputRoleAccess.access[page].fullAccess}
                      onChange={(e) => {
                        handleInputRoleChange(e, page);
                      }}
                    />
                  </td>
                  <td id="check-role">
                    <input
                      id="view"
                      type="checkbox"
                      checked={inputRoleAccess.access[page].view}
                      onChange={(e) => {
                        handleInputRoleChange(e, page);
                      }}
                    />
                  </td>
                  <td id="check-role">
                    <input
                      id="create"
                      type="checkbox"
                      checked={inputRoleAccess.access[page].create}
                      onChange={(e) => {
                        handleInputRoleChange(e, page);
                      }}
                    />
                  </td>
                  <td id="check-role">
                    <input
                      id="edit"
                      type="checkbox"
                      checked={inputRoleAccess.access[page].edit}
                      onChange={(e) => {
                        handleInputRoleChange(e, page);
                      }}
                    />
                  </td>
                  <td id="check-role">
                    <input
                      id="delete"
                      type="checkbox"
                      checked={inputRoleAccess.access[page].delete}
                      onChange={(e) => {
                        handleInputRoleChange(e, page);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="create-role-submit-container">
          <nav>
            <button
              className="create-role-cancel"
              onClick={(e) => {
                e.preventDefault();
                setShowNewRole(false);
                setEditRoleOnly(false);
                setEditRole({});
              }}
            >
              Cancel
            </button>
            <button type="submit" className="create-role-save">
              Save
            </button>
          </nav>
        </div>
      </form>
    </div>
  );
}
