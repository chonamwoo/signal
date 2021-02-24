import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';


const LoginScreen = ({ navigation }) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            if(authUser) {
                navigation.replace('Home');
            }
        });

        return unsubscribe;
    },[]);

    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error));
    };

    return (
    <KeyboardAvoidingView style ={styles.container}>
        <StatusBar style='light'/>
        <Image
        source ={{
            uri:'https://i.pinimg.com/originals/8f/e6/b0/8fe6b0e7101ef6336515b68904ca7450.jpg'
                  ,
        }}
            style ={{width:200, height:200}}
        />
        <View style ={styles.inputContainer}>
            <Input 
            placeholder ='Email' 
            autoFocus type ="email" 
            value ={email}
            onChangeText ={(text) => setEmail(text)}
            />
            <Input 
            placeholder ='Password' 
            secureTextEntry
            type ="password" 
            value ={password}
            onChangeText ={(text) => setPassword(text)}
            onSubmitEditing ={signIn}
            />
            
        </View>

        <Button raised containerStyle ={styles.button} 
        onPress ={signIn} title ='Login'
        />
        <Button raised onPress ={() => navigation.navigate('Register')} 
        containerStyle ={styles.button} 
        type='outline' 
        title ='Register'
        />
        <View style ={{height: 100}} />
    </KeyboardAvoidingView>
        );
    };

export default LoginScreen;

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,

    },
    button:{
        width:200,
        marginTop:10,

    },

});