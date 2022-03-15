import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { idCardSharp } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import { Followup } from "../../models/followup";
import sendRequest from "../../services/getdata";
import ChildernContext from "../../stores/childern_contex";

import "../constants/home.css";

const FollowUpPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);

  // const selectedChildId = useParams<{ childId: string }>().childId;
  const selectedFollowUpId = useParams<{ id: string }>().id;

  // const AllChildren: Child[] = Children;
  // const selectedChild = AllChildren.find(
  //   (child) => child.samId === selectedChildId
  // );
  // const selectedFollowUp = selectedChild?.followUps.find(
  //   (followup) => followup.followUpId === selectedFollowUpId
  // );

  // const [selectedFollowUp, setFollow] = useState<Followup>();
  // const [selectedChild, setChild] = useState<Child>();

  React.useEffect(() => {
    sendRequest().then((data) => {
      childernCtx.isFollowUpSelect(selectedFollowUpId);

      console.log("fffffffffffffffff");

      // data.forEach((curData: any) => {
      //   if (curData["child"]["samId"].toString() == selectedChildId) {
      //     let newChild: Child = Object.assign(new Child(), curData["child"]);
      //     // let newChild: Child = Object.assign(new Child(), curData["followUps"]);
      //     setChild(() => {
      //       return newChild;
      //     });
      //     curData["followUps"].forEach((curfollow: any) => {
      //       if (curfollow["followUpId"] == selectedFollowUpId) {
      //         let newFollow: Followup = Object.assign(
      //           new Followup(),
      //           curfollow
      //         );
      //         console.log(newFollow);
      //         newFollow.followupDate = new Date(newFollow.followupDate);
      //         newFollow.attemptedDate = new Date(
      //           newFollow.attemptedDate ?? newFollow.followupDate
      //         );
      //         setFollow(() => {
      //           return newFollow;
      //         });
      //       }
      //     });
      //   }
      // });
      // setListChild()
      // setListItems(data);
      // console.log(data);
    });
  }, []);

  // const textRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary" className="ion-text-title">
            Follow up {childernCtx.selectedFollowUp?.followUpId}
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonText className="ion-text-subhead">
              Sam id : {childernCtx.selectedChild?.samId}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              name : {childernCtx.selectedChild?.name}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Address : {childernCtx.selectedChild?.address}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-head">Enter details</IonText>
          </IonItem>

          {childernCtx.selectedFollowUp?.attempted && (
            <IonGrid>
              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Date"
                      value={childernCtx.selectedFollowUp?.attemptedDate?.toDateString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-left col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Weight"
                      value={childernCtx.selectedFollowUp?.weight?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
                <IonCol className="col-right col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Height"
                      value={childernCtx.selectedFollowUp?.height?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Middle upper arm circumference"
                      value={childernCtx.selectedFollowUp?.muac?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Growth status"
                      value={childernCtx.selectedFollowUp?.growthStatus?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Any other symptoms"
                      value={childernCtx.selectedFollowUp?.symptoms?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}

          {!childernCtx.selectedFollowUp?.attempted && (
            <IonGrid>
              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Date"
                      // value={childernCtx.selectedFollowUp?.attemptedDate?.toDateString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-left col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Weight"
                      // value={childernCtx.selectedFollowUp?.weight?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
                <IonCol className="col-right col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Height"
                      // value={childernCtx.selectedFollowUp?.height?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Middle upper arm circumference"
                      // value={childernCtx.selectedFollowUp?.muac?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Growth status"
                      // value={childernCtx.selectedFollowUp?.growthStatus?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Any other symptoms"
                      // value={childernCtx.selectedFollowUp?.symptoms?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}

          {childernCtx.selectedFollowUp?.attempted && (
            <IonButton
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              routerLink="/homePage"
            >
              Done
            </IonButton>
          )}
          {!childernCtx.selectedFollowUp?.attempted && (
            <IonButton
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              routerLink="/homePage"
            >
              Submit
            </IonButton>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FollowUpPage;
