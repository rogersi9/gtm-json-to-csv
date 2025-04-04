/**
 * Represents the `features` object inside the `container`.
 * Typically a series of boolean flags for GTM container capabilities.
 */
export interface Features {
    supportUserPermissions: boolean;
    supportEnvironments: boolean;
    supportWorkspaces: boolean;
    supportGtagConfigs: boolean;
    supportBuiltInVariables: boolean;
    supportClients: boolean;
    supportFolders: boolean;
    supportTags: boolean;
    supportTemplates: boolean;
    supportTriggers: boolean;
    supportVariables: boolean;
    supportVersions: boolean;
    supportZones: boolean;
    supportTransformations: boolean;
  }
  