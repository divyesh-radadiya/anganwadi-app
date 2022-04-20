import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
import { Toast } from "@capacitor/toast";
import { useEffect, useState } from "react";
import NotificationCard from "../components/notification_card";
import { createStore, get, set } from "../../services/IonicStorage";

const NotificationPage: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    onRef();
    getData();
  }, []);

  class Not {
    id!: string;
    title!: string;
    body!: string;
    type!: string;
    date!: Date;
  }

  const [notifications, setnotifications] = useState<Not[]>([]);

  const getData = async () => {
    createStore("APPDB");
    const old: Not[] = (await get("notification")) ?? [];
    setnotifications(old);
  };

  const addd = async (not: Not[]) => {
    setnotifications((mynotifications: Not[]) => {
      return mynotifications.concat(not);
    });
    const newNot: Not[] = (await get("notification")) ?? [];
    set("notification", newNot.concat(not));
  };

  const onRef = () => {
    PushNotifications.checkPermissions().then((res) => {
      try {
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
      } catch (exception_var: any) {
        showToast(exception_var.toString());
        console.log(exception_var);
      }
    });
  };

  const register = () => {
    console.log("Initializing HomePage");
    try {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();

      // Some issue with our setup and push will not work
      PushNotifications.addListener("registrationError", (error: any) => {
        alert("Error on registration: " + JSON.stringify(error));
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotificationSchema) => {
          const d = new Date();
          addd([
            {
              id: notification.id,
              title: notification.data.title,
              body: notification.data.alert,
              type: "foreground",
              date: d,
            },
          ]);
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: ActionPerformed) => {
          const d = new Date();
          addd([
            {
              id: notification.notification.id,
              title: notification.notification.data.title,
              body: notification.notification.data.body,
              type: "action",
              date: d,
            },
          ]);
        }
      );
    } catch (exception_var: any) {
      showToast(exception_var.toString());
      console.log(exception_var);
    }
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
        {/* <IonListHeader mode="ios" lines="full">
          <IonLabel>New Notifictions</IonLabel>
        </IonListHeader> */}
        {notifications?.length !== 0 && (
          <IonList>
            {notifications
              ?.slice(0)
              .reverse()
              .map((notif: Not) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
          </IonList>
        )}

        {/* <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="primary" onClick={addd()}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
