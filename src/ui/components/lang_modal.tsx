import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonRadioGroup,
  IonListHeader,
  IonLabel,
  IonItem,
  IonRadio,
} from "@ionic/react";
import { useTranslation } from "react-i18next";

const LangModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (curr: string) => void;
}> = (props) => {
  const saveHandler = () => {
    props.onSave(selected);
  };

  const [selected, setSelected] = useState<string>("en");
  const { t } = useTranslation();

  return (
    <IonModal
      isOpen={props.show}
      initialBreakpoint={0.33}
      breakpoints={[0, 0.33, 1]}
      onDidDismiss={props.onCancel}
    >
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRadioGroup
                value={selected}
                onIonChange={(e) => setSelected(e.detail.value)}
              >
                <IonListHeader>
                  <IonLabel>{t("switch_languages")}</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>English</IonLabel>
                  <IonRadio slot="start" value="en" />
                </IonItem>

                <IonItem>
                  <IonLabel>Hindi</IonLabel>
                  <IonRadio slot="start" value="hn" />
                </IonItem>
              </IonRadioGroup>
            </IonCol>
          </IonRow>

          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.onCancel}>
                {t("cancel")}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" color="primary" onClick={saveHandler}>
                {t("save")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default LangModal;
