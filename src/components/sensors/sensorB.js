import { map, timer } from 'rxjs'
import { getRandomInt } from '../../utils'
const name = "Sensor B"
const sensorB = {
    create: () => {
        let intervalDuration = getRandomInt(200, 1500)
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

export default sensorB
