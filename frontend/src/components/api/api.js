import axios from "axios";

const fetchCompounds = async (count, usedIds, groups, elements) => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  try {
    const response = await axios({
      method: "post",
      url: "https://nazvoslovi.eu/api/practice",
      data: {
        count: count,
        used_ids: usedIds,
        groups: groups,
        elements: elements,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default fetchCompounds;
