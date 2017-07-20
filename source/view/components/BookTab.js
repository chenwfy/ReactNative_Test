import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BookAction from '../../redux/actions/Book';
import BookList from './BookList';
import { MainTabViewStyle } from '../styles/Style';

class BookTabView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: props.categoryData
        };
    }

    componentDidMount() {
        const { categoryData, bookAction } = this.props;
        if (categoryData && categoryData.length) {
            this.state.categoryList.map((category, key) => {
                bookAction.FetchBookList(category.id, 1);
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryData && nextProps.categoryData.length && nextProps.categoryData != this.props.categoryData) {
            this.setState({
                categoryList: nextProps.categoryData
            });
        }
    }

    render() {
        let { router } = this.props;
        return (
            <View style={ MainTabViewStyle.BookTabContainer }>
                <ScrollView style={ MainTabViewStyle.ScrollContainer } ref={(view) => this.scrollView = view }>
                    {
                        this.state.categoryList.map((category, key) => {
                            return (
                                <View key={ category.id } style={ MainTabViewStyle.CategoryContainer }>
                                    <View style={ MainTabViewStyle.CategoryNameRow }>
                                        <View style={ MainTabViewStyle.CategoryNameView }>
                                            <Text style={ MainTabViewStyle.CategoryNameText }>{ category.name }</Text>
                                        </View>
                                    </View>
                                    <BookList router={ router } category={ category.id } />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    (state, props) => ({
        categoryData: state.BookCategoryReducer.listData || []
    }),
    dispatch => ({
        bookAction: bindActionCreators(BookAction, dispatch)
    })
)(BookTabView);