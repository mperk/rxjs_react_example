import React, { useLayoutEffect, useRef, useState } from 'react'
import { combineLatest, delay, map, Observable, of, startWith, takeWhile, tap, timer } from 'rxjs'

 const DashboardOld = () => {
    const [value, setValue] = useState({});
    const timerALastRunRef = useRef(new Date());
    const viewRenderTime = useRef(new Date());

    useLayoutEffect(() => {
        const timerA = timer(200, 1400)
        const timerB = timer(200, 300)
        const timerC = timer(200, 1000)
        const timerD = timer(200, 200)

        const observables = {
            A: timerA.pipe(map(i => {
                let now = new Date()
                let timeDiff = now.getTime() - timerALastRunRef.current.getTime()
                timerALastRunRef.current = now
                if (timeDiff > 1300)
                    return 'no data'
                else
                    return Math.random().toString(36).slice(-8)
            })),
            B: timerB.pipe(map(i => Math.random().toString(36).slice(-8))),
            C: timerC.pipe(map(i => Math.random().toString(36).slice(-8))),
            D: timerD.pipe(map(i => Math.random().toString(36).slice(-8)))
        }
        const combined = combineLatest(observables)
        let subscribe = combined.subscribe(v => {
            let now = new Date()
            let timeDiff = now.getTime() - viewRenderTime.current.getTime()
            console.log(timeDiff)
            if (timeDiff > 200) {
                viewRenderTime.current = now
                setValue(v)
            }
        })
        return () => subscribe.unsubscribe()
    }, [])

    return (
        <div>
            <b>Welcome to the Dashboard!</b>
            <p>
                Sensor A : {value.A}
            </p>
            <p>
                Sensor B : {value.B}
            </p>
            <p>
                Sensor C : {value.C}
            </p>
            <p>
                Sensor D : {value.D}
            </p>
        </div>
    )
}

export default DashboardOld