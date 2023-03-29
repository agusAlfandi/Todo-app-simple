import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Register, Splash, Task } from '../Page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ButtomNavigation } from '../Component';

const Stack = createNativeStackNavigator();
// const Bottom = createBottomTabNavigator();

// const MainApp = () => {
//   return (
//     <Bottom.Navigator tabBar={(props) => <ButtomNavigation {...props} />}>
//       {/* <Bottom.Screen name="Task" component={Task} options={{ headerShown: false }} /> */}
//       <Bottom.Screen name="Home" component={Home} options={{ headerShown: false }} />
//     </Bottom.Navigator>
//   );
// };

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default Router;
