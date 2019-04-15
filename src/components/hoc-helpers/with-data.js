import React, { Component } from 'react';
import BigLoader from "../bigloader"

const withData = (getData, firstLoad) => (View) => {
    return class extends Component {

        componentDidMount() {
            getData()
        }
        render() {
            if (firstLoad) {
                return <BigLoader />;
            }
            return <View  />;
        }
    };
};

export default withData;
