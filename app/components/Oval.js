import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../config/colors";

function Oval(props) {
    return (
        <View style={styles.ovalButton}>
            {/* <Pressable onPress={() => alert(props.text)}> */}
                <Text style={styles.textStyle}>{props.text}</Text>
            {/* </Pressable> */}
        </View>
);
}

const styles = StyleSheet.create({
    textStyle:{
        color:"black",
        fontSize: 18,
        fontWeight: 'bold',
        //fontFamily: 'Palette Mosaic'
    },
    ovalButton:{
        backgroundColor: colors.shapeBackground, //colors.circle,
        width: 320,
        height: 90,
        borderRadius: 40,
        //top: 50,
        bottom: 20,
        //margin: -10,
        flexDirection: 'row',
        //alignContent: 'center',
        alignItems: "center",
        justifyContent: 'center',
        // position: 'absolute',
    },
});

export default Oval;
