import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { updateNewsWithDate } from "../../pages/api/get-news";
import { db } from "../../firebase/client";
import { Textarea } from "@material-tailwind/react";
import { NewsProps } from "../Form/NewsForm";
import { Timestamp } from "firebase/firestore";
import { list } from "firebase/storage";
import { format } from "date-fns/fp";

type Props = {
  restaurant: string;
  close?: () => void;
  parentHandlerSubmit?: Function;
  data: { title: string; content: string; date: Timestamp };
};
const Panel = (props: Props) => {
  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [focusedObj, setFocusedObj] = useState();

  const closeModal = () => {
    if (props.close) {
      props.close();
    }
  };
  const formatDate = format("yyyy年MM月dd日");

  return (
    <div className="p-4 bg-gray-400">
      <div className="p-4 bg-white rounded-lg">
      <div className="flex-col flex-shrink-0 items-center rounded-md border-b-2  border-neutral-100 border-opacity-100 dark:border-opacity-50 px-2 mx-auto">
        <div className="flex justify-between">
          <p>{props.data.date ? formatDate(props.data.date.toDate()) : ""}</p>
          <div className="flex flex-shrink-0 justify-end">
            <button
              type="button"
              className="inline-block mr-10 box-content pt-1 md:pt-5 rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col mx-auto py-2">
          <h1 className="text-md font-bold pb-5">{props.data.title}</h1>
          <ErrorMessage errors={errors} name="title" />
          <hr />
        </div>

        <div className="flex flex-col mx-auto py-2 m-4">
          <p>{props.data.content}</p>
          <ErrorMessage errors={errors} name="content" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Panel;
