import React, { Component } from 'react';
import { Dimensions, View, Image, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { GuideStyle } from '../styles/Style';

class Guide extends Component {

    buttonPress() {
        this.props.router.toMain();
    }

    render() {
        return (
            <View style={ GuideStyle.Container }>
                <Swiper showsPagination={ false } autoplay={ false } loop={ false }>
                    <View style={ GuideStyle.Wrapper }>
                        <Image style={ GuideStyle.Image } source={ require('../images/guide_01.png') } />
                    </View>
                    <View style={ GuideStyle.Wrapper }>
                        <Image style={ GuideStyle.Image } source={ require('../images/guide_02.png') } />
                    </View>
                    <View style={ GuideStyle.Wrapper }>
                        <Image style={ GuideStyle.Image } source={ require('../images/guide_03.png') }>
                            <TouchableWithoutFeedback onPress={ (e) => { this.buttonPress() } }>
                                <Image style={ GuideStyle.ButtonIcon } source={ require('../images/guide_btn.png') } />
                            </TouchableWithoutFeedback>
                        </Image>
                    </View>
                </Swiper>
            </View>
        );
    }
}

export default Guide;