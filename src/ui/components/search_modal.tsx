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

const SearchModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (curr: string) => void;
}> = (props) => {
  const saveHandler = () => {
    props.onSave(selected);
  };

  const [selected, setSelected] = useState<string>("child_name");
  const { t } = useTranslation();

  return (
    <IonModal
      isOpen={props.show}
      initialBreakpoint={0.4}
      breakpoints={[0, 0.4, 1]}
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
                  <IonLabel>{t("search_by")}</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>{t("child_name")}</IonLabel>
                  <IonRadio slot="start" value="child_name" />
                </IonItem>

                <IonItem>
                  <IonLabel>{t("sam_id")}</IonLabel>
                  <IonRadio slot="start" value="sam_id" />
                </IonItem>

                <IonItem>
                  <IonLabel>{t("mobile_no")}</IonLabel>
                  <IonRadio slot="start" value="mobile_no" />
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

export default SearchModal;
