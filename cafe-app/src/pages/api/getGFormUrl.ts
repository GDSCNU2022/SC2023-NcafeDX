
export const getGFormURLWithInitValue = async (
  category: "定食" | "麺類" | "丼" | "カレー",
  menuName: string,
) => {
  const formID = "";
  const concated = `https://docs.google.com/forms/d/e/${formID}/viewform?usp=pp_url&entry.[entryID]=${category}&entry.[entryID]=${menuName}`;

  return concated;
};