import { map, timer } from 'rxjs'
import { getRandomInt } from '../../utils'
const name = "Sensor A"
const sensorA = {
    create: () => {
        let intervalDuration = getRandomInt(200, 1500)
        // console.log("A :" + intervalDuration)
        return timer(0, intervalDuration)
            .pipe(
                map(i => ({
                    name: name,
                    data: Math.random().toString(36).slice(-8),
                    lastRunTime: new Date() - intervalDuration
                }))
            )
    }
}

export default sensorA