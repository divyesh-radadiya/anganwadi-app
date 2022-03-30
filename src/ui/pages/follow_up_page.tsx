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
  useIonLoading,
  IonAlert,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

import { calendarOutline, chevronBackOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Followup } from "../../models/followup";
import ChildernContext from "../../stores/childern_contex";
import FollowupContext from "../../stores/followup_contex";
import DateModal from "../components/date_modal";

import "../constants/home.css";

const FollowUpPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);
  const followupCtx = useContext(FollowupContext);

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

  const [error, setError] = useState("");

  const dateRef = useRef<HTMLIonInputElement>(null);
  const weightRef = useRef<HTMLIonInputElement>(null);
  const heightRef = useRef<HTMLIonInputElement>(null);
  const muacRef = useRef<HTMLIonInputElement>(null);
  const growthStatusRef = useRef<HTMLIonInputElement>(null);
  const symptomsRef = useRef<HTMLIonInputElement>(null);

  const saveHandler = () => {
    const selectedDate = dateRef.current!.value;
    const enteredWeight = weightRef.current!.value;
    const enteredHeight = heightRef.current!.value;
    const enteredMuac = muacRef.current!.value;
    const enteredGrowthStatus = growthStatusRef.current!.value;
    const enteredSymptoms = symptomsRef.current!.value;

    if (
      !selectedDate ||
      !enteredWeight ||
      !enteredHeight ||
      !enteredMuac ||
      !enteredGrowthStatus ||
      !enteredSymptoms ||
      selectedDate.toString().trim().length === 0 ||
      enteredWeight.toString().trim().length === 0 ||
      enteredHeight.toString().trim().length === 0 ||
      enteredMuac.toString().trim().length === 0 ||
      enteredGrowthStatus.toString().trim().length === 0 ||
      enteredSymptoms.toString().trim().length === 0
    ) {
      setError("Please enter a valid data.");
      return;
    }
    setError("");

    const curFollowUp = childernCtx.selectedFollowUp;
    curFollowUp.followUpId = childernCtx.selectedFollowUp.followUpId;
    curFollowUp.attemptedDate = new Date(selectedDate);
    curFollowUp.weight = enteredWeight as Number;
    curFollowUp.height = enteredHeight as Number;
    curFollowUp.muac = enteredMuac as Number;
    curFollowUp.growthStatus = enteredGrowthStatus as string;
    curFollowUp.symptoms = enteredSymptoms as string;
    curFollowUp.attempted = true;

    console.log("*", curFollowUp.growthStatus);
    console.log("***", childernCtx.selectedChild.followUps);

    console.log(curFollowUp);

    followupCtx.onSubmit(curFollowUp, childernCtx.selectedChild);

    // props.onSave(enteredTitle.toString(), new Date(selectedDate));
  };

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (followupCtx.isLoad == 11) {
      present({
        message: "Loading...",
      });
    } else {
      dismiss();
      if (followupCtx.isLoad == 10) {
        setShowAlert1(true);
      } else if (followupCtx.isLoad == 1) {
        setShowAlert2(true);
      }
    }
    console.log("load......", followupCtx.isLoad);
  }, [followupCtx.isLoad]);

  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  const history = useHistory();

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
          <IonText slot="start" color="primary" className="ion-text-title">
            Follow up {childernCtx.selectedFollowUp?.followUpId}
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => {
            setShowAlert1(false);
            childernCtx.initContext();
            history.push("/");
          }}
          cssClass="my-custom-class"
          header={"Alert"}
          message={"Data updated online successfully!!"}
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={showAlert2}
          onDidDismiss={() => {
            setShowAlert2(false);
            childernCtx.initContext();
            history.push("/");
          }}
          cssClass="my-custom-class"
          header={"Alert"}
          message={"Data updated offline successfully!!"}
          buttons={["OK"]}
        />
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
                          readonly
                          ref={dateRef}
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
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol className="col-left col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Weight"
                      inputmode="numeric"
                      ref={weightRef}
                      // value={childernCtx.selectedFollowUp?.weight?.toString()}
                      value={12}
                    ></IonInput>
                  </IonCard>
                </IonCol>
                <IonCol className="col-right col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      placeholder="Height"
                      inputmode="numeric"
                      ref={heightRef}
                      value={60}

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
                      ref={muacRef}
                      value={4.7}

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
                      ref={growthStatusRef}
                      value={"MAM"}

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
                      ref={symptomsRef}
                      value={"None"}

                      // value={childernCtx.selectedFollowUp?.symptoms?.toString()}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
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
              onClick={saveHandler}
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              // routerLink="/homePage"
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
