/**
 * Represents the `parameter` objects used across tags/triggers/variables.
 * Note that GTM parameters can be nested (lists or maps).
 */
export interface Parameter {
    type: string;     // e.g., "TEMPLATE", "BOOLEAN", "LIST", "MAP", etc.
    key?: string;     // e.g., "html", "supportDocumentWrite", "conversionId", etc.
    value?: string;   // The string value, if applicable
    list?: Parameter[]; // For type === "LIST"
    map?: Parameter[];  // For type === "MAP"
  }
  