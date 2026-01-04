'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsInfo: string;
}

export function PaginationControls({ currentPage, totalPages, onPageChange, itemsInfo }: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        {itemsInfo}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}