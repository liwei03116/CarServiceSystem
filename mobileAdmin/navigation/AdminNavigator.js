// navigation/AdminNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ManageServiceRequestsScreen from '../screens/ManageServiceRequestsScreen';
import ManageMechanicsScreen from '../screens/ManageMechanicsScreen';
import ManageUsersScreen from '../screens/ManageUsersScreen'; // Adjust file name if needed
import MoreOptionsScreen from '../screens/MoreOptionsScreen';
import ManageServicesScreen from '../screens/ManageServicesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// "More" Stack Navigator
const MoreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MoreOptions" 
        component={MoreOptionsScreen} 
        options={{ title: 'More Options' }} 
      />
      <Stack.Screen 
        name="Services" 
        component={ManageServicesScreen} 
        options={{ title: 'Manage Services' }} 
      />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator for the admin panel
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      shifting={true}
      barStyle={{ backgroundColor: '#6200ea' }}
      activeColor="white"
      inactiveColor="gray"
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={ManageServiceRequestsScreen}
        options={{
          tabBarLabel: 'Requests',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-list" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Mechanics"
        component={ManageMechanicsScreen}
        options={{
          tabBarLabel: 'Mechanics',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wrench" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={ManageUsersScreen}
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dots-horizontal" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator for login and then the admin panel
const AdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AdminPanel" 
        component={AdminTabNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
