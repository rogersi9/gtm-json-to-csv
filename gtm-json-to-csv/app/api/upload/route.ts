// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { setGtmData } from "../upload-data/route";
import { GtmContainerExport } from "@/models/container/gtmContainerExport";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const text = await file.text();
    const parsed = JSON.parse(text) as GtmContainerExport;

    // Save in memory (for example). 
    // In real usage, store in DB or some persistent store.
    setGtmData(parsed);

    return NextResponse.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
