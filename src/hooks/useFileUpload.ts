import { useRef, useState } from "react";

interface UseFileUploadReturn {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string;
  originalText: string;
  handlePickFile: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  setOriginalText: (text: string) => void;
  resetFile: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [originalText, setOriginalText] = useState("");

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setOriginalText(JSON.stringify(parsed, null, 2));
    } catch (err) {
      console.error(err);
      alert("❌ Invalid JSON file.");
      setFileName("");
      setOriginalText("");
    }
  };

  const resetFile = () => {
    setFileName("");
    setOriginalText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    fileInputRef,
    fileName,
    originalText,
    handlePickFile,
    handleFileChange,
    setOriginalText,
    resetFile,
  };
}
