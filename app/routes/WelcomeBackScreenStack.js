import {
  createNativeStackNavigator,
  createStackNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainMenu from "../screens/MainMenu";
import ChooseActivityBubbles from "../screens/ChooseActivityBubbles";
import MyActivities from "../screens/MyActivities";
import NewActivityForm from "../screens/NewActivityForm";
import ApproveActivity from "../screens/ApproveActivity";
import MatchesScreen from "../screens/MatchesScreen";
import ProfileMatching from "../screens/ProfileMatching";

const screens = {
  MainMenu: {
    screen: MainMenu,
  },
  ChooseActivityBubbles: {
    screen: ChooseActivityBubbles,
  },
  MyActivities: {
    screen: MyActivities,
  },
  NewActivityForm: {
    screen: NewActivityForm,
  },
  ApproveActivity: {
    screen: ApproveActivity,
  },
  MatchesScreen: {
    screen: MatchesScreen,
  },
  ProfileMatching: {
    screen: ProfileMatching,
  },
};

const WelcomeBackScreenStack = createStackNavigator(screens);

export default createAppContainer(WelcomeBackScreenStack);
