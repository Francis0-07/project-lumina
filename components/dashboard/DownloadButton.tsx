'use client';

import { Download } from "lucide-react";

interface DownloadButtonProps {
  data: Record<string, string | number | boolean | null | undefined>[];
  filename?: string;
}

export function DownloadButton({ data, filename = "data.csv" }: DownloadButtonProps) {
  const handleDownload = () => {
    if (!data || !data.length) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
    >
      <Download className="h-4 w-4" />
      Download Report
    </button>
  );
}