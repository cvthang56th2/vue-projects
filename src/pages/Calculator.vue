<script setup>
import { nextTick, ref } from 'vue';

const arg1 = ref(0)
const arg2 = ref('')
const resultRef = ref(null)
const operator = ref(null)
const isGetResult = ref(false)
const reset = () => {
  arg1.value = ''
  arg2.value = ''
}
const onClickNumber = button => {
  if (isGetResult.value) {
    arg1.value = ''
    isGetResult.value = false
  }
  if (operator.value) {
    arg2.value = `${arg2.value}${button}`
  } else {
    if (arg1.value === 0) {
      arg1.value = ''
    }
    arg1.value = `${arg1.value}${button}`
  }
  nextTick(() => {
    resultRef.value.scrollLeft += 99999;
  })
}
const onClickRevert = button => {
}
const onClickDevice100 = button => {
}
const onClickOperator = button => {
  getResult()
  operator.value = button
}
const onClickComma = button => {
}
const getResult = () => {
  if (!arg2.value || !operator.value) {
    return
  }
  switch (operator.value) {
    case '+':
      arg1.value = Number(arg1.value) + Number(arg2.value)
      break
    case '-':
      arg1.value = Number(arg1.value) - Number(arg2.value)
      break
    case '*':
      arg1.value = Number(arg1.value) * Number(arg2.value)
      break
    case '/':
      arg1.value = Number(arg1.value) / Number(arg2.value)
      break
  }
  arg2.value = ''
  operator.value = null
  isGetResult.value = true
}
const onClickButton = button => {
  switch (button) {
    case 'reset':
      reset()
      break;
    case 'revert':
      onClickRevert(button)
      break;
    case 'divide100':
      onClickDevice100(button)
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      onClickOperator(button)
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      onClickNumber(button)
      break;
    case ',':
      onClickComma(button)
      break;
    case '=':
      getResult()
      break;
    default:
      break;
  }
}
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="w-[230px] h-[320px] bg-blue-200 rounded-lg overflow-hidden">
      <div class="h-[95px] text-[50px] justify-end flex items-center px-2">
        <div ref="resultRef" class="overflow-x-auto">
          {{ operator && arg2 ? arg2 : arg1 }}
        </div>
      </div>
      <div>
        <button class="btn bg-blue-100" @click="onClickButton('reset')">C</button>
        <button class="btn bg-blue-100" @click="onClickButton('revert')">+/-</button>
        <button class="btn bg-blue-100" @click="onClickButton('divide100')">%</button>
        <button class="btn bg-orange-300" @click="onClickButton('/')">/</button>
      </div>
      <div>
        <button class="btn bg-gray-100" @click="onClickButton('7')">7</button>
        <button class="btn bg-gray-100" @click="onClickButton('8')">8</button>
        <button class="btn bg-gray-100" @click="onClickButton('9')">9</button>
        <button class="btn bg-orange-300" @click="onClickButton('*')">*</button>
      </div>
      <div>
        <button class="btn bg-gray-100" @click="onClickButton('4')">4</button>
        <button class="btn bg-gray-100" @click="onClickButton('5')">5</button>
        <button class="btn bg-gray-100" @click="onClickButton('6')">6</button>
        <button class="btn bg-orange-300" @click="onClickButton('-')">-</button>
      </div>
      <div>
        <button class="btn bg-gray-100" @click="onClickButton('1')">1</button>
        <button class="btn bg-gray-100" @click="onClickButton('2')">2</button>
        <button class="btn bg-gray-100" @click="onClickButton('3')">3</button>
        <button class="btn bg-orange-300" @click="onClickButton('+')">+</button>
      </div>
      <div>
        <button class="btn bg-gray-100 !w-1/2" @click="onClickButton('0')">0</button>
        <button class="btn bg-gray-100" @click="onClickButton(',')">,</button>
        <button class="btn bg-orange-300" @click="onClickButton('=')">=</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn {
  border: 1px solid #eee;
  height: 45px;
  width: 25%;
}
.btn:hover {
  background: #fff;
}
</style>