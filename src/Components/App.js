import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Authservice from './Authservice';

import Upload from './Page/Upload';
import Panels from './Page/Panels';

export default class App extends Component {

    constructor( props ) {

        super( props );

        this.state = {

            panels: [],
            uploading: false,

        }

        this.getData = this.getData.bind(this);
        this.drop = this.drop.bind(this);
    }

    getData() {

        const data = new FormData;

        data.append( 'action', 'get_panels' );

        Authservice.get_fixed_panels( data )
        .then( response => {

            if ( response.panels ) {

                this.setState( { panels: response.panels } );

            }

        })

    }

    drop(files) {
        
        const data = new FormData();
        
        files.forEach((file, index) => {
            data.append(`file`, file, file.name);
        });

        data.append('action', 'upload_csv');

        this.setState( { uploading: true }, () => {

          Authservice.uploadCSV(data)
          .then(response => {
              if (response.success) {
                this.setState( { uploading: false, panels: response.panels } );
              }
          })
        })
    }

    componentDidMount() {

        this.getData();

    }

    
    render() {

        return (

            <Fragment>
                <Upload uploading={ this.state.uploading } drop={ this.drop } />
                <Panels panels={ this.state.panels } />
            </Fragment>

        )

    }

}