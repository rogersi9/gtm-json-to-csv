/**
 * Many tags include an empty or minimal object for `monitoringMetadata`,
 * often { type: "MAP" } in standard GTM exports.
 */
export interface MonitoringMetadata {
    type?: string; // e.g. "MAP"
  }
  