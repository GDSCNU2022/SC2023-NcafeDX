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
import CloseIcon from "@mui/icons-material/Close";

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
    <div className="px-2 pb-2 bg-gray-400">
      <div className="flex justify-end">
      <button
        type="button"
        className=""
        data-te-modal-dismiss
        onClick={closeModal}
      >
        <CloseIcon/>
      </button>
      </div>

      <div className="bg-white rounded-lg">
      <div className="inline-block flex-col flex-shrink-0 items-center rounded-md border-b-2  border-neutral-100 border-opacity-100 dark:border-opacity-50 px-2 mx-auto">
        <div className="flex justify-between">
          <p>{props.data.date ? formatDate(props.data.date.toDate()) : ""}</p>
          <div className="flex flex-shrink-0 justify-end">
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
