import { TimestampResult } from "../types/TaskTypes";


export function convertTimestamp(isoTimestamp: string): TimestampResult {
    const dt = new Date(isoTimestamp);
    
    const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const dateOptions: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };

    return {
        day: dt.toLocaleDateString('en-US', dayOptions),
        date: dt.toLocaleDateString('en-US', dateOptions),
        time: dt.toLocaleTimeString('en-US', timeOptions),
        timezone: 'UTC'
    };
}