import React, { Fragment, Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';

export default class Panels extends Component {

  constructor( props ) {

    super( props );

  }

  render() {

    const panels = this.props.panels.map( (p,index) => {

      p.index = index + 1;

      return p;

    })

    const columns = [
            {
              dataField: 'index',
              text: '#'
            },
            {
              dataField: 'category',
              text: 'Category'
            },
            {
              dataField: 'title',
              text: 'Title'
            },
            {
              dataField: 'code',
              text: 'Product Code'
            },
            {
              dataField: 'width',
              text: 'Width'
            },
            {
              dataField: 'price',
              text: 'Selling Price'
            }
          ];

    return (

      <Fragment>

        <BootstrapTable
            keyField="id"
            data={ panels } 
            columns={ columns } 
            bordered={ true }
            striped={ true }
            hover={ true }
          />

      </Fragment>

    )

  }


}