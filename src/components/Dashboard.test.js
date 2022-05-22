import { cleanup } from "@testing-library/react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { combineLatest, delay, first, firstValueFrom, lastValueFrom, merge, Observable, of, timer } from "rxjs";
import Dashboard from './Dashboard'
import sensorA from "./sensors/sensorA";
import sensorB from "./sensors/sensorB";
import sensorC from "./sensors/sensorC";
import sensorD from "./sensors/sensorD";

describe("Dashboard testing", () => {
    const observables = [sensorA.create(), sensorB.create(), sensorC.create(), sensorD.create()]
    const combined = combineLatest(observables)
    it('timer is working as expected', async () => {
        await expect(firstValueFrom(combined))
            .resolves.toBeTruthy();

        // All 4 sensors must emit at least one value
        await expect(firstValueFrom(combined))
            .resolves.toHaveLength(4)
    })

    it('timer and sensor testing after 1501 miliseconds', () => {
        jest.useFakeTimers()
        const nextFn = jest.fn()

        combined.subscribe({
            next: value => nextFn(value)
        })

        jest.advanceTimersByTime(1501);

        expect(nextFn).toHaveBeenCalledWith(
            expect.arrayContaining([
                {
                    name: expect.stringContaining("Sensor A"),
                    lastRunTime: expect.any(Number),
                    data: expect.any(String)
                },
                {
                    name: expect.stringContaining("Sensor B"),
                    lastRunTime: expect.any(Number),
                    data: expect.any(String)
                },
                {
                    name: expect.stringContaining("Sensor C"),
                    lastRunTime: expect.any(Number),
                    data: expect.any(String)
                },
                {
                    name: expect.stringContaining("Sensor D"),
                    lastRunTime: expect.any(Number),
                    data: expect.any(String)
                }])
        )
    })

    afterEach(cleanup);

    it('component testing', done => {
        jest.useFakeTimers()
        const wrapper = mount(<Dashboard />)
        let value = wrapper.find("p")
        expect(value).not.toBeUndefined()

        act(() => jest.advanceTimersByTime(1501))

        wrapper.update()

        const html = wrapper.find("div").text()
        expect(html).toContain("Sensor A")
        expect(html).toContain("Sensor B")
        expect(html).toContain("Sensor C")
        expect(html).toContain("Sensor D")

        expect(html).toEqual(wrapper.find("div").text())

        act(() => jest.advanceTimersByTime(1501))
        wrapper.update()
        
        const html2 = wrapper.find("div").text()
        expect(html).not.toEqual(html2)
        done()
    })

})


