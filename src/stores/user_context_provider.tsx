import { Child } from "../models/child";
import { Followup } from "../models/followup";
import { getUser } from "../services/network_service";
import { useEffect, useState } from "react";
import { Database, Storage } from "@ionic/storage";
import { Network } from "@awesome-cordova-plugins/network";
import UserContext from "./user_contex";
import { Aww } from "../models/aww";

const UserContextProvider: React.FC = (props) => {
  const [isOn, setOn] = useState<boolean>(true);
  const [isLoad, setLoad] = useState<boolean>(false);

  const [db, setDb] = useState<Database>();

  const [curUser, setCurUser] = useState<Aww>({
    userId: "1",
    awwId: "1",
    name: "Anjali Kumari",
    awc: {
      awcId: "1",
      name: "Central AWC",
      address: "Random street, Bangalore",
      pincode: "461001",
      latitude: 34.5678,
      longitude: 76.4758,
    },
  });

  const [curOnUser, setCurOnUser] = useState<Aww>({
    userId: "1",
    awwId: "1",
    name: "Anjali Kumari",
    awc: {
      awcId: "1",
      name: "Central AWC",
      address: "Random street, Bangalore",
      pincode: "461001",
      latitude: 34.5678,
      longitude: 76.4758,
    },
  });
  var synFollowUps: Followup[] = [];
  var allChildren: Child[] = [];

  const [userJWT, setUserJWT] = useState<string>("");

  const updateJwt = (jwt: string) => {
    setUserJWT(jwt);
  };

  const initData = async () => {
    setLoad(true);
    setOn(true);

    await updateData();

    await initDb();

    setLoad(false);
  };

  const updateData = async () => {
    try {
      if (Network.type == Network.Connection.NONE) {
        setOn(false);
      } else {
        await getUser(userJWT ?? "").then((data) => {
          let newAww: Aww = Object.assign(new Aww(), data["aww"]);

          newAww.userId = data["userId"].toString();

          setCurOnUser(newAww);

          setOn(true);
        });
      }
    } catch (exception_var) {
      setOn(false);
    }
  };

  const updateOfflineData = async () => {
    if (isOn) {
      await db.set("curUser", curOnUser);

      await getOfflineData();
    } else {
      await getOfflineData();
    }
  };

  const getOfflineData = async () => {
    const newUser: Aww = await db.get("curUser");
    setCurUser(newUser);

    console.log("Got value", newUser);
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
    <UserContext.Provider
      value={{
        isLoad,
        isOn,
        db,
        curUser,
        updateJwt,
        initData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
