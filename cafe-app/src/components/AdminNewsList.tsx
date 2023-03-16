
import { useEffect, useState } from 'react';
import { getAllNews, listenNews, deleteNews } from '../pages/api/get-news';
import { db } from '../../firebase/client';
import { database } from 'firebase-admin';
import InputCheckbox from './InputCheckbox';
import { format } from 'date-fns/fp';
import { Timestamp } from 'firebase/firestore';
import { CheckboxProps } from './InputCheckbox';
type NewsProps = {
  props: "DaVinch_News" | "Pascal_News" | "Faraday_News";
}

type Data = {
  content: string;
  date: Timestamp;
  id: any;
}

const AdminNewsList = (props: NewsProps) => {
    // get init data
    const voidFunc = () => {};

    const [list, setList] = useState<Array<any>>([]);
    const [checkedData, setCheckedData] = useState<Array<boolean>>([]);

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
      checkedData?.forEach((id) => {
        deleteNews(db, props.props, id);
                setList((prevState: any[]) => prevState.filter((obj: Data) => obj.id !== id));
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
                  <th scope="col" className="px-6 py-4">お知らせ</th>
                  <th scope="col" className="px-6 py-4">更新日時</th>
                  <th scope="col" className="px-6 py-4">
                    <button onClick={handleDelete}>Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list ? 
                list.map((data: Data, i) => 
                    {
                    return (
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={i}>
                      <td scope="col" className="px-6 py-4">{data.content}</td>
                      <td scope="col" className="px-6 py-4">{data.date ? formatDate(data.date.toDate()) : ""}</td>
                      <td scope="col" className="px-6 py-4">
                      <InputCheckbox props={[checkedData, setCheckedData, data.id]}/>
            
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
)
}

export default AdminNewsList;