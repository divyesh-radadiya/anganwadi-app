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
import { Child } from "../../models/child";
import ChildernContext from "../../stores/childern_contex";
import "../constants/card.css";
interface ContainerProps {
  child: Child;
}

const ChildCard: React.FC<ContainerProps> = ({ child }) => {
  const childernCtx = useContext(ChildernContext);
  const clickHandler = () => {
    childernCtx.isChildSelect(child.samId);
  };
  const { t } = useTranslation();

  return (
    <IonCard
      // onClick={() => {
      //   childernCtx.isSelect(child.samId);
      // }}
      routerLink={`/dashbord/childPage`}
      onClick={clickHandler}
      className={
        child.currGrowthStatus == "SAM" ? "ion-card-danger" : "ion-card-success"
      }
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
              {t("samid")}: {child.samId}
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText color="primary" className="ion-text-subhead">
              {t("age")}: {child.age}
            </IonText>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              {child.isDone && t("done")}
              {!child.isDone && child.nextDate?.toDateString()}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default ChildCard;
