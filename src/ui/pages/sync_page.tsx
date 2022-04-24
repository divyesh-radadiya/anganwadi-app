import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { Followup } from "../../models/followup";
import FollowUpCard from "../components/follow_up_card";
import { chevronBackOutline } from "ionicons/icons";

import "../constants/home.css";
import ChildernContext from "../../stores/childern_contex";
import { useHistory } from "react-router";

const SyncPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);
  const history = useHistory();
  useEffect(() => {
    childernCtx.updateSyncFollowup();
  }, []);
  var i = 0;
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
              }} // onClick={startSearchTypeAddHandler}
            />
          </IonButton>
          <IonText slot="start" color="primary" className="ion-text-title">
            All Sync follow ups
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonList>
            {childernCtx.syncFollowup.map((followup: Followup) => {
              i++;
              return (
                <FollowUpCard
                  key={followup.followUpId}
                  no={i}
                  followup={followup}
                  childId={childernCtx.selectedChild.samId}
                />
              );
            })}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SyncPage;
