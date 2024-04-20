import axios from "axios";

const fetchCompounds = async (count, usedIds, groups, elements) => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  try {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/practice",
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
