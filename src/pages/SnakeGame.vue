<script setup>
import { computed, ref } from 'vue'

const map = []
const MAP_WIDTH = 10
for (let i = 0; i < MAP_WIDTH; i++) {
  const row = []
  for (let j = 0; j < MAP_WIDTH; j++) {
    row.push(0)
  }
  map.push(row)
}
const MAP_DIR = {
  'ArrowRight': [1, 0],
  'ArrowLeft': [-1, 0],
  'ArrowDown': [0, 1],
  'ArrowUp': [0, -1],
}
const snake = ref({
  cells: [[0,0], [1, 0], [2, 0]],
  runDir: 'ArrowRight'
})
const food = ref(['', ''])
const message = ref('')
let gameIsRunning = ref(false)
let gameInterval = null
const randomNumbers = (min, max) => {
	return Math.round(Math.random() * (max - min)) + min;
}
const setPositionByBoundary = (cell) => {
  if (cell[0] === MAP_WIDTH) {
    cell[0] = 0
  }
  if (cell[0] === -1) {
    cell[0] = MAP_WIDTH - 1
  }
  if (cell[1] === MAP_WIDTH) {
    cell[1] = 0
  }
  if (cell[1] === -1) {
    cell[1] = MAP_WIDTH - 1
  }
}
const reset = () => {
  snake.value = {
    cells: [[0,0], [1, 0], [2, 0]],
    runDir: 'ArrowRight'
  }
  message.value = ''
  randomFood()
}
const randomFood = () => {
  let result = [randomNumbers(0, MAP_WIDTH - 1), randomNumbers(0, MAP_WIDTH - 1)]
  while (snake.value.cells.some(cell => cell[0] === result[0] && cell[1] === result[1])) {
    result = [randomNumbers(0, MAP_WIDTH - 1), randomNumbers(0, MAP_WIDTH - 1)]
  }
  food.value = result
}
randomFood()
const snakeLength = computed(() => snake.value.cells.length)
const run = () => {
  if (gameIsRunning.value) {
    return
  }
  reset()
  gameIsRunning.value = true
  clearInterval(gameIsRunning.value)
  gameInterval = setInterval(() => {
    const dirValue = MAP_DIR[snake.value.runDir]
    const newHead = JSON.parse(JSON.stringify(snake.value.cells[snakeLength.value - 1]))
    newHead[0] += dirValue[0]
    newHead[1] += dirValue[1]
    snake.value.cells.push(newHead)
    for (const sCell of snake.value.cells) {
      setPositionByBoundary(sCell)
    }
    if (newHead[0] === food.value[0] && newHead[1] === food.value[1]) {
      randomFood()
    } else {
      snake.value.cells.splice(0, 1)
    }
    if (checkEndGame()) {
      clearInterval(gameInterval)
      gameIsRunning.value = false
    }
  }, 200);
}
const pause = () => {
  gameIsRunning.value = false
  clearInterval(gameInterval)
}
const checkEndGame = () => {
  if (snakeLength.value === (MAP_WIDTH * MAP_WIDTH) - 1) {
    message.value = 'You Win!'
    return true
  }
  const snakeHead = snake.value.cells[snakeLength.value - 1]
  if (snake.value.cells.some((cell, cIndex) => (cIndex !== snakeLength.value - 1) && snakeHead[0] === cell[0] && snakeHead[1] === cell[1])) {
    message.value = 'You Lose!!!'
    return true
  }
  return false
}
const checkIsSnakeCell = (rIndex, cIndex) => {
  for (const sCell of snake.value.cells) {
    if (sCell[0] === rIndex && sCell[1] === cIndex) {
      return true
    }
  }
  return false
}
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'Enter':
      if (gameIsRunning.value) {
        pause()
      } else {
        if (message.value) {
          reset() 
        } else {
          run()
        }
      }
      break
    case 'ArrowRight':
      if (snake.value.runDir !== 'ArrowLeft') {
        snake.value.runDir = e.key
      }
      break
    case 'ArrowLeft':
      if (snake.value.runDir !== 'ArrowRight') {
        snake.value.runDir = e.key
      }
      break
    case 'ArrowDown':
      if (snake.value.runDir !== 'ArrowUp') {
        snake.value.runDir = e.key
      }
      break
    case 'ArrowUp':
      if (snake.value.runDir !== 'ArrowDown') {
        snake.value.runDir = e.key
      }
      break
  }
})
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center bg-black text-white">
    <button class="rounded-md px-5 py-1 bg-gray-100 text-black mb-4" @click="gameIsRunning ? pause() :  run()">{{ gameIsRunning ? 'Pause' : 'Start' }}</button>
    <div class="text-2xl mb-4">Score: {{ snake.cells.length - 3 }}</div>
    <div class="flex border-2 border-white relative">
      <div v-if="message" class="absolute inset-0 flex flex-col justify-center items-center ">
        <div class="text-4xl">
          {{ message }}
        </div>
        <div>
          <button @click="reset" class="rounded-md px-3 py-1 border-2 bg-yellow-400 my-2">Play Agian</button>
        </div>
      </div>
      <div v-for="(row, rIndex) in map" :key="`row-${rIndex}`">
        <div
          v-for="(cell, cIndex) in row"
          :key="`row-${rIndex}-cell-${cIndex}`"
          class="w-[20px] h-[20px] bg-gray-500 border-[1px] border-orange-100"
          :class="[
            checkIsSnakeCell(rIndex, cIndex) ? 'bg-orange-500' : '',
            food[0] === rIndex && food[1] === cIndex ? '!bg-blue-400' : ''
          ]"
        >
        </div>
      </div>
    </div>
  </div>
</template>