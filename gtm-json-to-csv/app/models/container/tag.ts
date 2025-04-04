import { Parameter } from "./parameter";
import { MonitoringMetadata } from "./monitoringMetadata";
import { ConsentSettings } from "./consentSettings";

/**
 * Represents an object in the `tag` array.
 */
export interface Tag {
  accountId: string;
  containerId: string;
  tagId: string;
  name: string;
  type: string;                 // e.g., "html", "awct", "flc", etc.
  parameter?: Parameter[];
  fingerprint?: string;
  firingTriggerId?: string[];   // e.g., ["1", "17"]
  parentFolderId?: string;      // e.g., "115"
  tagFiringOption?: string;     // e.g., "ONCE_PER_EVENT"
  paused?: boolean;
  notes?: string;
  monitoringMetadata?: MonitoringMetadata;
  consentSettings?: ConsentSettings;
}
