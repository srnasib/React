
import React from 'react';
import { Card, CardImg,  CardText, CardBody,CardTitle } from 'reactstrap';



  
 

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

   function RenderComments({dish}) {
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

  

const DishDetail = (props)=> {

        return (
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                    
                    <  RenderDish dish={props.dish} />
         
                      </div>


                    <div  className="col-12 col-md-5 m-1">
                    <  RenderComments dish={props.dish} /> 
                  

                      </div>      
                </div>
               
            </div>
        );
    }


export default DishDetail;