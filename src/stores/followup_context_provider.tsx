import { Child } from "../models/child";
import { Followup } from "../models/followup";
import { putRequest } from "../services/network_service";
import { useEffect, useState } from "react";
import { Database, Storage } from "@ionic/storage";
import { Network } from "@awesome-cordova-plugins/network";
import FollowupContext from "./followup_contex";

const FollowupContextProvider: React.FC = (props) => {
  const [isOn, setOn] = useState<boolean>(true);
  const [isLoad, setLoad] = useState<number>(0);

  const [db, setDb] = useState<Database>();

  const [curFollowUp, setCurFollowUp] = useState<Followup>({
    followUpId: "1",
    height: 80,
    weight: 12,
    muac: 3,
    growthStatus: "SAM",
    symptoms: "No",
    attempted: true,
    followupDate: new Date("2022-02-14"),
    attemptedDate: new Date("2022-02-14"),
  });

  const [curChild, setCurChild] = useState<Child>({
    samId: "123",
    name: "Naman",
    age: 3,
    gender: "Male",
    address: "123, abc colony, mg road, pune. ",
    contactNumber: 9876543210,
    isDone: false,
    nextFollowupid: "2",
    nextDate: new Date("2022-03-01"),
    admissionDate: new Date("2022-03-01"),
    admissionWeight: 2.1,
    targetWeight: 2.6,
    dischargeDate: new Date("2022-03-01"),
    dischargeWeight: 2.5,
    outcome: "normal",
    treatmentProtocol: "healthy diet",
    followUps: [
      {
        followUpId: "1",
        height: 80,
        weight: 12,
        muac: 3,
        growthStatus: "SAM",
        symptoms: "No",
        attempted: true,
        followupDate: new Date("2022-02-14"),
        attemptedDate: new Date("2022-02-14"),
      },
      {
        followUpId: "2",
        attempted: false,
        followupDate: new Date("2022-03-01"),
      },
      {
        followUpId: "3",
        attempted: false,
        followupDate: new Date("2022-03-16"),
      },
      {
        followUpId: "4",
        attempted: false,
        followupDate: new Date("2022-04-01"),
      },
      {
        followUpId: "5",
        attempted: false,
        followupDate: new Date("2022-04-16"),
      },
      {
        followUpId: "6",
        attempted: false,
        followupDate: new Date("2022-05-01"),
      },
    ],
  });

  var synFollowUps: Followup[] = [];
  var allChildren: Child[] = [];

  const [userJWT, setUserJWT] = useState<string>("");

  // const [allChildren, setChildern] = useState<Child[]>([
  //   // {
  //   //   samId: "123",
  //   //   name: "Naman",
  //   //   age: 3,
  //   //   gender: "Male",
  //   //   address: "123, abc colony, mg road, pune. ",
  //   //   contactNumber: 9876543210,
  //   //   isDone: false,
  //   //   nextFollowupid: "2",
  //   //   nextDate: new Date("2022-03-01"),
  //   //   followUps: [
  //   //     {
  //   //       followUpId: "1",
  //   //       height: 80,
  //   //       weight: 12,
  //   //       muac: 3,
  //   //       growthStatus: "SAM",
  //   //       symptoms: "No",
  //   //       attempted: true,
  //   //       followupDate: new Date("2022-02-14"),
  //   //       attemptedDate: new Date("2022-02-14"),
  //   //     },
  //   //     {
  //   //       followUpId: "2",
  //   //       attempted: false,
  //   //       followupDate: new Date("2022-03-01"),
  //   //     },
  //   //     {
  //   //       followUpId: "3",
  //   //       attempted: false,
  //   //       followupDate: new Date("2022-03-16"),
  //   //     },
  //   //     {
  //   //       followUpId: "4",
  //   //       attempted: false,
  //   //       followupDate: new Date("2022-04-01"),
  //   //     },
  //   //     {
  //   //       followUpId: "5",
  //   //       attempted: false,
  //   //       followupDate: new Date("2022-04-16"),
  //   //     },
  //   //     {
  //   //       followUpId: "6",
  //   //       attempted: false,
  //   //       followupDate: new Date("2022-05-01"),
  //   //     },
  //   //   ],
  //   // },
  // ]);
  // const [synFollowUps, setSynFollowUps] = useState<Followup[]>([]);

  const updateJwt = (jwt: string) => {
    setUserJWT(jwt);
  };
  const onSubmit = async (subFollowUp: Followup, subChild: Child) => {
    setLoad(11);
    setOn(true);

    setCurFollowUp(subFollowUp);
    console.log("**", subChild.followUps);

    var fi = subChild.followUps.findIndex(
      (fu) => fu.followUpId == subFollowUp.followUpId
    );

    subChild.followUps[fi].attempted = subFollowUp.attempted;
    subChild.followUps[fi].attemptedDate = subFollowUp.attemptedDate;
    subChild.followUps[fi].weight = subFollowUp.weight;
    subChild.followUps[fi].height = subFollowUp.height;
    subChild.followUps[fi].muac = subFollowUp.muac;
    subChild.followUps[fi].growthStatus = subFollowUp.growthStatus;
    subChild.followUps[fi].symptoms = subFollowUp.symptoms;

    console.log(fi, "**", subChild.followUps);

    if (subChild.followUps.length > fi + 1) {
      subChild.nextDate = subChild.followUps[fi + 1].followupDate;
      subChild.nextFollowupid = subChild.followUps[fi + 1].followUpId;
    } else {
      subChild.isDone = true;
    }

    setCurChild(subChild);

    // setCurFollowUp((old) => {
    //   return subFollowUp;
    // });

    await updateData(subFollowUp);

    await initDb();

    setLoad(0);
  };

  const updateData = async (subFollowUp: Followup) => {
    try {
      if (Network.type == Network.Connection.NONE) {
        setOn(false);
      } else {
        await putRequest(subFollowUp, userJWT ?? "").then((data) => {
          console.log("syn data added", data["followUpId"]);
          console.log("syn data added", data["growthStatus"]);

          setOn(true);
          setLoad(10);
        });
      }
    } catch (exception_var) {
      setOn(false);
    }
  };

  const updateOfflineData = async () => {
    // console.log("Set value", allOnChildren);
    if (isOn == false) {
      await getOfflineData();

      console.log("Set value");

      await db.set("synFollowUps", synFollowUps);
      await db.set("childrenDataAll", allChildren);
      await db.set("isSynFollowUps", true);

      console.log("Set value Done");

      setLoad(1);
    }
  };

  const getOfflineData = async () => {
    const followups: Followup[] = (await db.get("synFollowUps")) ?? [];
    var children: Child[] = await db.get("childrenDataAll");

    var ci = children.findIndex((ch) => ch.samId == curChild.samId);

    children[ci].followUps = curChild.followUps;
    children[ci].isDone = curChild.isDone;
    children[ci].nextDate = curChild.nextDate;
    children[ci].nextFollowupid = curChild.nextFollowupid;
    children[ci].currGrowthStatus = curFollowUp.growthStatus;
    children[ci].currWeight = curFollowUp.weight;

    allChildren = children;

    console.log("Got value", followups);

    synFollowUps = followups.concat(curFollowUp);

    console.log("Got value", synFollowUps);
  };

  async function initDb() {
    const store = new Storage();

    const db = await store.create();

    setDb(db);
  }

  useEffect(() => {
    updateOfflineData();
  }, [db]);

  return (
    <FollowupContext.Provider
      value={{
        isLoad,
        isOn,
        db,
        curFollowUp,

        updateJwt,
        onSubmit,
      }}
    >
      {props.children}
    </FollowupContext.Provider>
  );
};

export default FollowupContextProvider;
