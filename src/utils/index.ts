export function convertToTimeZone(utcOffsetSeconds: number) {
  // Use the current date and time as the source date
  const date = new Date();

  // Calculate the offset in hours and minutes
  const offsetHours = Math.floor(utcOffsetSeconds / 3600);
  const offsetMinutes = Math.abs((utcOffsetSeconds % 3600) / 60);

  // Format the offset as a string
  const offsetSign = offsetHours >= 0 ? "+" : "-";
  const formattedOffset = `UTC${offsetSign}${Math.abs(offsetHours)}:${
    offsetMinutes < 10 ? "0" : ""
  }${offsetMinutes}`;

  // Calculate the local date and time by adding the offset to the original date
  const localDate = new Date(date.getTime() + utcOffsetSeconds * 1000);

  // Format the local date and time
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedLocalDate = formatter.format(localDate);

  return {
    localDate: formattedLocalDate,
    timeZone: formattedOffset,
  };
}


export function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  return `${formattedHours}:${minutes} ${ampm}`;
}

export function getCurrentDate(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

export function convertUnixTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  return `${formattedHours}:${minutes} ${ampm}`;
}
