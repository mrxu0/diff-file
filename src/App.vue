<template>
  <header
    class="flex w-full justify-center p-4 border-b-black/40 border font-bold"
  >
    文件内容 DIFF
  </header>
  <Transition name="fade" mode="out-in">
    <div
      v-if="isCompare === false"
      class="w-full flex"
      style="height: calc(100vh - 58px)"
    >
      <FileSelect
        text="原始文件"
        class="border-r border-r-black/40 overflow-y-auto w-1/2"
        @change="oldChangeHandler"
      />
      <!-- <button @click=  "compareHandler">比较</button> -->
      <FileSelect
        class="overflow-auto w-1/2"
        text="比较文件"
        @change="newChangeHandler"
      />
    </div>
    <div v-else class="flex">
      <FileDirectory @select-file="selectFileHandler" :files="compareFile" />
      <MonacoDiff class="flex-1 min-h-screen" :file="selectFile" />
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
  StatusFileInfo,
} from "./hooks/getFileContent";
import { useGetFileCompare } from "./hooks/getFileCompare";
import MonacoDiff from "./components/MonacoDiff.vue";
const isCompare = ref(false);
const oldFiles = ref<FileInfoMap>(new Map());
const newFiles = ref<FileInfoMap>(new Map());
const compareFile = useGetFileCompare(oldFiles, newFiles);
const selectFile = ref<StatusFileInfo>();

function compareHandler() {
  isCompare.value = true;
}

function oldChangeHandler(fs: FileInfoMap) {
  oldFiles.value = fs;
}
function newChangeHandler(fs: FileInfoMap) {
  newFiles.value = fs;
}

function selectFileHandler(file: StatusFileInfo) {
  selectFile.value = file;
}
</script>

<style></style>
