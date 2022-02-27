import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  homeOutline, notificationsOutline , personOutline, searchOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './ui/theme/variables.css';
import HomePage from './ui/pages/home_page';
import SearchPage from './ui/pages/search_page';
import NotificationPage from './ui/pages/notification_page';
import ProfilePage from './ui/pages/profile_page';
import ChildPage from './ui/pages/child_page';
import FollowUpPage from './ui/pages/follow_up_page';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/homePage">
            <HomePage />
          </Route>
          <Route exact path="/searchPage">
            <SearchPage />
          </Route>
          <Route exact path="/notificationPage">
            <NotificationPage />
          </Route>
          <Route path="/profilePage">
            <ProfilePage />
          </Route>
          <Route path="/childPage">
            <ChildPage/>
          </Route>
          <Route path="/followUpPage">
            <FollowUpPage/>
          </Route>
          
          <Route exact path="/">
            <Redirect to="/homePage" />
          </Route>
        </IonRouterOutlet>

        
        <IonTabBar slot="bottom">
        <IonTabButton tab="homePage" href="/homePage">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="searchPage" href="/searchPage">
            <IonIcon icon={searchOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

          <IonTabButton tab="notificationPage" href="/notificationPage">
            <IonIcon icon={notificationsOutline} />
            <IonLabel>Notification</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profilePage" href="/profilePage">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
         
         
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
