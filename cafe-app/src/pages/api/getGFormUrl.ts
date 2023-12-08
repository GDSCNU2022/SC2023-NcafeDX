
export const getGFormURLWithInitValue = (
  category: "定食" | "麺類" | "丼" | "カレー",
  menuName: string,
) => {
  const formID =
    "1FAIpQLScDyGluCCHPhD6ij4gqdUmfixnstnD1DJzFtz0Y4Zsda1533g";
  // formのエントリIDは調べて打ち込むこと
  const concated = `https://docs.google.com/forms/d/e/${formID}/viewform?usp=pp_url&entry.[entryID]=${category}&entry.[entryID]=${menuName}`;

  return concated;
};