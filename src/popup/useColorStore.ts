import React from "react";
import { useChromeStorage } from "../utils/ReactUtils";
import { appStorage } from "../background/controllers/storage";

const useColorStore = () => {
  const { data, loading, setValueAndStore } = useChromeStorage(
    appStorage,
    "savedColors"
  );

  async function addColor(color: string) {
    await setValueAndStore([...data, color]);
  }

  async function deleteColor(color: string) {
    await setValueAndStore(data.filter((c) => c !== color));
  }

  return { colors: data, loading, addColor, deleteColor };
};

export default useColorStore;
