import { Subject } from 'rxjs'

const subject = new Subject()

export const sensorService = {
    sendData: () => {
        let randomData = Math.random().toString(36).slice(-8)
        return subject.next({ data: timer(200, 1400).pipe(map(randomData)) })
    },
    clearDatas: () => subject.next(),
    getData: () => subject.asObservable(),
    init: () => {
        state = { ...state }
        subject.next(state)
    },
}