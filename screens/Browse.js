import React, { Component } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Block, Text, Button, Card, Badge } from '../components';
import { theme, mocks } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';


class Browse extends Component {

    state = {
        active: 'Products'

    }

    renderTab(tab){
        const {active} = this.state;
        const isActive = active === tab;

        return (
            <TouchableOpacity
            key={`tab-${tab}`}
            onPress={() => this.setState({active: tab})}
            style={[
                styles.tab,
                isActive ? styles.active : null

            ]}>
                <Text title medium gray={!isActive} secondary={!isActive}>{tab}</Text>
            </TouchableOpacity>

        )

    }
    render() {

        const tabs = ['Products', 'Inspirations', 'Shop'];
        const {profile} = this.props;
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 light> Browse </Text>
                <Button>
                    <Image source={profile.avatar}
                    style={styles.avatar}/>
                </Button>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>

                <ScrollView showsVerticalScrollIndicator={false} 
                style={{paddingVertical: 34}}>

                <TouchableOpacity onPress={() => navigation.navigate('Explore', {category})}>
                    <Card center middle shadow style={styles.category}>
                        <Badge>
                            <Image source={require('../assets/icon/plants.png')} />
                        </Badge>
                        <Text >
                            Plants
                        </Text>
                        <Text gray caption>1 2 3 Products</Text>
                    </Card>
                </TouchableOpacity>

                </ScrollView>
            </Block>


        )
    }
}

const styles = StyleSheet.create({
header: {
    paddingHorizontal: theme.sizes.base * 4

},
avatar: {
    height: 50,
    width: 50,

},
tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
    marginHorizontal: 32,
},
tab: {
     marginRight: 40,
     paddingBottom: 22,


},
active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,


}

})
Browse.defaultProps = {

    profile : mocks.profile,
}

export default Browse;