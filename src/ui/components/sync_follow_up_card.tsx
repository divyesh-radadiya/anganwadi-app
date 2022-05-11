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
import { addOutline } from "ionicons/icons";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Followup } from "../../models/followup";
import ChildernContext from "../../stores/childern_contex";
import "../constants/card.css";
interface ContainerProps {
  followup: Followup;
}

const SyncFollowUpCard: React.FC<ContainerProps> = ({ followup }) => {
  // const childernCtx = useContext(ChildernContext);
  // const clickHandler = () => {
  //   childernCtx.isFollowUpSelect(followup.followUpId);
  // };
  const { t } = useTranslation();

  return followup.attempted ? (
    <IonCard
      className={
        followup.growthStatus == "SAM" ? "ion-card-danger" : "ion-card-success"
      }
    >
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel color="primary" className="ion-text-subhead">
              {t("follow_up_id")} {followup.followUpId}
            </IonLabel>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonText color="primary" className="ion-text-subhead">
              {t("Status")}: {followup.growthStatus}
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
          <IonCol>
            <IonText color="primary" className="ion-text-subhead">
              {followup.attemptedDate?.toDateString()}
            </IonText>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonButton
              // routerLink={`/dashbord/followUpPage`}
              // onClick={clickHandler}
              size="small"
              color="primary"
              fill="solid"
              shape="round"
              className="col-no-top"
            >
              {followup.weight} {t("KG")}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  ) : (
    <IonCard className="ion-card">
      <IonGrid>
        <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
          <IonCol className="col-no-left">
            <IonRow>
              <IonCol>
                <IonLabel color="primary" className="ion-text-subhead">
                  Follow up id {followup.followUpId}
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel color="primary" className="ion-text-subhead">
                  {followup.followupDate.toDateString()}
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonButton
              routerLink={`/dashbord/followUpPage`}
              // onClick={clickHandler}
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
    </IonCard>
  );
};

export default SyncFollowUpCard;
