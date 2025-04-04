// app/tags/page.tsx
import { Metadata } from "next";
import type { GtmContainerExport } from "@/models/container/gtmContainerExport";

// Optional: set <head> metadata
export const metadata: Metadata = {
  title: "GTM Tags and Triggers",
};

export default async function TagsPage() {
  // 1. Fetch the GTM data from our custom endpoint
  const res = await fetch("http://localhost:3000/api/upload-data", {
    // Force dynamic fetching so we always get the latest data
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="p-4">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p>Failed to load GTM data from server.</p>
      </main>
    );
  }

  // 2. Parse the JSON and get the container data
  const json = await res.json();
  const data = json.data as GtmContainerExport; // cast to our model

  const tags = data?.containerVersion?.tag ?? [];
  const triggers = data?.containerVersion?.trigger ?? [];

  // 3. Create a map (triggerId -> triggerName) for easy lookup
  const triggerMap = new Map(
    triggers.map((trigger) => [trigger.triggerId, trigger.name])
  );

  // 4. Render a table with all tags and their associated triggers
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">All Tags and Their Triggers</h1>
      {tags.length === 0 ? (
        <p>No tags found in this GTM container.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-2 border">Tag Name</th>
              <th className="text-left p-2 border">Firing Triggers</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => {
              const firingTriggerIds = tag.firingTriggerId ?? [];
              // For each ID, look up the trigger name from triggerMap
              const associatedTriggers = firingTriggerIds.map((id) => triggerMap.get(id) || `Trigger #${id}`);

              return (
                <tr key={tag.tagId} className="border-b">
                  <td className="p-2 border">{tag.name}</td>
                  <td className="p-2 border">
                    {associatedTriggers.length > 0
                      ? associatedTriggers.join(", ")
                      : "No triggers"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
