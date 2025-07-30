// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function onboardTableRow({ ele, ind, handleDeleteCandidate }) {
//   const navigate = useNavigate();

//   return (
//     <tr className="table-row">
//       <td className="option-td" id="width-edit">
//         <svg
//           className="dot-logo"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 448 512"
//         >
//           <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
//         </svg>

//         <div className="options">
//           <p
//             onClick={() => {
//               navigate(`/edit-candidate/${ele._id}`);
//             }}
//           >
//             Edit
//           </p>
//           <p
//             onClick={() => {
//               handleDeleteCandidate(ele._id);
//             }}
//           >
//             Delete
//           </p>
//         </div>
//       </td>
//       <td id="width-num">{ind + 1}</td>
//       <td id="width-emp-code">{ele.employee_code}</td>
//       <td>
//         <abbr title={ele.first_name}>
//           {ele.first_name.length < 14
//             ? ele.first_name
//             : ele.first_name.slice(0, 11) + "..."}
//         </abbr>
//       </td>
//       <td>
//         <abbr title={ele.last_name}>
//           {ele.last_name.length < 14
//             ? ele.last_name
//             : ele.last_name.slice(0, 11) + "..."}
//         </abbr>
//       </td>
//       <td>{ele.department}</td>
//       <td>
//         <abbr title={ele.designation}>
//           {ele.designation.length < 13
//             ? ele.designation
//             : ele.designation.slice(0, 11) + "..."}
//         </abbr>
//       </td>
//       <td>{ele.gender}</td>
//       <td>{ele.joining_date}</td>
//       <td id="width-con-num">
//         <abbr title={ele.personal_number}>
//           {ele.personal_number.length < 17
//             ? ele.personal_number
//             : ele.personal_number.slice(0, 14) + "..."}
//         </abbr>
//       </td>
//       <td id="width-eme-num">
//         <abbr title={ele.emergency_contact_number}>
//           {ele.emergency_contact_number.length < 17
//             ? ele.emergency_contact_number
//             : ele.emergency_contact_number.slice(0, 14) + "..."}
//         </abbr>
//       </td>
//       <td id="width-personal-mail">
//         <abbr title={ele.email}>
//           {ele.email.length < 14 ? ele.email : ele.email.slice(0, 11) + "..."}
//         </abbr>
//       </td>

//       <td id="width-aathar">
//         <abbr title={ele.aadhar_number}>
//           {ele.aadhar_number.length < 15
//             ? ele.aadhar_number
//             : ele.aadhar_number.slice(0, 11) + "..."}
//         </abbr>
//       </td>
//       <td id="width-pan">
//         <abbr title={ele.pan_number}>
//           {ele.pan_number.length < 14
//             ? ele.pan_number
//             : ele.pan_number.slice(0, 11) + "..."}
//         </abbr>
//       </td>
//       <td>{ele.status}</td>
//       <td id="width-address">
//         <abbr title={ele.current_address}>
//           {ele.current_address.length < 34
//             ? ele.current_address
//             : ele.current_address.slice(0, 29) + "..."}
//         </abbr>
//       </td>

