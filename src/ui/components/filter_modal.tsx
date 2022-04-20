import React, { useRef, useState } from "react";
import {
  IonModal,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonDatetime,
  IonRadioGroup,
  IonListHeader,
  IonLabel,
  IonItem,
  IonRadio,
} from "@ionic/react";
import { useTranslation } from "react-i18next";

const FilterModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (curr: string) => void;
}> = (props) => {
  const saveHandler = () => {
    props.onSave(selected);
  };
  const { t } = useTranslation();

  const [selected, setSelected] = useState<string>("pending_children");

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
                  <IonLabel>{t("filter_by")}</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>{t("pending_children")}</IonLabel>
                  <IonRadio slot="start" value="pending_children" />
                </IonItem>

                <IonItem>
                  <IonLabel>{t("completed_children")}</IonLabel>
                  <IonRadio slot="start" value="completed_children" />
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

export default FilterModal;
