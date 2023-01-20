<template>
  <Transition name="fade" mode="out-in">
    <div v-if="isCompare === false" class="w-full flex min-h-screen">
      <FileSelect @change="oldChangeHandler" />
      <button @click="compareHandler">比较</button>
      <FileSelect @change="newChangeHandler" />
    </div>
    <div v-else class="flex flex-col">
      <FileDirectory :files="compareFile" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Transition, computed, ref } from "vue";
import FileSelect from "./components/FileSelect.vue";
import FileDirectory from "./components/FileDirectory.vue";
import {
  FileInfoMap,
  FileInfo,
  StatusFileInfoMap,
} from "./hooks/getFileContent";
import { useGetFileCompare } from "./hooks/getFileCompare";
const isCompare = ref(false);
const oldFiles = ref<StatusFileInfoMap>(new Map());
const newFiles = ref<StatusFileInfoMap>(new Map());
const compareFile = useGetFileCompare(oldFiles, newFiles);

function compareHandler() {
  isCompare.value = true;
}

function oldChangeHandler(fs: StatusFileInfoMap) {
  oldFiles.value = fs;
}
function newChangeHandler(fs: StatusFileInfoMap) {
  newFiles.value = fs;
}
</script>

<style></style>
