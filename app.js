let grid = document.querySelector('.grid')

// Grid rendering
function gridRender() {
    for (let i = 0; i < 100; i++) {
        grid.innerHTML += `<div id="${i}" class="square"></div>`
    }
}
gridRender()

// Creation of a bombs array
let bombArray = []

function randomBombId(index) {
    while (bombArray.length < 10) {
        let bomb = Math.floor(Math.random() * 100) + 1
        if (bombArray.indexOf(bomb) === -1) bombArray.push(bomb)
    }
    return bombArray[index]
}

// Setting bombs inside the grid
let squares = document.querySelectorAll('.square')

function setBomb() {
    for (let i = 0; i < 10; i++) {
        squares.forEach((square) => {
            if (square.id == randomBombId(i)) {
                square.innerHTML = `<i class="fa-solid fa-bomb bomb">`
            }
        })
    }
}

setBomb()

//  Add style to the squares
let result = document.querySelector('.result')
let points = document.querySelector('.counter')

points.textContent = '000'

squares.forEach((square) => {
    square.addEventListener('click', (e) => {
        if (e.target.innerHTML.indexOf('<i class="fa-solid fa-bomb bomb">') != -1) {
            console.log('boom')
            stop()
            changeSmile()
            e.target.style.border = '3px inset gainsboro'
            e.target.firstChild.style.display = 'block'
            e.target.firstChild.style.color = 'black'
            result.style.display = 'block'
            result.innerHTML = `You LOST!<p>Click on the smile to play again!</p>`
            grid.style.pointerEvents = 'none'
            timerSelect.disabled = true




        } else if (e.target.style.border == '3px inset gainsboro') {

        } else {

            if (countDownTimer == null) {
                countDown(secondsSelected)
                timerSelect.disabled = true

            }

            addPoint()
            e.target.style.border = '3px inset gainsboro'
        }
    })
})

// Points counter
function addPoint() {
    return points.textContent++
}

// Smile settings
let smile = document.querySelector('.smile')
let smileHappy = document.getElementById('happy')
let smileSad = document.getElementById('sad')

function changeSmile() {
    smileHappy.style.display = 'none'
    smileSad.style.display = 'block'
    smileSad.style.border = '3px inset gainsboro'
    smileSad.style.color = '#CB0005'
    document.body.style.backgroundColor = '#CB0005'
}

smile.addEventListener('click', () => {
    location.reload()
})

squares.forEach((square) => {
    square.addEventListener('click', (e) => {
        e.target.classList.add('.clicked')
    })
})

// Timer settings
let timerSelect = document.getElementById('timerSelect')
let secondsSelected = 30
timerSelect.addEventListener('change', (e) => {
    console.log(e.target.value)
    timer.innerHTML = e.target.value
    secondsSelected = e.target.value
    countDown(secondsSelected) // Chiamata diretta a countDown
})

let timer = document.querySelector('.timer')
let countDownTimer = null

function countDown(secondsSelected) {
    let sec = secondsSelected
    timer.innerHTML = sec

    countDownTimer = setInterval(function () {
        sec--

        if (sec == -1) {
            document.body.style.backgroundColor = '#CB0005'
            result.style.display = 'block'
            result.innerHTML = `TIMEOUT!<p>Click on the smile to play again!</p>`
            grid.style.pointerEvents = 'none'
            changeSmile()
            stop()
        } else {
            timer.innerHTML = sec
        }
    }, 1000)
}

function stop() {
    clearInterval(countDownTimer)
}

function disableSelect(selectElement) {
    selectElement.disabled = true;
}




