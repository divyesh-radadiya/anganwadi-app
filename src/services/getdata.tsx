import axios from "axios";

const sendRequest = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/v1/discharge_summary/findByAwwId/10001",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  //   console.log(response);
  return response.data;
};

export default sendRequest;
