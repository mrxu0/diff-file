<template>
  <div class="flex flex-col p-2" :class="{ 'justify-center': !isLeave }">
    <Transition name="fade" mode="out-in" @after-leave="afterLeaveHandler">
      <button
        class="self-center bg-blue-600 rounded py-2 px-4 text-white hover:bg-blue-900 active:bg-blue-300"
        v-if="contents.size === 0"
        @click="() => open()"
      >
        {{ text }}
      </button>
      <div v-else class="flex flex-col gap-4">
        <FileDirectory :files="contents" />
        <button @click="() => open()">重新上传</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Transition, ref, watch } from "vue";
import { useFileDialog } from "../hooks/fileDialog";
import { FileInfoMap, useGetFileContent } from "../hooks/getFileContent";
import FileDirectory from "./FileDirectory.vue";

const props = defineProps<{
  text: string;
}>();
const emit = defineEmits<{
  (e: "change", fs: FileInfoMap): void;
}>();

const { files, open, reset } = useFileDialog();
const { contents } = useGetFileContent(files);
const isLeave = ref(false);

watch(
  contents,
  () => {
    emit("change", contents.value);
  },
  { deep: true }
);

function afterLeaveHandler() {
  isLeave.value = true;
}
</script>
