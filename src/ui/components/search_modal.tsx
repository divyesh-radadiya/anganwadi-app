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

const SearchModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (curr: string) => void;
}> = (props) => {
  const saveHandler = () => {
    props.onSave(selected);
  };

  const [selected, setSelected] = useState<string>("child_name");

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
                  <IonLabel>Search By</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Child Name</IonLabel>
                  <IonRadio slot="start" value="child_name" />
                </IonItem>

                <IonItem>
                  <IonLabel>Sam id</IonLabel>
                  <IonRadio slot="start" value="sam_id" />
                </IonItem>

                <IonItem>
                  <IonLabel>Mobile no</IonLabel>
                  <IonRadio slot="start" value="mobile_no" />
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

export default SearchModal;
