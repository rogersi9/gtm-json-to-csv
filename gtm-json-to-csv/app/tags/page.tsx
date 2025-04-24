// app/tags/page.tsx
import { Metadata } from "next"
import type { GtmContainerExport } from "@/models/container/gtmContainerExport"
import { TagsTable } from "@/components/tags-table/TagsTable"
import { getTagTypeName } from "@/lib/getTagTypeName"

export const metadata: Metadata = { title: "GTM Tags & Triggers" }

export default async function TagsPage() {
  /* 1. fetch JSON saved by your /api/upload route */
  const res = await fetch("http://localhost:3000/api/upload-data", {
    cache: "no-store",
  })
  if (!res.ok)
    return (
      <main className="p-4">
        <h1 className="font-bold text-xl">Error</h1>
        <p>Failed to load GTM data.</p>
      </main>
    )

  const { data } = (await res.json()) as { data: GtmContainerExport }

  /* 2. normalise into {id,name,type,triggers[]} rows */
  const tags = data?.containerVersion?.tag ?? []
  const triggers = data?.containerVersion?.trigger ?? []
  const triggerMap = new Map(triggers.map((t) => [t.triggerId, t.name]))

  const rows = tags.map((t) => ({
    id: t.tagId,
    name: t.name,
    type: getTagTypeName(t.type),
    triggers:
      t.firingTriggerId?.map((id) => triggerMap.get(id) ?? `Trigger #${id}`) ||
      [],
  }))

  /* 3. render the client table */
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tags &amp; Triggers</h1>
      <TagsTable data={rows} />
    </main>
  )
}
