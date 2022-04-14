import { Child } from "../models/child";
import { Followup } from "../models/followup";
import sendRequest, { putRequest } from "../services/network_service";
import ChildernContext from "./childern_contex";
import { useCallback, useEffect, useState } from "react";
import { Database, Drivers, Storage } from "@ionic/storage";
import { Network } from "@awesome-cordova-plugins/network";
// import IonicSecureStorageDriver from "@ionic-native/secure-storage/index";

const ChildernContextProvider: React.FC = (props) => {
  // const { userJWT } = useAuth();

  const [isOn, setOn] = useState<boolean>(true);
  const [isLoad, setLoad] = useState<boolean>(true);
  const [isSync, setSync] = useState<boolean>(false);

  const [userJWT, setUserJWT] = useState<string>("");

  const [allChildren, setChildern] = useState<Child[]>([
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

  const [searchChildren, setSearchChildern] = useState<Child[]>([]);

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
        await sendRequest(userJWT ?? "").then((data) => {
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

            curData["followUps"].forEach((curfollow: any) => {
              let newFollow: Followup = Object.assign(
                new Followup(),
                curfollow
              );
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

            setOnChildern((allOnChildren) => {
              return allOnChildren.concat(newChild);
            });
          });

          // setSearchChildern((allSearchChildren) => {
          //   return allChildren;
          // });
          setOn(true);
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
                setSync(true);
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
    const children = await db.get("childrenDataAll");
    setChildern((allChildren) => {
      return children;
    });
    setSearchChildern((allSearchChildren) => {
      return children;
    });

    console.log("Got value", children);
  };

  const updateSearchData = () => {
    setSearchChildern((allSearchChildren) => {
      return allChildren;
    });
  };

  async function initDb() {
    const store = new Storage();

    const db = await store.create();

    setDb(db);
  }

  useEffect(() => {
    updateOfflineData();
    updateSearchData();
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
    // allfollowUps.sort()
    // allfollowUps.sort(function(a, b) {
    //   return a.followupDate.getTime()-b.followupDate.getTime();
    // });
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

  const search = (searchType: string, name?: string) => {
    // setLoad(true);
    if (name == "" || name == null || name == undefined) {
      updateSearchData();
    } else {
      setSearchChildern(() => {
        return [];
      });

      if (searchType == "child_name") {
        allChildren.forEach((child: Child) => {
          if (name?.toLowerCase() == child.name.toLowerCase()) {
            setSearchChildern((allSearchChildren) => {
              return allSearchChildren.concat(child);
            });
          }
        });
      } else if (searchType == "sam_id") {
        allChildren.forEach((child: Child) => {
          if (name?.toLowerCase() == child.samId.toString().toLowerCase()) {
            setSearchChildern((allSearchChildren) => {
              return allSearchChildren.concat(child);
            });
          }
        });
      } else if (searchType == "mobile_no") {
        allChildren.forEach((child: Child) => {
          if (
            name?.toLowerCase() == child.contactNumber.toString().toLowerCase()
          ) {
            setSearchChildern((allSearchChildren) => {
              return allSearchChildren.concat(child);
            });
          }
        });
      }
    }
    // setLoad(false);
  };

  return (
    <ChildernContext.Provider
      value={{
        isLoad,
        isOn,
        isSync,
        db,
        allChildren,
        searchChildren,
        selectedChild,
        selectedFollowUp,
        updateJwt,
        initContext,
        isChildSelect,
        isFollowUpSelect,
        search,
        updateData,
        getOfflineData,
        updateOfflineData,
        updateSearchData,
      }}
    >
      {props.children}
    </ChildernContext.Provider>
  );
};

export default ChildernContextProvider;
