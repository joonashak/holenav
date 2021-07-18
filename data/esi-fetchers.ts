import axios from "axios";

export const fetchSystemList = async () => {
  const res = await axios({
    url: "https://esi.evetech.net/dev/universe/systems/",
  });
  return res.data;
};

const fetchOneSystemData = async (id: string) => {
  console.log(`FETCH ${id}`);
  try {
    const res = await axios(
      `https://esi.evetech.net/latest/universe/systems/${id}`
    );
    console.log(
      `  - SUCCESS: limit=${res.headers["x-esi-error-limit-remain"]}`
    );
    console.log(`  - ${res.data.name}`);
    return res.data;
  } catch (error) {
    // ESI throws random Bad Gateway's, just try again.
    if (error.status === 502) {
      console.log("  - FAILED (502), TRYING AGAIN.");
      fetchOneSystemData(id);
    }
    throw new Error(error);
  }
};

export const fetchAllSystemData = async (limit = 0) => {
  const systemIds = await fetchSystemList();
  const fetchableIds = limit === 0 ? systemIds : systemIds.slice(0, limit);

  const data = [];

  for (const id of fetchableIds) {
    const res = await fetchOneSystemData(id);
    data.push(res);
  }

  console.log(`\n\nFETCHED: ${data.length}`);
  return data;
};
