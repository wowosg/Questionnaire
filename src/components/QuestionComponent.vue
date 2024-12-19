<script setup>
import { reactive, computed, onMounted } from 'vue';

defineOptions({
  name: 'QuestionComponent',
});

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  question: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['select']);

const state = reactive({
  selectedOption: null, // 用於記錄選中的選項
});

const questionTitle = computed(() => props.question[props.index]?.title ?? '');

const options = computed(() => props.question[props.index]?.options ?? []);

const selectOption = (option) => {
  state.selectedOption = option; // 鎖定選項
  emit('select', option);
};
</script>

<template>
  <div
    class="max-w-[600px] m-auto border-[#ddd] border-2 rounded-lg shadow-md p-4"
  >
    <!-- 題目 -->
    <div class="question-title text-lg font-bold mb-4">
      {{ `${props.index + 1}. ${questionTitle}` }}
    </div>

    <!-- 選項 -->
    <div>
      <button
        v-for="(option, idx) in options"
        :key="idx"
        :class="[
          'option-btn',
          'block w-full text-left px-4 py-2 rounded-lg mb-2 outline-2 outline transition-colors duration-200',
          state.selectedOption === option
            ? ' text-white bg-green-200/20 font-bold   outline-yellow-400/60'
            : ' hover:bg-green-100/20 outline-gray-500',
        ]"
        @click="selectOption(option)"
      >
        {{ `${String.fromCharCode(65 + idx)}. ${option.title}` }}
      </button>
    </div>
  </div>
</template>
