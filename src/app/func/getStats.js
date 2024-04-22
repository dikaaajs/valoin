import axios from "axios";

export const getStats = async (setData) => {
  const response = await axios.get("/api/stats/general");
  const data = response.data;
  setData(data);
};
