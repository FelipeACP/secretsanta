export interface Rule {
  type: "must" | "mustNot";
  targetParticipantId: string;
}

export interface Participant {
  id: string;
  name: string;
  hint?: string;
  rules: Rule[];
}

export type Participants = Record<string, Participant>;

// New type for encrypted data
export interface ReceiverData {
  name: string;
  hint?: string;
}

// Gift suggestion data from Google Sheets
export interface GiftSuggestion {
  timestamp: string;
  person: string;
  gift: string;
  details: string;
  link?: string;
}
