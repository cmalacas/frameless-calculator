import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Authservice from '../../Authservice';
import { formatter } from '../../Function';

import { Row, Col, Input, Button, ModalBody, Modal, FormGroup, ModalFooter } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons';

import ReactTooltip from 'react-tooltip'

import Swal from 'sweetalert2';

export default class FixedPanelShowerScreen extends Component {

    constructor( props ) {

        super( props );

        this.state = {

          panels: [],
          width: 0,
          price: 0,
          code: '',

          overall: 0,
          installed: 0,
          difference: 0,
          quantity: 1,
          total: 0,
          action: 'add-to-cart',
          product: 'Fixed Panel',

          bracket: false,
          brackets_90: [],
          brackets_180: [],
          extras:[],
          image: '/wp-content/uploads/2021/09/Fixed-panel-pictorial.jpg'
        }

        this.getData = this.getData.bind(this);
        this.select = this.select.bind(this);
        this.change = this.change.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.closeBracket = this.closeBracket.bind(this);
        this.overall = this.overall.bind(this);
        
    }

    overall( e ) {

      this.setState( { overall: e.target.value } );

    }
    

    closeBracket() {

      this.setState( { bracket: false } );

    }

    addToCart() {

      const data = new FormData;

      const { overall, width } = this.state;

      const difference = overall - ( width + 3 );

      data.append('action', 'add-to-cart');
      data.append('width', this.state.width);
      data.append('price', this.state.price);
      data.append('code',  this.state.code);
      data.append('quantity', this.state.quantity);
      data.append('total', this.state.total);
      data.append('product', 'Fixed Panel');
      data.append('image', this.state.image);
      data.append('showerWidth', this.state.overall);
      data.append('difference', difference)

      Authservice.addToCart( data )
      .then( response => {

        if ( response.success ) {

          Swal.fire({
            icon: 'success',
            title: 'Fixed Panel Shower Screen has been added to your cart',
            showConfirmButton: false,
            timer: 1500
          });

          this.setState( { bracket: true } );

          ReactTooltip.rebuild();

        }

      })
      
    }

    change( e ) {

      const quantity = parseInt( e.target.value );

      const total = this.state.price * quantity;

      this.setState( { quantity, total } );

    }

    select( e ) {

      let price = 0;
      let code = '';
      const width = parseInt(e.target.value);

      this.state.panels.map( p => {

        if ( parseInt(p.width) === width ) {

          price = parseFloat(p.price);
          code = p.code;

        }

      });

      const total = this.state.quantity * price;

      this.setState( { width, price, code, total } );

    }

    getData() {

      const data = new FormData;

      data.append('action', 'get_frontend_fixed_panel');

      Authservice.get_fixed_panels( data )
      .then( response => {

        if (response.panels) {

          this.setState( { 
                panels: response.panels, 
                brackets_90: response.brackets_90,
                brackets_180: response.brackets_180,
                extras: response.extras,
              } );

          ReactTooltip.rebuild()

        }

      })

    }

    componentDidMount() {

      this.getData();

    }

