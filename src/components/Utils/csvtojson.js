import Papa from "papaparse";

// Helper function to convert CSV to JSON
export const convertCsvToJson = (csvData) => {
  const parsedData = Papa.parse(csvData, { header: true });
  const jsonData = parsedData.data;
  return jsonData;
};
