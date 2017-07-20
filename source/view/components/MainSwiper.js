import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SentenceAction from '../../redux/actions/Sentence';
import Swiper from 'react-native-swiper';
import { MainSwiperStyle } from '../styles/Style';

const { width } = Dimensions.get('window');
const swiperHeight = ~~((width / 480.0) * 320);

class MainSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [] };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.viewState && nextProps.viewState !== this.props.viewState) {
            nextProps.viewState.sentenceList && nextProps.viewState.sentenceList.length > 0 && this.setState({ dataSource: nextProps.viewState.sentenceList });
        }
    }

    swiperOnPress(item) {
        let { router } = this.props;        
        router.toNewsDetail({
            readerId: item.id
        });
    }

    render() {
        return (
            <Swiper style={ MainSwiperStyle.Container }
                height={ swiperHeight }
                dot={<View style={ MainSwiperStyle.Dot }/>}
                activeDot={<View style={ MainSwiperStyle.DotActive }/>}
                paginationStyle={{ bottom: 8 }}
                loop={ true }
                index={ 0 }
                autoplay={ true }
                showsPagination={true}>
                {
                    this.state.dataSource.map((item, key) => {
                        return (
                            <TouchableWithoutFeedback  key={key} onPress={ (e) => { this.swiperOnPress(item) } }>
                                <View key={key} style={ MainSwiperStyle.Wrapper }>
                                    <Image style={ MainSwiperStyle.Image } source={{ uri: item.icon }}>
                                        <Image style={ MainSwiperStyle.Image } source={ require('../images/white_shadow.png') }>
                                            <View style={ MainSwiperStyle.TextView }>
                                                <Text style={ MainSwiperStyle.LineEnText }>{ item.subEnTitle }</Text>
                                                <Text style={ MainSwiperStyle.LineCnText }>{ item.subCnTitle }</Text>
                                            </View>
                                        </Image>
                                    </Image>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </Swiper>
        )
    }
}

export default connect(
    (state, props) => ({
        viewState: state.SentenceReducer
    }),
    dispatch => ({
        viewAction: bindActionCreators(SentenceAction, dispatch)
    })
)(MainSwiper);