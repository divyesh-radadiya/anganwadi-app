import { Child } from "../models/child";
import { Followup } from "../models/followup";
import sendRequest, { putRequest } from "../services/network_service";
import ChildernContext from "./childern_contex";
import { useEffect, useState } from "react";
import { Database, Storage } from "@ionic/storage";
import { Network } from "@awesome-cordova-plugins/network";

const ChildernContextProvider: React.FC = (props) => {
  const [isOn, setOn] = useState<boolean>(true);

  const [isLoad, setLoad] = useState<boolean>(true);

  const [isSync, setSync] = useState<number>(0);

  const [isSession, setSession] = useState<boolean>(true);

  const [userJWT, setUserJWT] = useState<string>("");

  const [allChildren, setChildern] = useState<Child[]>([]);

  const [completedChildren, setCompletedChildern] = useState<Child[]>([]);

  const [todayChildren, setTodayChildern] = useState<Child[]>([]);

  const [lateChildren, setLateChildern] = useState<Child[]>([]);

  const [veryLateChildren, setVeryLateChildern] = useState<Child[]>([]);

  const [upcomingChildren, setUpcomingChildern] = useState<Child[]>([]);

  const [allOnChildren, setOnChildern] = useState<Child[]>([
    // {
    //   samId: "123",
    //   name: "Naman",
    //   age: 3,
    //   gender: "Male",
    //   address: "123, abc colony, mg road, pune. ",
    //   contactNumber: 9876543210,
    //   isDone: false,
    //   nextFollowupid: "2",
    //   nextDate: new Date("2022-03-01"),
    //   followUps: [
    //     {
    //       followUpId: "1",
    //       height: 80,
    //       weight: 12,
    //       muac: 3,
    //       growthStatus: "SAM",
    //       symptoms: "No",
    //       attempted: true,
    //       followupDate: new Date("2022-02-14"),
    //       attemptedDate: new Date("2022-02-14"),
    //     },
    //     {
    //       followUpId: "2",
    //       attempted: false,
    //       followupDate: new Date("2022-03-01"),
    //     },
    //     {
    //       followUpId: "3",
    //       attempted: false,
    //       followupDate: new Date("2022-03-16"),
    //     },
    //     {
    //       followUpId: "4",
    //       attempted: false,
    //       followupDate: new Date("2022-04-01"),
    //     },
    //     {
    //       followUpId: "5",
    //       attempted: false,
    //       followupDate: new Date("2022-04-16"),
    //     },
    //     {
    //       followUpId: "6",
    //       attempted: false,
    //       followupDate: new Date("2022-05-01"),
    //     },
    //   ],
    // },
  ]);

  const [syncFollowup, setSyncFollowup] = useState<Followup[]>([]);

  const [selectedChild, setChild] = useState<Child>({
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

  const [selectedFollowUp, setFollowUp] = useState<Followup>({
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
  const [db, setDb] = useState<Database>();

  const updateJwt = (jwt: string) => {
    setUserJWT(jwt);
  };

  const initContext = async () => {
    setLoad(true);
    // setOn(true);

    await updateData();

    await initDb();

    setLoad(false);
  };

  const updateData = async () => {
    try {
      if (Network.type == Network.Connection.NONE) {
        setOn(false);
      } else {
        await sendRequest(userJWT ?? "")
          .then((data) => {
            setOnChildern(() => {
              return [];
            });

            data.forEach((curData: any) => {
              let newChild: Child = Object.assign(
                new Child(),
                curData["admission"]["child"]
              );
              // let newChild: Child = Object.assign(new Child(), curData["followUps"]);
              let allfollowUps: Followup[] = [];
              let isDone = true;
              let nextDate = new Date();
              let nextFollowupid = "-";
              newChild.currWeight = curData["weight"];
              newChild.currGrowthStatus =
                curData["admission"]["child"]["growthStatus"];
              curData["followUps"].forEach((curfollow: any) => {
                let newFollow: Followup = Object.assign(
                  new Followup(),
                  curfollow
                );
                if (newFollow.attempted == true) {
                  newChild.currGrowthStatus = newFollow?.growthStatus;
                  newChild.currWeight = newFollow?.weight;
                }
                if (isDone == true && newFollow.attempted == false) {
                  isDone = false;
                  nextDate = newFollow.followupDate;
                  nextFollowupid = newFollow.followUpId;
                }
                allfollowUps = allfollowUps.concat(newFollow);
              });
              newChild.followUps = allfollowUps;
              newChild.isDone = isDone;

              newChild.nextDate = new Date(nextDate);
              newChild.nextFollowupid = nextFollowupid;

              newChild.admissionDate = new Date(
                curData["admission"]["admittedAt"]
              );
              newChild.admissionWeight = curData["admission"]["weight"];
              newChild.targetWeight = Number(
                (curData["admission"]["weight"] * 1.15).toFixed(2)
              );
              newChild.dischargeDate = new Date(curData["dischargeAt"]);
              newChild.dischargeWeight = curData["weight"];
              newChild.outcome = curData["outcome"];
              newChild.treatmentProtocol = curData["treatmentProtocol"];

              setOnChildern((allOnChildren) => {
                return allOnChildren.concat(newChild);
              });
            });

            setOn(true);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.status);
              if (error.response.status == 403) setSession(false);
              else setOn(false);
              //   setMessage(t("username_password_incorrect_msg"));
              // else setMessage(error.response.status + error.message);
            } else if (error.request) {
              console.log(error.request);
              setOn(false);
              // setMessage(error.toString());
            } else {
              console.log("error", error.message);
              setOn(false);
              // setMessage(error.message + "-");
            }
            // console.log("error:", error);
          });
      }
    } catch (exception_var) {
      setOn(false);
    }

    // updateOfflineData();
  };

  const updateOfflineData = async () => {
    // console.log("Set value", allOnChildren);
    if (isOn) {
      const isSynFollowUps = await db.get("isSynFollowUps");
      const followupsnull = Array(0);

      if (isSynFollowUps == false) {
        console.log("Set value");
        // await db.set("allChildrenData", allOnChildren);
        await db.set("childrenDataAll", allOnChildren);

        await getOfflineData();
      } else {
        const followups: Followup[] = (await db.get("synFollowUps")) ?? [];
        console.log("Got value", followups);
        const l = followups.length;
        var i = 0;
        //
        try {
          followups.forEach(async (curData: any) => {
            await putRequest(curData, userJWT ?? "").then(async (data) => {
              console.log("syn data added", data["followUpId"]);
              i++;
              if (i == l) {
                setSync(l);
              }
            });
          });
          db.set("synFollowUps", followupsnull);
          db.set("isSynFollowUps", false);
          console.log("Set NULL");
        } catch {
          console.log("sync error!!!");
          console.log("Set value");
          // await db.set("allChildrenData", allOnChildren);
          await db.set("childrenDataAll", allOnChildren);

          await getOfflineData();
        }
      }
    } else {
      await getOfflineData();
    }
  };

  const getOfflineData = async () => {
    setChildern([]);
    setCompletedChildern([]);
    setTodayChildern([]);
    setLateChildern([]);
    setVeryLateChildern([]);
    setUpcomingChildern([]);

    var children: Child[] = await db.get("childrenDataAll");

    children.sort(function (a, b) {
      return (
        (a.nextDate ?? new Date()).valueOf() -
        (b.nextDate ?? new Date()).valueOf()
      );
    });

    setChildern((allChildren) => {
      return children;
    });

    children.map((child: Child) => {
      if (child.isDone) {
        setCompletedChildern((oldChild) => {
          return oldChild.concat(child);
        });
      } else {
        const d1 = child.nextDate ?? new Date();
        const d2 = new Date();

        const diff = Math.ceil(
          (d2.valueOf() - d1.valueOf()) / (1000 * 60 * 60 * 24)
        );

        if (diff < 0) {
          setUpcomingChildern((oldChild) => {
            return oldChild.concat(child);
          });
        } else if (diff < 2) {
          setTodayChildern((oldChild) => {
            return oldChild.concat(child);
          });
        } else if (diff > 1 && diff < 8) {
          setLateChildern((oldChild) => {
            return oldChild.concat(child);
          });
        } else {
          setVeryLateChildern((oldChild) => {
            return oldChild.concat(child);
          });
        }
      }
    });
    console.log("Got value", children);
  };

  async function initDb() {
    const store = new Storage();

    const db = await store.create();

    setDb(db);
  }

  useEffect(() => {
    updateOfflineData();
  }, [db]);

  const isChildSelect = (samId: string) => {
    let currSelectedChildNext: Child =
      allChildren.find((child) => {
        return child.samId == samId;
      }) ?? selectedChild;

    let allfollowUps: Followup[] = [];

    currSelectedChildNext.followUps.forEach((curfollow: Followup) => {
      if (curfollow.attempted == false) {
      } else {
        currSelectedChildNext.currGrowthStatus = curfollow?.growthStatus;
        currSelectedChildNext.currWeight = curfollow?.weight;
        curfollow.attemptedDate = new Date(
          curfollow.attemptedDate ?? curfollow.followupDate
        );
      }
      curfollow.followupDate = new Date(curfollow.followupDate);
      allfollowUps = allfollowUps.concat(curfollow);
    });
    currSelectedChildNext.followUps = allfollowUps;

    setChild((currChild) => currSelectedChildNext);
  };

  const isFollowUpSelect = (followUpId: string) => {
    selectedChild.followUps.forEach((curfollow: Followup) => {
      if (curfollow.followUpId == followUpId) {
        curfollow.attemptedDate = new Date(
          curfollow.attemptedDate ?? curfollow.followupDate
        );
        setFollowUp((currFollowUp) => curfollow);
      }
    });
  };

  const updateSyncFollowup = async () => {
    setSyncFollowup([]);
    const followups: Followup[] = (await db.get("synFollowUps")) ?? [];
    console.log(followups);
    setSyncFollowup(followups);
  };

  return (
    <ChildernContext.Provider
      value={{
        isLoad,
        isOn,
        isSync,
        isSession,
        db,
        allChildren,
        completedChildren,
        todayChildren,
        lateChildren,
        veryLateChildren,
        upcomingChildren,
        syncFollowup,
        selectedChild,
        selectedFollowUp,
        updateJwt,
        initContext,
        isChildSelect,
        isFollowUpSelect,
        updateData,
        updateSyncFollowup,
        getOfflineData,
        updateOfflineData,
      }}
    >
      {props.children}
    </ChildernContext.Provider>
  );
};

export default ChildernContextProvider;
