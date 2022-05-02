import {
  IonAlert,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSlide,
  IonSlides,
  IonText,
  useIonLoading,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import ChildCard from "../components/child_card";
import "../constants/home.css";
import { useHistory } from "react-router";

import React, { useContext, useEffect, useState } from "react";
import { Child } from "../../models/child";
import ChildernContext from "../../stores/childern_contex";
import { useTranslation } from "react-i18next";
import { createStore, set } from "../../services/IonicStorage";
import OneSignal from "onesignal-cordova-plugin";
import UserContext from "../../stores/user_contex";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const childernCtx = useContext(ChildernContext);
  useEffect(() => {
    childernCtx.initContext();
  }, []);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.initData();
  }, []);

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (childernCtx.isLoad == true) {
      present({
        message: t("loading"),
      });
    } else {
      dismiss();
    }
  }, [childernCtx.isLoad]);

  const [selected, setSelected] = useState<string>("pending_children");

  useEffect(() => {
    if (childernCtx.isOn == false) {
      setShowAlert1(true);
    } else {
      setShowAlert1(false);
    }
  }, [childernCtx.isOn]);

  useEffect(() => {
    if (childernCtx.isSession == false) {
      setShowAlert3(true);
    } else {
      setShowAlert3(false);
    }
  }, [childernCtx.isSession]);

  useEffect(() => {
    if (childernCtx.isSync > 0) {
      setShowAlert2(true);
    } else {
      setShowAlert2(false);
    }
  }, [childernCtx.isSync]);

  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  const history = useHistory();

  const refreshHandler = () => {
    window.location.assign("/");
  };

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonText className="ion-text-topsubhead">
              {userCtx.curUser.name} Welcome back to,
            </IonText>
          </IonListHeader>
          <IonListHeader>
            <IonText className="ion-text-title">Anganwadi App</IonText>
          </IonListHeader>

          <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
              <IonCard className="ion-card-img">
                <IonImg src="assets/MUAC.jpg" />
              </IonCard>
            </IonSlide>
            <IonSlide>
              <IonCard className="ion-card-img">
                <IonImg src="assets/nrc.jpg" />
              </IonCard>
            </IonSlide>
            <IonSlide>
              <IonCard className="ion-card-img">
                <IonImg src="assets/nrc3.jpg" />
              </IonCard>
            </IonSlide>
          </IonSlides>

          <IonListHeader>
            <IonText className="ion-text-title">FollowUps</IonText>
          </IonListHeader>
          <IonSegment
            value={selected}
            onIonChange={(e) =>
              setSelected(e.detail.value ?? "pending_children")
            }
          >
            <IonSegmentButton value="pending_children">
              <IonLabel>Pending</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="completed_children">
              <IonLabel>Completed</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonCard></IonCard>

          {selected == "pending_children" &&
            childernCtx.todayChildren.length > 0 && (
              <IonItem>
                <IonText className="ion-text-head ion-text-success">
                  Today{" "}
                </IonText>
              </IonItem>
            )}

          {childernCtx.todayChildren.map((child: Child) => {
            return (
              selected == "pending_children" && (
                <ChildCard key={child.samId} child={child} />
              )
            );
          })}

          {selected == "pending_children" &&
            childernCtx.lateChildren.length > 0 && (
              <IonItem>
                <IonText className="ion-text-head ion-text-less-danger">
                  Late{" "}
                </IonText>
              </IonItem>
            )}

          {childernCtx.lateChildren.map((child: Child) => {
            return (
              selected == "pending_children" && (
                <ChildCard key={child.samId} child={child} />
              )
            );
          })}

          {selected == "pending_children" &&
            childernCtx.veryLateChildren.length > 0 && (
              <IonItem>
                <IonText className="ion-text-head ion-text-danger">
                  Very Late{" "}
                </IonText>
              </IonItem>
            )}

          {childernCtx.veryLateChildren.map((child: Child) => {
            return (
              selected == "pending_children" && (
                <ChildCard key={child.samId} child={child} />
              )
            );
          })}

          {selected == "pending_children" &&
            childernCtx.upcomingChildren.length > 0 && (
              <IonItem>
                <IonText className="ion-text-head">Up Coming </IonText>
              </IonItem>
            )}

          {childernCtx.upcomingChildren.map((child: Child) => {
            return (
              selected == "pending_children" && (
                <ChildCard key={child.samId} child={child} />
              )
            );
          })}

          {childernCtx.allChildren.map(
            (child: Child) =>
              selected == "completed_children" &&
              child.isDone && <ChildCard key={child.samId} child={child} />
          )}
        </IonList>

        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass="my-custom-class"
          header={t("alert")}
          message={t("offline_msg")}
          buttons={[t("OK")]}
        />

        <IonAlert
          isOpen={showAlert2}
          onDidDismiss={() => {
            setShowAlert2(false);
            childernCtx.initContext();
            history.push("/");
          }}
          cssClass="my-custom-class"
          header={"Success"}
          message={
            "Your Offline data ( Number of followups: " +
            childernCtx.isSync +
            ") updated online successfully!!"
          }
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={showAlert3}
          onDidDismiss={() => {
            setShowAlert3(false);
            createStore("APPDB");
            set("jwt", "none");
            set("userId", "none");
            OneSignal.removeExternalUserId();
            window.location.assign("/");
          }}
          cssClass="my-custom-class"
          header={"Alert"}
          message={"Session timeout!! Please, login again."}
          buttons={["OK"]}
        />
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="primary" onClick={refreshHandler}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
