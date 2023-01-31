import React, { Component } from 'react'
import Navbar from '../Navbar'
import dp from '../../image/patient_image.jpg'
import ReactRoundedImage from "react-rounded-image";
import $ from 'jquery'
export class PatientProfile extends Component {
    constructor(props) {
        super(props);
        let obj=localStorage.getItem('mydoctordata');
        if(obj!=null)
        {
          let obj1=JSON.parse(obj);
          this.state = {
            patient_data:{},
            email:obj1.email,
            doctor_id:obj1._id,
            flag:0,
            image:"",
            document:[]
          };
        }
      }
    alwaysfetch=async()=>{
        let url="http://localhost:5000/document/getdocument";

        let response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({user_id:this.state.user_id})

        })

        let json1=await response.json();
        if(json1.success)
        {
            this.setState({
                document:json1.data
            },()=>console.log(this.state))
        }
      }

      componentDidMount=async()=>{



        this.alwaysfetch();
        let url = await window.location.href;
        let str = url.substring(31);
        console.log(str);
    let temp = `http://localhost:5000/api/auth/` + str;
    let response = await fetch(temp, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
      });
    
    let json1 = await response.json();
    if(json1.success)
    {
          this.setState({
              patient_data:json1.data
          },async () => {
            let url="http://localhost:5000/image/getimage";
    
            let response=await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({user_id:str})
    
            })
    
            let json1=await response.json();
            console.log(json1,"what is our name bhia");
            if(json1.success)
            {
                this.setState({
                    image:json1.data[0].image
                },()=>console.log(this.state))
            }
            let url1="http://localhost:5000/document/getdocument";

            let response1=await fetch(url1,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({user_id:str})
    
            })
    
            let json2=await response1.json();
            
            if(json2.success)
            {
                this.setState({
                    document:json2.data
                },()=>console.log(this.state,"document hai bhaiya"))
            }
          }

          
          
          
          
        
          )
          
    }
    else
    {
        alert(json1.msg)
    }


      }



  render() {
    return (
      <div>
         <Navbar/>


         <div className="container my-5">
             <div className="row ">
                 <h4 className='text-center'>{this.state.patient_data.name}'s Profile </h4>
             </div>
             <div className="row my-4">
                 <div className="col-4">
                 <div className="card d-flex justify-content-center align-items-center">
    {
      (()=>{
        if(this.state.image=="")
        {

          return <ReactRoundedImage image={dp} />
        }
        else
        {
          return <ReactRoundedImage image={`http://localhost:5000/static/${this.state.image}`} />
        

        }

      })()
      }
  <div className="card-body">
    <h5 className="card-title">{this.state.patient_data.name} </h5>
    <a href="#" className="btn btn-primary" onClick={async()=>{

      console.log("creatin meeting")
      let obj = localStorage.getItem("mydoctordata");

                                let obj1 = JSON.parse(obj);

                                let second_url = await  "http://localhost:5000/api/connection/notification";
                                let response = await fetch(second_url, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    user_id:this.state.patient_data._id,
                                    notification: {
                                      flag: 1,
                                      msg: `${obj1.name} want to meeting with you `,
                                      meet_link:obj1.meet_link
                                    },
                                  }),
                                });
    
    }}>Create a meeting</a>
  </div>
</div>

                 </div>
                 <div className="col-8">
                 <div className="card">
  <div className="card-body">
    <h5 className="card-title">Detail </h5>
     <div className="container">
       <div className="row">
         <h5>Name:{this.state.patient_data.name}</h5>
         <h5>Email:{this.state.patient_data.email}</h5>
       </div>
     </div>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  See Document
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{this.state.patient_data.name}'s Document</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


      {
        (this.state.document && this.state.document.map(function(name,key){

      return <div class="modal-body">
        <tr id={name._id}  key={key}>
                    <td><button style={{borderRadius:'32px'}} className="btn-success btn"><a href={`http://localhost:5000/static/${name.document}`}>{name.document.substr(0,10)}</a></button></td>
                    <td>
                    
                    </td>
                    <td>
                      <div className="row">
                      <div className="col-2">
                            <a href={`http://localhost:5000/static/${name.document}`} style={{color:'black'}}><i className="fa fa-eye" aria-hidden="true"></i></a>
                                
                            </div>
                            
                      </div>
                    </td>
                    
                  </tr>


      
      </div>
        }))
      }
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </div>
</div>

                 </div>
             </div>
         </div>

      </div>
    )
  }
}

export default PatientProfile
