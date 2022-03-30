import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import colors from '../config/colors';
import Circle  from '../components/Circle';
//import CirclesBackground from '../components/CirclesBackground';

function ChooseActivity(props) {
    return (
        <View>
            <View style={styles.mainBackground}>
            <Image source={require('../assets/RoadTrip.jpg')} style={styles.backgroundImage} />

                <View style = {styles.leftBackground}>
                    
                    <Circle 
                        style={styles.circleButtonTop}
                        text = 'Drinks'
                        // onPress={() => alert('Drinks')}
                        >
                        {/* <Text style={styles.pressableText}>Drinks</Text> */}
                    </Circle>
                    
                    <Circle 
                        style={styles.circleButtonMiddle}
                        text = 'Travel'
                        // onPress={() => alert('Travel')}
                        >
                        {/* <Text style={styles.pressableText}>Travel</Text> */}
                    </Circle>
                   
                    <Circle
                        style={styles.circleButtonBottom}
                        text='Restaurant'
                        // onPress={() => alert('Restaurant')}
                        >
                        {/* <Text style={styles.pressableText}>Restaurant</Text> */}
                    </Circle>
                </View>
        
                <View style = {styles.rightBackground}>
                    <Circle 
                        style={styles.circleButtonTop}
                        text ='Party' 
                        // onPress={() => alert('Party')}
                        >
                        {/* <Text style={styles.pressableText}>Party</Text> */}
                    </Circle>
                    <Circle 
                        text = 'Driving'
                View        style={styles.circleButtonMiddle}
                        // onPress={() => alert('Driving')}
                        >
                        {/* <Text style={styles.pressableText}>Driving</Text> */}
                    </Circle>
                    <Circle 
                        text = 'A place to sleep'
                        style={styles.circleButtonBottom}
                        // onPress={() => alert('A Place to Sleep')}
                        >
                        {/* <Text style={styles.pressableText}>A Place to Sleep</Text> */}
                    </Circle>  
                </View>
            </View>
            <View style={styles.viewTitleText}> 
                <Text style={styles.titleText}>What activity are you looking for?</Text>
            </View>
        </View>
    // <View style={styles.mainBackground}>
        //     <Text style={styles.titleText}>What activity are you looking for today?</Text>

        //     <View style = {styles.leftBackground}>
        //         <Pressable 
        //             style={styles.circleButtonTop}
        //             onPress={() => alert('clicked top left successfully')}>
        //             <Text style={styles.pressableText}>Drinks</Text>
        //         </Pressable>
        //         <Pressable 
        //             style={styles.circleButtonMiddle}
        //             onPress={() => alert('clicked top left successfully')}>
        //             <Text style={styles.pressableText}>Travel</Text>
        //         </Pressable>
        //         <Pressable 
        //             style={styles.circleButtonBottom}
        //             onPress={() => alert('clicked top left successfully')}>
        //             <Text style={styles.pressableText}>Restaurant</Text>
        //         </Pressable>
        //     </View>
        
        //     <View style = {styles.rightBackground}>
        //         <Pressable 
        //             style={styles.circleButtonTop}
        //             onPress={() => alert('clicked top left successfully')}>
        //             <Text style={styles.pressableText}>Party</Text>
        //         </Pressable>
        //         <Pressable 
        //             style={styles.circleButtonMiddle}
        //             onPress={() => alert('clicked top left successfully')}>
        //             <Text style={styles.pressableText}>Driving</Text>
        //         </Pressable>
        //         <Pressable 
        //             style={styles.circleButtonBottom}
        //             onPress={() => alert('clicked top left successfully')}>
        //             <Text style={styles.pressableText}>Place to Sleep</Text>
        //         </Pressable>
        //     </View>
        // </View>       
    );
}

const styles = StyleSheet.create({
    backgroundImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        shadowColor: 'white',
        opacity: 0.6,
    },
    viewTitleText:{
        flex: 1,
        //flexDirection: 'row', 
        //backgroundColor: "blue", 
        position: 'absolute', 
        justifyContent: 'center',       
        alignItems: 'center',
        left: 20,
        right: 20,
        //textAlign: 'center',
    },

    titleText:{
        color:"white",
        fontSize: 20,
        fontWeight: 'bold',
        top: 115,
        alignSelf: 'center',
        //left: 50,
        //position: 'absolute',
        //marginLeft: 150,
        //textAlign: 'center',
        //borderRadius: 100
        //alignContent: 'center',
        justifyContent: 'space-evenly',
    },

    pressableText:{
        color:"white",
        fontSize: 16,
        fontWeight: 'bold',
        //borderRadius: 50
        //alignContent:'center',
        //justifyContent: 'center',
    },
    mainBackground:{
        backgroundColor: colors.background, 
        flexDirection: 'row', 
        //alignContent: 'space-around', 
        justifyContent: 'center',
        height: "100%",
       
    },
    leftBackground:{
        //backgroundColor: "#EEDACB",
        //backgroundColor: "pink",
        flexDirection: 'column',
        //alignItems: 'center',
        justifyContent: 'space-between',
        //alignContent: 'space-between',
        position: 'absolute', 
        //flex: 1,
        //width: "50%",
        height: "60%",
        top: '28%',
        left: '12%',
    },
    rightBackground:{
        height: "60%",
        top: '28%',
        right: '12%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        
        //backgroundColor: "#EEDACB",
        //backgroundColor: "pink",
        //alignItems: 'center',
        //alignContent: 'space-between',  
        //alignContent: 'space-between',
        //flex: 1,
        //width: "50%",
        //height: "85%"
        
    },
    circleButtonTop:{
        // backgroundColor: colors.circle,
        // width: 100,
        // height: 100,
        // borderRadius: 50,
        // alignItems: "center",
        // justifyContent: 'center',
        
        marginTop: 225,
        marginBottom: 50,
    },

    circleButtonMiddle:{
        // backgroundColor: colors.circle,
        // width: 100,
        // height: 100,
        // borderRadius: 50,
        // alignItems: "center",
        // justifyContent: 'center',
        margin: 40

    },
    circleButtonBottom:{
        // backgroundColor: colors.circle,
        // width: 100,
        // height: 100,
        // borderRadius: 50,
        // alignItems: "center",
        // justifyContent: 'center',
        marginTop: 40,
        //marginBottom: 80

    }
})

export default ChooseActivity;
