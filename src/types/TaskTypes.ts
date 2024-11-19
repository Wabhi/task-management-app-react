export interface TaskTypes {
  id: number; 
  title: string; 
  description: string; 
  status: "todo" | "inprogress" | "pending" | "complete"; 
  date: string; 
}

export interface TimestampResult {
  day: string;
  date: string;
  time: string;
  timezone: string;
}