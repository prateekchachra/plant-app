import React, { Component } from 'react';
import {Alert, Keyboard, ActivityIndicator, KeyboardAvoidingView, StyleSheet} from 'react-native';

import { Block, Text, Input, Button } from '../components';
import { theme } from '../constants';




export default class Signup extends Component {
    state= {

        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false
    }


    handleSignup(){
        const {navigation} = this.props;
        const {email,username, password, errors} = this.state;
        Keyboard.dismiss();
        this.setState({loading: true});



        // Check with a backend API whether the email-password are right or 
        // not.
 
        if(!email) errors.push('email');
        if(!username) errors.push('username');
        if(!password) errors.push('password');



        if(errors.length){
           this.setState({errors, loading: false});
        }
        else{
            this.setState({loading: false});
            Alert.alert(
                'Success!',
                'Your account has been created. Please check your email!',
                [
                    {
                        text: 'Continue', onPress: () => {
                            navigation.navigate('Login');
                        }
                    }

                ],
                {cancelable: false}
            )
        }

    }
    render() {

        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors: null;


        return (
         
               <KeyboardAvoidingView  style={styles.signup} behavior="padding">
               <Block padding={[0, theme.sizes.padding * 1.2]}>
               <Text h1 bold>Sign Up</Text>
               <Block middle>
                       <Input
                       label="Email"
                       error={hasErrors('email')}
                       style={[styles.input, hasErrors('email')]}
                       defaultValue={this.state.email}
                       onChangeText={text => this.setState({email: text})}
                       ></Input>
                       <Input
                       label="Username"
                       error={hasErrors('username')}
                       style={[styles.input, hasErrors('username')]}
                       defaultValue={this.state.username}
                       onChangeText={text => this.setState({username: text})}
                       ></Input>
                       <Input
                       secure
                       label="Password"
                       error={hasErrors('password')}
                       style={[styles.input, hasErrors('password')]}
                       defaultValue={this.state.password}
                       onChangeText={text => this.setState({password: text})}
                       ></Input>
                   <Button gradient onPress={() => this.handleSignup()}>
                       {loading ? <ActivityIndicator size="small" color="white" />
                      : <Text bold white center>Sign Up</Text>}
                   </Button>
   
   
                   <Button onPress={() => navigation.navigate('Login')}>
                       <Text gray caption center
                       style={{textDecorationLine: 'underline'}}>Back to Login</Text>
                   </Button>
                   </Block>
               </Block>
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    signup: {
        flex: 1,
        justifyContent: 'center',
    },
    
    input:{
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,

    }
})
