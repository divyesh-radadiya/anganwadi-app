import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonSearchbar,
  IonToolbar,
  IonList,
  IonCard,
  IonIcon,
  IonRow,
  IonCol,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import { Followup } from "../../models/followup";
import sendRequest from "../../services/getdata";
import ChildCard from "../components/child_card";
import "../constants/search.css";

const SearchPage: React.FC = () => {
  const AllChildren: Child[] = Children;

  const [searchText, setSearchText] = useState("");

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
        newChild.nextDate = nextDate;
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

  // searchbar.addEventListener('ionInput', handleInput);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar className="IonToolbar">
          <IonText slot="start">
            <strong>Search page</strong>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="ion-card">
          <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol>
              <IonSearchbar
                searchIcon="undefined"
                showClearButton="never"
                className="ion-searchbar"
              ></IonSearchbar>
            </IonCol>
            <IonCol className="ion-text-center" size="2">
              <IonIcon size="large" color="primary" icon={searchOutline} />
            </IonCol>
          </IonRow>
        </IonCard>
        <IonList>
          {/* <ChildCard name="Child 1" />
          <ChildCard name="Child 2" />
          <ChildCard name="Child 3" /> */}
          <IonList>
            {listChild.map((child: Child) => (
              <ChildCard key={child.samId} child={child} />
            ))}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
