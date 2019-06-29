import React, { Component } from 'react'
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Block, Text, Button, Card, Badge } from '../components';
import { theme, mocks } from '../constants';

class Browse extends Component {

    state = {
        active: 'Products',
        categories: [],

    }

    componentDidMount = () => {
      this.setState({categories: this.props.categories});
    };
    

    handleTab = tab => {
        const {categories} = this.props;

        const filtered = categories.filter(
            category => category.tags.includes(tab.toLowerCase())
        );

        this.setState({active: tab, categories: filtered})
    }

    renderTab(tab){
        const {active} = this.state;
        const isActive = active === tab;

        return (
            <TouchableOpacity
            key={`tab-${tab}`}
            onPress={() => this.handleTab(tab)}
            style={[
                styles.tab,
                isActive ? styles.active : null

            ]}>
                <Text title medium gray={!isActive} secondary={isActive}>{tab}</Text>
            </TouchableOpacity>

        )

    }
    render() {

        const tabs = ['Products', 'Inspirations', 'Shop'];
        const {profile, navigation} = this.props;
        const { categories} = this.state;
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 bold> Browse </Text>
                <Button onPress={()=> navigation.navigate('Settings')}>
                    <Image source={profile.avatar}
                    style={styles.avatar}/>
                </Button>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>

                <ScrollView showsVerticalScrollIndicator={false} 
                style={{paddingVertical: 34}}>
                    <Block row space="between" style={styles.categories}>
                    {categories.map(category => {
                        return(
                           <TouchableOpacity 
                        key={category.name}
                           onPress={() => navigation.navigate('Explore', {category})}>
                                      <Card center middle shadow style={styles.category}>
                                          <Badge margin={[0, 0, 15]}
                                          size={50} color="rgba(41,126, 143, 0.20)"
                                          >
                                              <Image source={category.image} />
                                          </Badge>
                                          <Text >
                                              {category.name}
                                          </Text>
                                          <Text gray caption>{category.count} products</Text>
                                      </Card>
                                  </TouchableOpacity>

                     ); })}
  
                    </Block>
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


},
category: {

    //this should be dynamic based on screen width
    width: 140,
    height: 140,
    

},
categories: {
    flexWrap: 'wrap',
    paddingHorizontal: 32,
    marginBottom: 56,

}

})
Browse.defaultProps = {

    profile : mocks.profile,
    categories: mocks.categories,
}

export default Browse;