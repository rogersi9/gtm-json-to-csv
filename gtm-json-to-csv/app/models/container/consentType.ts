import { Parameter } from "./parameter";

/**
 * Typically, "consentType": {
 *   "type": "LIST",
 *   "list": [{ type: "TEMPLATE", value: "ad_storage" }]
 * }
 */
export interface ConsentType {
    type?: string;      // e.g., "LIST"
    list?: Parameter[]; // The array of param objects
  }
  