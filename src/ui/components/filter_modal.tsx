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

const FilterModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (curr: string) => void;
}> = (props) => {
  const saveHandler = () => {
    props.onSave(selected);
  };

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
                  <IonLabel>Filter By</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Pending children</IonLabel>
                  <IonRadio slot="start" value="pending_children" />
                </IonItem>

                <IonItem>
                  <IonLabel>Completed children</IonLabel>
                  <IonRadio slot="start" value="completed_children" />
                </IonItem>
              </IonRadioGroup>
            </IonCol>
          </IonRow>

          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" color="primary" onClick={saveHandler}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default FilterModal;
