import {
  IonAlert,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { optionsOutline, refreshOutline } from "ionicons/icons";
import ChildCard from "../components/child_card";
import "../constants/home.css";
import { useHistory } from "react-router";

import React, { useContext, useEffect, useState } from "react";
import { Child } from "../../models/child";
import ChildernContext from "../../stores/childern_contex";
import FilterModal from "../components/filter_modal";
import { useTranslation } from "react-i18next";
import { createStore, set } from "../../services/IonicStorage";
import OneSignal from "onesignal-cordova-plugin";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const childernCtx = useContext(ChildernContext);
  useEffect(() => {
    childernCtx.initContext();
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

  const [isAdding, setIsAdding] = useState(false);

  const [selected, setSelected] = useState<string>("pending_children");

  const startAddFilterHandler = () => {
    setIsAdding(true);
  };

  const cancelAddFilterHandler = () => {
    setIsAdding(false);
  };

  const filterAddHandler = (curr: string) => {
    setSelected((old) => {
      return curr;
    });

    setIsAdding(false);
  };

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
    if (childernCtx.isSync == true) {
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

  return (
    <IonPage>
      <FilterModal
        show={isAdding}
        onCancel={cancelAddFilterHandler}
        onSave={filterAddHandler}
      />
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            {selected == "pending_children" ? (
              <strong>{t("pending_children")}</strong>
            ) : (
              <strong>{t("completed_children")}</strong>
            )}
          </IonText>
          {/* <IonButton
            slot="end"
            // size="large"
            color="primary"
            fill="solid"
            shape="round"
            
          > */}
          <IonButton onClick={startAddFilterHandler} fill="clear" slot="end">
            <IonIcon
              icon={optionsOutline}
              color="primary"
              size="large"
              onClick={startAddFilterHandler}
            />
          </IonButton>

          {/* </IonButton> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {childernCtx.allChildren.map(
            (child: Child) =>
              (selected == "pending_children"
                ? !child.isDone
                : child.isDone) && <ChildCard key={child.samId} child={child} />
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
          header={"Alert"}
          message={"Sync data updated online successfully!!"}
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
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="primary" onClick={refreshHandler}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
