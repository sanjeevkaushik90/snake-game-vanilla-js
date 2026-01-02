
const board = document.getElementById('grid')

const hight = 40
const width = 40

const cols = Math.floor(board.clientWidth / width)
const rows = Math.floor(board.clientHeight / hight)

board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
board.style.gridTemplateRows = `repeat(${rows}, 1fr)`


let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }


const blocks = []

const snake = [{
    x: 4, y: 8
}, ]

let direction = 'left'

let restartGame = null





for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div')

       

        board.appendChild(block);
        blocks[`${row}-${col}`] = block
    }
}




function renderSnake() {
    snake.forEach(box => {
        const block = blocks[`${box.x}-${box.y}`]

        if (block) {
            block.style.backgroundColor = "white"
        }
        
        

        const foodBlock = blocks[`${food.x}-${food.y}`]
        if (foodBlock) {
            foodBlock.style.backgroundColor = "red"
        }

    })
}





restartGame = setInterval(() => {

    let head = null

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }

    else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }

    else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }

    else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else {
        console.log("game over");
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        alert("game over")
        clearInterval(restartGame)
    }
    snake.forEach(box => {
        const block = blocks[`${box.x}-${box.y}`]
        if (block) {
            block.style.backgroundColor = "transparent"
        }
    })



    snake.unshift(head)
    snake.pop()


   

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols),}

            snake.push({})
    }
   
       

        renderSnake()


    }, 400)



window.addEventListener("keydown", e => {


    if (e.key === "ArrowLeft") direction = "left"
    if (e.key === "ArrowRight") direction = "right"
    if (e.key === "ArrowUp") direction = "up"
    if (e.key === "ArrowDown") direction = "down"
})