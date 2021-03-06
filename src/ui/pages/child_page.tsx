import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
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
import React, { useContext } from "react";
import { Followup } from "../../models/followup";
import FollowUpCard from "../components/follow_up_card";
import { chevronBackOutline } from "ionicons/icons";

import "../constants/home.css";
import ChildernContext from "../../stores/childern_contex";
import { useHistory } from "react-router";

const ChildPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);
  const history = useHistory();
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
            {childernCtx.selectedChild?.name}
          </IonText>
          <div className="box" slot="end">
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-end " class="col-no-top">
                  <IonText
                    className={
                      childernCtx.selectedChild.currGrowthStatus?.toString() ==
                      "SAM"
                        ? "ion-text-subhead ion-text-danger"
                        : childernCtx.selectedChild.currGrowthStatus?.toString() ==
                          "Normal"
                        ? "ion-text-subhead ion-text-success"
                        : "ion-text-subhead"
                    }
                  >
                    {childernCtx.selectedChild.currGrowthStatus}
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-end" class="col-no-top">
                  <IonText
                    className={
                      childernCtx.selectedChild.currGrowthStatus?.toString() ==
                      "SAM"
                        ? "ion-text-subhead ion-text-danger"
                        : childernCtx.selectedChild.currGrowthStatus?.toString() ==
                          "Normal"
                        ? "ion-text-subhead ion-text-success"
                        : "ion-text-subhead"
                    }
                  >
                    {childernCtx.selectedChild.currWeight} KG
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonText className="ion-text-head">Basic details</IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Sam id : {childernCtx.selectedChild?.samId}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Age : {childernCtx.selectedChild?.age}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Gender : {childernCtx.selectedChild?.gender}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Address : {childernCtx.selectedChild?.address}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Phone No : {childernCtx.selectedChild?.contactNumber}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-head">All follow ups</IonText>
          </IonItem>

          <IonList>
            {childernCtx.selectedChild?.followUps.map((followup: Followup) => {
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

export default ChildPage;
