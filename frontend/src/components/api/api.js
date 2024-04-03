import axios from "axios";

const fetchCompounds = async (count, used_ids, groups, elements) => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  try {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/practice",
      data: {
        count: 10,
        used_ids: [1, 2, 3, 4, 5],
        groups: ["Prvky"],
        elements: ["vodík"],
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default fetchCompounds;
