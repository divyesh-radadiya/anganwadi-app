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
import { useParams } from "react-router";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import { Followup } from "../../models/followup";
import FollowUpCard from "../components/follow_up_card";

import "../constants/home.css";

const ChildPage: React.FC = () => {
  const selectedChildId = useParams<{ childId: string }>().childId;
  const AllChildren: Child[] = Children;
  const selectedChild = AllChildren.find(
    (child) => child.sam_id === selectedChildId
  );

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
                  <IonText className="ion-text-subhead">Growth status</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-end" class="col-no-top">
                  <IonText className="ion-text-subhead">Weight</IonText>
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
              Sam id : {selectedChild?.sam_id}
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
              Phone No : {selectedChild?.phone_no}
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
            {selectedChild?.followups.map((followup: Followup) => (
              <FollowUpCard
                key={followup.given_date.toString()}
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
