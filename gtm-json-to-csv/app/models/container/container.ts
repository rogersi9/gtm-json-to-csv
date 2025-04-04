import { Features } from "./features";

/**
 * Represents the nested `container` object.
 */
export interface Container {
  path: string;               // e.g., "accounts/82642503/containers/1255855"
  accountId: string;
  containerId: string;
  name: string;               // e.g., "www.hemaquebec.ca"
  publicId: string;           // e.g., "GTM-W3ZG7G"
  usageContext: string[];     // e.g., ["WEB"]
  fingerprint: string;        // e.g., "1727871650493"
  tagManagerUrl?: string;
  features?: Features;
  tagIds?: string[];
}
