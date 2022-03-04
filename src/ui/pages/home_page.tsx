import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import ChildCard from "../components/child_card";
import "../constants/home.css";

import React from "react";
import { useState } from "react";
import sendRequest from "../../services/getdata";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import { Followup } from "../../models/followup";

const HomePage: React.FC = () => {
  // const AllChildren: Child[] = Children;

  const [listChild, setListChild] = useState<Child[]>([]);

  React.useEffect(() => {
    sendRequest().then((data) => {
      setListChild(() => {
        return [];
      });

      data.forEach((curData: any) => {
        let newChild: Child = Object.assign(new Child(), curData["child"]);
        // let newChild: Child = Object.assign(new Child(), curData["followUps"]);
        let allfollowUps: Followup[] = [];
        let isDone = true;
        let nextDate = new Date();
        let nextFollowupid = "-";

        curData["followUps"].forEach((curfollow: any) => {
          let newFollow: Followup = Object.assign(new Followup(), curfollow);
          if (newFollow.attempted == false) {
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

        setListChild((listChild) => {
          return listChild.concat(newChild);
        });

        console.log(newChild);
      });
      // setListChild()
      // setListItems(data);
      // console.log(data);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            <strong>Pending children</strong>
          </IonText>
          <IonButton
            slot="end"
            size="small"
            color="primary"
            fill="solid"
            shape="round"
          >
            Sort by
            <IonIcon icon={chevronDownOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonList color="primary">
          {listItems.map((item: any) => {
            return <ChildCard key={item["id"]} name={item["username"]} />;
          })}
        </IonList> */}
        <IonList>
          {listChild.map(
            (child: Child) =>
              !child.isDone && <ChildCard key={child.samId} child={child} />
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
