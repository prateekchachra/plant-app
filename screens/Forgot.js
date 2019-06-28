import React, { Component } from 'react';
import {Alert, Keyboard, ActivityIndicator, KeyboardAvoidingView, StyleSheet} from 'react-native';

import { Block, Text, Input, Button } from '../components';
import { theme } from '../constants';
export default class Forgot extends Component {
    state= {

        email: 'findawing@gmail.com',
        errors: [],
        loading: false
    }


    handleForgot(){
        const {navigation} = this.props;
        const {email, errors} = this.state;
        Keyboard.dismiss();
        this.setState({loading: true});



        // Check with a backend API whether the email-password are right or 
        // not.
 
        if(email !== "findawing@gmail.com"){
            errors.push('email');

        }
        if(errors.length){
           this.setState({errors, loading: false});
           Alert.alert(
            'Error!',
            'Please check your email address!',
            [
                {
                    text: 'Try Again',
                }

            ],
            {cancelable: false}
        )
        }
        else{
            this.setState({loading: false});
            Alert.alert(
                'Password Sent!',
                'Please check your email!',
                [
                    {
                        text: 'OK', onPress: () => {
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
            <KeyboardAvoidingView  style={styles.forgot} behavior="padding">
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
                <Button gradient onPress={() => this.handleForgot()}>
                    {loading ? <ActivityIndicator size="small" color="white" />
                   : <Text bold white center>Forgot</Text>}
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
    forgot: {
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
