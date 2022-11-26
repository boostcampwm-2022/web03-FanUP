import reducer, {
    initialState,
    setYear,
    setMonth,
    openScheduleModal,
    closeScheduleModal,
    initializeSelectedDay,
    setSelectedDay,
} from '@/store/artist';

describe('artistSlice', () => {
    it('setYear', async () => {
        const state = reducer(initialState, setYear(1));
        expect(state.calendarYear).toBe(1);
    });
    it('setMonth', () => {
        const state = reducer(initialState, setMonth(1));
        expect(state.calendarMonth).toBe(1);
    });
    it('openScheduleModal', () => {
        const state = reducer(initialState, openScheduleModal());
        expect(state.openSchduleModal).toBe(true);
    });
    it('closeScheduleModal', () => {
        const state = reducer(initialState, closeScheduleModal());
        expect(state.openSchduleModal).toBe(false);
    });
    it('initializeSelectedDay', () => {
        const state = reducer(initialState, initializeSelectedDay());
        expect(state.selectedDay).toBe(null);
    });
    it('setSelectedDay', () => {
        const state = reducer(initialState, setSelectedDay({ year: 1, month: 1, day: 1 }));
        expect(state.selectedDay).toStrictEqual({ year: 1, month: 1, day: 1 });
    });
});
