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
  IonButton,
  SearchbarChangeEventDetail,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Child } from "../../models/child";
import ChildernContext from "../../stores/childern_contex";
import ChildCard from "../components/child_card";
import "../constants/search.css";

const SearchPage: React.FC = () => {
  const childernCtx = useContext(ChildernContext);
  const { t } = useTranslation();

  // const [isAdding, setIsAdding] = useState(false);

  const [selectedType, setSelectedType] = useState<string>("child_name");

  // const startSearchTypeAddHandler = () => {
  //   setIsAdding(true);
  // };

  // const cancelAddSearchTypeHandler = () => {
  //   setIsAdding(false);
  // };

  // const searchTypeAddHandler = (curr: string) => {
  //   setSelectedType((old) => {
  //     return curr;
  //   });

  //   setIsAdding(false);
  // };

  // const [error, setError] = useState("");

  // const searchHandler = () => {
  //   const enteredName = searchRef.current!.value;
  //   if (
  //     selectedType == "mobile_no" &&
  //     (!enteredName || enteredName.toString().trim().length != 10)
  //   ) {
  //     setError(t("valid_10_digit_mobile_no_msg"));
  //     return;
  //   }
  //   if (!enteredName || enteredName.toString().trim().length === 0) {
  //     setError(t("valid_data_msg"));
  //     return;
  //   }
  //   setError("");
  //   childernCtx.search(selectedType, enteredName ?? "");
  // };
  // const refreshHandler = () => {
  //   searchRef.current!.value = "";
  //   setError("");
  //   childernCtx.updateSearchData();
  // };
  // const searchbar = document.querySelector("ion-searchbar");
  // searchbar.addEventListener("ionInput", listener:handleInput);
  // var items: Child[] = [];
  const [isVis, setisVis] = useState<Boolean[]>([]);
  const [items, setisItems] = useState<Child[]>([]);

  useEffect(() => {
    setisItems([]);
    setisVis([]);
    childernCtx.allChildren.forEach((child) => {
      setisItems((allChild) => {
        return allChild.concat(child);
      });

      setisVis((allSet) => {
        return allSet.concat(true);
      });
    });
  }, []);

  const handleInput = (event: CustomEvent<SearchbarChangeEventDetail>) => {
    const query = event.detail.value?.toLowerCase();
    // console.log(query);
    requestAnimationFrame(() => {
      let newArr = [...isVis];
      items.forEach((item, index) => {
        var shouldShow = item.name.toLowerCase().indexOf(query ?? "") > -1;
        shouldShow =
          shouldShow ||
          item.contactNumber
            .toString()
            .toLowerCase()
            .indexOf(query ?? "") > -1;
        shouldShow =
          shouldShow ||
          item.samId
            .toString()
            .toLowerCase()
            .indexOf(query ?? "") > -1;
        // console.log(shouldShow ? "block" : "none");
        // allCard[index] = shouldShow;
        // copying the old datas array
        newArr[index] = shouldShow;
        console.log(shouldShow ? item.name : "", newArr[index]);
      });
      setisVis(newArr);
    });
  };

  return (
    <IonPage>
      {/* <SearchModal
        show={isAdding}
        onCancel={cancelAddSearchTypeHandler}
        onSave={searchTypeAddHandler}
      /> */}
      <IonHeader className="IonHeader">
        <IonToolbar className="IonToolbar">
          <IonText slot="start">
            {selectedType == "child_name" ? (
              <strong>{t("search_by_name")}</strong>
            ) : selectedType == "sam_id" ? (
              <strong>{t("search_by_sam_id")}</strong>
            ) : (
              <strong>{t("search_by_mobile_no")}</strong>
            )}
          </IonText>
          {/* <IonButton
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
          </IonButton> */}
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
                onIonChange={handleInput}
              ></IonSearchbar>
            </IonCol>
            <IonCol className="ion-text-center" size="3">
              <IonButton fill="clear">
                <IonIcon size="large" color="primary" icon={searchOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCard>
        {/* <IonList>
          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}
          <ChildCard name="Child 1" />
          <ChildCard name="Child 2" />
          <ChildCard name="Child 3" /> 
          <IonList>
            {childernCtx.allChildren.map((child: Child) => (
              <ChildCard key={child.samId} child={child} />
            ))}
          </IonList>
        </IonList> */}

        <IonList>
          {isVis.map((isV: Boolean, index) => {
            return (
              isV && <ChildCard key={items[index].samId} child={items[index]} />
            );
          })}
        </IonList>

        {/* <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color="primary" onClick={refreshHandler}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