    render() {

        let valid = false;

        const { overall, width } = this.state;

        const installed = width + 3;

        const difference = overall - installed;

        if ( width > 0 ) {

          valid = true;

        }

        return (

            <Fragment>

              {/* <Row>
                
                <Col md={8}>
                  <p><strong>Step 1: What is the overall width of your shower?</strong><br /><i>
                  See shower <WhatType text="measurement guide" /> for illustration.</i></p>
                </Col>
                
                <Col md={4}>
                  <Input onChange={ this.overall } value={ overall } name="overall" type="text" />
                      
                </Col>
              </Row> */}

              <MeasurementGuide img={ this.state.image } />

              <FormGroup row className="mb-4 pb-4">
                
                <Col md={8}>
                  <p><strong>Step 1: Select Fixed Panel Width</strong><br />Select how long you want your fixed glass panel to be.</p>
                 
                </Col>
                
                <Col md={4}>
                  <Input onChange={ this.select } type="select">
                      <option value="0">Choose an option</option>
                      { this.state.panels.map( p => {

                        return <option value={p.width}>{p.width}</option>

                      })}
                  </Input>
                </Col>
              </FormGroup>

             

              <FormGroup row className="pt-4 mt-4">
                
                <Col md={8}>
                  <p>If you select this width panel, an additional 3mm will be added to the width of the shower screen once the brackets are installed.</p>
                </Col>
                
                {/* <Col md={4}>

                  <Input value={ difference } type="text" readonly={true } />
                      
                  </Col> */}
              </FormGroup>
              
              {
                true ?

                  <Fragment>

                    <Row>
                      <Col md={4}>

                        <h3>Price: { formatter.format(this.state.price) }</h3>
                        <h5>Total: { formatter.format(this.state.total) }</h5>
                      </Col>
                      <Col md={3}>
                        <Input disabled={ valid == false } onChange={ this.change } type="number" step="1" value={ this.state.quantity } /> 
                      </Col>
                      <Col md={4}>
                        <Button disabled={ valid == false } onClick={ this.addToCart } color="primary">Add To Cart</Button>
                      </Col>
                    </Row>

                    

                  </Fragment>

                  : ''
              }

              <Row className="d-flex">
                
              </Row>

              <Bracket 
                  open={ this.state.bracket } 
                  close={ this.closeBracket } 
                  brackets_90={ this.state.brackets_90 }
                  brackets_180={ this.state.brackets_180 }
                  extras={ this.state.extras }
                  panelQuantity={ this.state.quantity }
                  />

              <ReactTooltip />
                
            </Fragment>

        )

    }

}

