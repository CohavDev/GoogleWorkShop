import {
  createNativeStackNavigator,
  createStackNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainMenu from "../screens/MainMenu";
import ChooseActivityBubbles from "../screens/ChooseActivityBubbles";
import MyActivities from "../screens/MyActivities";
import NewActivityForm from "../screens/NewActivityForm";

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
};

const WelcomeBackScreenStack = createStackNavigator(screens);

export default createAppContainer(WelcomeBackScreenStack);
