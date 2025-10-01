import { useState } from "react";
import { Modal } from "./components/modal";
import { MdModeEdit, MdClose } from "react-icons/md";
import { EditModal } from "./components/edit-modal";

export const App = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [task, setTask] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [idToEdit, setIdToEdit] = useState();

  let id;
  let status;
  let name;


  function dragstartHandler(ev) {
    id = ev.target.id;
    name = ev.target.innerText;
  }

  function dragoverHandler(ev) {
    ev.preventDefault();
  }

  function dropHandler(ev) {
    ev.preventDefault();
    if (isNaN(ev.target.id)) {
      status = ev.target.id;
    } else {
      return;
    }
    let saveTask = task.map((e) => (e.id == id ? { ...e, status: status } : e));
    setTask(saveTask);
  }

  const editHandler = (e) => {
    setIdToEdit(e.id);
    setToggleEditModal(true);
  };

  return (
    <>
      {toggleModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setToggleModal(false)}
          />
          <Modal
            task={task}
            setTask={setTask}
            setToggleModal={setToggleModal}
            idCounter={idCounter}
            setIdCounter={setIdCounter}
          />
        </>
      )}

      {toggleEditModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setToggleEditModal(false)}
          />
          <EditModal
            id={idToEdit}
            task={task}
            setTask={setTask}
            setToggleEditModal={setToggleEditModal}
          />
        </>
      )}

      <div className="w-full h-screen flex flex-col items-center justify-start gap-y-[30px] p-4 z-0">
        <h1 className="text-[36px] text-gray-600 font-bold">
          To-Do List in Kanban Board
        </h1>

        <div className="min-h-[600px] w-[60%] flex flex-row border-gray-300 border-[1px] shadow-lg">
          <div className="flex flex-col w-[25%]">
            <div className="flex items-center justify-center bg-[#343434] p-2">
              <h2 className="text-white text-[24px] font-bold px-6">
                No Status
              </h2>
            </div>

            <div className="flex flex-col items-center p-2 bg-white h-full gap-y-2">
              <div
                onClick={() => setToggleModal(true)}
                className="w-full h-[45px] flex items-center justify-center bg-[#CCCCCC] rounded-sm hover:cursor-pointer hover:bg-[#B8B8B8] duration-100"
              >
                <p className="text-[18px]"> + Add Todo</p>
              </div>

              <div
                id="no-status"
                onDrop={dropHandler}
                onDragOver={dragoverHandler}
                className="w-full h-full flex flex-col  gap-y-2 bg-white"
              >
                <div className="w-full flex flex-col justify-center gap-y-2">
                  {task.map(
                    (e, i) =>
                      e.status === "no-status" && (
                        <div
                          draggable="true"
                          key={i}
                          id={i + 1}
                          onDragStart={dragstartHandler}
                          className="w-full h-[45px] flex items-center justify-between px-2 bg-white rounded-md border-gray-600 border-[1px] hover:cursor-grabbing"
                        >
                          <p className="text-[16px]">{e.name}</p>
                          <div className="flex items-center gap-x-2">
                            <MdModeEdit
                              onClick={() => editHandler(e)}
                              className="w-[20px] h-[20px] fill-gray-600 hover:cursor-pointer"
                            />
                            <MdClose
                              onClick={() =>
                                setTask(task.filter((e, index) => index !== i))
                              }
                              className="w-[24px] h-[24px] fill-gray-600 hover:cursor-pointer"
                            />
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[25%]">
            <div className="flex items-center justify-center bg-[#343434] p-2">
              <h2 className="text-white text-[24px] font-bold px-6">Pending</h2>
            </div>

            <div
              id="pending"
              onDrop={dropHandler}
              onDragOver={dragoverHandler}
              className="w-full h-full flex flex-col p-2 gap-y-2 bg-[#E1E6E9]"
            >
              <div className="w-full flex flex-col justify-center gap-y-2">
                {task.map(
                  (e, i) =>
                    e.status === "pending" && (
                      <div
                        draggable="true"
                        key={i}
                        id={i + 1}
                        onDragStart={dragstartHandler}
                        className="w-full h-[45px] flex items-center justify-between px-2 bg-white rounded-md border-gray-600 border-[1px] hover:cursor-grabbing"
                      >
                        <p className="text-[16px]">{e.name}</p>
                        <div className="flex items-center gap-x-2">
                          <MdModeEdit
                            onClick={() => editHandler(e)}
                            className="w-[20px] h-[20px] fill-gray-600 hover:cursor-pointer"
                          />
                          <MdClose
                            onClick={() =>
                              setTask(task.filter((e, index) => index !== i))
                            }
                            className="w-[24px] h-[24px] fill-gray-600 hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col text-nowrap w-[25%]">
            <div className="flex items-center justify-center bg-[#343434] p-2">
              <h2 className="text-white text-[24px] font-bold px-6">
                In Progress
              </h2>
            </div>
            <div
              id="in-progress"
              onDrop={dropHandler}
              onDragOver={dragoverHandler}
              className="w-full h-full flex flex-col p-2 gap-y-2 bg-white"
            >
              <div className="w-full flex flex-col justify-center gap-y-2">
                {task.map(
                  (e, i) =>
                    e.status === "in-progress" && (
                      <div
                        draggable="true"
                        key={i}
                        id={i + 1}
                        onDragStart={dragstartHandler}
                        className="w-full h-[45px] flex items-center justify-between px-2 bg-white rounded-md border-gray-600 border-[1px] hover:cursor-grabbing"
                      >
                        <p className="text-[16px]">{e.name}</p>
                        <div className="flex items-center gap-x-2">
                          <MdModeEdit
                            onClick={() => editHandler(e)}
                            className="w-[20px] h-[20px] fill-gray-600 hover:cursor-pointer"
                          />
                          <MdClose
                            onClick={() =>
                              setTask(task.filter((e, index) => index !== i))
                            }
                            className="w-[24px] h-[24px] fill-gray-600 hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[25%]">
            <div className="flex items-center justify-center bg-[#343434] p-2">
              <h2 className="text-white text-[24px] font-bold px-6">
                Completed
              </h2>
            </div>
            <div
              id="completed"
              onDrop={dropHandler}
              onDragOver={dragoverHandler}
              className="w-full h-full flex flex-col p-2 gap-y-2 bg-[#E1E6E9]"
            >
              <div className="w-full flex flex-col justify-center gap-y-2">
                {task.map(
                  (e, i) =>
                    e.status === "completed" && (
                      <div
                        draggable="true"
                        key={i}
                        id={i + 1}
                        onDragStart={dragstartHandler}
                        className="w-full h-[45px] flex items-center justify-between px-2 bg-white rounded-md border-gray-600 border-[1px] hover:cursor-grabbing"
                      >
                        <p className="text-[16px]">{e.name}</p>
                        <div className="flex items-center gap-x-2">
                          <MdModeEdit
                            onClick={() => editHandler(e)}
                            className="w-[20px] h-[20px] fill-gray-600 hover:cursor-pointer"
                          />
                          <MdClose
                            onClick={() =>
                              setTask(task.filter((e, index) => index !== i))
                            }
                            className="w-[24px] h-[24px] fill-gray-600 hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
