import React, { Component } from "react";
import { View } from "react-native";
import SelectMultiple from "react-native-select-multiple";

const LANGUAGES = ["Hebrew", "English", "Spanish", "French", "Arabic"];
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

const SelectMultiLanguages = (props) => {
    // state = { selectedLanguages: [] };
    selectedLanguages = props.lang;
	onSelectionsChange = (selectedLanguages) => {
		// selectedFruits is array of { label, value }
		props.changeLang({ selectedLanguages });
	};

	// render() {
		return (
			<View>
				<SelectMultiple
					items={LANGUAGES}
					selectedItems={selectedLanguages}
					onSelectionsChange={onSelectionsChange}
				/>
				{/* <div>
            {this.selectedLanguages}
          </div> */}
			</View>
		);
		//   console.log(this.selectedLanguages)
	
}


// class SelectMultiLanguages extends Component {
// 	// onSelectionsChange = () => {
// 	// 	// selectedFruits is array of { label, value }
// 	// 	this.setState({ props.lang });
// 	// };

// 	// render() {
// 	// 	return (
// 	// 		<View>
// 	// 			<SelectMultiple
// 	// 				items={LANGUAGES}
// 	// 				selectedItems={this.props.selectedLanguages}
// 	// 				onSelectionsChange={this.onSelectionsChange}
// 	// 			/>
// 	// 			{/* <div>
// 	//         {this.selectedLanguages}
// 	//       </div> */}
// 	// 		</View>
// 	// 	);
// 	// 	//   console.log(this.selectedLanguages)
// 	// }
// 	// }

// 	state = { selectedLanguages: [] };

// 	onSelectionsChange = (selectedLanguages) => {
// 		// selectedFruits is array of { label, value }
// 		this.setState({ selectedLanguages });
// 	};

// 	render() {
// 		return (
// 			<View>
// 				<SelectMultiple
// 					items={LANGUAGES}
// 					selectedItems={this.state.selectedLanguages}
// 					onSelectionsChange={this.onSelectionsChange}
// 				/>
// 				{/* <div>
//             {this.selectedLanguages}
//           </div> */}
// 			</View>
// 		);
// 		//   console.log(this.selectedLanguages)
// 	}
// }
export default SelectMultiLanguages;
