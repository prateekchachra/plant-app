import React, {Component} from 'react';
import {View,Image, FlatList, Dimensions, StyleSheet} from 'react-native';
import Navigation from '../navigation';
import { Block , Text, Button} from '../components';
import { theme } from '../constants';



const {width, height} = Dimensions.get('window');
class Welcome extends Component {

    renderIllustrations(){
        const {illustrations} = this.props;
        return(
            <FlatList 
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                extractDate={this.state}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({item}) => (
                    <Image source={item.source} 
                    resizeMode="contain"
                    style={{width, height: height / 2 - 50, overflow:"visible"}}
                    />

                )}

            />
        );

    }
    renderSteps(){

        const {illustrations} = this.props
        return(
            <Block row center middle style={styles.stepContainer}>
                <Block animated flex={false} key={'step'} color="gray"
                style={styles.steps} />
            </Block>
        );

    }

    static navigationOptions = {
        header: null,

    }
    render(){
        return (
        
        <Block >
            <Block center bottom flex={0.4}>
            <Text h1 center bold>Your Home.
            <Text h1 primary>Greener.</Text>
            </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2}}>Enjoy The Experience</Text>
        </Block>
        <Block center middle >
            {this.renderIllustrations()}
            {this.renderSteps()}
      
        </Block>
            <Block middle flex={0.5} margin={[0, theme.sizes.padding ]}>
            <Button gradient onPress={() => {}}>
                <Text center semibold white>Login</Text>
            </Button>
            <Button shadow onPress={() => {}}>
                <Text center semibold>Signup</Text>
            </Button>
            <Button onPress={() => {}}>
                <Text center semibold gray>Terms of service</Text>
            </Button>
            </Block>
        </Block>
        
        );
    }
}
Welcome.defaultProps = {
    illustrations : [
        {id: 1, source: require('../assets/images/illustration_1.png')},
        {id: 2, source: require('../assets/images/illustration_2.png')},
        {id: 3, source: require('../assets/images/illustration_3.png')},
    ]   

}

const styles = StyleSheet.create({
stepsContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,

}, 
steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,



}



});

export default Welcome;