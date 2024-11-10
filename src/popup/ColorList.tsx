import React from "react";
import useColorStore from "./useColorStore";

const ColorList = () => {
  const { colors, loading } = useColorStore();
  if (loading) return null;
  return (
    <div className="px-1 pt-2 mt-4 pb-4 overflow-y-auto max-h-96">
      {colors?.map((color) => (
        <ColorItem color={color} key={color} />
      ))}
    </div>
  );
};

const ColorItem = ({ color }: { color: string }) => {
  const { deleteColor } = useColorStore();
  const [text, setText] = React.useState(color);

  async function onCopyClick() {
    await navigator.clipboard.writeText(color);
    setText("Copied!");
    setTimeout(() => {
      setText(color);
    }, 2000);
  }
  return (
    <div
      style={{
        backgroundColor: color,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="px-2 py-1 rounded border-2 border-gray-300"
    >
      <button className="p-1 bg-black text-white rounded" onClick={onCopyClick}>
        {text}
      </button>
      <button
        className="p-1 h-6 w-6 bg-red-400 shadow-md text-white rounded-full"
        aria-label="Delete color"
        onClick={() => deleteColor(color)}
      >
        X
      </button>
    </div>
  );
};

export default ColorList;
