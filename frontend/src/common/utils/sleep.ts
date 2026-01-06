/**
 * Asynchronously wait for a specified amount of time.
 *
 * @param ms The time to wait in milliseconds.
 * @example
 * await sleep(1000) // waits for 1 second
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}