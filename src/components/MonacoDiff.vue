<template>
  <div ref="monacoRef"></div>
</template>

<script lang="ts" setup>
import { editor } from "monaco-editor";
import { onMounted, ref, watch } from "vue";
import { FileStatusEnum, StatusFileInfo } from "../hooks/getFileContent";

const props = defineProps<{
  file?: StatusFileInfo;
}>();

const monacoRef = ref<HTMLDivElement>();
let diffEditor: editor.IStandaloneDiffEditor;

watch([() => props.file], ([o]) => {
  if (o && "status" in o) {
    let originalModel: editor.ITextModel;
    let modifiedModel: editor.ITextModel;
    switch (o.status) {
      case FileStatusEnum.add:
        originalModel = editor.createModel("", "text/plain");
        modifiedModel = editor.createModel(o.newFile.content, "text/plain");
        break;
      case FileStatusEnum.noChange:
      case FileStatusEnum.change:
        originalModel = editor.createModel(o.oldFile.content, "text/plain");
        modifiedModel = editor.createModel(o.newFile.content, "text/plain");
        break;
      case FileStatusEnum.del:
        originalModel = editor.createModel(o.oldFile.content, "text/plain");
        modifiedModel = editor.createModel("", "text/plain");
        console.log(o.oldFile.content);
        break;
      default:
        originalModel = editor.createModel("", "text/plain");
        modifiedModel = editor.createModel("", "text/plain");
        break;
    }
    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  }
});
onMounted(() => {
  diffEditor = editor.createDiffEditor(monacoRef.value!, {
    enableSplitViewResizing: false,
  });
});
</script>
