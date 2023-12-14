export const getGFormURLWithInitValue = (
  category: "定食" | "麺類" | "丼" | "カレー" | undefined,
  menuName: string
) => {
  const formID = "1FAIpQLScDyGluCCHPhD6ij4gqdUmfixnstnD1DJzFtz0Y4Zsda1533g";
  // formのエントリIDは調べて打ち込むこと
  const entryCategoryID = "1638938702";
  const entryID = "640761078";

  const entryURL = `&entry.${entryCategoryID}=${category}&entry.${entryID}=${menuName}`;
  const rootURL = `https://docs.google.com/forms/d/e/${formID}/viewform?usp=pp_url`;
  const mainURL = encodeURI(rootURL + entryURL);

  return mainURL;
};
