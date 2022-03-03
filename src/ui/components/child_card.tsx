import {
  IonCard,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { Child } from "../../models/child";
import "../constants/card.css";
interface ContainerProps {
  child: Child;
}

const ChildCard: React.FC<ContainerProps> = ({ child }) => {
  return (
    <IonCard routerLink={`/childPage/${child.sam_id}`} className="ion-card">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel color="primary" className="ion-text-head">
              {child.name}
            </IonLabel>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              Samid: {child.sam_id}
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText color="primary" className="ion-text-subhead">
              Age: {child.age}
            </IonText>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              {child.is_done && "Done"}
              {!child.is_done && child.next_date?.toDateString()}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default ChildCard;
