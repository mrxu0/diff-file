<template></template>
<script lang="ts" setup>
import { StatusFileInfoMap } from "../hooks/getFileContent";

const props = defineProps<{
  files: StatusFileInfoMap;
}>();
</script>
