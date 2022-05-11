import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { Followup } from "../../models/followup";
import { chevronBackOutline, refreshOutline } from "ionicons/icons";
import "../constants/home.css";
import ChildernContext from "../../stores/childern_contex";
import { useHistory } from "react-router";
import SyncFollowUpCard from "../components/sync_follow_up_card";
import { useTranslation } from "react-i18next";

const SyncPage: React.FC = () => {
  const { t } = useTranslation();

  const childernCtx = useContext(ChildernContext);

  const history = useHistory();

  useEffect(() => {
    childernCtx.updateSyncFollowup();
  }, []);

  const clearData = () => {
    childernCtx.initContext();
    history.push("/");
  };

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonButton
            onClick={() => {
              history.goBack();
            }}
            slot="start"
            fill="clear"
          >
            <IonIcon
              icon={chevronBackOutline}
              color="primary"
              size="large"
              onClick={() => {
                history.goBack();
              }}
            />
          </IonButton>

          <IonText slot="start" color="primary">
            <strong> {t("all_sync_follow_ups")}</strong>
          </IonText>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {childernCtx.syncFollowup.map((followup: Followup) => {
            return (
              <SyncFollowUpCard key={followup.followUpId} followup={followup} />
            );
          })}
          {childernCtx.syncFollowup.length == 0 && (
            <IonGrid>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonItem></IonItem>
                  <IonText className="ion-text-subhead" color="primary">
                    <strong>No Data found</strong>
                  </IonText>
                  <IonItem></IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonList>
      </IonContent>
      <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton color="primary" onClick={clearData}>
          <IonIcon icon={refreshOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default SyncPage;
