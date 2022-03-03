import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { idCardSharp } from "ionicons/icons";
import { useRef } from "react";
import { useParams } from "react-router";
import { Child } from "../../models/child";
import { Children } from "../../models/fake_data";

import "../constants/home.css";

const FollowUpPage: React.FC = () => {
  const selectedChildId = useParams<{ childId: string }>().childId;
  const selectedFollowUpId = useParams<{ id: string }>().id;

  const AllChildren: Child[] = Children;
  const selectedChild = AllChildren.find(
    (child) => child.sam_id === selectedChildId
  );
  const selectedFollowUp = selectedChild?.followups.find(
    (followup) => followup.id === selectedFollowUpId
  );

  // const textRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonHeader className="IonHeader">
        <IonToolbar>
          <IonText slot="start" color="primary" className="ion-text-title">
            Follow up {selectedFollowUp?.id}
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonText className="ion-text-subhead">
              Sam id : {selectedChild?.sam_id}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              name : {selectedChild?.name}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-subhead">
              Address : {selectedChild?.address}
            </IonText>
          </IonItem>

          <IonItem>
            <IonText className="ion-text-head">Enter details</IonText>
          </IonItem>

          <IonGrid>
            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput
                    placeholder="Date"
                    value={selectedFollowUp?.visited_date?.toDateString()}
                  ></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-left col-no-top">
                <IonCard className="ion-card">
                  <IonInput
                    placeholder="Weight"
                    value={selectedFollowUp?.weight?.toString()}
                  ></IonInput>
                </IonCard>
              </IonCol>
              <IonCol className="col-right col-no-top">
                <IonCard className="ion-card">
                  <IonInput
                    placeholder="Height"
                    value={selectedFollowUp?.height?.toString()}
                  ></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput
                    placeholder="Middle upper arm circumference"
                    value={selectedFollowUp?.muac?.toString()}
                  ></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput
                    placeholder="Growth status"
                    value={selectedFollowUp?.growth_status?.toString()}
                  ></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="col-no-top">
                <IonCard className="ion-card">
                  <IonInput
                    placeholder="Any other symptoms"
                    value={selectedFollowUp?.other?.toString()}
                  ></IonInput>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          {selectedFollowUp?.is_attemted && (
            <IonButton
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              routerLink="/homePage"
            >
              Done
            </IonButton>
          )}
          {!selectedFollowUp?.is_attemted && (
            <IonButton
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              routerLink="/homePage"
            >
              Submit
            </IonButton>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FollowUpPage;
