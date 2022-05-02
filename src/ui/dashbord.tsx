import { Redirect, Route } from "react-router";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  homeOutline,
  notificationsOutline,
  personOutline,
  searchOutline,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import HomePage from "./pages/home_page";
import SearchPage from "./pages/search_page";
import NotificationPage from "./pages/notification_page";
import ProfilePage from "./pages/profile_page";
import ChildPage from "./pages/child_page";
import FollowUpPage from "./pages/follow_up_page";
import { useContext, useEffect } from "react";
import FollowupContextProvider from "../stores/followup_context_provider";
import ChildernContext from "../stores/childern_contex";
import { useAuth } from "../stores/auth";
import UserContext from "../stores/user_contex";
import OneSignal from "onesignal-cordova-plugin";
import SyncPage from "./pages/sync_page";

const Dashbord: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    OneSignalInit();
  }, []);

  function OneSignalInit(): void {
    try {
      OneSignal.setAppId("f2596674-be88-45f6-a7f3-e77f1b82ae13");
      OneSignal.setNotificationOpenedHandler(function (jsonData) {
        console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
      });

      //
      // OneSignal.setExternalUserId("user");
      //
    } catch (exception_var) {
      console.log(exception_var);
    }
  }

  const { loggedIn, userJWT } = useAuth();

  const childernCtx = useContext(ChildernContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    childernCtx.updateJwt(userJWT ?? "");
    userCtx.updateJwt(userJWT ?? "");
  }, []);

  if (!loggedIn) {
    return <Redirect to="/loginPage" />;
  }
  console.log("error:", loggedIn);
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/dashbord/homePage">
          <HomePage />
        </Route>
        <Route exact path="/dashbord/searchPage">
          <SearchPage />
        </Route>
        <Route exact path="/dashbord/notificationPage">
          <NotificationPage />
        </Route>
        <Route path="/dashbord/profilePage">
          <ProfilePage />
        </Route>

        <Route path="/dashbord/childPage">
          <ChildPage />
        </Route>

        <Route path="/dashbord/followUpPage">
          <FollowupContextProvider>
            <FollowUpPage />
          </FollowupContextProvider>
        </Route>

        <Route path="/dashbord/syncPage">
          <SyncPage />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="homePage" href="/dashbord/homePage">
          <IonIcon icon={homeOutline} />
          <IonLabel>{t("home")}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="searchPage" href="/dashbord/searchPage">
          <IonIcon icon={searchOutline} />
          <IonLabel>{t("search")}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="notificationPage" href="/dashbord/notificationPage">
          <IonIcon icon={notificationsOutline} />
          <IonLabel>{t("notification")}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profilePage" href="/dashbord/profilePage">
          <IonIcon icon={personOutline} />
          <IonLabel>{t("profile")}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashbord;