class Bracket extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      open: props.open,
      selected: 0,
      isVariantSelected: false,
      selectedVariant: [],
      product: 'Bracket',
      _90_degree_bracket: 0,
      _180_degree_bracket: 0,
      _90_degree_price: 0,
      _180_degree_price: 0,
      extras: false,
      _90_degree_image: '/wp-content/uploads/2021/09/Wall-bracket.jpg',
      _180_degree_image: '/wp-content/uploads/2021/09/180-degree-wall-bracket.png',

      variant: '',
      category: '',

      quantities: []

    }

    this.modalRef = React.createRef();

    this.close = this.close.bind(this);
    this.select90 = this.select90.bind(this);
    this.select180 = this.select180.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.extraAddToCart = this.extraAddToCart.bind(this);
    this.variantSelected = this.variantSelected.bind(this);

    this.setQuantity = this.setQuantity.bind(this);
  
  }

  setQuantity( e, item ) {

    const quantities = this.state.quantities;

    const quantity = parseInt(e.target.value);

    let found = false;

    quantities.map( q => {

      if ( item.id === q.id ) {

        found = true;
        q.quantity = quantity;
      }

      return q;

    });

    if ( !found ) {

      quantities.push( { id: item.id, quantity: 1} );

    }

    this.setState( { quantities } );

  }

  variantSelected( v ) {

    const variant = v.split(':');

    const selectedVariant = {
      code: variant[3],
      category: variant[0],
      price: variant[1],
    }

    this.setState({ selectedVariant, isVariantSelected: true } );


  }

  extraAddToCart( x, quantity ) {

    const isVariantSelected = this.state.isVariantSelected;

    const variants = x.variants.split(',');

    const data = new FormData;

    let valid = true;

    if ( variants.length > 1 ) {

      if ( isVariantSelected ) {

        const selectedVariant = this.state.selectedVariant;
  
        const price = selectedVariant.price;
  
        const code = selectedVariant.code;
  
        const colour = selectedVariant.category;

        data.append('product', 'Extra');
        data.append('action', 'add-to-cart');
        data.append('code', code);
        data.append('title', x.category);
        data.append('colour', colour);
        data.append('price', price);
        data.append('quantity', quantity);
  
      } else {

        valid = false;

      }

    } else {

      data.append('product', 'Extra');
      data.append('action', 'add-to-cart');
      data.append('code', x.code);
      data.append('title', x.category);
      data.append('price', x.price);
      data.append('quantity', quantity);

    }

    if ( valid ) {

      Authservice.addToCart( data )
      .then( response => {

        if ( response.success )  {

          Swal.fire( {
    
            icon: 'success',
            title: `${x.category} added to the cart`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: false,
            showConfirmButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceed to Checkout',
            cancelButtonText: 'Continue Shopping',
            timer: 1500
          });

          const node = document.getElementById("modal-body");

          const popup = ReactDOM.findDOMNode( node );

          popup.scrollTo(0,0);


        } 

      })

      this.setState( { isVariantSelected: false, selectedVariant: [] } );

    } else {

      Swal.fire( {
  
        icon: 'error',
        title: 'Please select variant'

      })

    }

  }

  addToCart(item) {

    const valid = this.state._90_degree_bracket > 0 || this.state._180_degree_bracket;

    if ( valid ) {

        const data = new FormData;

        data.append('product', 'Bracket');
        data.append('action', 'add-to-cart');
        data.append('_90_degree_bracket', this.state._90_degree_bracket);
        data.append('_180_degree_bracket', this.state._180_degree_bracket);
        data.append('_90_degree_price', this.state._90_degree_price);
        data.append('_180_degree_price', this.state._180_degree_price);
        data.append('_180_degree_image', this.state._180_degree_image);
        data.append('_90_degree_image', this.state._90_degree_image);
        data.append('quantity', parseInt( this.props.panelQuantity ) * 2 );

        Authservice.addToCart( data )
        .then( response => {

          if ( response.success )  {
            
            const node = document.getElementById("modal-body");

            const popup = ReactDOM.findDOMNode( node );

            popup.scrollTo(0,0);

            Swal.fire({
              icon: 'success',
              title: `${this.state.category}(${this.state.variant}) has been added to your cart`,
              showConfirmButton: false,
              timer: 1500
            })

            this.setState( { extras: true } );

          }

        })

      } else {

        Swal.fire( {
  
          icon: 'error',
          title: 'Please select a bracket'
  
        })
  
      }

  }

  select180( bracket ) {

    const b = this.props.brackets_180.filter( bb => bb.id == bracket.id );

    const _180_degree_price = b[0].price;

    const selected = bracket.id

    const _180_degree_bracket = bracket.id

    const variant = bracket.title;

    const category = bracket.category;

    this.setState( { _180_degree_price, selected, _180_degree_bracket, variant, category  } );

  }

  select90( bracket ) {

    const b = this.props.brackets_90.filter( bb => bb.id == bracket.id );

    const _90_degree_price = b[0].price;

    const _90_degree_bracket = bracket.id;

    const selected = bracket.id

    const variant = bracket.title;

    const category = bracket.category;

    this.setState( { _90_degree_price, selected, _90_degree_bracket, variant, category  } );

  }

  close() {

    this.setState( { open: false } );

  }

  cart() {

    window.location = '/cart';

  }

  render() {

    const brackets_90 = this.props.brackets_90.filter( b => this.state._90_degree_bracket == 0 || b.id == this.state._90_degree_bracket );

    const brackets_180 = this.props.brackets_180.filter( b => this.state._180_degree_bracket == 0 || b.id == this.state._180_degree_bracket );;

    let _90_degree_price = brackets_90.length > 0 ? brackets_90[0].price : 0;
    let _180_degree_price = brackets_180.length > 0 ? brackets_180[0].price : 0;

    return (

      <Modal ref={ this.modalRef } isOpen={ this.props.open } toggle={ this.props.close } className="mw-100 mt-4">

        <div className="modal-header text-center">

            {/* <div style={ { fontSize: '20px'} }>

              <FontAwesomeIcon className="text-success mr-4" icon={faCheckCircle} />

              "Fixed Panel Shower Screen" has been added to your cart

    </div> */}

            <div className="ml-1">

              { this.state.extras ?

                <Button className="text-nowrap" onClick={ () => { location = '/checkout' } } color="dark">Proceed To Checkout</Button>

              :

                <Button className="text-nowrap" onClick={ this.cart  } color="dark">View Cart</Button>

              }

            </div>

            

        </div>

        <div id="modal-body" className="modal-body">

            { this.state.extras ? 

              <Fragment>

                <div className="d-flex justify-content-between" style={ { flexWrap: 'wrap' } }>

                { this.props.extras.map( x => {

                  let img = "";

                  let quantity = 1;

                  this.state.quantities.map( q => {

                    if ( q.id === x.id ) {

                      quantity = q.quantity;

                    }

                  })

                  const variants = x.variants.split(',');

                  if ( x.category == 'SILICON SPATULA'  || x.category === 'Silicone Spatula') {

                    img = '/wp-content/uploads/2021/09/SPATULA.jpg'

                  } else if ( x.category == 'Door Seal' ) {

                    img = '/wp-content/uploads/2021/09/DOOR-SEAL.jpg'

                  } else if ( x.category == 'Glass Shelf' ) {

                    img = '/wp-content/uploads/2021/09/GLASS-SHELF.jpeg';

                  } else if ( x.category == 'Silicone' ) {

                    img = '/wp-content/uploads/2021/09/SANITARY-silicone.jpeg';

                  } else if ( x.category == 'Spade Porcelain Eater Drill Bit')  {

                    img = '/wp-content/uploads/2021/09/SPADE_PORCELAIN_EATER.jpeg';

                  } else if ( x.category == 'Shelf Bracket' ) {

                    img = '/wp-content/uploads/2021/09/SHELF-BRACKET.jpeg';

                  } else if ( x.category == 'Silicone Tube' ) {

                    img = '/wp-content/uploads/2023/06/Silicon-Clear_Silicon.png';

                  } else if ( x.category == '3MM PACKERS' ) {

                    img = '/wp-content/uploads/2023/06/3mm-PACKERS-SETTING-BLOCKS.jpg';

                  }

                  return (

                    

                    <div className="extras mr-1 mb-1 border border-secondary p-2 flex-grow-1">

                      <div className="main">

                        <p className="text-center">{ x.category }</p>

                        <p className="text-center"><img style={ { height: '100px' } } src={ img } /></p>

                        <p>{ formatter.format(x.price) }</p>

                        <Button onClick={ () => this.extraAddToCart( x, quantity ) } className="w-100 d-block" color="secondary">Add To Cart</Button>

                      </div>

                      <div className="popup">

                        <p className="text-center">{ x.category }</p>

                        <p className="text-center"><img style={ { height: '100px' } } src={ img } /></p>

                        { variants.length > 1 ?
                        
                          <ul className="variants">
                            {
                              variants.map( v => {

                                const variantSelected = this.state.selectedVariant;

                                const vp = v.split(':')

                                const isSelected = variantSelected && variantSelected.code == vp[3];

                                return <li className={`${vp[2]} ${isSelected ? 'selected' : '' }`} onClick={ () => this.variantSelected( v ) }>{ vp[0] }<br />{ formatter.format(vp[1]) }</li>

                              })
                            }
                          </ul>
                      
                        :  
                          
                          <p> { formatter.format(x.price) }</p>                            
                           
                      }


                      <Input className="mb-2" type="number" value={ quantity } onChange={ (e) => this.setQuantity(e, x) }  />

                      <Button onClick={ () => this.extraAddToCart( x, quantity ) } className="w-100 d-block" color="secondary">Add To Cart</Button>


                      </div>

                    </div>

                  )

                })}

                </div>


              </Fragment>


            : 

            <Fragment>

              <WhatType />

              <Row className="brackets pt-4">
              
                <Col>

                <div className="border border-secondary p-2 mb-4">

                  <p className="font-weight-bold text-center">90 degree wall bracket</p>

                  <p className="text-center"><img src="/wp-content/uploads/2021/09/Wall-bracket.jpg" style={ { height: '100px' } } /></p>

                </div>

                <p className="price">{ formatter.format(_90_degree_price) }</p>

                <p className="text-success"><FontAwesomeIcon className="mr-2" icon={faCheck} /> Estimated delivery 3-7 working days</p>

                <ul className="ml-0 pl-0">
                  { this.props.brackets_90.map( b => {

                    if ( b.stock == 'out-of-stock') {

                      return <li data-tip="Out-Of-Stock" title="Out-Of-Stock" key={b.id} className={`${b.slug}`} style={ { textTransform: 'uppercase' } }>{b.title}</li>

                    } else {

                      return <li key={b.id} onClick={ () => this.select90( b ) } className={`${b.slug} ${this.state.selected == b.id ? 'selected' : ''}`} style={ { textTransform: 'uppercase' } }>{b.title}</li>

                    }

                  })}
                </ul>

                
              </Col>

              <Col className="desktop-hidden mb-4">
                  <Button onClick={() => this.addToCart(this.state._90_degree_bracket) } className="d-block w-100" color="secondary">Add To Cart</Button>
                </Col>
              
                <Col>

                  <div className="border border-secondary p-2 mb-4">

                    <p className="font-weight-bold text-center">180 degree wall bracket</p>

                    <p className="text-center"><img src="/wp-content/uploads/2021/09/180-degree-wall-bracket.png" style={ { height: '100px' } } /></p>

                  </div>

                  <p className="price">{ formatter.format(_180_degree_price) }</p>

                  <p className="text-success"><FontAwesomeIcon className="mr-2" icon={faCheck} /> Estimated delivery 3-7 working days</p>

                  <ul className="ml-0 pl-0">
                    { this.props.brackets_180.map( b => {

                      if ( b.stock === 'out-of-stock') {

                        return <li data-tip="Out-Of-Stock" title="Out-Of-Stock" key={b.id}  className={`${b.slug}`} style={ { textTransform: 'uppercase' } }>{b.title}</li>

                      } else {

                        return <li key={b.id}  className={`${b.slug} ${this.state.selected == b.id ? 'selected' : ''}`} onClick={ () => this.select180( b ) } style={ { textTransform: 'uppercase' } }>{b.title}</li>

                      }

                      

                    })}
                  </ul>                
                </Col>
                <Col className="desktop-hidden mb-4">
                  <Button onClick={() => this.addToCart(this.state._180_degree_bracket) } className="d-block w-100" color="secondary">Add To Cart</Button>
                </Col>
              </Row>
              <Row className="mobile-hidden">
                <Col>
                  <Button onClick={() => this.addToCart() } className="d-block w-100" color="secondary">Add To Cart</Button>
                </Col>
                <Col>
                  <Button onClick={() => this.addToCart() } className="d-block w-100" color="secondary">Add To Cart</Button>
                </Col>
              </Row>
              {/* <Row>
                <Col>
                  <Button onClick={ this.props.close } color="light">Continue Shopping</Button>
                </Col>
                <Col>
                  <Button color="light">add to your basket</Button>
                </Col>
                  </Row> */}

            </Fragment>
          }
        </div>

        { this.state.extras ? 

        <div className="modal-footer" style={{ justifyContent: 'end', padding: '15px'}}>

          
                <Button className="text-nowrap" onClick={ () => { location = '/checkout' } } color="dark">Proceed To Checkout</Button>

          

        </div>

        : '' }
        
      </Modal>

    )

  }

}

