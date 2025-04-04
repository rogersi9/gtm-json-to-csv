/**
 * Some GTM containers define built-in variables via `builtInVariable` array.
 */
export interface BuiltInVariable {
    accountId: string;
    containerId: string;
    type: string; // e.g. "PAGE_URL", "CLICK_URL", etc.
    // Possibly more properties depending on how built-ins are stored
    fingerprint?: string;
  }
  