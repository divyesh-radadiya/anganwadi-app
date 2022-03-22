import {
  IonAlert,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRippleEffect,
  IonText,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import {
  chevronDownOutline,
  optionsOutline,
  refreshOutline,
} from "ionicons/icons";
import ChildCard from "../components/child_card";
import "../constants/home.css";

import React, { useContext, useEffect, useState } from "react";
import { Child } from "../../models/child";
import ChildernContext from "../../stores/childern_contex";
import FilterModal from "../components/filter_modal";

const HomePage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);

  const [isAdding, setIsAdding] = useState(false);

  const [selected, setSelected] = useState<string>("pending_children");

  const startAddFilterHandler = () => {
    setIsAdding(true);
  };

  const cancelAddFilterHandler = () => {
    setIsAdding(false);
  };

  const filterAddHandler = (curr: string) => {
    setSelected((old) => {
      return curr;
    });

    setIsAdding(false);
  };

  useEffect(() => {
    if (childernCtx.isOn == false) {
      setShowAlert1(true);
    } else {
      setShowAlert1(false);
    }
  }, [childernCtx.isOn]);

  const [showAlert1, setShowAlert1] = useState(false);

  return (
    <IonPage>
      <FilterModal
        show={isAdding}
        onCancel={cancelAddFilterHandler}
        onSave={filterAddHandler}
      />
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            {selected == "pending_children" ? (
              <strong>Pending children</strong>
            ) : (
              <strong>Completed children</strong>
            )}
          </IonText>
          {/* <IonButton
            slot="end"
            // size="large"
            color="primary"
            fill="solid"
            shape="round"
            
          > */}
          <IonButton onClick={startAddFilterHandler} fill="clear" slot="end">
            <IonIcon
              icon={optionsOutline}
              color="primary"
              size="large"
              onClick={startAddFilterHandler}
            />
          </IonButton>

          {/* </IonButton> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {childernCtx.allChildren.map(
            (child: Child) =>
              (selected == "pending_children"
                ? !child.isDone
                : child.isDone) && <ChildCard key={child.samId} child={child} />
          )}
        </IonList>

        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass="my-custom-class"
          header={"Alert"}
          message={"You are offline!!"}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
