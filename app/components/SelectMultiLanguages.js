import React from "react";
import { View } from "react-native";
import SelectMultiple from "react-native-select-multiple";

const LANGUAGES = ["Hebrew", "English", "Spanish", "French", "Arabic"];

const SelectMultiLanguages = (props) => {
    selectedLanguages = props.lang;
	onSelectionsChange = (selectedLanguages) => {
		props.changeLang({ selectedLanguages });
	};

		return (
			<View>
				<SelectMultiple
					items={LANGUAGES}
					selectedItems={selectedLanguages}
					onSelectionsChange={onSelectionsChange}
				/>
			</View>
		);
	
}

export default SelectMultiLanguages;
