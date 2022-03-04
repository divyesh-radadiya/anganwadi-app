import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import { Followup } from "../../models/followup";
import FollowUpCard from "../components/follow_up_card";
import sendRequest from "../../services/getdata";

import "../constants/home.css";

const ChildPage: React.FC = () => {
  const selectedChildId = useParams<{ childId: string }>().childId;
  const AllChildren: Child[] = Children;
  // const selectedChild = AllChildren.find(
  //   (child) => child.samId === selectedChildId
  // );
  // console.log(selectedChildId);

  const [selectedChild, setChild] = useState<Child>();
  const [selectedStatus, setStatus] = useState<String | undefined>("-");
  const [selectedWeight, setWeight] = useState<any>("0");
  // let status = "-";

  React.useEffect(() => {
    sendRequest().then((data) => {
      data.forEach((curData: any) => {
        if (curData["child"]["samId"].toString() == selectedChildId) {
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
            } else {
              setStatus(() => {
                return newFollow?.growthStatus?.toUpperCase();
              });
              // status=newFollow?.growthStatus?.toUpperCase();
              setWeight(() => {
                return newFollow.weight?.toString();
              });
            }
            newFollow.followupDate = new Date(newFollow.followupDate);
            allfollowUps = allfollowUps.concat(newFollow);
          });
          newChild.followUps = allfollowUps;
          newChild.isDone = isDone;
          newChild.nextDate = new Date(nextDate);
          newChild.nextFollowupid = nextFollowupid;

          setChild(() => {
            return newChild;
          });
          console.log(newChild.followUps);
        }
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
          <IonText slot="start" color="primary" className="ion-text-title">
            {selectedChild?.name}
          </IonText>
          <div className="box" slot="end">
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-end" class="col-no-top">
                  <IonText className="ion-text-subhead">
                    {selectedStatus}
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-end" class="col-no-top">
                  <IonText className="ion-text-subhead">
                    {selectedWeight} KG
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonText className="ion-text-head">Basic details</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Sam id : {selectedChild?.samId}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Age : {selectedChild?.age}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Gender : {selectedChild?.gender}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Address : {selectedChild?.address}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Phone No : {selectedChild?.contactNumber}
            </IonText>
          </IonItem>

          {/* <IonItem>
            <IonText className="ion-text-head">Next follow up</IonText>
          </IonItem> */}
          {/* <FollowUpCard name="Child 1" isDone={false} /> */}

          {/* <FollowUpCard
            key={selectedChild?.followups[
              selectedChild?.next_followupid?
            ].given_date.toString()}
            
            followup={selectedChild?.followups[
              selectedChild?.next_followupid?
            ]}
          /> */}

          <IonItem>
            <IonText className="ion-text-head">All follow ups</IonText>
          </IonItem>
          {/* <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} /> */}
          <IonList>
            {selectedChild?.followUps.map((followup: Followup) => (
              <FollowUpCard
                key={followup.followUpId}
                followup={followup}
                childId={selectedChildId}
              />
            ))}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChildPage;
