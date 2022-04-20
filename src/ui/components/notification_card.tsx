import {
  IonAlert,
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import ChildernContext from "../../stores/childern_contex";
import "../constants/card.css";

interface ContainerProps {
  notif: any;
}

const NotificationCard: React.FC<ContainerProps> = ({ notif }) => {
  const childernCtx = useContext(ChildernContext);

  const clickHandler = () => {
    const isChild = childernCtx.allChildren.find((child) => {
      return child.samId == notif.body.toString();
    });

    if (isChild) {
      childernCtx.isChildSelect(notif.body);
      setShowAlert2(true);
      setShowAlert1(false);
    } else {
      setShowAlert1(true);
      setShowAlert2(false);
    }
  };

  const { t } = useTranslation();
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const history = useHistory();
  return (
    <IonGrid>
      <IonRow>
        <IonCol className="col-no-top col-left col-right">
          {notif.date?.toDateString()}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="col-no-top col-no-left col-no-right">
          <IonCard onClick={clickHandler} className="ion-card-notification ">
            <IonAlert
              isOpen={showAlert1}
              onDidDismiss={() => {
                setShowAlert1(false);
                history.push("/");
              }}
              cssClass="my-custom-class"
              header={"Alert"}
              message={"Child Not found !! Please, Refresh data."}
              buttons={["OK"]}
            />
            <IonAlert
              isOpen={showAlert2}
              onDidDismiss={() => {
                setShowAlert2(false);
                history.push("/dashbord/childPage");
              }}
              cssClass="my-custom-class"
              header={"Name: " + childernCtx.selectedChild.name}
              message={
                "Next date: " +
                childernCtx.selectedChild.nextDate?.toDateString() +
                "\nCurrent weight: " +
                childernCtx.selectedChild.currWeight +
                " KG   " +
                "\nCurrent status: " +
                childernCtx.selectedChild.currGrowthStatus
              }
              buttons={["OK"]}
            />
            <IonGrid>
              <IonRow class="ion-align-items-center">
                <IonCol className="col-no-left col-no-top">
                  <IonRow>
                    <IonCol>
                      <IonLabel color="primary" className="ion-text-subhead">
                        {notif.title}
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonLabel color="primary" className="ion-text-subhead">
                        SamId: {notif.body}
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol className="ion-text-end">
                  <IonButton
                    // routerLink={`/dashbord/followUpPage`}
                    // onClick={clickHandler}
                    size="small"
                    color="primary"
                    fill="solid"
                    shape="round"
                  >
                    Details
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default NotificationCard;
