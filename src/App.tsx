/* eslint-disable react-hooks/rules-of-hooks */
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import "./ui/theme/variables.css";
import "./i18n/config";

import LoginPage from "./ui/pages/login_page";
import Dashbord from "./ui/dashbord";
import { AuthContext, useAuthInit } from "./stores/auth";
import NotificationPage from "./ui/pages/notification_page";

setupIonicReact();

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }

  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/loginPage">
              <LoginPage />
              {/* <NotificationPage /> */}
            </Route>
            <Route path="/dashbord">
              <Dashbord />
            </Route>
            <Route exact path="/">
              <Redirect to="/dashbord/homePage" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
