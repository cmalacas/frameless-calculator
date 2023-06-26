import React, { Component, Fragment } from 'react';

import Authservice from '../Authservice';

//import 'bootstrap/dist/css/bootstrap.min.css';

import BootstrapTable from 'react-bootstrap-table-next';

export default class DoorPanel extends Component {

    constructor( props ) {

        super( props );

        this.state = {

          panels: []

        }

        this.getData = this.getData.bind(this);
        
    }

    getData() {

      const data = new FormData;

      data.append('action', 'get_door_panel');

      Authservice.getDoorPanel( data )
      .then( response => {

        if (response.panels) {

          this.setState( { panels: response.panels } );

        }

      })

    }

    componentDidMount() {

      this.getData();

    }

    render() {

        const columns = [
                          {
                            dataField: 'index',
                            text: '#'
                          },
                          {
                            dataField: 'width',
                            text: 'Width'

                          },
                          {
                            dataField: 'code',
                            text: 'Product Code'
                          },
                          {
                            dataField: 'price',
                            text: 'Selling Price'
                          }

                        ];

          const panels = this.state.panels.map( (p,x) => {

            p.index = x + 1;

            return p;

          })

         

        return (

            <Fragment>

              <div style={ { margin: '5px 15px 2px'} }>

                <h2>Door Panel</h2>

                <BootstrapTable 
                    keyField="id"
                    data={ panels } 
                    columns={ columns } 
                    bordered={ true }
                    striped={ true }
                    hover={ true }

                />    

              </div>
              
                
            </Fragment>

        )

    }

}