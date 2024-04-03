input.onButtonPressed(Button.A, function () {
    vysielaj = true
})
input.onButtonPressed(Button.B, function () {
    vysielaj = false
})
function windDirection (smer_vetra: string) {
    if (smer_vetra == "N") {
        return 0
    } else if (smer_vetra == "NE") {
        return 1
    } else if (smer_vetra == "E") {
        return 2
    } else if (smer_vetra == "SE") {
        return 3
    } else if (smer_vetra == "S") {
        return 4
    } else if (smer_vetra == "SW") {
        return 5
    } else if (smer_vetra == "W") {
        return 6
    } else {
        return 7
    }
}
function radioAnimation () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . #
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . # #
        . . . # #
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # # #
        . . # # .
        . . # . #
        `)
    basic.showLeds(`
        . . . . .
        . # # # #
        . # # . .
        . # . # .
        . # . . #
        `)
    basic.showLeds(`
        # # # # .
        # # . . .
        # . # . .
        # . . # .
        . . . . #
        `)
    basic.showLeds(`
        # . . . .
        . # . . .
        . . # . .
        . . . # .
        . . . . .
        `)
    basic.showLeds(`
        # . . . .
        . # . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        # . . . .
        . # . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        # . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
let vysielaj = false
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    # # # # #
    `)
radio.setGroup(23)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # # # # #
    # # # # #
    `)
weatherbit.startRainMonitoring()
basic.showLeds(`
    . . . . .
    . . . . .
    # # # # #
    # # # # #
    # # # # #
    `)
weatherbit.startWindMonitoring()
basic.showLeds(`
    . . . . .
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
vysielaj = false
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(function () {
    if (vysielaj) {
        weatherbit.startWeatherMonitoring()
        radio.sendValue("tmp", Math.idiv(weatherbit.temperature(), 100))
        radio.sendValue("pressure", Math.idiv(weatherbit.pressure(), 25600))
        radio.sendValue("humidity", Math.idiv(weatherbit.humidity(), 1024))
        radio.sendValue("rain", weatherbit.rain() * 25.4)
        radio.sendValue("wind", weatherbit.windSpeed() * 1.609344)
        radio.sendValue("name", windDirection(weatherbit.windDirection()))
        radio.sendValue("soil_mst", Math.round(Math.map(weatherbit.soilMoisture(), 0, 1023, 0, 100)))
        radio.sendValue("soil_tmp", Math.idiv(weatherbit.soilTemperature(), 100))
        radioAnimation()
        basic.pause(300000)
    }
})
basic.forever(function () {
    if (vysielaj) {
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(200)
    } else {
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(200)
    }
})
