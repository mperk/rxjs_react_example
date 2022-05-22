import { combineLatest, Observable, Subject } from 'rxjs'

const subject = new Subject()

const initialState = {
    data: [],
    lastRunTime: new Date(),
    error: ''
}
let state = initialState
const sensorStore = {
    init: () => {
        state = { ...state }
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    sendData: data => {
        state = {
            ...state,
            data: [...state.data, data.data]
        }
        subject.next(state)
    },
    getObservable: () => subject.asObservable(),
    // createTimer: () => {
    //     return subject.timer(200, 1000)
    //     // return timer(200, 1000).pipe(map(i => Math.random().toString(36).slice(-8)))
    // },
    // combineLatest: (observables) => {
    //     return combineLatest(observables)
    // },

    initialState
}
export default sensorStore