import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSegment,
  IonText,
  IonToolbar,
} from "@ionic/react";
import FollowUpCard from "../components/follow_up_card";

import "../constants/home.css";

const ChildPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary" className="ion-text-title">
            Child 1
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
            <IonText className="ion-text-subhead">Sam id : {"123456"}</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">Age : {"1"}</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">Address : {"sdsd"}</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-head">Next follow up</IonText>
          </IonItem>
          <FollowUpCard name="Child 1" isDone={false} />

          <IonItem>
            <IonText className="ion-text-head">All follow ups</IonText>
          </IonItem>
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
          <FollowUpCard name="Child 1" isDone={true} />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChildPage;
