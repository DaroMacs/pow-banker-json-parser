import { useState } from "react";
import { updateDates } from "@/lib/updateDates";

interface UseJsonPreviewReturn {
  previewText: string;
  date: string;
  setDate: (date: string) => void;
  handlePreview: (originalText: string) => void;
  resetPreview: () => void;
  isReadyToPreview: (originalText: string) => boolean;
}

export function useJsonPreview(): UseJsonPreviewReturn {
  const [previewText, setPreviewText] = useState("");
  const [date, setDate] = useState("");

  const handlePreview = (originalText: string) => {
    try {
      if (!originalText.trim()) return;
      const parsed = JSON.parse(originalText);
      const updated = updateDates(parsed, date);
      setPreviewText(JSON.stringify(updated, null, 2));
    } catch (err) {
      console.error(err);
      alert("❌ The left JSON is invalid. Please fix it and try again.");
    }
  };

  const resetPreview = () => {
    setPreviewText("");
    setDate("");
  };

  const isReadyToPreview = (originalText: string) => {
    return date !== "" && originalText.trim() !== "";
  };

  return {
    previewText,
    date,
    setDate,
    handlePreview,
    resetPreview,
    isReadyToPreview,
  };
}
