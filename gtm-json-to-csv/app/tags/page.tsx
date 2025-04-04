// app/tags/page.tsx
import { Metadata } from "next";
import type { GtmContainerExport } from "@/models/container/gtmContainerExport";

// Import the function
import { getTagTypeName } from "@/lib/getTagTypeName";

export const metadata: Metadata = {
  title: "GTM Tags and Triggers",
};

export default async function TagsPage() {
  const res = await fetch("http://localhost:3000/api/upload-data", {
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

  const json = await res.json();
  const data = json.data as GtmContainerExport;

  const tags = data?.containerVersion?.tag ?? [];
  const triggers = data?.containerVersion?.trigger ?? [];

  // Build a triggerId -> name map
  const triggerMap = new Map(triggers.map((t) => [t.triggerId, t.name]));

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
              <th className="text-left p-2 border">Tag Type</th>
              <th className="text-left p-2 border">Firing Triggers</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => {
              const firingTriggerIds = tag.firingTriggerId ?? [];
              const associatedTriggers = firingTriggerIds.map(
                (id) => triggerMap.get(id) || `Trigger #${id}`
              );

              return (
                <tr key={tag.tagId} className="border-b">
                  <td className="p-2 border">{tag.name}</td>
                  {/* Use the utility function here */}
                  <td className="p-2 border">{getTagTypeName(tag.type)}</td>
                  <td className="p-2 border">
                    {associatedTriggers.length > 0 ? (
                      <ul>
                        {associatedTriggers.map((triggerName) => (
                          <li key={triggerName}>{triggerName}</li>
                        ))}
                      </ul>
                    ) : (
                      "No triggers"
                    )}
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
