import { computed } from "vue";
import { StatusFileInfo, StatusFileInfoMap } from "./getFileContent";

interface FileFoldItem {
  path: string;
  children?: FileFoldItem[];
}

interface FileItem {
  type: "file";
  path: string;
  file: StatusFileInfo;
}

export interface FolderItem {
  type: "floder";
  path: string;
  children: (FileItem | FolderItem)[];
}

function addFile(
  folder: FolderItem,
  arr: string[],
  i: number,
  file: StatusFileInfo
) {
  if (folder.path === arr[i]) {
    return;
  } else {
    const hasFile = folder.children.find((file) => {
      return arr.includes(file.path);
    });
    if (hasFile) {
      if (hasFile.type === "floder") {
        addFile(hasFile, arr, i, file);
      }
    } else {
      // 最后一项，一定是文件
      if (arr.length - 1 === i) {
        folder.children.push({
          type: "file",
          file: file,
          path: arr[i],
        });
        return;
      } else {
        folder.children.push({
          type: "floder",
          path: arr[i],
          children: [],
        });
      }
    }
  }
}

export function usePathFold(files: StatusFileInfoMap) {
  const fileFold = computed(() => {
    let folderItem: FolderItem | undefined;
    files.forEach((value, key) => {
      const paths = key.split("/");
      // paths.shift();
      paths.forEach((path, i, arr) => {
        if (folderItem) {
          addFile(folderItem, arr, i, value);
        } else {
          folderItem = {
            type: "floder",
            path: path,
            children: [],
          };
        }
      });
    });
    console.log("folderItem", folderItem);
    return folderItem;
  });

  return {
    fileFold,
  };
}
