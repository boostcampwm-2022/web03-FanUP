export interface ArtistStore {
    [key: string]: any;
    calendarYear: number;
    calendarMonth: number;
    openSchduleModal: boolean;
    selectedDay: null | { year: number; month: number; day: number };
}
