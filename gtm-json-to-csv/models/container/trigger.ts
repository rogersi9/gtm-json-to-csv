import { Parameter } from "./parameter";

/**
 * Represents an object in the `trigger` array.
 * Triggers often have condition sets like filter, customEventFilter, etc.
 */
export interface Trigger {
  accountId: string;
  containerId: string;
  triggerId: string;
  name: string;
  type: string;          // e.g. "LINK_CLICK", "CUSTOM_EVENT", etc.
  filter?: Condition[];  // see below
  customEventFilter?: Condition[];
  autoEventFilter?: Condition[];
  // Some triggers specify these dynamic fields:
  waitForTags?: Parameter;
  checkValidation?: Parameter;
  waitForTagsTimeout?: Parameter;
  uniqueTriggerId?: Parameter;

  fingerprint?: string;
  parentFolderId?: string;
}

/**
 * A basic GTM filter object, specifying the match type and parameter array.
 */
export interface Condition {
  type: string;           // e.g. "CONTAINS", "MATCH_REGEX", "EQUALS", etc.
  parameter?: Parameter[]; // parameters that define the condition
}
