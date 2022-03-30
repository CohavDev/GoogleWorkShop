import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Match from '../components/Match';
import colors from '../config/colors';

function MatchesScreen(props) {
    return (
        <View style={{
            backgroundColor: colors.background, 
            height: '100%', 
            width: '100%'}}>
            <View style={styles.background}>
                <Match 
                    name = 'Lucy Hutton' 
                    //profilePic = '../assets/genericProfilePicture.jpg' //Not working!!!
                    text = "I'm Lucy and I work at a publishing company. I would like to travel with someone who is NOT Joshua Templeman"/>
                <Match 
                    name = 'Joshua Templeman' 
                    //profilePic = '../assets/genericProfilePicture.jpg'
                    text = "Hey i'm Josh. Stop staring, shortcake. I can feel your eyes on me."/>
                <Match 
                    name = 'Harry Potter'
                    text = "Anything but Slytherin, anythng but Slytherin"/>
                <Match 
                    name = 'Hermione Granger'
                    text = "It's not 'levi-oooo-sa', it's 'levi-o-saaaa'"/>
                <Match />
                <Match />
            </View>
            <View style={styles.viewTitleText}> 
                <Text style={styles.titleText}>Matches:</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewTitleText:{
        //flex: 1,
        //flexDirection: 'row', 
        //backgroundColor: "blue", 
        position: 'absolute', 
        justifyContent: 'center',       
        alignItems: 'center',
        left: 20,
        right: 20,
        top: -10,
        //textAlign: 'center',
    },

    titleText:{
        color:"white",
        fontSize: 30,
        fontWeight: 'bold',
        top: 100,
        alignSelf: 'center',
        //left: 50,
        //position: 'absolute',
        //marginLeft: 150,
        //textAlign: 'center',
        //borderRadius: 100
        //alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    background:{
        //flex: 1,
        marginTop: '30%',
        backgroundColor: colors.background,
        height: '60%',
        width: '100%',
        //top: 100,
        //alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        top: '10%',
        justifyContent: 'flex-start',


    }
})

export default MatchesScreen;