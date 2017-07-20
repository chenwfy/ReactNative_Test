import React, { Component } from 'react';
import { View, ListView, Text, Image, RefreshControl, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BookAction from '../../redux/actions/Book';
import Spinner from './Spinner';
import { BaseConfig, MainTabViewStyle, refreshControlConfig, CommonStyle } from '../styles/Style';

class BookListView extends Component {
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
            viewAction.FetchBookList(category, viewStatus.pageIndex + 1);
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
        // router.toBookDetail({
        //     readerId: item.id
        // });
    }

    renderListRow(item) {
        if (item) {
            return (
                <TouchableHighlight
                    onPress={ (e) => { this.onListRowPress(item) } }
                    underlayColor={ BaseConfig.RowTouchColor }
                    key={ item.id }>
                    <View style={ MainTabViewStyle.BookItem }>
                        <Image style={ MainTabViewStyle.BookImage } source={{ uri:item.icon  }} />
                        <View style={ MainTabViewStyle.BookNameView }>
                            <Text numberOfLines={ 1 } style={ MainTabViewStyle.BookNameText }>{ item.name }</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
        return null;
    }

    render() {
        const { viewAction, viewData, category, viewStatus } = this.props;
        let refreshStatus = typeof viewStatus.refreshing === 'boolean' ? viewStatus.refreshing : false;
        const refreshControl = (<RefreshControl refreshing={ refreshStatus } { ...refreshControlConfig } onRefresh={ () => { viewAction.FetchBookList(category, 1) } } />);

        return (
            <View style={ MainTabViewStyle.BookListRow }>
                <ListView
                    ref = {(view) => this.listView = view }
                    showsVerticalScrollIndicator
                    removeClippedSubviews
                    enableEmptySections
                    horizontal={ true }
                    onEndReachedThreshold={ 10 }
                    initialListSize={ 10 }
                    pagingEnabled={ false }
                    scrollRenderAheadDistance={ 50 }
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
        viewData: state.BookListReducer.listData[props.category] || [],
        viewStatus: state.BookListReducer.status[props.category] || {}
    }),
    dispatch => ({
        viewAction: bindActionCreators(BookAction, dispatch)
    })
)(BookListView);