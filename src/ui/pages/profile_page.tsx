import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <strong>Profile page</strong>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <ExploreContainer name="Profile page" />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
