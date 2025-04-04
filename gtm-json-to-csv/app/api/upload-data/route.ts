import { NextRequest, NextResponse } from "next/server";
import type { GtmContainerExport } from "@/models/container/gtmContainerExport";

//  -- This is just a stand-in for a "shared" data store.
//  -- For a real app, you'd read from a DB or keep it in memory in your server runtime.
let gtmData: GtmContainerExport | null = null;

// Example setter you’d call after the user uploads a file
export function setGtmData(data: GtmContainerExport) {
  gtmData = data;
}

export async function GET(_req: NextRequest) {
  if (!gtmData) {
    return NextResponse.json({ error: "No GTM data available yet" }, { status: 404 });
  }

  return NextResponse.json({ data: gtmData });
}
