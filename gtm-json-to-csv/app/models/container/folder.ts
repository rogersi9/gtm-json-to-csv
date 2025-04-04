/**
 * Folders can group tags, triggers, variables, etc.
 * Not always present in every export, but included in GTM containers.
 */
export interface Folder {
    accountId: string;
    containerId: string;
    folderId: string;
    name: string;
    fingerprint?: string;
  }
  