import React from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import "./popup.css";
import Offscreen from "../chrome-api/offscreen";
import { openEyedropperChannel } from "../background/controllers/messages";
import EyedropperManager from "../offscreen/EyeDropperManager";
import ColorList from "./ColorList";
import useColorStore from "./useColorStore";

async function openColorPicker() {
  console.log("Opening color picker");
  const manager = new EyedropperManager();
  document.body.style.display = "none";
  const color = await manager.getColor();
  console.log(color);
  document.body.style.display = "block";
  return color;
}

const AddColorButton = () => {
  const { addColor, loading } = useColorStore();
  return (
    <button
      onClick={async () => {
        const color = await openColorPicker();
        if (color) {
          await addColor(color);
        }
      }}
      disabled={loading}
      className="px-3 py-1 rounded bg-black text-white disabled:opacity-50 block mx-auto my-2"
    >
      Open color picker
    </button>
  );
};

const App: React.FC<{}> = () => {
  return (
    <div>
      <AddColorButton />
      <ColorList />
    </div>
  );
};

function createReactApp() {
  const container = document.createElement("div");
  container.id = "react-app";
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
}

createReactApp();
