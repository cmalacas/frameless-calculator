import React, { Component, Fragment } from 'react';
import Authservice from '../Authservice';

import Dropzone from 'react-dropzone'

export default class Upload extends Component {

    constructor( props ) {

        super( props );

        this.state = {

          uploading: false,

        }

        
        
    }

    

    render() {

        return (

            <Fragment>

              <div className="container">

                  <h2>Frameless Glass Online</h2>

                  <Dropzone onDrop={ this.props.drop }>
                    {({getRootProps, getInputProps}) => (
                      <section className="drop-zone">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <h3>Upload the product CSV file</h3>
                          { this.props.uploading ?

                          <p>Updating products, please wait...</p>

                          :
                          
                          <p>To update the products, drag 'n' drop the csv file, or click to select the file</p>

                          }
                        </div>
                      </section>
                    )}
                  </Dropzone>

              </div>

                
            </Fragment>

        )

    }

}