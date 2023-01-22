<template>
  <div class="flex flex-col">
    <!-- <p
      v-for="[key, value] in props.files"
      @click="clickHandler(value)"
      class="flex"
    >
      <span><statusIcon :file="value"></statusIcon></span>
      <span>{{ key }}</span>
    </p> -->
    <FileFlodItem v-if="fileFold" :folder="fileFold"></FileFlodItem>
  </div>
</template>
<script lang="tsx" setup>
import FileFlodItem from "./FileFlodItem.vue";
import { StatusFileInfo, StatusFileInfoMap } from "../hooks/getFileContent";
import { usePathFold } from "../hooks/pathFold";

const props = defineProps<{
  files: StatusFileInfoMap;
}>();

const emit = defineEmits<(e: "selectFile", file: StatusFileInfo) => void>();
const { fileFold } = usePathFold(props.files);
function clickHandler(file: StatusFileInfo) {
  emit("selectFile", file);
}
</script>
