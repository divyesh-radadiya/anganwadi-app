import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonIcon
                    color="primary"
                    style={{ fontSize: "90px", color: "#0040ff" }}
                    icon={personCircle}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonText className="ion-text-head" color="primary">
                    <strong>AWW NAME</strong>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonText className="ion-text-subhead" color="primary">
                    <strong>AWC address</strong>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonItem></IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonButton
            // onClick={saveHandler}
            className="button-submit"
            slot="end"
            expand="block"
            color="primary"
            fill="solid"
            shape="round"
            // routerLink="/homePage"
          >
            Contact nrc
          </IonButton>
          <IonButton
            // onClick={saveHandler}
            className="button-submit"
            slot="end"
            expand="block"
            color="primary"
            fill="outline"
            shape="round"
            // routerLink="/homePage"
          >
            LogOut
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
