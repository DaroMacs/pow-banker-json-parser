export function downloadJsonFile(content: string, fileName: string): void {
  if (!content) return;

  const blob = new Blob([content], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const base = fileName?.replace(/\.json$/i, "") || "updated";
  a.href = url;
  a.download = `${base}.updated.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
