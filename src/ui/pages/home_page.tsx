import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import {
  chevronDownOutline,
  optionsOutline,
  refreshOutline,
} from "ionicons/icons";
import ChildCard from "../components/child_card";
import "../constants/home.css";

import React, { useContext, useState } from "react";
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
          <IonIcon
            icon={optionsOutline}
            slot="end"
            color="primary"
            size="large"
            onClick={startAddFilterHandler}
          />
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
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="primary" onClick={childernCtx.updateData}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
