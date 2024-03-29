import { useEffect, useState } from "react";
import {
  getAllNews,
  listenNews,
  deleteNewsWithDate,
  newNews,
} from "../../pages/api/get-news";
import { db } from "../../firebase/client";
import { database } from "firebase-admin";
import InputCheckbox from "./InputCheckbox";
import { format } from "date-fns/fp";
import { Timestamp } from "firebase/firestore";
import NewsForm from "../Form/NewsForm";
import ModalNewsWindow from "../Modal/ModalNewsWindow";

type NewsProps = {
  props: "DaVinch_News" | "Pascal_News" | "Faraday_News";
};

type Data = {
  title: string;
  content: string;
  date: Timestamp;
  id: any;
};

const AdminNewsList = (props: NewsProps) => {
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
  const formatDate = format("yyyy年MM月dd日 hh時mm分ss秒");

  const handleDelete = () => {
    console.log("in handleDelete")
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
    console.log("called useEffect()")
    newList = [];
    getAllNews(db, updateList, props.props);

    return () => {
      console.log("unmounting...");
      setList(() => []);
    };
  }, []);
    return (
<div className="overflow-auto h-128 max-h-128 m-4">
  <div className="">
    <div className="flex flex-col sm:min-w-full md:min-w-full">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-neutral-200 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">件名</th>
                  <th scope="col" className="px-6 py-4">お知らせ</th>
                  <th scope="col" className="px-6 py-4">更新日時</th>
                  <th scope="col" className="px-6 py-4 flex justify-center">
                    <button onClick={handleDelete} className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-hidden">
                {list ? 
                list.map((data: Data, i) => 
                    {
                    return (
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500" key={i}>
                      <td scope="col" className="px-6 py-4 truncate">{data.title}</td>
                      <td scope="col" className="px-6 py-4 truncate">{data.content}</td>
                      <td scope="col" className="px-6 py-4 truncate">{data.date ? formatDate(data.date.toDate()) : ""}</td>
                      <td scope="col" className="px-6 py-4 flex justify-center">
                      <div>
                        <ModalNewsWindow restaurant={props.props} data={data} parentHandlerSubmit={setList}/>
                      <InputCheckbox props={[setCheckedData, data.date, inputCheckedList, setInputCheckedList, i]}/>
                      </div>

            
                        </td>
                      </tr>
                    );
                    })
                  : <tr className="border-b bg-neutral-100 
                  dark:border-neutral-500 dark:bg-neutral-700" >お知らせはありません</tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <NewsForm props={props.props} parentProps={setList}></NewsForm>
    </div>
    </div>
    </div>
  );
};

export default AdminNewsList;
