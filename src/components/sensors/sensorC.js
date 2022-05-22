import { map, timer } from 'rxjs'
import { getRandomInt } from '../../utils'
const name = "Sensor C"
const sensorC = {
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

export default sensorC
