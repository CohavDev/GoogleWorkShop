import styles from "../app/firescreens/LoginScreen/styles";

<View style={styles.background}>
			<ScrollView style={styles.scrollView}>
				<View styles={styles.insideScrollview}>
					<View style={styles.leftBackground}>
						<Pressable 
							onPress={() => pressActivityHandler("Drink", "glass-wine")}
						>
							<Circle
								style={styles.circleButtonTop}
								text="Drinks"
								iconName="glass-wine"
							></Circle>
						</Pressable>
						{/* <Pressable onPress={() => pressActivityHandler("Hiking", "hiking")}>
                                <Circle
                                style={styles.circleButtonMiddle}
                                text="Backpacking"
                                iconName="hiking"
                                ></Circle>
                            </Pressable> */}
						<Pressable
							onPress={() =>
								pressActivityHandler("Restaurant", "silverware")
							}
						>
							<Circle
								style={styles.circleButtonBottom}
								text="Restaurant"
								iconName="silverware"
							></Circle>
						</Pressable>
						{/* // iconName="noodles"> */}

						<Pressable
							onPress={() =>
								pressActivityHandler("Party", "party-popper")
							}
						>
							<Circle
								style={styles.circleButtonTop}
								text="Party"
								iconName="party-popper"
							></Circle>
						</Pressable>
						<Pressable
							onPress={() => pressActivityHandler("Beach", "beach")}
						>
							<Circle
								style={styles.circleButtonTop}
								text="Beach"
								iconName="beach"
							></Circle>
						</Pressable>
						<Pressable
							onPress={() =>
								pressActivityHandler("Backpacking", "hiking")
							}
						>
							<Circle
								style={styles.circleButtonMiddle}
								text="Backpacking"
								iconName="hiking"
							></Circle>
						</Pressable>
					</View>

					<View style={styles.rightBackground}>
						<Pressable
							onPress={() =>
								pressActivityHandler("Concert", "music-clef-treble")
							}
						>
							<Circle
								text="Concert"
								iconName="music-clef-treble"
								style={styles.circleButtonMiddle}
							></Circle>
						</Pressable>

						<Pressable
							onPress={() => pressActivityHandler("Museum", "bank")}
						>
							<Circle
								text="Museum"
								iconName="bank"
								style={styles.circleButtonMiddle}
							></Circle>
						</Pressable>
						<Pressable
							onPress={() =>
								pressActivityHandler(
									"Place to sleep",
									"bunk-bed-outline"
								)
							}
						>
							<Circle
								text="Place to sleep"
								iconName="bunk-bed-outline"
								style={styles.circleButtonBottom}
							></Circle>
						</Pressable>
						<Pressable
							onPress={() =>
								pressActivityHandler("Driving", "car-hatchback")
							}
						>
							<Circle
								text="Driving"
								iconName="car-hatchback"
								style={styles.circleButtonMiddle}
							></Circle>
						</Pressable>
						<Pressable
							onPress={() =>
								pressActivityHandler("Extreme", "airballoon")
							}
						>
							<Circle
								text="Extreme"
								iconName="airballoon"
								style={styles.circleButtonBottom}
							></Circle>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</View>