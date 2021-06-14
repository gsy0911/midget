import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {Layout} from './Layout';


const container = document.getElementById('contents');

ReactDOM.render(
	<>
		<Provider store={store}>
			<Layout />
		</Provider>
	</>,
	container
);
