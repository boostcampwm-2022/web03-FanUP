interface IAritst {
    artist_id: number;
    name: string;
    profile_url: string;
}

export interface CalendarData {
    calendarYear: number;
    calendarMonth: number;
}

export interface ArtistStore extends CalendarData {
    [key: string]: any;
    openSchduleModal: boolean;
    selectedDay: null | { year: number; month: number; day: number };
}
