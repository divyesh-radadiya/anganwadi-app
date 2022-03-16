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
  IonIcon,
} from "@ionic/react";

import { calendarOutline } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router";
import ChildernContext from "../../stores/childern_contex";
import DateModal from "../components/date_modal";

import "../constants/home.css";

const FollowUpPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);

  const [isAdding, setIsAdding] = useState(false);
  const [cDate, setCDate] = useState<Date>(new Date());

  const startAddDateHandler = () => {
    setIsAdding(true);
  };

  const cancelAddDateHandler = () => {
    setIsAdding(false);
  };

  const dateAddHandler = (date: Date) => {
    setCDate((oDate) => {
      return date;
    });
    setIsAdding(false);
  };

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
                      readonly
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
                      readonly
                      inputmode="numeric"
                    ></IonInput>
                  </IonCard>
                </IonCol>
                <IonCol className="col-right col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Height"
                      value={childernCtx.selectedFollowUp?.height?.toString()}
                      readonly
                      inputmode="numeric"
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
                      readonly
                      inputmode="numeric"
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
                      readonly
                      inputmode="text"
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
                      readonly
                      inputmode="text"
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}

          {!childernCtx.selectedFollowUp?.attempted && (
            <IonGrid className="grid-no-top">
              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonRow>
                      <IonCol class="col-no-top">
                        <IonInput
                          placeholder="Date"
                          value={cDate.toDateString()}
                        ></IonInput>
                      </IonCol>

                      <IonCol size="1.5" class="col-no-top">
                        <IonIcon
                          color="primary"
                          size="large"
                          icon={calendarOutline}
                          onClick={startAddDateHandler}
                        />
                        <DateModal
                          show={isAdding}
                          onCancel={cancelAddDateHandler}
                          onSave={dateAddHandler}
                        />
                      </IonCol>
                    </IonRow>

                    {/* <IonDatetime placeholder="Select Date"></IonDatetime> */}
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-left col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Weight"
                      inputmode="numeric"

                      // value={childernCtx.selectedFollowUp?.weight?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
                <IonCol className="col-right col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Height"
                      inputmode="numeric"

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
                      inputmode="numeric"

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
                      inputmode="text"

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
                      inputmode="text"

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
