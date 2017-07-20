import React, { Component } from 'react';
import { View, Image } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { SplashStyle } from '../styles/Style';
import * as Storage from '../../common/Storage';

class Splash extends Component {
    componentDidMount() {
        this.timer = TimerMixin.setTimeout(() => {
            Storage.GetItem('Guide')
                .then((data) => {
                    if (data) {
                        this.props.router.toMain();
                    } else {
                        Storage.SetItem('Guide', true);
                        this.props.router.toGuide();
                    }
                });
        }, 2000);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={ SplashStyle.Container }>
                <Image style={ SplashStyle.Image } source={ require('../images/Splash.png') } />
            </View>
        );
    }
}

export default Splash;