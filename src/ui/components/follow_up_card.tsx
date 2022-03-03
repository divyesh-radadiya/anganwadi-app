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
import { Followup } from "../../models/followup";
import "../constants/card.css";
interface ContainerProps {
  followup: Followup;
  childId: string;
}

const FollowUpCard: React.FC<ContainerProps> = ({ followup, childId }) => {
  return (
    <IonCard className="ion-card">
      {followup.attempted && (
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel color="primary" className="ion-text-subhead">
                Follow up {followup.followUpId}
              </IonLabel>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonText color="primary" className="ion-text-subhead">
                Status: {followup.growthStatus}
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol>
              <IonText color="primary" className="ion-text-subhead">
                {followup.followupDate}
              </IonText>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonButton
                routerLink={`/followUpPage/${childId}/${followup.followUpId}`}
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

      {!followup.attempted && (
        <IonGrid>
          <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol className="col-no-left">
              <IonRow>
                <IonCol>
                  <IonLabel color="primary" className="ion-text-subhead">
                    Follow up {followup.followUpId}
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="primary" className="ion-text-subhead">
                    {followup.followupDate}
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonButton
                routerLink={`/followUpPage/${childId}/${followup.followUpId}`}
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
