/**
 * Generates a Google Calendar link for a given event.
 */
export function generateGoogleCalendarLink(title: string, description: string, date: string) {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  
  // Convert date to YYYYMMDD format for Google Calendar (assuming all-day event for simplicity)
  // For a real app, we'd handle specific times and timezones
  const formattedDate = date.replace(/-/g, '');
  const dates = `${formattedDate}/${formattedDate}`;
  
  const params = new URLSearchParams({
    text: title,
    details: description,
    dates: dates,
  });

  return `${baseUrl}&${params.toString()}`;
}
