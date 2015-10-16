/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchRootView = require('./views/SearchRootView')

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
} = React;

var MKStackoverflow = React.createClass({

    getInitialState: function() {
        return {
            selectedTab: 'search'
        };
    },

    render: function() {
        return (
            <TabBarIOS tintColor="white"
                       barTintColor="darkslateBlue">

                <TabBarIOS.Item icon='search'
                                title='搜索'
                                selected={this.state.selectedTab === 'search'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'search',
                                    });
                                }}>
                    <SearchRootView />
                </TabBarIOS.Item>

                <TabBarIOS.Item icon='history'
                                title='历史'
                                selected={this.state.selectedTab === 'history'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'history'
                                    })
                                }}>
                    <Text></Text>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
});

var styles = StyleSheet.create({
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
});

AppRegistry.registerComponent('MKStackoverflow', () => MKStackoverflow);
