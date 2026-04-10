"use client";

import { useState } from "react";

export function FileScanner() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file); // 'file' matches the name in your NestJS @UseInterceptors

    try {
      const response = await fetch("http://localhost:3000/raca/scan", {
        method: "POST",
        // Note: Don't set Content-Type header; the browser does it automatically for FormData
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to scan file");

      const data = await response.json();
      
      // Update state with the suggested items from your NestJS backend
      setSuggestions(data.suggestedItems);
      console.log("Detected Items:", data.suggestedItems);
    } catch (error) {
      console.error("Error scanning file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-lg">
      <h3 className="text-lg font-bold mb-2">Upload Event Proposal (PDF)</h3>
      <p className="text-sm text-gray-500 mb-4">The system will automatically detect items you need.</p>
      
      <input 
        type="file" 
        accept=".pdf,.txt" 
        onChange={handleFileUpload}
        disabled={loading}
      />

      {loading && <p className="mt-2 text-blue-500 italic">Scanning document for items...</p>}

      {suggestions.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Suggested Items Found:</p>
          <ul className="list-disc ml-5">
            {suggestions.map((item: any) => (
              <li key={item.id}>{item.name} (Available: {item.quantity})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}