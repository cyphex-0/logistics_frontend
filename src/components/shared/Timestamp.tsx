import { format, formatDistanceToNow } from "date-fns";
import { DATE_FORMATS } from "@/lib/constants";

interface TimestampProps {
  date: string | Date;
  relative?: boolean;
  showTime?: boolean;
  className?: string;
}

export function Timestamp({ date, relative = false, showTime = false, className }: TimestampProps) {
  if (!date) return null;

  let content = "Invalid date";
  let title = "";

  try {
    const dateObj = new Date(date);
    
    // Fallback if invalid date
    if (!isNaN(dateObj.getTime())) {
      title = format(dateObj, DATE_FORMATS.DISPLAY_DATETIME);
      if (relative) {
        content = formatDistanceToNow(dateObj, { addSuffix: true });
      } else {
        const formatString = showTime ? DATE_FORMATS.DISPLAY_DATETIME : DATE_FORMATS.DISPLAY_DATE;
        content = format(dateObj, formatString);
      }
    }
  } catch {
    // Keep "Invalid date"
  }

  return (
    <span className={className} title={title || undefined}>
      {content}
    </span>
  );
}
