<script setup>
import { ref } from 'vue';

const gameStarted = ref(false)
const currentPlayer = ref('X')
const message = ref('')
const defaultMap = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
const map = ref(JSON.parse(JSON.stringify(defaultMap)))
const checkTickedAll = () => {
  for (const row of map.value) {
    for (const cell of row) {
      if (!cell) {
        return false
      }
    }
  }
  return true
}
const tick = (rowIndex, cellIndex) => {
  if (gameStarted.value && !map.value[rowIndex][cellIndex]) {
    map.value[rowIndex][cellIndex] = currentPlayer.value
    if (checkWinner()) {
      message.value = `${currentPlayer.value} win!`
      gameStarted.value = false
    } else if (checkTickedAll()) {
      message.value = `Draw!`
      gameStarted.value = false
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }
  }
}
const allEqual = (arr) => arr.every(val => val && val === arr[0])
const checkVertical = () => {
  for (const row of map.value) {
    if (allEqual(row)) {
      return true
    }
  }
  return false
}
const checkHorizontal = () => {
  for (const cellIndex in map.value[0]) {
    const arr = []
    for (const rowIndex in map.value) {
      arr.push(map.value[rowIndex][cellIndex])
    }
    if (allEqual(arr)) {
      return true
    }
  }
  return false
}
const checkDiagonally = () => {
  return allEqual([map.value[0][0], map.value[1][1], map.value[2][2]]) ||
    allEqual([map.value[0][2], map.value[1][1], map.value[2][0]])
}
const checkWinner = () => {
  if (checkVertical()) return true
  if (checkHorizontal()) return true
  if (checkDiagonally()) return true
  return false
}
const startGame = () => {
  message.value = ''
  map.value = JSON.parse(JSON.stringify(defaultMap))
  gameStarted.value = true
}
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="text-3xl">
      {{ message || `Current Player: ${ currentPlayer }` }}
    </div>
    <div class="mt-20 shadow-md">
      <div v-for="(row, rowIndex) in map" class="flex" :key="`row-${rowIndex}`">
        <div v-for="(cell, cellIndex) in row" :key="`row-${rowIndex}-cell-${cellIndex}`" class="w-[100px] h-[100px] p-9 text-3xl bg-pink-400 border-2 border-blue-500 rounded-sm" :class="gameStarted ? 'cursor-pointer' : 'cursor-not-allowed'" @click="tick(rowIndex, cellIndex)">
        {{cell}}</div>
      </div>
    </div>
    <div class="mt-10">
      <button class="px-10 py-2 rounded-md bg-yellow-300" @click="startGame">{{ gameStarted ? 'Reset' : 'Start Game' }}</button>
    </div>
  </div>
</template>