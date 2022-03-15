import {
  IonCard,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { useContext } from "react";
import { Child } from "../../models/child";
import ChildernContext from "../../stores/childern_contex";
import "../constants/card.css";
interface ContainerProps {
  child: Child;
}

const ChildCard: React.FC<ContainerProps> = ({ child }) => {
  const childernCtx = useContext(ChildernContext);

  return (
    <IonCard
      // onClick={() => {
      //   childernCtx.isSelect(child.samId);
      // }}
      routerLink={`/childPage/${child.samId}`}
      className="ion-card"
    >
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel color="primary" className="ion-text-head">
              {child.name}
            </IonLabel>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              Samid: {child.samId}
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
              {child.isDone && "Done"}
              {!child.isDone && child.nextDate?.toDateString()}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default ChildCard;
