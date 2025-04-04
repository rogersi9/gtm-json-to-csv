import { ContainerVersion } from "./containerVersion";



/**
 * Top-level structure for the full GTM container export JSON.
 */
export interface GtmContainerExport {
  exportFormatVersion: number;    // e.g., 2
  exportTime: string;             // e.g., "2025-04-04 17:35:54"
  containerVersion: ContainerVersion;
}
