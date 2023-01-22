<script setup>
import { computed } from 'vue';

const formQuiz = $ref({
  answer: []
})
const choosen = $ref([])
const listQuizes = $ref([])
const isShowResult = $ref(false)
const quizResult = $ref([])

const addQuiz = () => {
  const { question, answer, trueAnswerIdx } = formQuiz
  if (!question || !answer[0] || !answer[1] || !answer[2] || !answer[3] || !trueAnswerIdx) {
    return
  }
  listQuizes.push(JSON.parse(JSON.stringify(formQuiz)))
  formQuiz = {
    answer: []
  }
}
const changeQuizAnswer = (qIndex, aIndex) => {
  choosen[qIndex] = aIndex
  quizResult[qIndex] = null
}
const submitQuiz = () => {
  quizResult = choosen.map((choose, qIndex) => Number(listQuizes[qIndex].trueAnswerIdx) === Number(choose))
  isShowResult = true
  if (quizResult.some(e => !e)) {
    alert('Failed!')
    return
  }
  alert('NGONNNNNNNNNNNNNNNN!')
}
const mapIndexToAlpha = index => String.fromCharCode(Number(index) + 65)
</script>
<template>
  <div class="p-5">
    <h1 class="text-center text-3xl font-bold">QUIZ GAME</h1>
    <form @submit.prevent="addQuiz">
      <div class="flex flex-wrap mt-2">
        <div class="w-1/2 flex items-center px-2 mt-2">
          <span class="mr-2">Question: </span>
          <textarea v-model="formQuiz.question" class="w-full p-1 border-2 rounded-md" placeholder="Enter Question..."></textarea>
        </div>
        <div class="w-1/2"></div>
        <div class="w-1/2 flex items-center px-2 mt-2">
          <span class="mr-2">A: </span>
          <input v-model="formQuiz.answer[0]" type="text" class="w-full p-1 border-2 rounded-md" placeholder="Enter Answer...">
          <input v-model="formQuiz.trueAnswerIdx" value="0" type="radio" class="ml-2">
        </div>
        <div class="w-1/2 flex items-center px-2 mt-2">
          <span class="mr-2">B: </span>
          <input v-model="formQuiz.answer[1]" type="text" class="w-full p-1 border-2 rounded-md" placeholder="Enter Answer...">
          <input v-model="formQuiz.trueAnswerIdx" value="1" type="radio" class="ml-2">
        </div>
        <div class="w-1/2 flex items-center px-2 mt-2">
          <span class="mr-2">C: </span>
          <input v-model="formQuiz.answer[2]" type="text" class="w-full p-1 border-2 rounded-md" placeholder="Enter Answer...">
          <input v-model="formQuiz.trueAnswerIdx" value="2" type="radio" class="ml-2">
        </div>
        <div class="w-1/2 flex items-center px-2 mt-2">
          <span class="mr-2">D: </span>
          <input v-model="formQuiz.answer[3]" type="text" class="w-full p-1 border-2 rounded-md" placeholder="Enter Answer...">
          <input v-model="formQuiz.trueAnswerIdx" value="3" type="radio" class="ml-2">
        </div>
      </div>
      <div class="mt-2">
        <button type="submit" class="px-3 py-1 border-2 rounded-md bg-green-500 text-white font-bold">Add Quiz</button>
      </div>
    </form>
    <h2 class="mt-4 text-xl font-bold text-center">List Quizes</h2>
    <div class="mt-3">
      <template v-if="listQuizes.length">
        <div v-for="(quizObj, qIndex) in listQuizes" :key="`quiz-${qIndex}`" class="mb-2 last:mb-0">
          <h4 class="font-semibold">{{ qIndex + 1 }} - {{ quizObj.question }}</h4>
          <div class="flex flex-wrap">
            <div v-for="(answerStr, aIndex) in quizObj.answer" :key="`quiz-${qIndex}-answer-${aIndex}`" class="w-1/2 px-2 mt-2 cursor-pointer hover:text-blue-500" :class="choosen[qIndex] === aIndex && isShowResult && !quizResult[qIndex] ? 'text-red-500' : ''" @click="changeQuizAnswer(qIndex, aIndex)">
              <span :class="choosen[qIndex] === aIndex ? 'border-green-500' : 'border-transparent'" class="border-2 rounded-full px-2 py-1 inline-block">{{ mapIndexToAlpha(aIndex) }}.</span> {{ answerStr }}
            </div>
          </div>
        </div>

        <div class="mt-2">
          <button class="px-3 py-1 border-2 rounded-md bg-green-500 text-white font-bold" @click="submitQuiz">Submit</button>
        </div>
      </template>
      <template v-else>No Quiz added yet.</template>
    </div>
  </div>
</template>