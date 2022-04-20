import React, { useRef, useState } from "react";
import {
  IonModal,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonDatetime,
} from "@ionic/react";

const DateModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (date: Date) => void;
}> = (props) => {
  const dateRef = useRef<HTMLIonDatetimeElement>(null);

  const saveHandler = () => {
    const selectedDate = dateRef.current!.value ?? new Date();

    props.onSave(new Date(selectedDate));
  };

  return (
    <IonModal
      isOpen={props.show}
      initialBreakpoint={0.6}
      breakpoints={[0, 0.6, 1]}
      onDidDismiss={props.onCancel}
    >
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonDatetime presentation="date" ref={dateRef}></IonDatetime>
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

export default DateModal;
