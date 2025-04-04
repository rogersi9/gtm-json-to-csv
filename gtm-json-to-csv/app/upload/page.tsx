"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        // e.g. 400 or 500 error from the server
        const errorData = await res.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const json = await res.json();
      console.log("Parsed data from server:", json.data);
      alert("Upload successful!");
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload a GTM JSON Export</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white ml-4">
          Upload
        </button>
      </form>
    </main>
  );
}
