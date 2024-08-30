


import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';


// Örnek batarya hücre verisi
const batteryCells = Array.from({ length: 10 }, (_, index) => ({
  id: index.toString(),
  voltage: '3.6V',
}));

const BatteryCell = ({ voltage }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{voltage}</Text>
  </View>
);
const temperatures = Array.from({ length: 4 }, (_, index) => ({
  id: index.toString(),
  temp: `${20 + index}°C`, // Basit bir sıcaklık verisi
}));

const Temperature = ({ temp }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{temp}</Text>
  </View>
);

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.searchingText}>Searching Devices...</Text>
      <ActivityIndicator size="large" />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('SecondPage')}
      />
    </View>
  );
}


// Top Tabs için ekran bileşenleri
function SettingsScreen1() {
  const [cellsCollapsed, setCellsCollapsed] = useState(true);
  const [tempsCollapsed, setTempsCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      {/* Cells Başlığı */}
      <TouchableOpacity style={styles.header} onPress={() => setCellsCollapsed(!cellsCollapsed)}>
        <Text style={styles.headerText}>Cells</Text>
        <Icon name={cellsCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={24} color="#000" />
      </TouchableOpacity>
      <Collapsible collapsed={cellsCollapsed}>
        <FlatList
          data={batteryCells}
          renderItem={({ item }) => (
            <BatteryCell voltage={item.voltage} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </Collapsible>

      {/* Temps Başlığı */}
      <TouchableOpacity style={styles.header} onPress={() => setTempsCollapsed(!tempsCollapsed)}>
        <Text style={styles.headerText}>Temps</Text>
        <Icon name={tempsCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={24} color="#000" />
      </TouchableOpacity>
      <Collapsible collapsed={tempsCollapsed}>
        <FlatList
          data={temperatures}
          renderItem={({ item }) => (
            <Temperature temp={item.temp} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </Collapsible>
    </View>
  );
}

function SettingsScreen2() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen 2</Text>
    </SafeAreaView>
  );
}

function SettingsScreen3() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen 3</Text>
    </SafeAreaView>
  );
}

// Stack Navigator
const Stack = createNativeStackNavigator();

// Top Tabs Navigator
const Tab = createMaterialTopTabNavigator();

function SettingsTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#F7DCB9',
          tabBarStyle: { backgroundColor: '#508D4E' },
          tabBarIndicatorStyle: { backgroundColor: '#1A5319' },
        }}
      >
        <Tab.Screen name="Info" component={SettingsScreen1} />
        <Tab.Screen name="Screen2" component={SettingsScreen2} />
        <Tab.Screen name="Settings" component={SettingsScreen3} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// Ana Uygulama Bileşeni
function App() {


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#1A5319" style="light" />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Zeugma BMS',
              headerStyle: {
                backgroundColor: '#508D4E',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="SecondPage"
            component={SettingsTabs} // Settings ekranını top tabs navigatörü ile değiştirdik
            options={{ headerShown: false }} // Header'ı gizle
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6EFD8"
  },
  header: {
    padding: 10,
    backgroundColor: '#80AF81',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 8
  },
  headerText: {
    fontSize: 18,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: "#80AF12"
  },
  cellText: {
    fontSize: 16,
  },
  searchingText: {
    fontSize: 16
  }
  
});


export default App;
