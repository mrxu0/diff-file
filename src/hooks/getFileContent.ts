import { Ref, ref, watch } from "vue";
export enum FileStatusEnum {
  /** 新增加的文件 */
  add = "add",
  /** 跟之前的文件有变化的 */
  change = "change",
  /** 删掉的某个文件 */
  del = "del",
  /** 没有变化的某个文件 */
  noChange = "noChange",
}

export interface FileInfo {
  content: string;
  name: string;
  file: File;
  path: string;
}
export interface AddFileInfo {
  newFile: FileInfo;
  status: FileStatusEnum.add;
}

export interface ChangeFileInfo {
  status: FileStatusEnum.change;
  newFile: FileInfo;
  oldFile: FileInfo;
}

export interface delFileInfo {
  status: FileStatusEnum.del;
  oldFile: FileInfo;
}

export interface NoChangeFileInfo {
  status: FileStatusEnum.noChange;
  newFile: FileInfo;
  oldFile: FileInfo;
}

export type StatusFileInfo =
  | AddFileInfo
  | ChangeFileInfo
  | delFileInfo
  | NoChangeFileInfo
  | FileInfo;

export type FileInfoMap = Map<string, FileInfo>;
export type StatusFileInfoMap = Map<string, StatusFileInfo>;

export function useGetFileContent(files: Ref<FileList | null>) {
  const contents = ref<FileInfoMap>(new Map());

  watch(files, () => {
    contents.value.clear();
    if (files.value) {
      Array.from(files.value).forEach((file) => {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        const loadHandler = (evt: ProgressEvent<FileReader>) => {
          if (evt.target?.result) {
            contents.value.set(file.webkitRelativePath, {
              content: String(evt.target.result),
              name: file.name,
              file: file,
              path: file.webkitRelativePath,
            });
          }
          reader.removeEventListener("load", loadHandler);
        };
        reader.addEventListener("load", loadHandler);
      });
    }
  });
  return { contents };
}
