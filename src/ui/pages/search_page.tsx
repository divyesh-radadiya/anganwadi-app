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
import ChildCard from "../components/child_card";
import "../constants/search.css";

const SearchPage: React.FC = () => {
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
          <ChildCard name="Child 1" />
          <ChildCard name="Child 2" />
          <ChildCard name="Child 3" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
