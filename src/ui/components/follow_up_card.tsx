import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  addOutline,
  chevronForwardOutline,
  pencilOutline,
} from "ionicons/icons";
import "../constants/card.css";
interface ContainerProps {
  name: string;
  isDone: boolean;
}

const FollowUpCard: React.FC<ContainerProps> = ({ name, isDone }) => {
  return (
    <IonCard className="ion-card">
      {isDone && (
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel color="primary" className="ion-text-subhead">
                Follow up No
              </IonLabel>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonText color="primary" className="ion-text-subhead">
                Growth status
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol>
              <IonText color="primary" className="ion-text-subhead">
                Follow up date
              </IonText>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonButton
                routerLink="/followUpPage"
                size="small"
                color="primary"
                fill="solid"
                shape="round"
                className="col-no-top"
              >
                Details
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}

      {!isDone && (
        <IonGrid>
          <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol className="col-no-left">
              <IonRow>
                <IonCol>
                  <IonLabel color="primary" className="ion-text-subhead">
                    Follow up No
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="primary" className="ion-text-subhead">
                    Follow up date
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonButton
                routerLink="/followUpPage"
                size="small"
                color="primary"
                fill="solid"
                shape="round"
              >
                Add
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </IonCard>
  );
};

export default FollowUpCard;
