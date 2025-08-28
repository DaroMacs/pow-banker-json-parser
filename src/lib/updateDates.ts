// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TestItem = Record<string, any>;

export function updateDates(data: TestItem[] | TestItem, date: string) {
  const arr = Array.isArray(data) ? data : [data];

  const updated = arr.map((item) => {
    if (item["Test Name"] === "global_settings") return item;
    return {
      ...item,
      "Start Date": date,
      "End Date": date,
      "Forward Date": date,
    };
  });

  return Array.isArray(data) ? updated : updated[0];
}
