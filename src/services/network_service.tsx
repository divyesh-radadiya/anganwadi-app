import axios from "axios";
import { Followup } from "../models/followup";
const base = "http://localhost:8080";
// const base = "https://9bce-103-156-19-229.ngrok.io";

const sendRequest = async () => {
  const response = await axios.get(
    base + "/api/v1/discharge_summary/findByAwwId/1",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3BhbCIsImV4cCI6MTY0ODc3NjAxMywiaWF0IjoxNjQ4NzExMjEzfQ.UD1HRiCnCEeOvahW1osI090yUG1lMHWfMruQOpk1BmY",
      },
    }
  );
  //   console.log(response);
  return response.data;
};

export const putRequest = async (curFollowUp: Followup) => {
  // PUT request using axios with error handling
  const article = {
    attemptedDate: curFollowUp.attemptedDate,
    followUpId: curFollowUp.followUpId,
    height: curFollowUp.height,
    weight: curFollowUp.weight,
    muac: curFollowUp.muac,
    growthStatus: curFollowUp.growthStatus,
    symptoms: curFollowUp.symptoms,
  };
  console.log(curFollowUp.growthStatus);
  const response = await axios.put(base + "/api/v1/followup/update", article, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3BhbCIsImV4cCI6MTY0ODc3NjAxMywiaWF0IjoxNjQ4NzExMjEzfQ.UD1HRiCnCEeOvahW1osI090yUG1lMHWfMruQOpk1BmY",
    },
  });
  return response.data;
};

export default sendRequest;
