export const getGFormURLWithInitValue = (
  category: "定食" | "麺類" | "丼" | "カレー" | undefined,
  menuName: string
) => {
  const formID = "1FAIpQLScDyGluCCHPhD6ij4gqdUmfixnstnD1DJzFtz0Y4Zsda1533g";
  // formのエントリIDは調べて打ち込むこと
  const entryCategoryID = "1638938702";
  const entryTeishokuID = "640761078";
  const entryNoodleID = "1766694091";
  const entryDonID = "697295449";
  const entryCurryID = "942483614";
  const entryMenuNameID =
    category === "定食"
      ? entryTeishokuID
      : category === "麺類"
      ? entryNoodleID
      : category === "丼"
      ? entryDonID
      : category === "カレー"
      ? entryCurryID
      : undefined;

  const entryURL = `&entry.${entryCategoryID}=${category}&entry.${entryMenuNameID}=${menuName}`;
  const rootURL = `https://docs.google.com/forms/d/e/${formID}/viewform?usp=pp_url`;
  const mainURL = encodeURI(rootURL + entryURL);
  console.log(`re-direct to ${mainURL}`);

  return mainURL;
};
