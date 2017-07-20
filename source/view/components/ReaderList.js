import React, { Component } from 'react';
import { View, ListView, Text, Image, RefreshControl, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReadListAction from '../../redux/actions/Reader';
import Spinner from './Spinner';
import { BaseConfig, MainTabViewStyle, refreshControlConfig, CommonStyle } from '../styles/Style';

class ReaderListView extends Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(props.viewData || [])
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.viewData && nextProps.viewData != this.props.viewData) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.viewData)
            });
        }
    }

    onListEndReached() {
        const { viewAction, viewData, category, viewStatus } = this.props;
        if (viewData.length && !viewStatus.noMore) {
            viewAction.FetchReaderList(category, viewStatus.pageIndex + 1);
        }
    }

    renderListFooter() {
        const { viewStatus } = this.props;
        return (
            viewStatus.loading ?
                (
                    <View style={ CommonStyle.PageSpinner }>
                        <Spinner/>
                    </View>
                )
                :
                null
        );
    }

    onListRowPress(item) {
        let { router } = this.props;
        router.toNewsDetail({
            readerId: item.id
        });
    }

    renderListRow(item) {
        if (item) {
            const { category } = this.props;
            let title = item.subEnTitle && item.subCnTitle ? item.subEnTitle : item.title;
            let subTitle = item.subEnTitle && item.subCnTitle ? item.subCnTitle : '';

            return (
                <TouchableHighlight
                    onPress={ (e) => { this.onListRowPress(item) } }
                    underlayColor={ BaseConfig.RowTouchColor }
                    key={ item.id }>
                    {
                        category == 7 ?
                            (<View style={ MainTabViewStyle.ReaderRow }>
                                <View style={ MainTabViewStyle.TextWrapper }>
                                    <Text style={ MainTabViewStyle.TextTitle }>
                                        { title }
                                    </Text>
                                    {
                                        subTitle ?
                                            <Text style={ MainTabViewStyle.TextSubTitle }>
                                                { subTitle }
                                            </Text>
                                            : null
                                    }
                                </View>
                                <View style={ MainTabViewStyle.IconWrapper }>
                                    <Image style={ MainTabViewStyle.IconImage } source={{ uri: item.icon }} />
                                </View>
                            </View>)
                            :
                            (<View style={ MainTabViewStyle.ReaderRow }>
                                <View style={ MainTabViewStyle.IconWrapperSmall }>
                                    <Image style={ MainTabViewStyle.IconImageSmall } source={{ uri: item.icon }} />
                                </View>
                                <View style={ MainTabViewStyle.TextWrapper }>
                                    <Text style={ MainTabViewStyle.TextTitle }>
                                        { title }
                                    </Text>
                                </View>
                            </View>)
                    }
                </TouchableHighlight>
            )
        }
        return null;
    }

    render() {
        const { viewAction, viewData, category, viewStatus } = this.props;
        let refreshStatus = typeof viewStatus.refreshing === 'boolean' ? viewStatus.refreshing : false;
        const refreshControl = (<RefreshControl refreshing={ refreshStatus } { ...refreshControlConfig } onRefresh={ () => { viewAction.FetchReaderList(category, 1) } } />);

        return (
            <View style={ MainTabViewStyle.Container }>
                <ListView
                    ref = {(view) => this.listView = view }
                    showsVerticalScrollIndicator
                    removeClippedSubviews
                    enableEmptySections
                    onEndReachedThreshold={ 10 }
                    initialListSize={ 10 }
                    pagingEnabled={ false }
                    scrollRenderAheadDistance={ 150 }
                    dataSource={ this.state.dataSource }
                    renderRow={ this.renderListRow.bind(this) }
                    onEndReached={ this.onListEndReached.bind(this) }
                    renderFooter={ this.renderListFooter.bind(this) }
                    refreshControl={ refreshControl }>
                </ListView>
            </View>
        );
    }
}

export default connect(
    (state, props) => ({
        viewData: state.ReaderListReducer.listData[props.category] || [],
        viewStatus: state.ReaderListReducer.status[props.category] || {}
    }),
    dispatch => ({
        viewAction: bindActionCreators(ReadListAction, dispatch)
    })
)(ReaderListView);