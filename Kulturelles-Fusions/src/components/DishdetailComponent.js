import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardImg,  CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem ,Button, Modal, ModalHeader, ModalBody, Row, Col, Label,Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

       
      }

   


    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

         
    }

      


      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }


      
      
  render() {
    return(
    <React.Fragment>


      <Button outline onClick={this.toggleModal}><span className="fa fa-comment fa-lg"></span> Submit Comment</Button>
  
       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              
    
                            <Row className="form">
                             <Label htmlFor="RatingNumber" md={2}>Rating</Label>
                             </Row>
                             <Row className="form-group">
                                <Col md={{size: 12}}>
                                    <Control.select model=".RatingNumber" name="RatingNumber"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form">
                                <Label htmlFor="author" md={5}>Your Name</Label>
                                </Row>
                                <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required! ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                </Row>
                                <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
    </React.Fragment>
    );
  }
}
  
 

  function  RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }   

   function RenderComments({comments, addComment,dishId}) {
        if (comments != null)
            return(
                    
                    <ul className="list-unstyled">
                        <h4>Comments</h4>
                        <li>
                      {comments.map((comm) => (
                        <p key={comm.id}>
                          {comm.comment}
                          <p>-- {comm.author}     {new Intl.DateTimeFormat("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                   day: "2-digit"
                                                   }).format(new Date(comm.date))} </p>
                        </p>
                      ))}</li>
               
                    <CommentForm dishId={dishId} addComment={addComment} />
                   </ul>
                    
                        
            );
        else
            return(
                <div></div>
            );
    }   

  

const DishDetail = (props)=> {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)

    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} 
                 addComment={props.addComment}
                 dishId={props.dish.id}
                 />
                 
            </div>
        </div>
        </div>
    );
    }


export default DishDetail;