export class WhatType extends Component {

  constructor( props ) {

    super( props )

    this.state = {

      open: false

    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }

  open( ) {

    this.setState( { open: true } );

  }

  close() {

    this.setState( { open: false } );

  }

  render() {

  
    return (

      <Fragment>

        { this.props.text ?

            <a onClick={ this.open } style={ { cursor: 'pointer' } } >{ this.props.text }</a>

        :

          <div className="d-flex justify-content-center"><h4 onClick={ this.open } style={ { cursor: 'pointer', color: 'blue', borderBottom: 'solid 1px #0000ff', display: 'inline-block' } } className="what-type text-center mt-2 mb-4">What type/colour mounting bracket do you want?</h4></div>

        }

        <Modal isOpen={ this.state.open } toggle={ this.close } className="mw-100 w-75">

            <ModalBody>

              
              <div>
                <img src="/wp-content/themes/zakra/assets/img/wall-brackets.png" />
              </div>

            </ModalBody>

        </Modal>

      </Fragment>

    )

  }


}

export class MeasurementGuide extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      open: false

    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }

  open() {

    this.setState( { open: true } );

  }

  close() {

    this.setState( { open: false } );

  }

  render() {

    let text = this.props.text ? this.props.text : 'See shower measurement guide';

    return (

      <Fragment>

        <a onClick={ this.open } style={ { fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' } } className="d-block pb-4 mb-4">{ text }</a>
        <Modal isOpen={ this.state.open } toggle={ this.close } className="mw-100 w-50 mt-4">
          <ModalBody>
            <Row>
              <Col className="text-center"><img className="popup-image" src={ this.props.img } /></Col>
            </Row>
            
          </ModalBody>
        </Modal>

      </Fragment>

    )

  }

}