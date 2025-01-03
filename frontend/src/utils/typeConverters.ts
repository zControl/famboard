export function enumToArray<T extends { [key: string]: string }>(
  enumObject: T,
): { value: string; label: string }[] {
  return Object.keys(enumObject)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: enumObject[key] as string,
      label: key.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to Title Case
    }));
}