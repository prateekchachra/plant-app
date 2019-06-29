import React, { Component } from 'react';
import { Animated, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { Block, Text, Input, Button } from '../components';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme, mocks } from '../constants';


const {width, height}  = Dimensions.get('window');
 class Explore extends Component {
    state= {
        searchString: '',
        searchFocus: new Animated.Value(0.6)
    }


    handleSearchFocus(status){

        Animated.timing(
            this.state.searchFocus,
            {
                toValue: status ? 0.8 : 0.6, //status true hone pe increase flex size
                duration: 150, //ms
            }
        ).start();

    }

    renderImage(img, index) {
        const {navigation} = this.props;
        const sizes = Image.resolveAssetSource(img);
        const fullWidth = width - 32;
        const resize = (sizes.width * 100) / fullWidth;
        const imgWidth = resize > 75 ? fullWidth : sizes.width;
             


        return(

                    <TouchableOpacity
                    key={`img-${index}`}
                onPress={() => navigation.navigate('Product')}
                >
                    <Image source={img} style={[styles.image, {minWidth: imgWidth, maxWidth: imgWidth}]} />
                </TouchableOpacity>
        );


    }
    renderExplore(){
        const {images, navigation} = this.props;

        const mainImage = images[0];


        return( 
            <Block style={{marginBottom: height / 2.5}}>
                <TouchableOpacity

                style={[styles.image, styles.mainImage]}
                onPress={() => navigation.navigate('Product')}
                >
                    <Image source={mainImage} style={[styles.image, styles.mainImage]} />
                </TouchableOpacity>
                <Block row space="between" wrap>
                    {
                        images.slice(1).map((img, index) => this.renderImage(img, index))
                    }
                </Block>
            </Block>

        );

    }
    renderFooter(){
        return(
            <LinearGradient locations={[0.4,1]}
            style={styles.footer}
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
            >
                <Button gradient style={{width: width / 2.678 }}>
                    <Text bold white center>Filter</Text>
                </Button>
            </LinearGradient>
            
        );

    }


    renderSearch(){
        const {searchString, searchFocus} = this.state;
        const isEditing = searchFocus && searchString;

        return(

            <Block animated middle flex={searchFocus} style={styles.search}>
                <Input 
                placeholder="Search"
                placeholderTextColor={theme.colors.gray}
                style={styles.searchInput}
                onFocus={() => this.handleSearchFocus(true)}
                onBlur={() => this.handleSearchFocus(false)}

                onChangeText={text => this.setState({searchString: text})}
                value={searchString}
                onRightPress={() => isEditing ? this.setState({searchString: null}) : null}
                rightStyle={styles.searchRight}
                rightLabel={
                    <Icon  name={ isEditing ? "close": "search"} 
                    size={10}
                    color={theme.colors.gray}
                    style={styles.searchIcon}
                     />

                }
                />
            </Block>

        );


    }

    render() {
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 bold> Explore </Text>
                {this.renderSearch()}
                </Block>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
                    {this.renderExplore()}
                </ScrollView>
                {this.renderFooter()}
            </Block>
        )
    }
}

const styles = StyleSheet.create({

    header: {
        paddingHorizontal: theme.sizes.base * 4,
        marginBottom: 20,
    
    },
    search:{
        height: 32,
        width: width - 32

    },
    searchIcon: {
        position: 'absolute',
        right: 16,
        top: 20,

    },
    searchInput: {

        fontSize: theme.sizes.caption,
        height: 32  ,
        backgroundColor: 'rgba(142,142,147, 0.06)',
        borderColor: 'rgba(142,142,147, 0.06)',
        paddingLeft: 16,
        paddingRight: 20,
    },
    searchRight: {
        top: 0  ,
        bottom: 10,
        marginVertical: 0,
        backgroundColor: 'transparent',
        
    },
    explore: {
        marginHorizontal: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
        width,
        paddingBottom: 64,

    },
    image: {
        minHeight: 100, 
        maxHeight: 130,
        maxWidth: width - 32,
        marginBottom: 20,
        borderRadius: 4,

    }
    ,
    mainImage: {
    minWidth: width - 32,
    minHeight: width - 32, 
    }
})

Explore.defaultProps = {
    images: mocks.explore,

}
export default Explore;