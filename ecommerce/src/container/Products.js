import React, { Component } from "react";
import "./Products.css";
import Products from "./ProductsJson.json";
import Modal from "react-bootstrap/Modal";

export default class Home extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      modal: false,
      products: [],
      totalQty: 0,
      total: 0,
    };
  }

  componentDidMount() {
    var promise = new Promise(function (resolve, reject) {
      if (Products && Products.length > 0) {
        resolve();
      } else {
        reject();
      }
    });

    promise
      .then(() => {
        console.log("Success");
        this.setState({ products: Products });
      })
      .catch(() => {
        console.log("Some error has occured");
        alert("Some error has occured");
      });
  }

  handleClose = () => {
    this.setState({ modal: false });
  };

  addCart(item, i) {
    const items = this.state.products;
    const itemData = item;
    itemData.qty = itemData.qty ? itemData.qty + 1 : 1;
    item = itemData;
    items[i] = item;
    this.setState({
      products: items,
      totalQty: this.state.totalQty + 1,
      total: this.state.total + item.mrf,
    });
  }

  removeCart(item, i) {
    const items = this.state.products;
    const itemData = item;
    if (itemData.qty && itemData.qty !== 0) {
      this.setState({
        totalQty: this.state.totalQty - 1,
        total: this.state.total - item.mrf,
      });
    }
    itemData.qty = itemData.qty ? itemData.qty - 1 : 0;
    console.log("itemData.qty", itemData.qty);

    item = itemData;
    items[i] = item;
    this.setState({ products: items });
  }

  checkOut() {
    this.setState({ modal: true });
  }

  render() {
    return (
      <div className="container">
        <Modal show={this.state.modal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Total Price: {this.state.total}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Transaction Sucessful!</Modal.Body>
        </Modal>
        <div className="shoppingCart">Shopping Cart</div>
        {this.state.products.map((item, i) => {
          return (
            <div>
              <div className="productContainer">
                <div className="productImg">
                  <div className="image">
                    <img className="imageItem" src={item.imageUrl} alt="img" />
                  </div>
                  <div>{item.offerText}</div>
                </div>
                <div className="productDes">
                  <div className="prodName">{item.brandName} </div>
                  <div>{item.productName}</div>
                  <div>{item.quantity}</div>
                  <div>MRP {item.price}</div>
                  <div>
                    <b>Rs {item.mrf}</b>
                  </div>
                  <div className="buttons">
                    <input
                      type="button"
                      className="addCart"
                      value="ADD CART"
                      onClick={() => this.addCart(item, i)}
                    />
                    <input
                      type="button"
                      className="sign"
                      value="+"
                      onClick={() => this.addCart(item, i)}
                    />
                    <div className="cartNumber">{item.qty ? item.qty : 0}</div>
                    <input
                      type="button"
                      className="sign"
                      value="-"
                      onClick={() => this.removeCart(item, i)}
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        <div className="checkoutRow">
          <div className="qtyColumn">
            <div className="qty"> Qty {this.state.totalQty}</div>
            <div className="qty">Total {this.state.total}</div>
          </div>
          <input
            className="checkOutBtn"
            type="button"
            value="CHECKOUT"
            onClick={() => {
              this.checkOut();
            }}
          />
        </div>
      </div>
    );
  }
}
