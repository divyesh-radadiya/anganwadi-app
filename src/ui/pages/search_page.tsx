import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonSearchbar,
  IonToolbar,
  IonList,
  IonCard,
  IonIcon,
  IonRow,
  IonCol,
  IonFabButton,
  IonFab,
} from "@ionic/react";
import { refreshOutline, searchOutline } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import ChildernContext from "../../stores/childern_contex";
import ChildCard from "../components/child_card";
import "../constants/search.css";

const SearchPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);

  const searchRef = useRef<HTMLIonSearchbarElement>(null);

  const searchHandler = () => {
    const enteredName = searchRef.current!.value;
    childernCtx.search(enteredName ?? "");
  };
  const refreshHandler = () => {
    searchRef.current!.value = "";
    childernCtx.updateData();
  };

  React.useEffect(() => {
    childernCtx.updateSearchData();
  }, []);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar className="IonToolbar">
          <IonText slot="start">
            <strong>Search page</strong>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="ion-card">
          <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol>
              <IonSearchbar
                searchIcon="undefined"
                showClearButton="never"
                className="ion-searchbar"
                ref={searchRef}
              ></IonSearchbar>
            </IonCol>
            <IonCol className="ion-text-center" size="1.5">
              <IonIcon
                size="large"
                color="primary"
                icon={searchOutline}
                onClick={searchHandler}
              />
            </IonCol>
            {/* <IonCol className="ion-text-center" size="1.5">
             
            </IonCol> */}
          </IonRow>
        </IonCard>
        <IonList>
          {/* <ChildCard name="Child 1" />
          <ChildCard name="Child 2" />
          <ChildCard name="Child 3" /> */}
          <IonList>
            {childernCtx.searchChildren.map((child: Child) => (
              <ChildCard key={child.samId} child={child} />
            ))}
          </IonList>
        </IonList>
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="primary" onClick={refreshHandler}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
