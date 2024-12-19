<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import QuestionComponent from '@/components/QuestionComponent.vue';

const questionBank = reactive([
  {
    title: '下列選項中何者讀音兩兩相同？',
    options: [
      {
        title: '參「差」、「差」別',
        value: 'A',
      },
      {
        title: '住「宿」、星「宿」',
        value: 'B',
      },
      {
        title: '斑「駁」、「駁」斥',
        value: 'C',
      },
      {
        title: '腔「調」、「調」色',
        value: 'D',
      },
    ],
    correct: 'C',
  },
  {
    title: '下列各組選項中，「」的讀音何者完全相同？ ',
    options: [
      {
        title: '「乾」坤 、 消「遣」',
        value: 'A',
      },
      {
        title: '「行」人 、 五「行」八卦',
        value: 'B',
      },
      {
        title: '「藉」口 、 書「籍」',
        value: 'C',
      },
      {
        title: '「賈」寶玉 、 商「賈」',
        value: 'D',
      },
    ],
    correct: 'B',
  },
  // ... (其他題目)
]);

const index = ref(0);

const currentQuestions = ref([]);
const answers = reactive([]);
const isSubmitted = ref(false);
const score = ref(0);

const isAnswerSelected = computed(() => !!answers[index.value]);

const initializeQuiz = () => {
  currentQuestions.value = questionBank
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  index.value = 0;
  answers.length = 0;
  isSubmitted.value = false;
  score.value = 0;
};

const select = (option) => {
  answers[index.value] = option;
};

const goToPreviousQuestion = () => {
  if (index.value - 1 < 0) return;
  index.value--;
};
const goToNextQuestion = () => {
  if (index.value + 1 >= 10) return;
  index.value++;
};

const submitQuiz = () => {
  score.value = currentQuestions.value.reduce((acc, q, idx) => {
    return acc + (answers[idx].value === q.correct ? 1 : 0);
  }, 0);
  isSubmitted.value = true;
};

const isAnswerCorrect = (key) => {
  return answers[key].value === currentQuestions.value[key].correct;
};

onMounted(() => {
  initializeQuiz();
});
</script>

<template>
  <main>
    <div class="min-h-screen flex flex-col items-center bg-black-100 p-6">
      <h1 class="text-3xl font-bold mb-6">隨機選擇題測驗</h1>

      <div
        v-if="!isSubmitted"
        class="w-full max-w-[1280px] bg-black rounded shadow-md p-6"
      >
        <QuestionComponent
          v-model:index="index"
          :question="currentQuestions"
          @select="select"
        />

        <div class="my-5 flex items-center justify-center gap-x-4">
          <button
            v-if="index >= 1"
            class="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-200"
            @click="goToPreviousQuestion"
          >
            上一題
          </button>
          <button
            v-if="index < currentQuestions.length - 1 && isAnswerSelected"
            class="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-200"
            @click="goToNextQuestion"
          >
            下一題
          </button>
        </div>

        <button
          v-if="answers.length === currentQuestions.length"
          @click="submitQuiz"
          class="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          送出答案
        </button>

        <div class="flex justify-center">
          {{ index + 1 }} / {{ currentQuestions.length }}
        </div>
      </div>

      <div
        v-else
        class="w-full max-w-md bg-black rounded shadow-md p-6"
      >
        <h2 class="text-2xl font-bold mb-4">測驗結果</h2>
        <p class="mb-4">您的分數：{{ score }}/10</p>
        <ul class="list-disc pl-5 space-y-2">
          <li
            v-for="(question, i) in currentQuestions"
            :key="i"
            :class="{ 'text-red-500': !isAnswerCorrect(i) }"
          >
            <strong class="text-lg">{{ i + 1 }}. {{ question.title }}</strong
            ><br />
            <span
              >您的答案：{{ `${answers[i].value}, ${answers[i].title}` }}</span
            ><br />
            <span v-if="!isAnswerCorrect(i)"
              >正確答案：{{ question.correct }}</span
            >
          </li>
        </ul>
        <button
          @click="initializeQuiz"
          class="mt-4 w-full py-2 px-4 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition"
        >
          再試一次
        </button>
      </div>
    </div>
  </main>
</template>
