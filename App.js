import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from './SplashScreen';
import RecipeListScreen from './RecipeListScreen';
import RecipeDetailsScreen from './RecipeDetailsScreen';
import CategoriesScreen from './CategoriesScreen'; 
import FilteredRecipes from './FilteredRecipes';
import SearchScreen from './SearchScreen';
import PhotoGalleryScreen from './PhotoGalleryScreen';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();

const RecipeListStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="RecipeList"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ title: 'CookBook' }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={({ route }) => ({ title: route.params.recipe.strMeal })}
      />
      <Stack.Screen 
        name="FilteredRecipes"
        component={FilteredRecipes}
        options={({ route }) => ({ title: route.params.category })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <MaterialBottomTab.Navigator
          initialRouteName="Recipes"
          shifting={true}
          barStyle={{ backgroundColor: theme.colors.primary }}
        >
          <MaterialBottomTab.Screen
            name="Recipes"
            component={RecipeListStack}
            options={{
              tabBarIcon: 'home',
              tabBarLabel: 'Recipes',
            }}
          />
          <MaterialBottomTab.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              tabBarIcon: 'magnify',
              tabBarLabel: 'Search',
            }}
          />
          <MaterialBottomTab.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon name="bars" size={20} color={color} />,
              tabBarLabel: 'Categories',
            }}
          />

          <MaterialBottomTab.Screen
            name="PhotoGallery"
            component={PhotoGalleryScreen}
            options={{
              tabBarIcon: 'image',
              tabBarLabel: 'Gallery',
            }}
          />
        </MaterialBottomTab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
