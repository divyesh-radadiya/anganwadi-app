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
  IonButton,
} from "@ionic/react";
import { optionsOutline, refreshOutline, searchOutline } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";
import ChildernContext from "../../stores/childern_contex";
import ChildCard from "../components/child_card";
import SearchModal from "../components/search_modal";
import "../constants/search.css";

const SearchPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);

  const searchRef = useRef<HTMLIonSearchbarElement>(null);

  React.useEffect(() => {
    childernCtx.updateSearchData();
  }, []);

  const [isAdding, setIsAdding] = useState(false);

  const [selectedType, setSelectedType] = useState<string>("child_name");

  const startSearchTypeAddHandler = () => {
    setIsAdding(true);
  };

  const cancelAddSearchTypeHandler = () => {
    setIsAdding(false);
  };

  const searchTypeAddHandler = (curr: string) => {
    setSelectedType((old) => {
      return curr;
    });

    setIsAdding(false);
  };

  const [error, setError] = useState("");

  const searchHandler = () => {
    const enteredName = searchRef.current!.value;
    if (
      selectedType == "mobile_no" &&
      (!enteredName || enteredName.toString().trim().length != 10)
    ) {
      setError("Please enter a valid 10 digit Mobile no.");
      return;
    }
    if (!enteredName || enteredName.toString().trim().length === 0) {
      setError("Please enter a valid data.");
      return;
    }
    setError("");
    childernCtx.search(selectedType, enteredName ?? "");
  };
  const refreshHandler = () => {
    searchRef.current!.value = "";
    setError("");
    childernCtx.updateSearchData();
  };

  return (
    <IonPage>
      <SearchModal
        show={isAdding}
        onCancel={cancelAddSearchTypeHandler}
        onSave={searchTypeAddHandler}
      />
      <IonHeader className="IonHeader">
        <IonToolbar className="IonToolbar">
          <IonText slot="start">
            {selectedType == "child_name" ? (
              <strong>Search by name</strong>
            ) : selectedType == "sam_id" ? (
              <strong>Search by sam id</strong>
            ) : (
              <strong>Search by mobile no</strong>
            )}
          </IonText>
          <IonButton
            onClick={startSearchTypeAddHandler}
            fill="clear"
            slot="end"
          >
            <IonIcon
              icon={optionsOutline}
              color="primary"
              size="large"
              onClick={startSearchTypeAddHandler}
            />
          </IonButton>
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
            <IonCol className="ion-text-center" size="3">
              <IonButton onClick={searchHandler} fill="clear">
                <IonIcon size="large" color="primary" icon={searchOutline} />
              </IonButton>
            </IonCol>
            {/* <IonCol className="ion-text-center" size="1.5">
             
            </IonCol> */}
          </IonRow>
        </IonCard>
        <IonList>
          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}
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
