import Papa from "papaparse";

// Helper function to convert JSON to CSV
export const convertJsonToCsv = (jsonData) => {
  const csvData = Papa.unparse(jsonData);
  return csvData;
};
