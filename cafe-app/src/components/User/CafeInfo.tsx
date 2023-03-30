import React from "react";
const CafeteriaItems = [
  {
    name: "FARADAY HALL（ファラデーホール）",
    time: "10:00~15:00，17:00~19:00",
    floor1: "",
    seats1: "",
    floor2: "2階（定食・麺）",
    seats2: "180",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/gdsc-nu-sc2023.appspot.com/o/images%2Ffaradayhall.jpg?alt=media&token=fb6a1756-55c3-489b-afb7-a79b6f0f36c2",
    url: "/",
  },
  {
    name: "PASCAL HALL（ファラデーホール）",
    time: "10:00~15:00，17:00~19:00",
    floor1: "",
    seats1: "",
    floor2: "2階（定食・麺）",
    seats2: "280",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/gdsc-nu-sc2023.appspot.com/o/images%2Fpascalhall.jpg?alt=media&token=610d9629-ee5a-4d2f-9553-565e90b1b64a",
    url: "/",
  },
  {
    name: "DA VINCH HALL（ファラデーホール）",
    time: "10:00~15:00，17:00~19:00",
    floor1: "",
    seats1: "",
    floor2: "2階（定食・麺）",
    seats2: "380",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/gdsc-nu-sc2023.appspot.com/o/images%2Fdavinchhall.jpg?alt=media&token=de24748c-e3b1-4821-8966-17e8e7c6f9bb",
    url: "/DaVinch",
  },
];

function FloorInfo(props: any) {
  if (props.floor1) {
    return (
      <div className="flex mt-2 mb-4">
        <p className="font-medium w-1/2 sm:w-1/3">{props.floor1}</p>
        <p className="">{props.seats1}</p>
      </div>
    );
  }
  if (props.floor2) {
    return (
      <div className="flex mt-2 mb-4">
        <p className="font-medium w-1/2 sm:w-1/3">{props.floor2}</p>
        <p className="">{props.seats2}席</p>
      </div>
    );
  }
  return null;
}

const CafeInfo = () => {
  return (
    <section className="text-gray-700 mb-10 rounded-lg pb-10" id="card">
      {CafeteriaItems.map((cafeteria, index) => {
        return (
          <div
            className="flex container mx-auto rounded shadow shadow-gray-400 py-4 px-5 flex-col md:flex-row-reverse"
            key={index}
          >
            <div className="">
              <div className="mx-auto w-5/6 pb-5">
                <img className="rounded-lg" src={cafeteria.imageURL} />
              </div>
              <h2 className="font-medium text-gray-900 text-xl md:text-xl md:pt-0">
                {cafeteria.name}
              </h2>
              <div className="flex pt-5">
                <p className="font-medium pr-5">営業時間</p>
                <p>{cafeteria.time}</p>
              </div>
              {FloorInfo(cafeteria)}
              <div className="text-center md:pt-5">
                <a href={cafeteria.url}>
                  <button className="text-white bg-gray-400 px-6 border-0 rounded text-lg hover:bg-gray-200 hover:text-gray-900 duration-300">
                    メニューを見る
                  </button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CafeInfo;
