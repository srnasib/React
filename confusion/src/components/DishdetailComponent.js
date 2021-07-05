
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {


    renderDish(dish) {
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

    renderComments(dish) {
        if (dish != null)
            return(
                    
                    <ul className="list-unstyled">
                        <h4>Comments</h4>
                        <li>
                      {dish.comments.map((comm) => (
                        <p key={comm.id}>
                          {comm.comment}
                          <p>-- {comm.author}     {new Intl.DateTimeFormat("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                   day: "2-digit"
                                                   }).format(new Date(comm.date))} </p>
                        </p>
                      ))}</li>

                   </ul>             
            );
        else
            return(
                <div></div>
            );
    }   

  

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                    
                    {this.renderDish(this.props.dishes)}
         
                      </div>


                    <div  className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dishes)}   
                  

                      </div>      
                </div>
               
            </div>
        );
    }
}

export default DishDetail;