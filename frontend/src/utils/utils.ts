export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

export function firstInitial(name: string) {
  return (
    name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  );
}
  