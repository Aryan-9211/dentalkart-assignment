import React, { useState } from "react";
import "./Dashboard.css";
import { convertJsonToCsv } from "../Utils/jsontocsv";
import { convertCsvToJson } from "../Utils/csvtojson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

// Dashboard Panel component
const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);

  const handleImport = (event) => {
    event.preventDefault();

    // Read uploaded CSV file
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    // Convert CSV to JSON and save in local storage
    reader.onload = () => {
      const csvData = reader.result;
      const jsonData = convertCsvToJson(csvData);
      localStorage.setItem("StudentData", JSON.stringify(jsonData));
      setStudentData(jsonData);
    };
  };

  const handleExport = (event) => {
    event.preventDefault();

    // Get JSON data from local storage and convert to CSV
    const jsonData = JSON.parse(localStorage.getItem("StudentData"));
    const csvData = convertJsonToCsv(jsonData);

    // Download CSV file
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student-data.csv";
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <div className="dashboard-div">
        <h1 className="heading">Students</h1>
        <div className="import-export">
          <button
            className="dashboard-btn"
            style={{ backgroundColor: "white", color: "black" }}
            onClick={() => document.getElementById("file-input").click()}
          >
            Import Students
          </button>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleImport}
            accept=".csv"
          />
          <button
            className="dashboard-btn"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={handleExport}
          >
            <FontAwesomeIcon
              icon={faFileArrowDown}
              style={{ marginRight: "5px" }}
            />
            Export as CSV
          </button>
        </div>
      </div>

      <p className="dashboard-para">List of all students in database</p>

      {studentData && (
        <div>
          <table style={{ borderRadius: "50px" }}>
            <thead
              style={{
                backgroundColor: "#F4F0FF",
                height: "41px",
              }}
              className="table-head"
            >
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Address</th>
                <th>Institute</th>
                <th>Course</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td style={{ borderLeft: "1px solid #EEEAF5" }}>
                    {student.Name}
                  </td>
                  <td>{student.Roll_No}</td>
                  <td>{student.Address}</td>
                  <td>{student.Institute}</td>
                  <td>{student.Course}</td>
                  <td style={{ borderRight: "1px solid #EEEAF5" }}>
                    {student.Email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
