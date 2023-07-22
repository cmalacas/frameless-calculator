import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';

import { Row, Col, Input, Label, FormGroup, Button, Modal, ModalBody } from 'reactstrap';
import Authservice from '../../Authservice';
import { formatter } from '../../Function';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

import { MeasurementGuide, WhatType } from './FixedPanelShowerScreen';

import Swal from 'sweetalert2';

export default class _2xPanelInlineScreenHingePanelDoor extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      panels: [],
      doorPanel: 0,
      doorPanelPrice: 0,
      doorPanelWidth: 0,
      doorPanelCode:'',
      hingePanel: 0,
      hingePanelWidth: 0,
      hingePanelPrice: 0,
      hingePanelCode: '',
      showerWidth: 0,
      difference: 0,
      overallWidth: 0,
      gaps: 13,
      total: 0,
      price: 0,
      image: '/wp-content/uploads/2021/09/2-panel-Inline-shower-screen-wall-hung-door-pictorial-1.jpg',

      brackets_90: [],
      brackets_180: [],

      quantity: 1,

      bracket: false,

    }

    this.getData = this.getData.bind(this);
    this.change = this.change.bind(this);
    this.selectDoorPanel = this.selectDoorPanel.bind(this);
    this.selectHingePanel = this.selectHingePanel.bind(this);
    this.calculate = this.calculate.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.closeBracket = this.closeBracket.bind(this);

  }

  closeBracket() {

    this.setState( { bracket: false } );

  }

  addToCart() {

    const data = new FormData;

    data.append('action', 'add-to-cart');
    data.append('product', '2 Panel Inline Screen - Hinge Panel + Door');
    data.append('showerWidth', this.state.showerWidth);
    data.append('doorPanel', this.state.doorPanel);
    data.append('doorPanelPrice', this.state.doorPanelPrice);
    data.append('doorPanelCode', this.state.doorPanelCode);
    data.append('doorPanelWidth', this.state.doorPanelWidth);

    data.append('hingePanel', this.state.hingePanel);
    data.append('hingePanelPrice', this.state.hingePanelPrice);
    data.append('hingePanelCode', this.state.hingePanelCode);
    data.append('hingePanelWidth', this.state.hingePanelWidth);

    data.append('difference', this.state.difference);
    data.append('total', this.state.total);
    data.append('price', this.state.price);
    data.append('image', this.state.image);
    data.append('quantity', this.state.quantity);

    Authservice.addToCart( data )
    .then( response => {

      if ( response.success ) {

        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          title: '2 x Panel Inline Screen – Hinge Panel + Door has been added to your cart'
        })

        this.setState( { bracket: true } );

      }

    })

  }

  calculate() {

    const total = this.state.doorPanelWidth + this.state.hingePanelWidth + this.state.gaps;

    const difference = parseInt(this.state.showerWidth) - total;

    const price = this.state.doorPanelPrice + this.state.hingePanelPrice;

    this.setState( { total, difference, price } );

  }

  change( e ) {

    this.setState( { [e.target.name]: e.target.value }, () => this.calculate() )

  }

  selectDoorPanel( e ) {

    const id = parseInt( e.target.value );

    const panel = this.state.panels.filter( p => parseInt(p.id) === id );

    const doorPanel = parseInt(panel[0].id);
    const doorPanelWidth = parseInt(panel[0].width);
    const doorPanelPrice = parseFloat(panel[0].price);
    const doorPanelCode = panel[0].code;

    this.setState( { doorPanel, doorPanelWidth, doorPanelCode, doorPanelPrice }, () => this.calculate() );

  }

  selectHingePanel( e ) {

    const id = parseInt( e.target.value );

    const panel = this.state.panels.filter( p => parseInt(p.id) === id );

    const hingePanel = parseInt(panel[0].id);
    const hingePanelWidth = parseInt(panel[0].width);
    const hingePanelPrice = parseInt(panel[0].price);
    const hingePanelCode = panel[0].code;

    this.setState( { hingePanel, hingePanelWidth, hingePanelCode, hingePanelPrice }, () => this.calculate() );

  }

  getData() {

    const data = new FormData;

    data.append('action', 'get_2x_panel_inline_screen');

    Authservice.get_2x_panel_inline_screen( data )
    .then( response => {

      if ( response.panels ) {

        this.setState( { 
            panels: response.panels,
            brackets_90: response.brackets_90,
            brackets_180: response.brackets_180,
            extras: response.extras
          } );

      }

    })

  }

  componentDidMount() {
    
    this.getData();

  }

  render() {

    const panels = this.state.panels;

    const doorPanels = panels.filter( p => p.category === 'Door Panel');

    const hingePanels = panels.filter( p => p.category === 'Hinge Panel');

    const valid = this.state.showerWidth > 0 && ( this.state.doorPanel > 0 || this.state.hingePanel > 0 ) && ( this.state.difference >= 0 && this.state.difference <= 3 ); 

    return (

      <Fragment>

        <MeasurementGuide img={ this.state.image } />

       

        {/* <FormGroup row>

          <Col md={8}>
            Step 1: What is the overall width of your shower. <MeasurementGuide text="See shower measurement guide for illustration." img={ this.state.image } />
          </Col>

          <Col md={4}><Input type="text" name="showerWidth" onChange={ this.change } value={ this.state.showerWidth } /></Col>
        
    </FormGroup> */}

        <FormGroup row>

          <Col md={8}>
            Step 1: Select Hinge Panel Length
          </Col>

          <Col md={4}>
            <Input name="fixedPanel" onChange={ this.selectHingePanel } type="select">
              <option value="">select</option>
              {
                  hingePanels.map( d => {

                    return <option value={d.id}>{d.width}</option>

                  })
                }
            </Input>  
          </Col>
        
        </FormGroup>

        <FormGroup row>

          <Col md={8}>
            Step 2: Select Glass Door Length
          </Col>

          <Col md={4}>
            <Input name="doorPanel" onChange={ this.selectDoorPanel } type="select">
                <option value="">select</option>
                {
                  doorPanels.map( d => {

                    return <option value={d.id}>{d.width}</option>

                  })
                }
            </Input>  
          </Col>
        
        </FormGroup>

        

        {/* <FormGroup row>

          <Col md={8}>
            This is the COMBINE WIDTH of glass door, hinge panel and required: 13mm gaps, for bracket/hinge fittings and door gaps:
          </Col>

          <Col md={4}>
            <Input type="text" value={ this.state.total } readonly={ true } />
          </Col>

        </FormGroup>

        <FormGroup row>

          <Col md={8}>
            Overall Shower Width Minus Total Width. This figure should be 0 or more but no more than 3mm
          </Col>

          <Col md={4}>
            <Input type="text" value={ this.state.difference ? this.state.difference : '' } readonly={ true } />
          </Col>
        
              </FormGroup> */}

        { true ?

        <FormGroup row>
          <Col md={5}>
            <h3>Price: { formatter.format( this.state.price ) }</h3>
            <h5>Total: { formatter.format( this.state.price * this.state.quantity ) }</h5>
          </Col>
          <Col md={3} className="mr-0 pr-0">
            <Input type="number" onChange={ this.change } value={ this.state.quantity} name="quantity" />
          </Col>
          <Col md={3}>
            <Button onClick={ this.addToCart } color="primary">Add To Cart</Button></Col>
        </FormGroup>

        : "" }

        
        

        <Bracket 
            open={ this.state.bracket } 
            close={ this.closeBracket } 
            brackets_90={ this.state.brackets_90 }
            brackets_180={ this.state.brackets_180 }
            extras={ this.state.extras }
            panels={ this.state.panels }
            panelQuantity={ this.state.quantity }
            />


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
      product: 'Bracket',
      _90_degree_bracket: 0,
      _180_degree_bracket: 0,
      _90_degree_price: 0,
      _180_degree_price: 0,
      extras: false,
      hinge: false,

      bracket: [],

      selectedHinge: 0,
      selectedDoorKnob: 0,

      isVariantSelected: false,
      selectedVariant: [],

      hingeCode: '',
      doorKnobCode: '',

      hingePrice: 0,
      doorKnobPrice: 0,

      hingeAdded: false,
      doorKnobAdded: false,

      selectedWaterBar: 0,
      waterBarPrice: 0,
      waterBarCode: '',

      _90_degree_image: '/wp-content/uploads/2021/09/Wall-bracket.jpg',
      _180_degree_image: '/wp-content/uploads/2021/09/180-degree-wall-bracket.png',

      _180_degree_glass_wall_image: '/wp-content/uploads/2021/10/11.jpg',

      doorKnob_image: '/wp-content/uploads/2021/10/12.jpg',
      waterbar_image: '/wp-content/uploads/2021/09/waterbar.png',

      quantities: [],

    }

    this.close = this.close.bind(this);
    this.select90 = this.select90.bind(this);
    this.select180 = this.select180.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.extraAddToCart = this.extraAddToCart.bind(this);
    this.selectHinge = this.selectHinge.bind(this);
    this.selectDoorKnob = this.selectDoorKnob.bind(this);

    this.addHingeToCart = this.addHingeToCart.bind(this);
    this.addWaterBarToCart = this.addWaterBarToCart.bind(this);
    this.selectWaterBar = this.selectWaterBar.bind(this);
    this.skipWaterBar = this.skipWaterBar.bind(this);
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

  skipWaterBar() {

    this.setState( { extras: true } );

  }

  addWaterBarToCart() {

    const data = new FormData;

    const waterbar = this.props.panels.filter( p => p.id === this.state.selectedWaterBar);

    if (waterbar.length > 0 ) {

      data.append('action', 'add-to-cart');
      data.append('product', 'waterbar');
      data.append('title', waterbar[0].category);
      data.append('colour', waterbar[0].title);
      data.append('image', this.state.waterbar_image);
      data.append('code', this.state.waterBarCode);
      data.append('price', this.state.waterBarPrice);
      data.append('quantity', 1);

      Authservice.addToCart( data )
        .then( response => {
  
          if (response.success) {

            Swal.fire({
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              title: `${waterbar[0].category}(${waterbar[0].title}) added to the cart`
            })
  
            this.setState( { extras: true } );

            const node = document.getElementById("modal-body");

            const popup = ReactDOM.findDOMNode( node );

            popup.scrollTo(0,0);
  
          }
  
        })

    }

  }

  selectWaterBar( waterbar ) {

    const selectedWaterBar = waterbar.id;
    const waterBarCode = waterbar.code;
    const waterBarPrice = waterbar.price;

    this.setState( { selectedWaterBar, waterBarCode, waterBarPrice } );

  }

  addHingeToCart() {

    const valid = this.state.selectedHinge > 0 && this.state.selectedDoorKnob > 0;

    if ( valid ) {

        const data = new FormData;

        const hinge = this.props.panels.filter( p => p.id === this.state.selectedHinge );

        const doorKnob = this.props.panels.filter( p => p.id === this.state.selectedDoorKnob );

        if ( hinge.length > 0 ) {

          data.append('action', 'add-to-cart');
          data.append('product', 'hinge');
          data.append('title', hinge[0].category);
          data.append('colour', hinge[0].title);
          data.append('image', this.state._180_degree_glass_wall_image);
          data.append('code', this.state.hingeCode);
          data.append('price', this.state.hingePrice);
          data.append('quantity', 2);

          Authservice.addToCart( data )
          .then( response => {

            if (response.success) {

              this.setState( { hingeAdded: true } );

              if ( doorKnob.length > 0 ) {

                const _data = new FormData;
          
                _data.append('action', 'add-to-cart');
                _data.append('title', doorKnob[0].category);
                _data.append('product', 'door-knob');
                _data.append('colour', doorKnob[0].title);
                _data.append('image', this.state.doorKnob_image);
                _data.append('code', this.state.doorKnobCode);
                _data.append('price', this.state.doorKnobPrice);
                _data.append('quantity', 1);
      
                Authservice.addToCart( _data )
                .then( response => {
          
                  if (response.success) {

                    Swal.fire({
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500,
                      title: `${hinge[0].category}(${hinge[0].title}) & ${doorKnob[0].category}(${doorKnob[0].title}) added to the cart`
                    })
          
                    this.setState( { doorKnobAdded: true } );

                    const node = document.getElementById("modal-body");

                    const popup = ReactDOM.findDOMNode( node );

                    popup.scrollTo(0,0);
                  
                  }
          
                })
          
              }

            }

          })

        }

    } else {

      Swal.fire( {
        icon: 'info',
        title: 'You must select both Hinge and Door Knob'
      } )



    }

    

  }


  selectHinge( hinge ) {

    const hingeCode = hinge.code;
    const hingePrice = hinge.price;
    const selectedHinge = hinge.id;

    this.setState( { hingeCode, hingePrice, selectedHinge } );

  }

  selectDoorKnob( doorKnob ) {

    const selectedDoorKnob = doorKnob.id;
    const doorKnobPrice = doorKnob.price;
    const doorKnobCode = doorKnob.code;

    this.setState( { selectedDoorKnob, doorKnobPrice, doorKnobCode } );

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
            title: 'Item added to the cart',
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
          })

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

  addToCart() {

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

            Swal.fire({
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              title: `${this.state.bracket.category}(${this.state.bracket.title}) added to the cart`
            })

            this.setState( { hinge: true } );

            const node = document.getElementById("modal-body");

            const popup = ReactDOM.findDOMNode( node );

            popup.scrollTo(0,0);

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

    this.setState( { _180_degree_price, selected, _180_degree_bracket, bracket  } );

  }

  select90( bracket ) {

    const b = this.props.brackets_90.filter( bb => bb.id == bracket.id );

    const _90_degree_price = b[0].price;

    const _90_degree_bracket = bracket.id;

    const selected = bracket.id

    this.setState( { _90_degree_price, selected, _90_degree_bracket, bracket  } );

  }

  close() {

    this.setState( { open: false } );

  }

  cart() {

    window.location = '/cart';

  }

  render() {

    const brackets_90 = this.props.brackets_90.filter( b => this.state._90_degree_bracket == 0 || b.id == this.state._90_degree_bracket );

    const brackets_180 = this.props.brackets_180.filter( b => this.state._180_degree_bracket == 0 || b.id == this.state._180_degree_bracket );

    const _90_degree_hinge = this.props.panels.filter( p => p.category == '90 Degree Wall To Glass Hinge');

    const _180_degree_hinge = this.props.panels.filter( p => p.category == '180 Degree Glass To Glass Hinge');

    const doorKnob = this.props.panels.filter( p => p.category === 'Door Knob');

    let _90_degree_price = brackets_90.length > 0 ? brackets_90[0].price : 0;

    let _180_degree_price = brackets_180.length > 0 ? brackets_180[0].price : 0;

    const _90_degree_hinge_price = _90_degree_hinge.length > 0 ? _90_degree_hinge[0].price : 0;

    let _180_degree_hinge_price = _180_degree_hinge.length > 0 ? _180_degree_hinge[0].price : 0;

    let door_knob_price = doorKnob.length > 0 ? doorKnob[0].price : 0;

    if ( this.state.selectedHinge > 0 ) {

      const selectedHinge = this.props.panels.filter( p => p.id == this.state.selectedHinge );

      _180_degree_hinge_price = selectedHinge.length > 0 ? selectedHinge[0].price : 0;

    }

    if ( this.state.selectedDoorKnob > 0 ) {

      const selectedDoorKnob = this.props.panels.filter( p => p.id == this.state.selectedDoorKnob );

      door_knob_price = selectedDoorKnob.length > 0 ? selectedDoorKnob[0].price : 0;

    }

    const waterbars = this.props.panels.filter( p => p.category == 'Half-Round Waterbar');

    let waterbar_price = waterbars.length > 0 ? waterbars[0].price : 0;

    return (

      <Modal isOpen={ this.props.open } toggle={ this.props.close } className="mw-100 mt-4">

        <div className="modal-header text-center">

            {/* <div style={ { fontSize: '20px'} }>

              <FontAwesomeIcon className="text-success mr-4" icon={faCheckCircle} />

              "2 x Panel Inline Screen – Hinge Panel + Door" has been added to your cart

    </div> */ }

            { (this.state.extras) ?

              <Button onClick={ () => { location = '/checkout' }  } color="primary" className="text-nowrap text-white">Proceed To Checkout</Button>  

            :

              <Button onClick={ this.cart  } color="primary" className="text-nowrap text-white">View Cart</Button>

            }

        </div>

        <div className="modal-body" id="modal-body">

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

                  if ( x.category == 'SILICON SPATULA' ) {

                    img = '/wp-content/uploads/2021/09/SPATULA.jpg'

                  } else if ( x.category == 'Door Seal' ) {

                    img = '/wp-content/uploads/2021/09/DOOR-SEAL.jpg'

                  } else if ( x.category == 'Glass Shelf' ) {

                    img = '/wp-content/uploads/2021/09/GLASS-SHELF.jpeg';

                  } else if ( x.category == 'Silicone' ) {

                    img = '/wp-content/uploads/2021/09/SANITARY-silicone.jpeg';

                  } else if ( x.category == 'Spade Porcelain Eater Drill Bit')  {

                    img = '/wp-content/uploads/2021/09/SPADE_PORCELAIN_EATER.jpeg';

                  } else if ( x.category == 'Shelf Bracket / Floor Bracket' ) {

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
            
            this.state.hingeAdded && this.state.doorKnobAdded ?

                <Fragment>

                  <h4>A waterbar is required for flat shower floors, so that water doesn't run underneath the glass door onto the bathroom floor</h4>

                  <Row className="brackets pt-4">

                    <Col className="mb-4" md={6}>

                    <div className="border border-secondary p-2 mb-4">

                      <p className="font-weight-bold text-center">Waterbar</p>

                      <p className="text-center"><img src={ this.state.waterbar_image } style={ { height: '72px' } } /></p>

                    </div>

                    <p className="price">{ formatter.format(waterbar_price) }</p>

                    <p className="text-success"><FontAwesomeIcon className="mr-2" icon={faCheck} /> Estimated delivery 3-7 working days</p>

                    <ul className="ml-0 pl-0">
                    { waterbars.map( b => {

                      return <li onClick={ () => this.selectWaterBar( b ) } className={`${b.slug} ${this.state.selectedWaterBar == b.id ? 'selected' : ''}`} style={ { textTransform: 'uppercase' } }>{b.title}</li>

                    })}
                    </ul>

                    <Button onClick={ () => this.addWaterBarToCart() } className="w-100 d-block" color="secondary">Add To Cart</Button>

                    </Col>

                  </Row>

                  <Row>
                    <Col className="text-right"><Button onClick={ this.skipWaterBar } color="success">Next</Button></Col>
                  </Row>

                </Fragment>

                :
            
              this.state.hinge ?
            
                <Fragment>

                  <h4 onClick={ this.open } style={ { cursor: 'pointer' } } className="text-center mt-2 mb-4">Choose preferred colour for 180 Glass To Glass Hinge and Door Knob?</h4>

                  <Row className="brackets pt-4">
              
                    <Col>

                      <div className="border border-secondary p-2 mb-4">

                        <p className="font-weight-bold text-center">180 Glass To Glass Hinge</p>

                        <p className="text-center"><img src={ this.state._180_degree_glass_wall_image } style={ { height: '72px' } } /></p>

                      </div>

                      <p className="price">{ formatter.format(_180_degree_hinge_price) }</p>

                      <p className="text-success"><FontAwesomeIcon className="mr-2" icon={faCheck} /> Estimated delivery 3-7 working days</p>

                      <ul className="ml-0 pl-0">
                        { _180_degree_hinge.map( b => {

                          return <li onClick={ () => this.selectHinge( b ) } className={`${b.slug} ${this.state.selectedHinge == b.id ? 'selected' : ''}`} style={ { textTransform: 'uppercase' } }>{b.title}</li>

                        })}
                      </ul>

                
                    </Col>
              
                    <Col>

                      <div className="border border-secondary p-2 mb-4">

                        <p className="font-weight-bold text-center">Door Knob</p>

                        <p className="text-center"><img src={ this.state.doorKnob_image } style={ { height: '72px' } } /></p>

                      </div>

                      <p className="price">{ formatter.format(door_knob_price) }</p>

                      <p className="text-success"><FontAwesomeIcon className="mr-2" icon={faCheck} /> Estimated delivery 3-7 working days</p>

                      <ul className="ml-0 pl-0">
                        { doorKnob.map( b => {

                          return <li  className={`${b.slug} ${this.state.selectedDoorKnob == b.id ? 'selected' : ''}`} onClick={ () => this.selectDoorKnob( b ) } style={ { textTransform: 'uppercase' } }>{b.title}</li>

                        })}
                      </ul>                
                    </Col>
                  </Row>

                 

                  <Row>
                    <Col className="text-right"><Button onClick={ this.addHingeToCart } color="success">Add To Cart</Button></Col>
                  </Row>

                 


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

                    return <li onClick={ () => this.select90( b ) } className={`${b.slug} ${this.state.selected == b.id ? 'selected' : ''}`} style={ { textTransform: 'uppercase' } }>{b.title}</li>

                  })}
                </ul>

                
              </Col>

              <Col className="desktop-hidden mb-4">
                  <Button onClick={ this.addToCart } className="d-block w-100" color="secondary">Add To Cart</Button>
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

                      return <li  className={`${b.slug} ${this.state.selected == b.id ? 'selected' : ''}`} onClick={ () => this.select180( b ) } style={ { textTransform: 'uppercase' } }>{b.title}</li>

                    })}
                  </ul>                
                </Col>
                <Col className="desktop-hidden mb-4">
                  <Button onClick={ this.addToCart } className="d-block w-100" color="secondary">Add To Cart</Button>
                </Col>
              </Row>
              <Row className="mobile-hidden">
                <Col>
                  <Button onClick={ this.addToCart } className="d-block w-100" color="secondary">Add To Cart</Button>
                </Col>
                <Col>
                  <Button onClick={ this.addToCart } className="d-block w-100" color="secondary">Add To Cart</Button>
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