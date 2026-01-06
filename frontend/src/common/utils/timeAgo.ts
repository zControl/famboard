/**
 * Format how long ago a date was in a human-readable format
 * @param {Date|string|null} dateInput - The date to compare against current date
 * @returns {string} - Human-readable time difference or empty string if date is invalid
 */
export function timeAgo(dateInput: Date | string | null | undefined): string {
  // Handle null/undefined dates
  if (!dateInput) {
    return "";
  }

  // Convert to Date object if it's a string
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  const today = new Date();

  // Reset time portion for accurate day comparison
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const timeDiff = todayWithoutTime.getTime() - dateWithoutTime.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysDiff === 0) {
    return "today";
  } else if (daysDiff === 1) {
    return "yesterday";
  } else if (daysDiff < 60) { // Less than 2 months
    return `${daysDiff} days ago`;
  } else {
    // Calculate months difference
    const monthsDiff = (today.getFullYear() - date.getFullYear()) * 12 +
      (today.getMonth() - date.getMonth());
    return `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} ago`;
  }
}