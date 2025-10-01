import { useState } from "react";
import { MdClose } from "react-icons/md";

export const EditModal = ({ task, setTask, setToggleEditModal, id }) => {
  const [taskName, setTaskName] = useState("");
  
  const taskHandler = () => {
    if (taskName.length < 1) {
      alert("At least 1 character to rename an task!");
    } else {
      let newArr = task.map((e) => (e.id == id ? { ...e, id: Number(id), name: taskName } : e));
      setTask(newArr);
      setToggleEditModal(false);
    }
  };

  return (
    <div className="fixed top-[125px] left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[200px] flex flex-col border border-black rounded-md shadow-md overflow-hidden bg-white">
      <div className="flex items-center justify-between bg-gray-300 h-[60px] px-4">
        <h2 className="text-[18px]">Edit Todo</h2>
        <MdClose
          onClick={() => setToggleEditModal(false)}
          className="w-[24px] h-[24px] hover:cursor-pointer"
        />
      </div>

      <div className="w-full flex flex-col p-4 gap-y-4 border-t border-gray-300">
        <input
          className="h-[45px] px-2 w-full border border-black outline-none"
          type="text"
          placeholder="Rename a task"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          onClick={taskHandler}
          className="bg-green-500 h-[45px] text-white font-bold w-full cursor-pointer rounded-sm"
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};
