import { useState } from "react";
import MultiSelect from './MultiSelect';

const MyPage = () => {

    const [langList, setLangList] = useState([])

    return ( 
        <div>
            <br />
            This is the best website! my selected lang is: {langList}
            <br /><br />
            <MultiSelect lang={langList} changeLang={setLangList}></MultiSelect>
        </div>
     );
}
 
export default MyPage;