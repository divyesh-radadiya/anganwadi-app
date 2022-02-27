import {
  IonCard,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import "../constants/card.css";
interface ContainerProps {
  name: string;
}

const ChildCard: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonCard routerLink="/childPage" className="ion-card">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel color="primary" className="ion-text-head">
              {name}
            </IonLabel>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              Sam id
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText color="primary" className="ion-text-subhead">
              Age
            </IonText>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              Follow up date
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default ChildCard;
