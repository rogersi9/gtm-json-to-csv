import { Parameter } from "./parameter";

/**
 * Represents an object in the `variable` array.
 */
export interface Variable {
  accountId: string;
  containerId: string;
  variableId: string;
  name?: string;
  type: string;           // e.g. "template", "list", "cjs"
  parameter?: Parameter[];
  notes?: string;
  fingerprint?: string;
  parentFolderId?: string;

  // Some variables can define additional triggers, sub-variables, etc.
  disablingTriggerId?: string[];
  enablingTriggerId?: string[];
  subVariable?: Variable[];
}
