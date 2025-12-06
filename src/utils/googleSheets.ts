import { GiftSuggestion } from "../types";

const SPREADSHEET_ID = "1mCsBWYX3pDcCxBiHGf3L_FNtzQbXEDqBKUjb3cwhI3w";
const SHEET_NAME = "secretsanta";
const RANGE = "A2:E20";
const API_KEY = "AIzaSyAN665U7JHjtJnBEVnvTsMZpBsbu60dsgE";

interface GoogleSheetsResponse {
  values?: string[][];
}

export async function fetchGiftSuggestions(): Promise<GiftSuggestion[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch gift suggestions: ${response.statusText}`);
  }

  const data: GoogleSheetsResponse = await response.json();

  if (!data.values || data.values.length === 0) {
    return [];
  }

  // Map the rows to GiftSuggestion objects
  // Columns: A=Timestamp, B=Person, C=Gift, D=Details, E=Link
  const suggestions: GiftSuggestion[] = data.values
    .filter((row) => {
      // Filter out empty rows (at least person and gift should be present)
      return row.length >= 3 && row[1]?.trim() && row[2]?.trim();
    })
    .map((row) => ({
      timestamp: row[0] || "",
      person: row[1] || "",
      gift: row[2] || "",
      details: row[3] || "",
      link: row[4]?.trim() || undefined,
    }));

  return suggestions;
}
