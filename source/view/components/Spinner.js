import React, { Component } from 'react';
import { ActivityIndicatorIOS, ProgressBarAndroid, Platform, ActivityIndicator } from 'react-native';
import { CommonStyle } from '../styles/Style';

class Spinner extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (                
                <ActivityIndicator animating={ true } color={ '#ed5565' } style={ CommonStyle.ActivityIndicator } size="large" />
            )
        }
        return (
            <ActivityIndicatorIOS animating={ true } { ...this.props } color={ '#ed5565' }/>
        )
    }
}

export default Spinner;