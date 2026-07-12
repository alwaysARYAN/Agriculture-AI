// backend/utils/sheetParser.js
const csv = require('csvtojson');

/**
 * Global Sheet Stream Parser Utility
 */
const parseSheetFromUrl = async (url) => {
  try {
    if (!url) {
      throw new Error("Target Sheet URL configuration reference is missing from environment variables!");
    }
    
    // Native fetch se Google Cloud servers se raw string payload pull karenge
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch secure spreadsheet stream. Status: ${response.status}`);
    }
    
    const csvDataString = await response.text();
    
    // csvtojson to parse external sheet URLs into our project structures
    const jsonArray = await csv().fromString(csvDataString);
    return jsonArray;
  } catch (error) {
    console.error(`🔴 Sheet Ingestion Engine Engine Failure: ${error.message}`);
    throw error;
  }
};

module.exports = { parseSheetFromUrl };