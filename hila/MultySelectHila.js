import { useState } from "react";
import SelectMultiple from 'react-native-select-multiple'
import { View } from "react-native-web";

const LANGUAGES = ["Hebrew", "English", "Spanish", "French", "Arabic"]

const NestedComp = (props) => {

    const [languages, setLanguages] = useState(LANGUAGES)
    // console.log(props.lang);
    const changeLanguages = () => {
        
        // const elem1 = document.getElementById("lang1")
        // const elem2 = document.getElementById("lang2")
        const list = []

        // if (elem1.checked){
        //     list.push(elem1.value)
        // }
        // if (elem2.checked){
        //     list.push(elem2.value)
        // }
        
        props.changeLang(list)
    }
    // console.log(props.lang);
    return ( 
        <View>
            <SelectMultiple
                items={LANGUAGES}
                // selectedItems={this.state.selectedLanguages}
                selectedItems = {props.lang}
                onSelectionsChange={this.onSelectionsChange} 
            />
            <View>
                {this.selectedLanguages}
            </View>
        </View>

        // <div>
        //     <input id="lang1" type="checkbox" value="English" />
        //     English
        //     <br />
        //     <input id="lang2" type="checkbox"  value="Hebrew"/>
        //     Hebrew
        //     <br />
            
        //     I am MultiSelect
        //     Please click here to change lang:
        //     <br />
        //     <button onClick={changeLanguages}>Click Here</button>
        // </div>
     );
}
 
export default NestedComp;