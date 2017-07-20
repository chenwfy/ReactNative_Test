import React, { Component } from 'react';
import { Dimensions, View, Text, ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HTMLView from 'react-native-html-converter';
import * as ReadDetailAction from '../../redux/actions/Reader';
import BackTitleBar from '../components/BackBar';
import Spinner from '../components/Spinner';
import { Container, ReaderDetailStyles, CommonStyle, HtmlViewStyles } from '../styles/Style';

class NewsDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            title: '阅读详情',
            detail: null
        }
        this.images = {};
    }

    componentDidMount() {
        const { readerId, viewData, viewAction } = this.props;
        if (!(viewData && viewData.content)) {
            viewAction.FetchReaderDetail(readerId);
        } else {
            this.setState({
                loading: false,
                title: viewData.content.title,
                detail: viewData.content
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.viewData && nextProps.viewData.content && nextProps.viewData != this.props.viewData) {
            this.setState({
                loading: nextProps.viewData.loading,
                title: nextProps.viewData.content.title,
                detail: nextProps.viewData.content
            });
        }
    }

    backIconOnPress() {
        this.props.router.pop();
    }

    renderTitle() {
        return (
            this.state.detail.subEnTitle && this.state.detail.subCnTitle ?
                null
                :
                <Text style={ ReaderDetailStyles.Title }>{  this.state.detail.title }</Text>
        );
    }

    onImageLoadEnd(imageUri, imageId) {
        let defaultImageWidth = Dimensions.get('window').width - 16;
        Image.getSize && Image.getSize(imageUri, (width, height) => {
            let w = defaultImageWidth;
            let h = (defaultImageWidth / width) * height;
            this.images[imageId] && this.images[imageId].setNativeProps({
                style: {
                    width: w,
                    height: h
                }
            });
        }, () => null);
    }

    renderImage() {
        let imageId = 'IMAGE_' + this.props.readerId,
            imageUrl = this.state.detail.icon;

        return (
            this.state.detail.icon ?
                <Image
                    key={ imageId }
                    ref={ view => this.images[imageId] = view }
                    style={ ReaderDetailStyles.Image }
                    source={ { uri: imageUrl } }
                    onLoadEnd={ this.onImageLoadEnd.bind(this, imageUrl, imageId) }
                    />
                :
                null
        );
    }

    renderContent() {
        return (
            this.state.detail.subEnTitle && this.state.detail.subCnTitle ?
                <View style={[ReaderDetailStyles.Container, ReaderDetailStyles.HtmlView]}>
                    <Text style={ ReaderDetailStyles.LineEnText }>{ this.state.detail.subEnTitle }</Text>
                    <Text style={ ReaderDetailStyles.LineCnText }>{ this.state.detail.subCnTitle }</Text>
                </View>
                :
                (
                    this.state.detail.content ?
                        <View style={ ReaderDetailStyles.HtmlView }>
                            <HTMLView
                                value={ (this.state.detail.content) }
                                stylesheet={ HtmlViewStyles }>
                            </HTMLView>
                        </View>
                        :
                        null
                )

        );
    }

    renderDetail() {
        if (this.state.loading === true) {
            return (
                <View style={ CommonStyle.PageSpinner }>
                    <Spinner/>
                </View>
            )
        }

        if (this.state.detail) {
            return (
                <View style={ ReaderDetailStyles.Container }>
                    {
                        this.renderTitle()
                    }
                    {
                        this.renderImage()
                    }
                    {
                        this.renderContent()
                    }
                </View>
            )
        }

        return (
            <Text style={ ReaderDetailStyles.ErrorMessage }>{ '抱歉，阅读详情查询错误！' }</Text>
        );
    }

    render() {
        return (
            <View style={ ReaderDetailStyles.Container }>
                <BackTitleBar
                    title= { this.state.title }
                    backIconOnPress={ () => { this.backIconOnPress() } }>
                </BackTitleBar>
                <ScrollView ref={(view) => this.scrollView = view } style={ ReaderDetailStyles.ContentView }>
                    {
                        this.renderDetail()
                    }
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    (state, props) => ({
        viewData: state.ReaderDetailReducer[props.readerId]
    }),
    dispatch => ({
        viewAction: bindActionCreators(ReadDetailAction, dispatch),
    }),
    null,
    {
        withRef: true
    }
)(NewsDetailView);