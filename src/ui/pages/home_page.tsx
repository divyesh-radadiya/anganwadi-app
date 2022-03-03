import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import ChildCard from "../components/child_card";
import "../constants/home.css";

import React from "react";
import { useState } from "react";
import sendRequest from "../../services/getdata";
import { Child, fChild } from "../../models/child";
import { Children } from "../../models/fake_data";

const HomePage: React.FC = () => {
  const children = [
    "child 1",
    "child 2",
    "child 3",
    "child 4",
    "child 5",
    "child 6",
    "child 7",
    "child 8",
  ];

  const AllChildren: Child[] = Children;

  const [listItems, setListItems] = useState<any>([]);
  const [listChild, setListChild] = useState<Child[]>([]);

  // var d = new Child();

  React.useEffect(() => {
    sendRequest().then((data) => {
      data.forEach((cData: any) => {
        let newChild = Object.assign(new Child(), cData);
        setListChild((listChild) => {
          return listChild.concat(newChild);
        });
        console.log(newChild.name);
      });
      // setListChild()
      // setListItems(data);
      console.log(data);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary">
            <strong>Pending children</strong>
          </IonText>
          <IonButton
            slot="end"
            size="small"
            color="primary"
            fill="solid"
            shape="round"
          >
            Sort by
            <IonIcon icon={chevronDownOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonList color="primary">
          {listItems.map((item: any) => {
            return <ChildCard key={item["id"]} name={item["username"]} />;
          })}
        </IonList> */}
        <IonList>
          {AllChildren.map(
            (child: Child) =>
              !child.is_done && <ChildCard key={child.sam_id} child={child} />
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
