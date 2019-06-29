import React, { Component } from 'react'
import { StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Block, Text, Button, Divider, Switch  } from '../components';
import Slider from 'react-native-slider'; 
import { theme, mocks } from '../constants';
class Settings extends Component {

    state = {
        budget: 500,
        monthly_cap: 2000,
        notifications: true,
        newsletter: false,
        editing: null,
        profile: {}
    }

    handleEdit(name, text){
        const {profile} = this.state;
        profile[name] = text;

        this.setState({profile}); 

    }

    renderEdit(name){
   
        const{profile, editing} =this.state; 
        
        if(editing === name){
            return(
                <TextInput defaultValue={profile[name]}
                onChangeText={text => this.handleEdit([name], text)}></TextInput>

            );
        }

        return <Text bold>{profile[name]}</Text>
    }

    componentDidMount(){
        this.setState({profile: this.props.profile});

    }
    toggleEdit(name){
        const{profile, editing} =this.state;    
      
        this.setState({editing : !editing? name: null});
        

    }
    render() {
        const {navigation} = this.props;
        const{profile, editing} = this.state;
        return (
            <Block>
                 <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 bold> Settings </Text>
                <Button onPress={()=> navigation.navigate('Browse')}>
                    <Image source={profile.avatar}
                    style={styles.avatar}/>
                </Button>
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                    <Block row space="between" margin={[15,0]} style={styles.inputRow}>
                        <Block>
                            <Text gray2 style={{marginBottom: 10,}}>Username</Text>
                            {this.renderEdit('username')}

                        </Block>
                        <Text medium secondary onPress={() => this.toggleEdit('username')}>
                            {editing === 'username' ? 'Save' : 'Edit'}
                        </Text>
                    </Block>
                    <Block row space="between" margin={[15,0]} style={styles.inputRow}>
                        <Block>
                            <Text gray2 style={{marginBottom: 10,}}>Location</Text>
                            {this.renderEdit('location')}

                        </Block>
                        <Text medium secondary>
                        {editing === 'location' ? 'Save' : 'Edit'}
                        </Text>
                    </Block>
                    <Block row space="between" margin={[15,0]} style={styles.inputRow}>
                        <Block>
                            <Text gray2 style={{marginBottom: 10,}}>E-mail</Text>
                            <Text bold>{profile.email} </Text>

                        </Block>
                    </Block>

                    </Block>

                <Divider margin={[16, 32]}/>

                <Block style={styles.sliders}>
                    <Block margin={[10, 0]}>
                        <Text gray2 style={{marginBottom: 10}}> Budget</Text>
                        <Slider
                        minimumValue={0}
                        maximumValue={1000}
                        style={{height: 19}}
                        thumbStyle={styles.thumb}
                        trackStyle={{height: 7, borderRadius: 7,}}
                        minimumTrackTintColor={theme.colors.secondary}
                        maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                        value={this.state.budget}
                        onValueChange={(value)=>this.setState({budget: value})}
                        >

                        </Slider>
                        <Text caption gray2 right> ${this.state.budget.toFixed(0)}</Text>
                    </Block>
                    <Block margin={[10, 0]}>
                        <Text gray2 style={{marginBottom: 10}}> Monthly Cap</Text>
                        <Slider
                        minimumValue={0}
                        maximumValue={5000}
                        style={{height: 19}}
                        thumbStyle={styles.thumb}
                        trackStyle={{height: 7, borderRadius: 7,}}
                        minimumTrackTintColor={theme.colors.secondary}
                        maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                        value={this.state.monthly_cap}
                        onValueChange={(value)=>this.setState({monthly_cap: value})}
                        ></Slider>
                        <Text caption gray2 right> ${this.state.monthly_cap.toFixed(0)}</Text>
                    </Block>
                </Block>
                <Divider margin={[16, 32]}/>
                    <Block style={styles.toggles}>
                        <Block row center space="between" style={{marginBottom: 32}}>
                            <Text size={16} gray2> Notifications</Text>
                            <Switch
                            value={this.state.notifications}
                            onValueChange={value => this.setState({notifications: value})}
                             
                            ></Switch>
                        </Block>
                        <Block row center space="between" style={{marginBottom: 32}}>
                            <Text size={16} gray2> Newsletter</Text>
                            <Switch
                            value={this.state.newsletter}
                            onValueChange={value => this.setState({newsletter: value})}
                             
                            ></Switch>
                        </Block>
                    </Block>
                </ScrollView>   

            </Block>
        )
    }
}


Settings.defaultProps = {
    profile: mocks.profile,

}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 4
    
    },
    avatar: {
        height: 50,
        width: 50,
    
    },
    inputs:{
        marginTop: 12,
        paddingHorizontal: 32,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: 12,
        paddingHorizontal: 32, 
    },
    thumb: {
        width: 16,
        height: 16,
        borderRadius: 16,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,

    },
    toggles: {
        marginTop: 12,
        paddingHorizontal: 32, 
    }
})


export default Settings;
