import {
  IonCard,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ChildernContext from "../../stores/childern_contex";
import "../constants/card.css";
interface ContainerProps {
  notif: any;
}

const NotificationCard: React.FC<ContainerProps> = ({ notif }) => {
  // const childernCtx = useContext(ChildernContext);
  // const clickHandler = () => {
  //   childernCtx.isChildSelect(child.samId);
  // };
  const { t } = useTranslation();

  return (
    <IonCard
      // onClick={() => {
      //   childernCtx.isSelect(child.samId);
      // }}
      // routerLink={`/dashbord/childPage`}
      // onClick={clickHandler}
      className="ion-card"
    >
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel color="primary" className="ion-text-head">
              {notif.title}
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText color="primary" className="ion-text-subhead">
              {notif.body}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default NotificationCard;
