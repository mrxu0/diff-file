<template>
  <div v-for="file in folder.children">
    <p v-if="file.type === 'file'" class="flex gap-2 items-center">
      <span>{{ file.path }}</span>
      <StatusIcon :file="file.file"></StatusIcon>
    </p>
    <template v-else>
      <p
        @click="expandSwitchHandler(file.path)"
        class="flex items-center gap-1"
      >
        <MaterialSymbolsKeyboardArrowDown
          :class="{ '-rotate-90': !isExpands.has(file.path) }"
        />{{ file.path }}
      </p>
      <div class="ml-4" v-if="isExpands.has(file.path)">
        <FileFlodItem :folder="file"></FileFlodItem>
      </div>
    </template>
  </div>
</template>

<script lang="tsx" setup>
import { computed, ref } from "vue";
import { FolderItem } from "../hooks/pathFold";
import Add from "~icons/material-symbols/add";
import DeleteOutline from "~icons/material-symbols/delete-outline";
import MaterialSymbolsChangeCircleRounded from "~icons/material-symbols/change-circle-rounded";
import MaterialSymbolsChangeHistory from "~icons/material-symbols/change-history";
import MaterialSymbolsKeyboardArrowDown from "~icons/material-symbols/keyboard-arrow-down";
import { FileStatusEnum, StatusFileInfo } from "../hooks/getFileContent";

const props = defineProps<{
  folder: FolderItem;
}>();

const isExpands = ref<Set<string>>(new Set());

function StatusIcon({ file }: { file: StatusFileInfo }) {
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

function expandSwitchHandler(path: string) {
  if (isExpands.value.has(path)) {
    isExpands.value.delete(path);
  } else {
    isExpands.value.add(path);
  }
}
</script>
