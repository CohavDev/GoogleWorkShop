import { useState } from "react";

const NestedComp = (props) => {

    const [languages, setLanguages] = useState(['1','2'])

    const changeLanguages = () => {
        
        const elem1 = document.getElementById("lang1")
        const elem2 = document.getElementById("lang2")
        const list = []

        if (elem1.checked){
            list.push(elem1.value)
        }
        if (elem2.checked){
            list.push(elem2.value)
        }
        
        props.changeLang(list)
    }

    return ( 
        <div>
            {/* <input id="lang1" type="checkbox" value="English" />
            English
            <br />
            <input id="lang2" type="checkbox"  value="Hebrew"/>
            Hebrew
            <br />
             */}
            I am MultiSelect
            Please click here to change lang:
            <br />
            <button onClick={changeLanguages}>Click Here</button>
        </div>
     );
}
 
export default NestedComp;