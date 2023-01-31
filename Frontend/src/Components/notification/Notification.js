import React, { Component } from "react";
import $ from 'jquery';

export class Notification extends Component {
    constructor(props){
        super(props);
        let obj1=localStorage.getItem('mydata');
        if(obj1!=null)
        {
            let obj=JSON.parse(obj1)
            console.log(obj);
            this.state={
                user_id:obj._id,
                data:[]
            }
        }
    }
   
    componentDidMount=async()=>{
        let url='http://localhost:5000/api/connection/findnotification';

        let response=await fetch(url,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({user_id:this.state.user_id})
        });
        let json1=await response.json();
        console.log(json1)
        if(json1.success)
        {
            this.setState({
                data:json1.data
            })
        }
    }

  
  render() {
    return (
      <div className="Container">
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            <a
              className="btn btn-primary"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              
            >
            Notification
            </a>
             {this.state.data.map(function(name,key){
               if(name.notification.flag){
                
            return <div className={`collapse ${name._id}` } key={key} id="collapseExample">
              <div className="card card-body my-2">
                <div className="row">
                  <div className="col-8">
                    {name.notification.msg}
                  </div>
                  {(()=>{
                     console.log(name,"hiiiii")

                  if(name.notification.meet_link)
                  {
                    return <div className="col-4">
                      <div className="row">

                      <div className="col-6">

                      <button className="btn-danger btn"><a style={{color:'white'}} href={name.notification.meet_link}><i class="fa fa-phone" aria-hidden="true"></i>Join Now</a></button>
                      </div>
                      <div className="col-2">

                      <button className="btn-danger btn" onClick={async ()=>{
                        console.log(name,"Ye name hai bhaiya")
                        let url='http://localhost:5000/api/connection/editnotification';
                        let response=await fetch(url,{
                          method:'POST',
                          headers:{
                            'Content-Type':'application/json'
                          },
                          body:JSON.stringify({message_id:name._id})
                      });
  
                      $(`.${name._id}`).hide();
                      
  
  



                      }}><a style={{color:'white'}} ><i class="fa fa-times" aria-hidden="true"></i></a></button>
                      </div>
                      </div>
                    </div>
                    
                  }
                  else{

                      

                  return <div className="col-2">
                    
                    <button className="btn-success btn" onClick={async()=>{
                      console.log(name,"Ye name hai bhaiya")
                      let url='http://localhost:5000/api/connection/editnotification';
                      let response=await fetch(url,{
                        method:'POST',
                        headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify({message_id:name._id})
                    });

                    $(`.${name._id}`).hide();
                    





                    }}>Mark as read</button>
                  </div>
                  }
})()}
                 
                </div>
              </div>
              
              
            </div>
               }
             })}


          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
