import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { optionsOutline, personCircle } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { createStore, set } from "../../services/IonicStorage";
import UserContext from "../../stores/user_contex";
import OneSignal from "onesignal-cordova-plugin";
import LangModal from "../components/lang_modal";

const ProfilePage: React.FC = () => {
  const userCtx = useContext(UserContext);

  const [selectedType, setSelectedType] = useState<string>("en");

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  const [isAdding, setIsAdding] = useState(false);

  const startLangTypeAddHandler = () => {
    setIsAdding(true);
  };

  const cancelAddLangTypeHandler = () => {
    setIsAdding(false);
  };

  const langTypeAddHandler = (curr: string) => {
    setSelectedType(curr);
    i18n.changeLanguage(curr);
    setIsAdding(false);
  };

  const [logO, setLogO] = useState(false);

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (userCtx.isLoad == true) {
      present({
        message: t("loading"),
      });
    } else {
      dismiss();
    }
  }, [userCtx.isLoad]);

  const handleLogout = () => {
    try {
      createStore("APPDB");
      set("jwt", "none");
      set("userId", "none");
      set("notification", []);
      OneSignal.removeExternalUserId();
      setLogO(true);
    } catch (error) {
      console.log(error);
      setLogO(true);
    }
  };

  if (logO) {
    window.location.assign("/");
  }

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            <strong>{t("profile")}</strong>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <LangModal
          show={isAdding}
          onCancel={cancelAddLangTypeHandler}
          onSave={langTypeAddHandler}
        />
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonIcon
                    color="primary"
                    style={{ fontSize: "90px", color: "#0040ff" }}
                    icon={personCircle}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonText className="ion-text-head" color="primary">
                    <strong>{userCtx.curUser.name}</strong>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonText className="ion-text-subhead" color="primary">
                    <strong>
                      {t("AWC_name")}: {userCtx.curUser.awc.name}
                    </strong>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonText className="ion-text-subhead" color="primary">
                    <strong>{userCtx.curUser.awc.address}</strong>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonText className="ion-text-subhead" color="primary">
                    <strong>{userCtx.curUser.awc.pincode}</strong>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <IonItem></IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonText className="ion-text-subhead" color="primary">
                <strong>
                  {t("switch_languages")} :{" "}
                  {selectedType == "en" ? "English" : "Hindi"}
                </strong>
              </IonText>
            </IonLabel>

            <IonIcon
              slot="end"
              icon={optionsOutline}
              color="primary"
              onClick={startLangTypeAddHandler}
            />
          </IonItem>
          <IonButton
            routerLink={`/dashbord/syncPage`}
            className="button-submit"
            slot="end"
            expand="block"
            color="primary"
            fill="solid"
            shape="round"
          >
            {t("sync_page")}
          </IonButton>
          <IonButton
            onClick={handleLogout}
            className="button-submit"
            slot="end"
            expand="block"
            color="primary"
            fill="outline"
            shape="round"
          >
            {t("logout")}
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
