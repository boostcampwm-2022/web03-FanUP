interface IAritst {
    id: number;
    name: string;
    profileUrl: string;
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
