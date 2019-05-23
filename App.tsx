/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import {akitaDevtools} from "@datorama/akita";
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {TodosPageComponent} from "./src/components/todo.component";

akitaDevtools();

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#223443'}}>
          <TodosPageComponent />
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    minHeight: 40,
  },
  cellText: {
    padding: 14,
  },
  cellSeparator: {
    backgroundColor: '#333333',
    height: 1,
    marginLeft: 14
  }
});
