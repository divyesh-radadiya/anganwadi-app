import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


const SearchPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader  collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Search page" />
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
