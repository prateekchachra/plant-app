import React, { Component } from 'react';
import {Keyboard, ActivityIndicator, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Block , Text, Input, Button} from '../components';
import { theme } from '../constants';


export default class Login extends Component {
    state= {

        email: 'findawing@gmail.com',
        password: 'findawing',
        errors: [],
        loading: false
    }

    handleLogin(){
        const {navigation} = this.props;
        const {email, password, errors} = this.state;
        Keyboard.dismiss();
        this.setState({loading: true});



        // Check with a backend API whether the email-password are right or 
        // not.

        if(email !== "findawing@gmail.com"){
            errors.push('email');

        } 
        if(password !== 'findawing'){
            errors.push('password');
        }
        if(errors.length){
           this.setState({errors, loading: false});
        }
        else{
            this.setState({loading: false});
            navigation.navigate("Browse");
        }

    }

    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors: null;


        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
            <Block padding={[0, theme.sizes.padding * 1.2]}>
                <Text h1 bold> Login </Text>

                <Block middle>
                    <Input
                    label="Email"
                    error={hasErrors('email')}
                    style={[styles.input, hasErrors('email')]}
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({email: text})}
                    ></Input>
                    <Input
                    secure
                    error={hasErrors('password')}
                    label="Password"
                    style={[styles.input, hasErrors('password')]}
                    defaultValue={this.state.password}
                    onChangeText={text => this.setState({password: text})}
                    ></Input>
                <Button gradient onPress={() => this.handleLogin()}>
                    {loading ? <ActivityIndicator size="small" color="white" />
                   : <Text bold white center>Login</Text>}
                </Button>


                <Button onPress={() => navigation.navigate('Forgot')}>
                    <Text gray caption center
                    style={{textDecorationLine: 'underline'}}>Forgot Password?</Text>
                </Button>
                </Block>
            </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    login: {
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
