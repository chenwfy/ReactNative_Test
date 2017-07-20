import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import * as SentenceAction from '../../redux/actions/Sentence';
import * as ReadListAction from '../../redux/actions/Reader';
import * as BookAction from '../../redux/actions/Book';
import MainSwiper from '../components/MainSwiper';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ReaderList from '../components/ReaderList';
import BookTab from '../components/BookTab';
import { Container, MainTabViewStyle } from '../styles/Style';

class MainView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        CodePush.sync({
            deploymentKey: 'SkIh4qNrMniDyRJB_KAbL5vU1JjuE13rP-85Z',
            updateDialog: {
                optionalIgnoreButtonLabel: '稍后',
                optionalInstallButtonLabel: '后台更新',
                optionalUpdateMessage: '有新版本了，是否更新？',
                title: '更新提示'
            },
            installMode: CodePush.InstallMode.ON_NEXT_RESTART
        });

        const { sentenceAction, readerListAction, bookAction } = this.props;
        sentenceAction.FetchSentence();
        readerListAction.FetchReaderList(6, 1);
        bookAction.FetchCategoryList();
    }

    onTabChanged(page) {
        const { readerListState, readerListAction, bookCategoryState, bookAction } = this.props;
        const category = page.i == 0 ? 6 : 7;
        if (!(readerListState && readerListState[category] && readerListState[category].length)) {
            readerListAction.FetchReaderList(category, 1);
        }

        if (page.i == 2 && !(bookCategoryState && bookCategoryState.length)) {
            bookAction.FetchCategoryList();
        }
    }

    render() {
        let { router } = this.props;
        return (
            <View style={ Container.appContainer }>
                <MainSwiper  router={ router } />

                <ScrollableTabView
                    renderTabBar={() =>
                        <DefaultTabBar
                            underlineHeight={2}
                            tabStyle={{ paddingBottom: 0 }}
                            textStyle={{ fontSize: 16 }}
                            />
                    }
                    tabBarBackgroundColor="#fff"
                    tabBarUnderlineColor="#ed5565"
                    tabBarActiveTextColor="#ed5565"
                    tabBarInactiveTextColor="#333"
                    onChangeTab={ this.onTabChanged.bind(this) }>
                    <ReaderList tabLabel="看天下" router={ router } category={ 6 } />
                    <ReaderList tabLabel="休闲英语" router={ router } category={ 7 } />
                    <BookTab tabLabel="推荐教材" router={ router } />
                </ScrollableTabView>
            </View>
        );
    }
}

export default connect(
    (state, props) => ({
        sentenceState: state.SentenceReducer,
        readerListState: state.ReaderListReducer.listData,
        bookCategoryState: state.BookCategoryReducer.listData
    }),
    dispatch => ({
        sentenceAction: bindActionCreators(SentenceAction, dispatch),
        readerListAction: bindActionCreators(ReadListAction, dispatch),
        bookAction: bindActionCreators(BookAction, dispatch)
    }),
    null,
    {
        withRef: true
    }
)(MainView);