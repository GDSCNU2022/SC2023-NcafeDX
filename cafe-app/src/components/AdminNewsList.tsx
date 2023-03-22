
import { useEffect, useState } from 'react';
import { getAllNews, listenNews, deleteNewsWithDate } from '../pages/api/get-news';
import { db } from '../../firebase/client';
import { database } from 'firebase-admin';
import InputCheckbox from './InputCheckbox';
import { format } from 'date-fns/fp';
import { Timestamp } from 'firebase/firestore';
import { CheckboxProps } from './InputCheckbox';
import NewsForm from './NewsForm';

type NewsProps = {
  props: "DaVinch_News" | "Pascal_News" | "Faraday_News";
}

type Data = {
  title: string;
  content: string;
  date: Timestamp;
  id: any;
}

const AdminNewsList = (props: NewsProps) => {
    // get init data
    const voidFunc = () => {};

    const [list, setList] = useState<Array<any>>([]);
    const [checkedData, setCheckedData] = useState<Array<any>>([]);
    const [inputChecked, setInputChecked] = useState(false);

    let newList: any[] = [];
    const updateList = (doc: any) => {
      const docData = doc.data();
      const newObj = {
        ...docData,
        id: doc.id
      }
        setList((list) => [...list, newObj]);
    };
    const formatDate = format('yyyy-MM-dd');
    const handleDelete = () => {
      checkedData?.forEach((date) => {
        // dateフィールドでトリガー
        deleteNewsWithDate(db, props.props, date);
                setList((prevState: any[]) => prevState.filter((obj: Data) => obj.date !== date));
      });
    }


    useEffect(() => {
        // strictModeのせいでマウント時に2回レンダリングされる
        newList = [];
        getAllNews(db, updateList, props.props)

        return () => {
          console.log("unmounting...");
          setList(() => []);
        };

    }, [])

    return (
<div>
<div className="overflow-scroll h-128">
  <div className="p-12">
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">件名</th>
                  <th scope="col" className="px-6 py-4">お知らせ</th>
                  <th scope="col" className="px-6 py-4">更新日時</th>
                  <th scope="col" className="px-6 py-4">
                    <button onClick={handleDelete} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list ? 
                list.map((data: Data, i) => 
                    {
                    return (
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={i}>
                      <td scope="col" className="px-6 py-4 truncate">{data.title}</td>
                      <td scope="col" className="px-6 py-4 truncate">{data.content}</td>
                      <td scope="col" className="px-6 py-4">{data.date ? formatDate(data.date.toDate()) : ""}</td>
                      <td scope="col" className="px-6 py-4">
                      <InputCheckbox props={[checkedData, setCheckedData, data.date]}/>
            
                        </td>
                      </tr>
                    );
                    })
                  : <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" >お知らせはありません</tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
  <NewsForm props={props.props} parentProps={setList}></NewsForm>
</div>
)
}

export default AdminNewsList;