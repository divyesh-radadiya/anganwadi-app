import axios from "axios";
import { Followup } from "../models/followup";
import { useAuth } from "../stores/auth";

const base = "http://localhost:8080";
// const base = "https://9bce-103-156-19-229.ngrok.io";

const sendRequest = async (authCode: string) => {
  const response = await axios.get(
    base + "/api/v1/discharge_summary/findByAwwId/1",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authCode,
      },
    }
  );
  //   console.log(response);
  return response.data;
};

export const putRequest = async (curFollowUp: Followup, authCode: string) => {
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
      Authorization: authCode,
    },
  });
  return response.data;
};

export default sendRequest;
