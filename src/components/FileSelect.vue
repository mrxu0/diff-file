<template>
  <div class="flex flex-1 flex-col justify-center items-center">
    <Transition name="fade" mode="out-in">
      <button v-if="contents.size === 0" @click="() => open()">打开文件</button>
      <div v-else class="flex flex-col gap-2">
        <p class="mb-2 text-center" v-for="content in contents">
          {{ content[0] }}
        </p>
        <button @click="() => open()">重新上传</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Transition, watch } from "vue";
import { useFileDialog } from "../hooks/fileDialog";
import {
  FileInfoMap,
  StatusFileInfoMap,
  useGetFileContent,
} from "../hooks/getFileContent";

const emit = defineEmits<{
  (e: "change", fs: StatusFileInfoMap): void;
}>();

const { files, open, reset } = useFileDialog();
const { contents } = useGetFileContent(files);

watch(
  contents,
  () => {
    emit("change", contents.value);
  },
  { deep: true }
);
</script>
