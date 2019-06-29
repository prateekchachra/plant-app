import React, { Component } from 'react';
import { StyleSheet, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import { Block, Text, Input, Button, Divider } from '../components';
import { theme, mocks } from '../constants';
import Icon from 'react-native-vector-icons/Entypo';


const {width, height}  = Dimensions.get('window');
class Product extends Component {



    static navigationOptions = ({}) => 
    {
        return {
            headerRight: (

                <Button onPress={() => {}}>
                    <Icon name="dots-three-horizontal" color={theme.colors.gray} />
                </Button>
            ),

        }

    }
    

    renderGallery(){
        const {product} = this.props;
        return (
            <FlatList 
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment = "center"
                data={product.images}
                keyExtractor = {(item, index) => `${index}`}
                renderItem={({item}) => (
                    <Image source={item} 
                        style={{width, height: height/2.7}}    
                    resizeMode="contain"

                    />


                )}
            />

        );

    }


    render() {
        const {product} = this.props;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                 {this.renderGallery()}
                 <Block style={styles.product}>
                     <Text h2 bold>{product.name}</Text>
                 
                    <Block flex={false} row margin={[theme.sizes.base, 0]}>
                            {product.tags.map(tag => (
                                <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                                {tag}
                                </Text>

                            ))}
                    </Block>
                    <Text gray light height={22} >{product.description}</Text>
                    <Divider margin={[20, 0]}/>
                    <Block>

                        <Text semibold>Gallery</Text>
                        <Block row margin={[20, 0]}>
                                {product.images.slice(1,3).map(
                                    (image, index) => (
                                        <Image source={image} style={styles.image}
                                        key={`gallery-${index}`}/>
                                    )

                                )}

                        <Block card flex={false} center middle 
                        color="rgba(197, 204, 214, 0.2)"
                        style={styles.more}>
                            <Text gray>+{product.images.slice(3).length}</Text>

                        </Block>
                        </Block>

                    </Block>
                 </Block>
            </ScrollView>
        )
    }
}

Product.defaultProps = {
    product : mocks.products[0],    

}
const styles = StyleSheet.create({
    product: {
        paddingHorizontal: 16,
        paddingVertical: theme.sizes.padding,
        marginBottom: 16,
        width: width - 16 ,
    },
    tag: {
        borderColor: theme.colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginRight: 10,
        marginBottom: 16,
    },
    image: {
        width: 115,
        height: 115,
        marginRight: 16

    },
    more: {
    width: 55,
    height: 55,  

    }
})


export default Product; 