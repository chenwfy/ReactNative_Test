import React, { Platform, Navigator, BackAndroid, ToastAndroid } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import * as Views from './Root';

class Router {
    constructor(navigator) {
        this.navigator = navigator;
        this._onHomeBackPress = this.onHomeBackPress.bind(this);
        this._onExitApp = this.exitApp.bind(this);

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this._onHomeBackPress);
        }
    }

    onHomeBackPress() {
        let currentRoute = this.getCurrentRoute();
        if (currentRoute.name !== 'main') {
            this.navigator.pop();
        } else if (currentRoute.name === 'splash') {
            this.exitApp();
        } else {
            this.handleHomeBackPress();
        }
        return true;
    }

    handleHomeBackPress() {
        if (Platform.OS === "android") {
            ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
            BackAndroid.removeEventListener("hardwareBackPress", this._onHomeBackPress);
            BackAndroid.addEventListener("hardwareBackPress", this._onExitApp);
            this.timer = TimerMixin.setInterval(() => {
                TimerMixin.clearInterval(this.timer);
                BackAndroid.removeEventListener("hardwareBackPress", this._onExitApp);
                BackAndroid.addEventListener("hardwareBackPress", this._onHomeBackPress);
            }, 2000);
        }
    }

    exitApp() {
        BackAndroid.exitApp();
    }

    getRouteList() {
        return this.navigator.getCurrentRoutes();
    }

    getCurrentRoute() {
        const routesList = this.getRouteList();
        return routesList[routesList.length - 1];
    }

    getPreviousRoute() {
        const routesList = this.getRouteList();
        return routesList[routesList.length - 2];
    }

    getNavigator() {
        return this.navigator;
    }

    pop() {
        this.navigator.pop();
    }

    push(route, props = {}) {
        route.props = props;
        route.sceneConfig = route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.PushFromRight;
        route.component = route.component;
        this.navigator.push(route);
    }

    toSplash(props) {
        this.push({
            component: Views.Splash,
            name: 'splash',
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        }, props);
    }

    toGuide(props) {
        this.push({
            component: Views.Guide,
            name: 'guide',
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        }, props);
    }

    toMain(props) {
        this.push({
            component: Views.Main,
            name: 'main',
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        }, props);
    }

    toNewsDetail(props) {
        this.push({
            component: Views.NewsDetail,
            name: 'newsDetail',
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        }, props);
    }
}

export default Router;