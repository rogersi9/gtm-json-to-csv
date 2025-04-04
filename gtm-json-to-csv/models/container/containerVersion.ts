import { Trigger } from "./trigger";
import { Variable } from "./variable";
import { Folder } from "./folder";
import { BuiltInVariable } from "./builtInVariable";
import { Container } from "./container";
import { Tag } from "./tag";

/**
 * Represents the `containerVersion` object within the exported JSON.
 */
export interface ContainerVersion {
  path: string;               // e.g., "accounts/82642503/containers/1255855/versions/0"
  accountId: string;          // e.g., "82642503"
  containerId: string;        // e.g., "1255855"
  containerVersionId: string; // e.g., "0"
  container: Container;
  tag?: Tag[];                // Optional array of tags
  trigger?: Trigger[];        // Optional array of triggers
  variable?: Variable[];      // Optional array of variables
  folder?: Folder[];          // Optional array of folders
  builtInVariable?: BuiltInVariable[]; // Optional array of built-in variables
}
