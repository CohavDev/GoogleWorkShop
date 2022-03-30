import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../config/colors';

function MatchDesription(props) {
    return (
        <View style={styles.background}>
            <View style={styles.textBox}>
                <Text style={{
                    alignSelf: 'flex-start'}}>
                        {props.text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: 'transparent',
        height: 60,
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        //alignSelf: 'center',
        //justifyContent: 'center',
        //alignItems: 'center',
        //alignContent:'center',
        marginBottom: 30,
        //position: 'absolute',

    },
    profilePicture:{
        height: 70,
        width: 70,
        borderRadius: 35,
        marginTop: -20,
        backgroundColor: 'white',
        right: 10,
        //alignSelf: 'center',
        //alignItems: 'center',
        //alignContent:'center',
    },
    nameTag:{
        height: 10,
        width: "75%",
        backgroundColor: 'transparent',
        textAlign: 'left',
    },
    textBox:{
        height: 40,
        width: "75%",
        backgroundColor: 'transparent',
        textAlign: 'left',
        //alignSelf: 'stretch',
        //borderRadius: 50,
    },
    text:{
        alignSelf: 'flex-start',
        //padding: 50,
    }

})

export default MatchDesription;