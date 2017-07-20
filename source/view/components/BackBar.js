import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TitlebarConfigs, TitlebarStyles } from '../styles/Style';

class BackBar extends Component {

    constructor(props) {
        super(props);
    }

    renderIconItem(iconName, onPress) {
        return (
            <TouchableOpacity
                style = { TitlebarStyles.IconItem }
                activeOpacity={ 0.2 }
                onPress={ () => onPress() }>
                <Icon
                    name={ iconName }
                    size= { 22 }
                    color={ "#fff" } />
            </TouchableOpacity>
        )
    }

    render() {
        const { title, backIconOnPress } = this.props;

        return (
            <View style={ TitlebarStyles.Container }>
                <View style = { TitlebarStyles.IconWrapper }>
                    {
                        this.renderIconItem('ios-arrow-back-outline', backIconOnPress ? backIconOnPress : (() => null))
                    }
                </View>
                <View style={ TitlebarStyles.TextWrapper }>
                    <Text style={ TitlebarStyles.LeftTitle } numberOfLines={ 1 }>
                        { title }
                    </Text>
                </View>
            </View>
        );
    }
}

export default BackBar;