import { Toast } from "@capacitor/toast";
import axios from "axios";
import { Followup } from "../models/followup";

const base = "http://192.168.59.208:8080";
// const base = "http://48b3-119-161-98-68.ngrok.io";

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

export const getUser = async (authCode: string) => {
  const response = await axios.get(base + "/api/v1/currentUser", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authCode,
    },
  });
  //   console.log(response);
  return response.data;
};
const showToast = async (msg: string) => {
  await Toast.show({
    text: msg,
  });
};

export const logInRequest = async (userId: string, password: string) => {
  const loginData = {
    username: userId,
    password: password,
    role: "USER",
  };

  const response = await axios.post(base + "/api/v1/authenticate", loginData);
  //   console.log(response);

  return response.data;
};

export const putRequest = async (curFollowUp: Followup, authCode: string) => {
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
