import {
  createNativeStackNavigator,
  createStackNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainMenu from "../screens/MainMenu";
import ChooseActivityBubbles from "../screens/ChooseActivityBubbles";
import NewActivityForm from "../screens/NewActivityForm";
import MyActivities from "../screens/MyActivities";
import ProfileMatching from "../screens/ProfileMatching";
import MatchesScreen from "../screens/MatchesScreen";
import ApproveActivity from "../screens/ApproveActivity";

const screens = {
  MainMenu: {
    screen: MainMenu,
  },
  ChooseActivity: {
    screen: ChooseActivityBubbles,
  },
  MyActivities: {
    screen: MyActivities,
  },
  ProfileMatching: {
    screen: ProfileMatching,
  },
  MatchesScreen: {
    screen: MatchesScreen,
  },
  NewActivityForm: {
    screen: NewActivityForm,
  },
  ApproveActivity: {
    screen: ApproveActivity,
  },
};

const WelcomeBackScreenStack = createStackNavigator(screens);

export default createAppContainer(WelcomeBackScreenStack);
