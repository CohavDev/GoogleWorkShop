import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../config/colors';

function Match(props) {
    //var profilePic = props.profilePic;
    //console.log(profilePic);
    return (
        <View style={styles.background}>
            <Image 
            source={require('../assets/genericProfilePicture.jpg')} //{require(profilePic)} //
            style={styles.profilePicture} />
            <View style={{
                flexDirection: 'column', 
                justifyContent: 'center'}}>
                <View>
                    <Text style={styles.text}>{props.name} {"\n"}</Text>                

                </View>
                <View style={styles.textBox}>
                    <Text style={{
                        alignSelf: 'flex-start'}}>
                            {props.text}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: 'transparent',
        height: 70,
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        //alignSelf: 'center',
        //justifyContent: 'center',
        //alignItems: 'center',
        //alignContent:'center',
        marginBottom: 35,
        //position: 'absolute',

    },
    profilePicture:{
        height: 70,
        width: 70,
        borderRadius: 35,
        marginTop: -20,
        //backgroundColor: 'white',
        right: 10,
        //alignSelf: 'center',
        //alignItems: 'center',
        //alignContent:'center',
    },
    nameTag:{
        //height: 90,
        width: "80%",
        backgroundColor: 'transparent',
        textAlign: 'left',
        bottom: 40 ,
    },
    textBox:{
        height: 60,
        width: "80%",
        backgroundColor: 'transparent',
        textAlign: 'left',
        //alignSelf: 'flex-start',
        //alignItems: 'flex-start',
        marginRight: 50,
        bottom: 15,
        //alignContent: 'flex-start',
        //borderRadius: 50,
    },
    text:{
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        //padding: 50,
    }

})

export default Match;