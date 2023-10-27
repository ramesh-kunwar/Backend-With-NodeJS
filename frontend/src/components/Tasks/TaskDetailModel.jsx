import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AddSubTaskForm from "./AddSubTaskForm";

export default function TaskDetailModel({ task }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center"> */}
      <div>
        <button
          type="button"
          onClick={openModal}
          className="hidden rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          {/* Open dialog */}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-center justify-center p-4 text-center h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-screen-md  h-4/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <div className="flex items-center gap-3  justify-center rounded-md border  absolute top-3 right-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </div>

                  <div className="flex mt-5 gap-4">
                    <input
                      type="checkbox"
                      className="mt-2 checked:bg-blue-500 checked:border-transparent rounded-full w-6 h-6"
                    />

                    <div>
                      <h1 className="text-4xl font-bold">{task.title}</h1>
                      <p className="text-gray-600 my-4">{task.description}</p>
                      <div>
                        <h1 className="text-2xl font-bold my-4">Sub Tasks</h1>
                        <AddSubTaskForm />
                        {task.subTasks?.map((subTask) => {
                          return (
                            <div
                              key={subTask._id}
                              className="flex items-center  gap-2"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 block  shadow"
                              />
                              {/* <input
                                  type="checkbox"
                                  className="appearance-none checked:bg-blue-500 checked:border-transparent rounded-full w-4 h-4"
                                /> */}

                              <div>
                                <h1 className="text-md mt-3 ">
                                  {subTask.title}
                                </h1>
                                <p className="text-gray-600 my-4">
                                  {subTask.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-2">
                  </div> */}

                  {/* <div className="mt-4">
                    <button
                      type="button"
                  
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
