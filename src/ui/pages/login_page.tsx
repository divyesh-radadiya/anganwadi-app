import {
  IonCard,
  IonContent,
  IonHeader,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import { Network } from "@awesome-cordova-plugins/network";

import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { useAuth } from "../../stores/auth";
import { createStore, set } from "../../services/IonicStorage";
import { logInRequest } from "../../services/network_service";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { loggedIn } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logS, setLogS] = useState(false);

  const handleLogin = () => {
    if (!userId || userId.toString().trim().length === 0) {
      setMessage("Please enter a valid userid");
      setIserror(true);
      return;
    }

    if (!password || password.toString().trim().length === 0) {
      setMessage("Please enter your password");
      setIserror(true);
      return;
    }
    setLoading(true);

    if (Network.type == Network.Connection.NONE) {
      setMessage("You are offline!!");
      setIserror(true);
      setLoading(false);
    } else {
      logInRequest(userId, password)
        .then((res) => {
          const data = res.data;
          createStore("APPDB");
          set("jwt", "Bearer " + data["jwt"].toString());
          set("userId", "1");
          console.log("sucsess", data["jwt"]);

          setLoading(false);
          setLogS(true);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.status);
            if (error.response.status == 403)
              setMessage("Username or password is incorrect ");
            else setMessage(error.message);
          } else if (error.request) {
            console.log(error.request);
            setMessage(error.message);
          } else {
            console.log("Error", error.message);
            setMessage(error.message);
          }
          // console.log("error:", error);

          setIserror(true);
          setLoading(false);
        });
    }
  };

  if (logS) {
    window.location.assign("/");
  }

  if (loggedIn) {
    return <Redirect to="/dashbord/homePage" />;
  }
  console.log("error:", loggedIn);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={iserror}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Error!"}
          message={message}
          buttons={["Dismiss"]}
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
                    <strong>Login</strong>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem>
            <IonText className="ion-text-subhead">Email</IonText>
          </IonItem>
          <IonCard className="ion-card">
            <IonInput
              value={userId}
              onIonChange={(e) => setUserId(e.detail.value!)}
            ></IonInput>
          </IonCard>
          <IonItem>
            <IonText className="ion-text-subhead">Password</IonText>
          </IonItem>
          <IonCard className="ion-card">
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonCard>
          <IonItem></IonItem>
          <IonButton
            className="button-submit"
            slot="end"
            expand="block"
            color="primary"
            fill="solid"
            shape="round"
            onClick={handleLogin}
          >
            Login
          </IonButton>
        </IonList>
        <IonLoading isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
