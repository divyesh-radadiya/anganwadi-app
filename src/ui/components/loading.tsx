import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { useEffect } from "react";

const Loading: React.FC = () => {
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    present({
      message: "Loading...",
    });
  }, []);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Loading;
