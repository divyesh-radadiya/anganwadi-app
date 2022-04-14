import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
import { Toast } from "@capacitor/toast";
import { useEffect, useState } from "react";
import OneSignal from "onesignal-cordova-plugin";
import NotificationCard from "../components/notification_card";
import { DeviceState } from "onesignal-cordova-plugin/types/Subscription";

const NotificationPage: React.FC = () => {
  const { t } = useTranslation();

  // const [id, setid] = useState("1");
  // function ch(): void {
  //   OneSignal.setExternalUserId(id);
  //   if (id == "1") setid("2");
  //   else setid("1");
  // }

  useEffect(() => {
    // OneSignalInit();
    onRef();
  }, []);

  const [notifications, setnotifications] = useState([
    {
      id: "456",
      title: "title",
      body: "alert",
      type: "foreground",
    },
  ]);

  const [notificationss, setnotificationss] = useState("asd");

  const onRef = () => {
    // ch();
    // OneSignalInit();
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
            showToast("Push Notification permission denied");
          } else {
            showToast("Push Notification permission granted");
            register();
          }
        });
      } else {
        register();
      }
    });
  };

  const register = () => {
    console.log("Initializing HomePage");

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token: Token) => {
      showToast("Push registration success");
      setnotificationss(token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {
      alert("Error on registration: " + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotificationSchema) => {
        setnotifications((notifications) => [
          ...notifications,
          // JSON.stringify(notification),
          {
            id: notification.id,
            title: notification.data.title,
            body: notification.data.alert,
            type: "foreground",
          },
        ]);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: ActionPerformed) => {
        setnotifications((notifications) => [
          ...notifications,
          // JSON.stringify(notification),
          {
            id: notification.notification.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: "action",
          },
        ]);
      }
    );
  };

  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg,
    });
  };

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            <strong>{t("notification_page")}</strong>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonListHeader mode="ios" lines="full">
          <IonLabel>New Child</IonLabel>
        </IonListHeader>
        {notifications.length !== 0 && (
          <IonList>
            {notifications.map((notif: any) => (
              <NotificationCard key={notif.id} notif={notif} />
            ))}
          </IonList>
        )}
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="primary" onClick={onRef}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
