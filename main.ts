input.onButtonPressed(Button.A, function () {
    vysielaj = true
})
function smerVetra (text: string) {
    if (text == "N") {
        return 0
    } else if (text == "NE") {
        return 1
    } else if (text == "E") {
        return 2
    } else if (text == "SE") {
        return 3
    } else if (text == "S") {
        return 4
    } else if (text == "SW") {
        return 5
    } else if (text == "W") {
        return 6
    } else {
        return 7
    }
}
input.onButtonPressed(Button.B, function () {
    vysielaj = false
})
let vysielaj = false
radio.setGroup(23)
weatherbit.startWeatherMonitoring()
weatherbit.startRainMonitoring()
weatherbit.startWindMonitoring()
vysielaj = false
basic.forever(function () {
    if (vysielaj) {
        radio.sendValue("tmp", Math.idiv(weatherbit.temperature(), 100))
        radio.sendValue("pressure", Math.idiv(weatherbit.pressure(), 25600))
        radio.sendValue("humidity", Math.idiv(weatherbit.humidity(), 1024))
        radio.sendValue("rain", Math.round(weatherbit.rain() * 25.4))
        radio.sendValue("wind", Math.round(weatherbit.windSpeed() * 1.609344))
        radio.sendValue("wind_dir", smerVetra(weatherbit.windDirection()))
        radio.sendValue("soil_mst", Math.round(Math.map(weatherbit.soilMoisture(), 0, 1023, 0, 100)))
        radio.sendValue("soil_tmp", Math.idiv(weatherbit.soilTemperature(), 100))
        basic.pause(3600000)
    }
})
basic.forever(function () {
    if (vysielaj) {
        basic.showIcon(IconNames.Yes)
        basic.pause(100)
    } else {
        basic.showIcon(IconNames.No)
        basic.pause(100)
    }
    basic.clearScreen()
    basic.pause(2000)
})
