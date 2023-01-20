<template>
  <div>
    <p v-for="[key, value] in props.files" class="flex gap-2">
      <span><statusIcon :file="value"></statusIcon></span>
      <span>{{ key }}</span>
    </p>
  </div>
</template>
<script lang="tsx" setup>
import Add from "~icons/material-symbols/add";
import DeleteOutline from "~icons/material-symbols/delete-outline";
import MaterialSymbolsChangeCircleRounded from "~icons/material-symbols/change-circle-rounded";
import MaterialSymbolsChangeHistory from "~icons/material-symbols/change-history";
import {
  FileStatusEnum,
  StatusFileInfo,
  StatusFileInfoMap,
} from "../hooks/getFileContent";

const props = defineProps<{
  files: StatusFileInfoMap;
}>();

function statusIcon({ file }: { file: StatusFileInfo }) {
  if ("status" in file) {
    if (file.status === FileStatusEnum.add) {
      return <Add />;
    } else if (file.status === FileStatusEnum.del) {
      return <DeleteOutline />;
    } else if (file.status === FileStatusEnum.change) {
      return <MaterialSymbolsChangeCircleRounded />;
    } else {
      return MaterialSymbolsChangeHistory;
    }
  }
}
</script>
