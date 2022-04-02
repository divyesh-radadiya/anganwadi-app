import { Redirect, Route } from "react-router";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  notificationsOutline,
  personOutline,
  searchOutline,
} from "ionicons/icons";

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
import { useContext, useEffect, useState } from "react";
import FollowupContextProvider from "../stores/followup_context_provider";
import LoginPage from "./pages/login_page";
import ChildernContext from "../stores/childern_contex";
import { useAuth } from "../stores/auth";

const Dashbord: React.FC = () => {
  const { loggedIn, userJWT } = useAuth();

  const childernCtx = useContext(ChildernContext);

  useEffect(() => {
    childernCtx.updateJwt(userJWT ?? "");
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
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="homePage" href="/dashbord/homePage">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="searchPage" href="/dashbord/searchPage">
          <IonIcon icon={searchOutline} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>

        <IonTabButton tab="notificationPage" href="/dashbord/notificationPage">
          <IonIcon icon={notificationsOutline} />
          <IonLabel>Notification</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profilePage" href="/dashbord/profilePage">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashbord;
