import React from 'react';
import { StyleSheet, Text, Pressable } from "react-native";
import colors from '../config/colors';

function Circle(props) {
    return (
        <Pressable 
            style={styles.circle}
            onPress={() => alert(props.text)}>
            <Text style={styles.pressableText}>{props.text}</Text>
        </Pressable>
);
}

const styles = StyleSheet.create({
    circle:{
        backgroundColor: colors.shapeBackground, //colors.circle,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center'       
    },
    pressableText:{
        color:"white",
        fontSize: 16,
        fontWeight: 'bold',
        //borderRadius: 50
        //alignContent:'center',
        //justifyContent: 'center',
    },
})

export default Circle;