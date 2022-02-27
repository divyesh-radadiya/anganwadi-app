import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";

import "../constants/home.css";

const FollowUpPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary" className="ion-text-title">
            Follow up 1
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonText className="ion-text-subhead">Sam id : {"123456"}</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">name : {"asdsd"}</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">Address : {"sdsd"}</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-head">Enter details</IonText>
          </IonItem>

          <IonGrid>
            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput placeholder="Date"></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-left col-no-top">
                <IonCard className="ion-card">
                  <IonInput placeholder="Weight"></IonInput>
                </IonCard>
              </IonCol>
              <IonCol className="col-right col-no-top">
                <IonCard className="ion-card">
                  <IonInput placeholder="Height"></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput placeholder="Middle upper arm circumference"></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput placeholder="Growth status"></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput placeholder="Any other symptoms"></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonButton
            className="button-submit"
            slot="end"
            expand="block"
            color="primary"
            fill="solid"
            shape="round"
          >
            Submit
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FollowUpPage;
