import React, { Component } from 'react';
import { Navigator, View, StatusBar } from 'react-native';
import Router from '../Router';
import { Container } from '../styles/Style';
import * as Views from '../Root';

class Navigation extends Component {

    constructor(props) {
        super(props);
    }

    configureScene(route) {
        return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.FloatFromRight;
    }

    renderScene(route, navigator) {
        this.router = this.router || new Router(navigator);
        let Component = route.component;
        if (Component) {
            return (
                <Component { ...route.props }
                    ref={ (view) => { route.sceneRef = view } }
                    navigator={ navigator }
                    router={this.router} />
            );
        }
    }

    onDidFocus(route) {
        if (route.sceneRef.getWrappedInstance) {
            let wrappedComponent = route.sceneRef.getWrappedInstance();
            if (wrappedComponent) {
                wrappedComponent.componentDidFocus && wrappedComponent.componentDidFocus();
            }
        }
        route.sceneRef.componentDidFocus && route.sceneRef.componentDidFocus();
    }

    render() {
        return (
            <View style={ Container.appContainer }>
                <StatusBar backgroundColor={ 'rgba(0, 0, 0, .3)' } barStyle={ 'light-content' } translucent={ true } />
                <Navigator
                    initialRoute={ { name: 'splash', component: Views.Splash } }
                    configureScene={ this.configureScene.bind(this) }
                    renderScene={ this.renderScene.bind(this) }
                    onDidFocus={ this.onDidFocus.bind(this) }/>
            </View>
        )
    }
}

export default Navigation;