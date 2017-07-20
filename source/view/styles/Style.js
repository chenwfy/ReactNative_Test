import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

//base config
export const BaseConfig = {
    RowTouchColor: '#e7e7e7'
};

//refreshControlConfig
export const refreshControlConfig = {
    tintColor: "rgba(9, 160, 151, 1)",
    title: "loading...",
    colors: ["rgba(9, 160, 151, 1)", "rgba(9, 160, 151, 0.9)", "rgba(9, 160, 151, 0.8)"]
};

//common
export const CommonStyle = StyleSheet.create({
    RefreshSpinner: {
        marginTop: 50,
        marginBottom: 50
    },
    PageSpinner: {
        paddingTop: 20,
        paddingBottom: 20
    },
    ActivityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: 80
    }
});

//container
export const Container = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: 'rgba(244, 244, 244, 1)',
        flexDirection: 'column'
    }
});

//Splash
export const SplashStyle = StyleSheet.create({
    Container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: width,
        height: height
    },
    Image: {
        flex: 1,
        width: width,
        height: height,
        resizeMode: 'contain'
    }
});

//Guide
export const GuideStyle = StyleSheet.create({
    Container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: width,
        height: height
    },
    Wrapper: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'transparent'
    },
    Image: {
        flex: 1,
        width: width,
        height: height,
        resizeMode: 'contain'
    },
    ButtonIcon: {
        position: 'relative',
        top: height - 112,
        left: (width - 120) / 2,
        width: 120,
        height: 40
    }
});

//Main top swiper
export const MainSwiperStyle = StyleSheet.create({
    Container: {
        width: width,
        backgroundColor: '#ed5565',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4'
    },
    Wrapper: {
        flex: 1,
        width: width,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4'
    },
    Image: {
        flex: 1,
        width: width,
        resizeMode: 'stretch'
    },
    Dot: {
        backgroundColor: 'rgba(237, 85, 101, .3)',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    DotActive: {
        backgroundColor: '#ed5565',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    TextView: {
        position: 'relative',
        left: 16,
        top: ~~((width / 480.0) * 320) - 80,
        width: width - 32,
        height: 60
    },
    LineEnText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#333'
    },
    LineCnText: {
        fontSize: 12,
        textAlign: 'left',
        color: '#666'
    },
});

//Main tab view
export const MainTabViewStyle = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'column',
        marginBottom: 8
    },
    ReaderRow: {
        flexDirection: 'row',
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    TextWrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    TextTitle: {
        fontSize: 16,
        textAlign: 'left',
        color: '#333'
    },
    TextSubTitle: {
        fontSize: 12,
        textAlign: 'left',
        color: '#666'
    },
    IconWrapper: {
        width: 80,
        height: 80,
        marginLeft: 8
    },
    IconImage: {
        width: 80,
        height: 80
    },
    IconWrapperSmall: {
        width: 40,
        height: 40,
        marginRight: 8
    },
    IconImageSmall: {
        width: 40,
        height: 40
    },
    BookTabContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(244, 244, 244, 1)',
        paddingBottom: 8
    },
    ScrollContainer: {
        //marginBottom: 8
    },
    CategoryContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginBottom: 8,
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 1
    },
    CategoryNameRow: {
        width: width,
        height: 36,
        borderBottomColor: 'rgba(237, 85, 101, .8)',
        borderBottomWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 4
    },
    CategoryNameView: {
        height: 20,
        paddingLeft: 8,
        borderLeftColor: '#ed5565',
        borderLeftWidth: 4
    },
    CategoryNameText: {
        fontSize: 14,
        textAlign: 'left',
        color: '#ed5565'
    },
    BookListRow: {
        height: 200,
        paddingRight: 9,
        paddingVertical: 9
    },
    BookItem: {
        marginLeft: 9,
        width: 108,
        height: 182,
        flex: 1,
        flexDirection: 'column'
    },
    BookImage: {
        width: 108,
        height: 160,
        resizeMode: 'contain'
    },
    BookNameView: {
        width: 108,
        height: 22,
        paddingTop: 6
    },
    BookNameText: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333'
    }
});

//TitleBarStyles
const TitlebarConfigs = {
    Height: 64,
    IconWrapperWidth: 32,
    ContentWrapperHeight: 40,
    PaddingTop: 24,
    BackgroundColor: '#ed5565',
    IconColor: '#fff'
};
export const TitlebarStyles = StyleSheet.create({
    Container: {
        height: TitlebarConfigs.Height,
        width: width,
        paddingTop: TitlebarConfigs.PaddingTop,
        flexDirection: 'row',
        backgroundColor: TitlebarConfigs.BackgroundColor
    },
    IconWrapper: {
        width: TitlebarConfigs.IconWrapperWidth,
        height: TitlebarConfigs.ContentWrapperHeight,
        backgroundColor: 'transparent'
    },
    IconItem: {
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 4
    },
    TextWrapper: {
        flex: 1,
        height: TitlebarConfigs.ContentWrapperHeight,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingRight: 12
    },
    LeftTitle: {
        fontSize: 16,
        textAlign: 'left',
        color: '#fff'
    }
});

//reader Detail
export const ReaderDetailStyles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'column'
    },
    ErrorMessage: {
        height: 40,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 8,
        color: '#666'
    },
    ContentView: {
        padding: 8,
        marginTop: 4,
        marginBottom: 4
    },
    Title: {
        fontSize: 16,
        textAlign: 'left',
        color: '#333',
        marginBottom: 8
    },
    Image: {
        resizeMode: 'contain'
    },
    LineEnText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#333'
    },
    LineCnText: {
        fontSize: 12,
        textAlign: 'left',
        color: '#333'
    },
    HtmlView: {
        paddingBottom: 16,
        marginTop: 8
    }
});

export const HtmlViewStyles = StyleSheet.create({
    p: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333',
        marginBottom: 4
    },
    a: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333'
    },
    div: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333'
    },
    b: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333'
    },
    strong: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333'
    }
});