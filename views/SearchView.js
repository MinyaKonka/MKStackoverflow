'use strict'

var React = require('react-native');
var SearchResultView = require('./SearchResultView')

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;

var styles = StyleSheet.create({
	description: {
		fontSize: 20,
		textAlign: 'center',
		color: '#FFFFFF'
	},

	container: {
		padding: 13,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop: 200,
	},

	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
	},

	icon: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	searchInput: {
		height: 44,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC',
	},

	button: {
		height: 44,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center',
	},

	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center',
	},

	iconImage: {
		width: 40,
		height: 40,
	}, 

	overflowText: {
		flexDirection: 'row',
		padding: 10,
		fontSize: 30,
	},
});

function urlForQueryAndPage(key, value, pageNumber) {
	var data = {
		country: 'uk',
		pretty: '1',
		encoding: 'json',
		listing_type: 'buy',
		action: 'search_listings',
		page: pageNumber
	};

	data[key] = value;

	var queryString = Object.keys(data)
		.map(key => key + "=" + encodeURIComponent(data[key]))
		.join('&');

	return 'http://api.nestoria.co.uk/api?' + queryString;
}

class SearchView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: '',
			isLoading: false,
			message: '',
		}
	}

	_handleResponse(response) {
		this.setState({ isLoading: false, message: '' });
		if (response.application_response_code.substr(0, 1) === '1') {
			console.log('Properties found: ' + response.listings.length);
			this.props.navigator.push({
				title: '查询结果',
				component: SearchResultView,
				passProps: {listings: response.listings},
			});
		} else {
			this.setState({ message: 'Location not recognizer; please try again.' });
		}
	}

	_executeQuery(query) {
		console.log(query);
		this.setState({ isLoading: true });

		fetch(query)
			.then(response => response.json)
			.then(json => this._handleResponse(json.response))
			.catch(error => 
				this.setState({
					isLoading: false,
					message: 'Something bad happened ' + error
				})
			);
	}

	onSearchTextChanged(event) {
		console.log('onSearchTextChanged');
		this.setState({ searchString: event.nativeEvent.text });
		console.log(this.state.searchString);
	}

	onSearchPressed() {
		var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
		this._executeQuery(query)
	}

	render() {

		console.log('search.render')

		var spinner = this.state.isLoading ? 
			(<ActivityIndicatorIOS
				hidden='true'
				size='large'/>) :
			(<View/>)

		return (

			<View style={styles.container}>

				<View style={styles.icon}>
					<Image source={require('image!stack')} style={styles.iconImage} />
					<Text style={styles.overflowText}>Stack Overflow</Text>
				</View>
				
				<View style={styles.flowRight}>
					<TextInput style={styles.searchInput}
							   value={this.state.searchString}
							   onChange={this.onSearchTextChanged.bind(this)}
							   placeholder='search' />
					<TouchableHighlight style={styles.button}
										underlayColor='#99d9f4'
										onPress={this.onSearchPressed.bind(this)}>
						<Text style={styles.buttonText}>Go</Text>
					</TouchableHighlight>
				</View>

				{spinner}

			</View>
		);
	}
}

module.exports = SearchView