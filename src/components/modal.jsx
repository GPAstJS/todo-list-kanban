import { useRef } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export const Modal = ({ setToggleModal, setTask, idCounter, setIdCounter }) => {
  const [taskName, setTaskName] = useState([]);
  const taskHandler = (e) => {
    if (taskName.length < 1) {
      return alert("Please, name your task!");
    }

    setTask((prev) => [
      ...prev,
      {
        id: Number(idCounter),
        name: taskName,
        status: "no-status",
      },
    ]);

    setIdCounter((prev) => prev + 1);
    setToggleModal(false);
  };


  return (
    <div className="fixed top-[125px] left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[200px] flex flex-col border border-black rounded-md shadow-md overflow-hidden bg-white">
      <div className="flex items-center justify-between bg-gray-300 h-[60px] px-4">
        <h2 className="text-[18px]">Add Todo</h2>
        <MdClose
          onClick={() => setToggleModal(false)}
          className="w-[24px] h-[24px] hover:cursor-pointer"
        />
      </div>

      <div className="w-full flex flex-col p-4 gap-y-4 border-t border-gray-300">
        <input
          className="h-[45px] px-2 w-full border border-black outline-none"
          type="text"
          placeholder="Name a task"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          className="bg-green-500 h-[45px] text-white font-bold w-full cursor-pointer rounded-sm"
          onClick={taskHandler}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};
