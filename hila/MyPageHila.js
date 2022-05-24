import { useState } from "react";
// import MultiSelect from './MultiSelect';
import SelectMultiLanguages from "./SelectMultiLanguages";
import { View } from "react-native";

const LANGUAGES = ["Hebrew", "English", "Spanish", "French", "Arabic"]
const selectedLanguages = []

const MyPageHila = () => {

    const [langList, setLangList] = useState([])
    console.log(langList);
    return ( 
        <View>
            <SelectMultiLanguages lang={langList} changeLang={setLangList}/>
        </View>
        
        // <div>
            
        //     <br />
        //     This is the best website! my selected lang is: {langList}
        //     <br /><br />
        //     <MultiSelect lang={langList} changeLang={setLangList}></MultiSelect>
        // </div>
     );
}
 
export default MyPageHila;