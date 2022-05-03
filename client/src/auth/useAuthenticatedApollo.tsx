import { createState, useState } from "@hookstate/core";

const activeFolderState = createState<string>("");

export default () => {
  const activeFolder = useState(activeFolderState);

  const setActiveFolderForHeaders = (folderId: string) => {
    // Equality check to prevent re-render loop.
    if (activeFolder.value !== folderId) {
      activeFolder.set(folderId);
    }
  };

  return { setActiveFolderForHeaders };
};
