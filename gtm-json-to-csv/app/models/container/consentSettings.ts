import { ConsentType } from "./consentType";

/**
 * Some tags have consent requirements, e.g. "consentStatus": "NEEDED"
 */
export interface ConsentSettings {
  consentStatus?: "NEEDED" | "NOT_NEEDED" | "NOT_SET";
  consentType?: ConsentType;
}
