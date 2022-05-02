import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import {
  PushNotificationSchema,
  PushNotifications,
  ActionPerformed,
} from "@capacitor/push-notifications";
import { Toast } from "@capacitor/toast";
import { useEffect, useState } from "react";
import NotificationCard from "../components/notification_card";
import { createStore, get, set } from "../../services/IonicStorage";
import { refreshOutline } from "ionicons/icons";

export class NotificationData {
  type!: string;
  samId!: string;
  name!: string;
  age!: number;
  gender!: string;
  pr!: string;
  date?: Date;
  body?: string;
}

const NotificationPage: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    onRef();
    getData();
  }, []);

  class ExData {
    a!: NotificationData;
  }

  const [notifications, setnotifications] = useState<NotificationData[]>([]);

  const getData = async () => {
    createStore("APPDB");
    const old: NotificationData[] = (await get("notification")) ?? [];
    setnotifications(old);
  };

  const clearData = async () => {
    setnotifications([]);
    set("notification", []);
  };

  const addd = async (not: NotificationData) => {
    setnotifications((mynotifications: NotificationData[]) => {
      return mynotifications.concat(not);
    });

    setSelectedType(not.type);
    const newNot: NotificationData[] = (await get("notification")) ?? [];

    set("notification", newNot.concat(not));
  };

  const onRef = () => {
    PushNotifications.checkPermissions()
      .then((res) => {
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
      })
      .catch((e) => {
        showToast(e.toString());
        console.log(e.toString());
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

          let exData: ExData = Object.assign(
            new ExData(),
            JSON.parse(notification.data.custom)
          );

          exData.a.body = notification.data.alert;
          exData.a.date = d;

          addd(exData.a);
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: ActionPerformed) => {
          const d = new Date();

          let exData: ExData = Object.assign(
            new ExData(),
            JSON.parse(notification.notification.data.custom)
          );

          exData.a.body = notification.notification.data.alert;
          exData.a.date = d;

          addd(exData.a);
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

  const [selectedType, setSelectedType] = useState<string>("new");

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            <strong>Notification</strong>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment
          value={selectedType}
          onIonChange={(e) => setSelectedType(e.detail.value ?? "new")}
        >
          <IonSegmentButton value="new">
            <IonLabel>New Followups</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pending">
            <IonLabel>Pending Followups</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {selectedType === "new" && (
          <IonList>
            {notifications.reverse().map((notif: NotificationData, index) => {
              return (
                notif.type === "new" && (
                  <NotificationCard key={index} notif={notif} />
                )
              );
            })}
          </IonList>
        )}
        {selectedType === "pending" && (
          <IonList>
            {notifications.reverse().map((notif: NotificationData, index) => {
              return (
                notif.type === "pending" && (
                  <NotificationCard key={index} notif={notif} />
                )
              );
            })}
          </IonList>
        )}
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="primary" onClick={clearData}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
