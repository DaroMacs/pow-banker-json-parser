"use client";

import { useFileUpload, useJsonPreview } from "@/hooks";
import { downloadJsonFile } from "@/utils/fileUtils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const {
    fileInputRef,
    fileName,
    originalText,
    handlePickFile,
    handleFileChange,
    setOriginalText,
    resetFile,
  } = useFileUpload();

  const {
    previewText,
    date,
    setDate,
    handlePreview,
    resetPreview,
    isReadyToPreview,
  } = useJsonPreview();

  const handleReset = () => {
    resetFile();
    resetPreview();
  };

  const handleDownload = () => {
    downloadJsonFile(previewText, fileName);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const readyToPreview = isReadyToPreview(originalText);

  return (
    // Lock the whole page to the viewport height and prevent page scroll
    <main className="h-dvh max-h-dvh overflow-hidden">
      <div className="flex h-full flex-col p-6">
        {/* Header */}
        <header className="flex-shrink-0">
          <h1 className="text-2xl font-bold">JSON Date Updater</h1>
          <p className="text-sm text-muted-foreground">
            {fileName ? (
              <>
                Loaded file: <span className="font-medium">{fileName}</span>
              </>
            ) : (
              <>Upload a JSON file to start.</>
            )}
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col gap-3 flex-shrink-0 mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Buttons row */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handlePickFile}>Upload JSON</Button>
            <Button
              variant="secondary"
              onClick={() => handlePreview(originalText)}
              disabled={!readyToPreview}
            >
              Preview changes
            </Button>
            <Button onClick={handleDownload} disabled={!previewText}>
              Download updated JSON
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
              disabled={!fileName}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-0"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Reset
            </Button>
          </div>

          {/* Date input row - aligned to the left */}
          <div
            className={`flex gap-3 items-center bg-muted/50 px-3 h-10 rounded-md border w-fit ${
              !fileName && "pointer-events-none opacity-50"
            }`}
          >
            <label className="text-sm font-medium text-foreground">
              End Date:
            </label>
            <input
              disabled={!fileName}
              type="date"
              name="endDate"
              value={date}
              onChange={handleDateChange}
              className="px-2 py-1 text-sm border border-input bg-background rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
            />
          </div>
        </div>

        {/* Content: two columns, both scroll internally; page never grows */}
        <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 mt-4">
          {/* Left column: Original JSON */}
          <div
            className="
              flex flex-col min-h-0 overflow-hidden
              rounded-lg border p-3
            "
          >
            <label className="mb-2 block font-medium flex-shrink-0">
              Original JSON
            </label>
            <Textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Upload a JSON file or paste JSON here..."
              className="
                flex-1 min-h-0 resize-none
              "
            />
          </div>

          {/* Right column: Preview (only after clicking Preview) */}
          <div
            className="
              flex flex-col min-h-0 overflow-hidden
              rounded-lg border p-3
            "
          >
            <label className="mb-2 block font-medium flex-shrink-0">
              Preview (updated JSON)
            </label>
            <Textarea
              value={previewText}
              readOnly
              placeholder="Click 'Preview changes' to see the result..."
              className="
                flex-1 min-h-0 resize-none
              "
            />
          </div>
        </section>
      </div>
    </main>
  );
}
