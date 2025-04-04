"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Send the file to our API endpoint:
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error uploading file");
        }
        return res.json();
      })
      .then((data) => {
        alert("Upload successful. Check console for parsed data.");
        console.log("Parsed JSON data:", data);
      })
      .catch((err) => {
        console.error(err);
        alert("Upload failed");
      });
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload a GTM JSON Export</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Upload
        </button>
      </form>
    </main>
  );
}