//       <td id="width-qualification">
//         <abbr title={ele.highest_qualification}>
//           {ele.highest_qualification.length < 18
//             ? ele.highest_qualification
//             : ele.highest_qualification.slice(0, 15) + "..."}
//         </abbr>
//       </td>
//       <td id="width-pre-employee">
//         <abbr title={ele.previous_employer}>
//           {ele.previous_employer.length < 18
//             ? ele.previous_employer
//             : ele.previous_employer.slice(0, 15) + "..."}
//         </abbr>
//       </td>
//       <td id="width-experience">
//         Y:{ele.total_experience_year}, M:{ele.total_experience_month}
//       </td>
//       <td id="width-relative-experience">
//         Y:{ele.relevant_experience_year}, M:{ele.relevant_experience_month}
//       </td>
//       <td>{ele.marital_status}</td>
//       <td>{ele.basics}</td>
//       <td>{ele.hra}</td>
//       <td id="conveyance">{ele.conveyance_allowance}</td>
//       <td id="medical">{ele.medical_allowance}</td>
//       <td id="medical">{ele.other_allowances}</td>
//       <td>{ele.bonus}</td>
//       <td>{ele.taxes}</td>
//       <td>{ele.pf}</td>
//       <td>{ele.esi}</td>
//       <td>{ele.gross_salary}</td>
//       <td>{ele.net_salary}</td>
//       <td>
//         <abbr title={ele.uan_number}>
//           {ele.uan_number.length < 14
//             ? ele.uan_number
//             : ele.uan_number.slice(0, 12) + "..."}
//         </abbr>
//       </td>
//       <td>
//         <abbr title={ele.pf_number}>
//           {ele.pf_number.length < 15
//             ? ele.pf_number
//             : ele.pf_number.slice(0, 13) + "..."}
//         </abbr>
//       </td>
//       <td>
//         <abbr title={ele.bank_name}>
//           {ele.bank_name.length < 14
//             ? ele.bank_name
//             : ele.bank_name.slice(0, 12) + "..."}
//         </abbr>
//       </td>
//       <td>
//         <abbr title={ele.account_number}>
//           {ele.account_number.length < 14
//             ? ele.account_number
//             : ele.account_number.slice(0, 12) + "..."}
//         </abbr>
//       </td>
//       <td>
//         <abbr title={ele.ifsc_code}>
//           {ele.ifsc_code.length < 14
//             ? ele.ifsc_code
//             : ele.ifsc_code.slice(0, 12) + "..."}
//         </abbr>
//       </td>
//       <td>{ele.asset}</td>
//       <td>
//         <abbr title={ele.asset_type}>
//           {ele.asset_type.length < 14
//             ? ele.asset_type
//             : ele.asset_type.slice(0, 12) + "..."}
//         </abbr>
//       </td>
//       <td id="width-lap-cmy">{ele.laptop_company_name}</td>
//       <td>
//         <abbr title={ele.asset_id}>
//           {ele.asset_id.length < 14
//             ? ele.asset_id
//             : ele.asset_id.slice(0, 12) + "..."}
//         </abbr>
//       </td>
//       <td id="width-edu-doc">
//         {ele.upload_documents !== "" ? "Attached" : "Not attached"}
//       </td>
//     </tr>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardTableRow({ ele, ind, handleDeleteCandidate }) {
  const navigate = useNavigate();

  return (
    <tr className="table-row">
      <td className="option-td" id="width-edit">
        <svg
          className="dot-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
        </svg>

        <div className="options">
          <p
            onClick={() => {
              navigate(`/edit-candidate/${ele.id}`);
            }}
          >
            Edit
          </p>
          <p
            onClick={() => {
              handleDeleteCandidate(ele.id);
            }}
          >
            Delete
          </p>
        </div>
      </td>
      <td id="width-num">{ind + 1}</td>
      <td id="width-emp-code">{ele.employee_code}</td>
      <td>
        <abbr title={ele.first_name}>
          {ele.first_name.length < 14
            ? ele.first_name
            : ele.first_name.slice(0, 11) + "..."}
        </abbr>
      </td>
      <td>
        <abbr title={ele.last_name}>
          {ele.last_name.length < 14
            ? ele.last_name
            : ele.last_name.slice(0, 11) + "..."}
        </abbr>
      </td>
      <td>{ele.department?.department_name || "N/A"}</td>
      <td>
        <abbr title={ele.designation?.role || "N/A"}>
          {(ele.designation?.role || "N/A").length < 13
            ? ele.designation?.role || "N/A"
            : (ele.designation?.role || "N/A").slice(0, 11) + "..."}
        </abbr>
      </td>
      <td>{ele.gender}</td>
      <td>{ele.joining_date}</td>
      <td id="width-con-num">
        <abbr title={ele.personal_number}>
          {ele.personal_number.length < 17
            ? ele.personal_number
            : ele.personal_number.slice(0, 14) + "..."}
        </abbr>
      </td>
      <td id="width-eme-num">
        <abbr title={ele.emergency_contact_number}>
          {ele.emergency_contact_number.length < 17
            ? ele.emergency_contact_number
            : ele.emergency_contact_number.slice(0, 14) + "..."}
        </abbr>
      </td>
      <td id="width-personal-mail">
        <abbr title={ele.email}>
          {ele.email.length < 14 ? ele.email : ele.email.slice(0, 11) + "..."}
        </abbr>
      </td>
      <td id="width-aathar">
        <abbr title={ele.aadhar_number}>
          {ele.aadhar_number.length < 15
            ? ele.aadhar_number
            : ele.aadhar_number.slice(0, 11) + "..."}
        </abbr>
      </td>
      <td id="width-pan">
        <abbr title={ele.pan_number}>
          {ele.pan_number.length < 14
            ? ele.pan_number
            : ele.pan_number.slice(0, 11) + "..."}
        </abbr>
      </td>
      <td>{ele.status}</td>
      <td id="width-address">
        <abbr title={ele.current_address}>
          {ele.current_address.length < 34
            ? ele.current_address
            : ele.current_address.slice(0, 29) + "..."}
        </abbr>
      </td>
      <td id="width-qualification">
        <abbr title={ele.highest_qualification}>
          {ele.highest_qualification.length < 18
            ? ele.highest_qualification
            : ele.highest_qualification.slice(0, 15) + "..."}
        </abbr>
      </td>
      <td id="width-pre-employee">
        <abbr title={ele.previous_employer}>
          {ele.previous_employer.length < 18
            ? ele.previous_employer
            : ele.previous_employer.slice(0, 15) + "..."}
        </abbr>
      </td>
      <td id="width-experience">
        Y:{ele.total_experience_year}, M:{ele.total_experience_month}
      </td>
      <td id="width-relative-experience">
        Y:{ele.relevant_experience_year}, M:{ele.relevant_experience_month}
      </td>
      <td>{ele.marital_status}</td>
      <td>{ele.basics}</td>
      <td>{ele.hra}</td>
      <td id="conveyance">{ele.conveyance_allowance}</td>
      <td id="medical">{ele.medical_allowance}</td>
      <td id="medical">{ele.other_allowances}</td>
      <td>{ele.bonus}</td>
      <td>{ele.taxes}</td>
      <td>{ele.pf}</td>
      <td>{ele.esi}</td>
      <td>{ele.gross_salary}</td>
      <td>{ele.net_salary}</td>
      <td>
        <abbr title={ele.uan_number}>
          {ele.uan_number.length < 14
            ? ele.uan_number
            : ele.uan_number.slice(0, 12) + "..."}
        </abbr>
      </td>
      <td>
        <abbr title={ele.pf_number}>
          {ele.pf_number.length < 15
            ? ele.pf_number
            : ele.pf_number.slice(0, 13) + "..."}
        </abbr>
      </td>
      <td>
        <abbr title={ele.bank_name}>
          {ele.bank_name.length < 14
            ? ele.bank_name
            : ele.bank_name.slice(0, 12) + "..."}
        </abbr>
      </td>
      <td>
        <abbr title={ele.account_number}>
          {ele.account_number.length < 14
            ? ele.account_number
            : ele.account_number.slice(0, 12) + "..."}
        </abbr>
      </td>
      <td>
        <abbr title={ele.ifsc_code}>
          {ele.ifsc_code.length < 14
            ? ele.ifsc_code
            : ele.ifsc_code.slice(0, 12) + "..."}
        </abbr>
      </td>
      <td>{ele.asset}</td>
      <td>
        <abbr title={ele.asset_type}>
          {ele.asset_type.length < 14
            ? ele.asset_type
            : ele.asset_type.slice(0, 12) + "..."}
        </abbr>
      </td>
      <td id="width-lap-cmy">{ele.laptop_company_name}</td>
      <td>
        <abbr title={ele.asset_id}>
          {ele.asset_id.length < 14
            ? ele.asset_id
            : ele.asset_id.slice(0, 12) + "..."}
        </abbr>
      </td>
      <td id="width-edu-doc">
        {ele.upload_documents !== "" ? "Attached" : "Not attached"}
      </td>
    </tr>
  );
}