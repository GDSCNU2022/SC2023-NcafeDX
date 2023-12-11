import { useEffect, useState } from "react";
import { getAllNews, deleteNewsWithDate } from "../../pages/api/get-news";
import { db } from "../../firebase/client";
import { database } from "firebase-admin";
import { format } from "date-fns/fp";
import { Timestamp } from "firebase/firestore";
import NewsForm from "../Form/NewsForm";
import ModalUserNewsWindow from "../Modal/ModalUserNewsWindow";
import ModalUserNewsPanel from "../Modal/ModalUserNewsPanel";

type NewsProps = {
  props: "DaVinch_News" | "Pascal_News" | "Faraday_News";
};

type Data = {
  title: string;
  content: string;
  date: Timestamp;
  id: any;
};

const UserNewsList = (props: NewsProps) => {
  // get init data
  const voidFunc = () => {};

  const [list, setList] = useState<Array<any>>([]);
  const [checkedData, setCheckedData] = useState<Array<any>>([]);
  const [inputChecked, setInputChecked] = useState(false);
  const [inputCheckedList, setInputCheckedList] = useState<boolean[]>([]);

  let newList: any[] = [];
  const updateList = (doc: any) => {
    const docData = doc.data();
    const newObj = {
      ...docData,
      id: doc.id,
    };
    setList((list) => [...list, newObj]);
  };
  const formatDate = format("yyyy年MM月dd日");

  const handleDelete = () => {
    checkedData?.forEach((date) => {
      // dateフィールドでトリガー
      deleteNewsWithDate(db, props.props, date);
      setList((prevState: any[]) =>
        prevState.filter((obj: Data) => obj.date !== date)
      );
    });
    inputCheckedList?.forEach((b) => {
      setInputCheckedList((list: Array<boolean>) =>
        list.filter((bool: boolean) => !bool)
      );
    });
  };

  useEffect(() => {
    // strictModeのせいでマウント時に2回レンダリングされる
    newList = [];
    getAllNews(db, updateList, props.props);

    return () => {
      console.log("unmounting...");
      setList(() => []);
    };
  }, []);

  return (
    <div className="bg-cover bg-no-repeat bg-center">
      {/* <div className="overflow-scroll h-128"> */}
      <div className="px-2 pt-4">
        <div id="news-content" className="">
          <div className="overflow-x-auto">
            <div className="inline-block py-2 w-2/3 mx-auto px-4 rounded bg-slate-200">
              {list ? (
                list.map((data: Data, i) => {
                  return (
                    <>
                      <div
                        className="flex flex-row justify-between border-b bg-neutral-100 dark:border-neutral-300"
                        key={i}
                      >
                        <div id="news-text" className="px-3 py-2 truncate">
                          <p className="text-left text-xs">
                            {data.date ? formatDate(data.date.toDate()) : ""}
                          </p>
                          <p className="text-md">{data.title}</p>
                        </div>
                        <div className="px-3 pt-4 truncate">
                          <ModalUserNewsWindow
                            restaurant={props.props}
                            data={data}
                            parentHandlerSubmit={setList}
                          />
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <h2 className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                  No News
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default UserNewsList;
