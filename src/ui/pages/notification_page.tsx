import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


const NotificationPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
          <IonTitle>Notification page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <ExploreContainer name="Notification page" />
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
