/**
 * Takes a full name and returns the first initial of each name.
 *
 * @param name The full name to get the first initial of.
 * @example
 * firstInitial("John Doe") // returns 'JD'
 * firstInitial("John Smith Doe") // returns 'JSD'
 */
export function firstInitial(name: string) {
  return (
    name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  );
  }
  