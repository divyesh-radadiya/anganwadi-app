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
        newArr[index] = shouldShow;
        console.log(shouldShow ? item.name : "", newArr[index]);
      });
      setisVis(newArr);
    });
  };

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar className="IonToolbar">
          <IonText slot="start" color="primary">
            <strong>Search</strong>
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
                onIonChange={handleInput}
                placeholder="Name, SamId or Mobile No."
              ></IonSearchbar>
            </IonCol>
            <IonCol className="ion-text-center" size="3">
              <IonButton fill="clear">
                <IonIcon size="large" color="primary" icon={searchOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCard>

        <IonList>
          {isVis.map((isV: Boolean, index) => {
            return (
              isV && <ChildCard key={items[index].samId} child={items[index]} />
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
