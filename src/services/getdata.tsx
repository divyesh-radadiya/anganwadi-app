import axios from "axios";

const sendRequest = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
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
