import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { combineLatest, map, timer } from 'rxjs'
import sensorA from './sensors/sensorA'
import sensorB from './sensors/sensorB'
import sensorC from './sensors/sensorC'
import sensorD from './sensors/sensorD'

const Dashboard = () => {
    const valueRef = useRef();
    const [viewModel, setViewModel] = useState([])

    useLayoutEffect(() => {
        const observables = [sensorA.create(), sensorB.create(), sensorC.create(), sensorD.create()]
        const combined = combineLatest(observables)
        let subscribe = combined.pipe(
            map(vArray =>
                // ‘no data’ filter
                vArray.filter(v => {
                    let timeDiff = new Date().getTime() - v.lastRunTime
                    if (timeDiff > 1300) v.data = 'no data'
                    return true
                })
            ),
            map(v => valueRef.current = v)
        ).subscribe()
        return () => subscribe.unsubscribe()
    }, [])

    useEffect(() => {
        // view model refresh min 200 ms
        let subscribeId = timer(0, 200).pipe(map(i => {
            setViewModel(valueRef.current)
        })).subscribe()

        return () => subscribeId.unsubscribe()
    }, [])

    return (
        <div>
            <b>Welcome to the Dashboard!</b>
            {viewModel && viewModel.map(sensor =>
                <p key={sensor.name}> {sensor.name}: {sensor.data} </p>
            )}
        </div>
    )
}

export default Dashboard