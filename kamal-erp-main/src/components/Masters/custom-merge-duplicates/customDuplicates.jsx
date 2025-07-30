import React, { useEffect, useState } from "react";
import "./customDuplicates.css";

export default function customDuplicates({
  setshowCustomDuplicates,
  customMaster,
}) {
  //   console.log(customMaster);

  useEffect(() => {
    // Convert all objects to strings (excluding `id`)
    const stringifiedData = customMaster.map((item) =>
      JSON.stringify({ ...item, id: undefined })
    );

    // Count occurrences
    const countMap = stringifiedData.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    // Separate duplicates and uniques
    const duplicates = [];
    const uniques = [];

    customMaster.map((item) => {
      const key = JSON.stringify({ ...item, id: undefined });
      if (countMap[key] > 1) {
        duplicates.push(item);
      } else {
        uniques.push(item);
      }
    });

    console.log("🔁 Duplicate Entries:", duplicates);
    console.log("✅ Unique Entries:", uniques);
  }, []);

  return (
    <>
      <div className="customDuplicate-container">
        <div className="customDuplicate-title">
          <p>Merge Duplicates</p>
          <nav onClick={() => setshowCustomDuplicates(false)}>
            <svg
              className="customDuplicate-circle-x-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
            <p>Close</p>
          </nav>
        </div>
        <p className="customDuplicate-table-title">
          Potential Duplicate List {"(Main Table View)"}
        </p>
        <div className="customDuplicate-list-container">
          <table>
            <thead className="customDuplicate-table-head">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th id="customDuplicate-th-td-width"> Primary Record</th>
                <th id="customDuplicate-th-td-width"> Duplicate Record</th>
                <th id="customDuplicate-th-td-width">Matching Fields</th>
                <th id="customDuplicate-th-td-width">Conflict Fields</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="customDuplicate-table-body">
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td id="customDuplicate-th-td-width">kamal</td>
                <td id="customDuplicate-th-td-width">kamal</td>
                <td id="customDuplicate-th-td-width">
                  name,addredfghjgcjlvhgrss,ares,city
                </td>
                <td id="customDuplicate-th-td-width">name</td>
                <td>
                  <p id="customDuplicate-review">Review</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td id="customDuplicate-th-td-width">kamal</td>
                <td id="customDuplicate-th-td-width">kamal</td>
                <td id="customDuplicate-th-td-width">namares,city</td>
                <td id="customDuplicate-th-td-width">name</td>
                <td>
                  <p id="customDuplicate-review">Review</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav className="customDuplicate-instruction">
          <svg
            className="customDuplicate-tickbox-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
          <p>Matching Fields → No change needed.</p>
        </nav>
        <nav className="customDuplicate-instruction">
          <svg
            className="customDuplicate-alert-red-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
          <p>
            Conflict Fields → You must manually select the correct value by
            clicking ”Review”.
          </p>
        </nav>
        <nav className="customDuplicate-instruction">
          <h5>
            Select the customers and click "Merge Now" to combine duplicates.
          </h5>
        </nav>
        <div className="customDuplicate-submut-container">
          <nav onClick={() => setshowCustomDuplicates(false)}>Cancel</nav>
          <button>Merge Now</button>
        </div>
      </div>
    </>
  );
}
