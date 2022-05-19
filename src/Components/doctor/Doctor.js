import React, { Component } from 'react'
import doctorcss from '../assests/Css/Doctor/doctor.module.css';
import dp from '../../image/unknow.png'
import AddressContext from '../../Context/Address/addressContext';
import Appointment from '../Appointment/Appointment';
import DoctorNotification from '../notification/DoctorNotification';
import Navbar from '../Navbar';
import ReactRoundedImage from "react-rounded-image";
import $ from 'jquery';
export class Doctor extends Component {
    static contextType=AddressContext;
    constructor(props)
    {
        super(props);
        let obj=localStorage.getItem('mydoctordata');
        if(obj!=null)
        {
            obj=JSON.parse(obj)
            
            this.state={
                name:"",
                email:"",
                specialist:"",
                about:"",
                mobile:"",
                SeletedFile:null,
                user_id:obj._id,
                url:"",
                data:{},
                document:[],
                meet_link:obj.meet_link
            }
        }
        
    }
    async componentDidMount(){
        this.alwaysdocuemntfetching();
        this.alwaysfetching();
        let obj1=localStorage.getItem('Mydoctortoken');
    
        if(obj1!=null)
        {
               let url="http://localhost:5000/api/doctor/getdoctor";
               const response=await fetch(url,{

                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    auth_token:obj1

                },
                
               });
               let json1= await response.json();
               
               this.setState({
                   data:json1
               },()=>{
                   localStorage.setItem('mydoctordata',JSON.stringify(json1));
               })
               
        }
        else
        {

            

        }


    }
    fileselectedhandler=(e)=>{
        this.setState({
            SelectedFile:e.target.files[0]
            
        })
    }
    alwaysfetching=async()=>{
        
        let url="http://localhost:5000/image/getimage";

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
                url:json1.data[0].image
            },()=>console.log(this.state))
        }
        localStorage.setItem('image_url',json1.data[0].image);

    }
    alwaysdocuemntfetching=async()=>{
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
    upload=async ()=>{

        console.log(this.state)

        let url="http://localhost:5000/image/upload";
        

        const formdata=new FormData();
        formdata.append("user_id",this.state.user_id);
        formdata.append("testImage",this.state.SelectedFile);

        const options = {
            method: 'POST',
            body: formdata,
          };
          fetch(url, options).then(()=>{

              this.alwaysfetching();
          });

          
    }
    
    render() {
        
        return (
            
            <div className={`${doctorcss.h}`}>
               <Navbar/>
          <div className="container my-5 ">
              <div className="row ">
                  <div className="col-4 ">
                      <div className="row">

                  <div className="card  " >
  <div className="card-body  d-flex flex-column justify-content-center align-items-center ">
  {
          (()=>{
              if(this.state.url)
              {
  return <ReactRoundedImage image={`http://localhost:5000/static/${this.state.url}`} />
                
              }
              else
              return <ReactRoundedImage image={dp} />

          })()
      }

  
  <div className="row">

  <input type="file"  onChange={this.fileselectedhandler}/>

      
  </div>
  
      <div className="row">
    <a href="#" className="btn btn-primary" onClick={this.upload}>Upload</a>

      </div>
  </div>
</div>
                      </div>
                      <div className="row my-3">

                  <div className="card  " >
                      <div className="container">
                          <div className="row my-3">
                              <div className="row">

                  <label for="exampleInputEmail1" className="form-label">Meet Link</label>
    <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"   value={this.state.meet_link} onChange={(e)=>{
        this.setState({
            meet_link:e.target.value
        })

    }} placeholder="Please Enter a permanent meet link" />
                              </div>
                              <div className="row">
                                  <div className="col-3">
                                   <button className="btn-success btn" onClick={async()=>{
                                       let url="http://localhost:5000/api/doctor/editdoctor";

                                       let response=await fetch(url,{
                                           method:'POST',
                                           headers:{
                                               'Content-Type':'application/json'
                                           },
                                           body:JSON.stringify({id:this.state.user_id,meet_link:this.state.meet_link})
                                       })


                                       
                                       window.location.reload();
                                   }}>

<i class="fa fa-check" aria-hidden="true"></i>
                                   </button>
                                   
                                  </div>
                                  <div className="mx-5 col-3">
                                      <button className="btn-dark btn" >
                                          <a href={this.state.meet_link}><i class="fa fa-meetup fa-2x" aria-hidden="true"></i></a>
                                      </button>

                                  </div>
                              </div>

    
                          </div>
                      </div>

                        

                       </div>
                      </div>
                      
                  </div>
                  
                  <div className="col-8">
                  <div className="card" >
                  <div className="card-body">
                  <div className="container">
          <div className="row">
              <div className={`col-6 ${doctorcss.detail}`}>
                  <div className="row">
                      <h5>Detail</h5>
                  </div>

        <div className="row d-flex flex-column">
            <div className="col-8">
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={this.state.data.name} disabled/>
  </div>
            </div>
            <div className="col-8">
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={this.state.data.email} disabled/>
  </div>
            </div>
            <div className="col-8">
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Address</label>
    
    <textarea type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value="Sarai Dangari Tikari Varanasi" disabled></textarea>
  </div>
            </div>
        </div>
      </div>

      <div className="col-6">
          <div className="row">
              <h5>Document</h5>
          </div>
          <table className="table table-hover personal-task">
                <tbody>
                  <tr>
                    <td>File Name</td>
                    <td>
                      Date
                    </td>
                    <td>
                      Action
                    </td>
                    
                  </tr>
                  
                  
                  
                  
                  
                  
                  
                </tbody>
                <tbody>
                    {
                        (this.state.document && this.state.document.map(function(name,key){
                            return <tr id={name._id} key={key}>
                    <td><button style={{borderRadius:'32px'}} className="btn-success btn"><a href={`http://localhost:5000/static/${name.document}`}>{name.document.substr(0,10)}</a></button></td>
                    <td>
                      Date
                    </td>
                    <td>
                      <div className="row">
                      <div className="col-2">
                            <a href={`http://localhost:5000/static/${name.document}`} style={{color:'black'}}><i className="fa fa-eye" aria-hidden="true"></i></a>
                                
                            </div>
                            <div className="col-2">
                            <a  style={{color:'black'}}><i className="fa fa-trash" aria-hidden="true" onClick={async()=>{

                                
                                let url="http://localhost:5000/document/deletedocument";
                                
                                let response=await fetch(url,{
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify({_id:name._id})
                                    
                                })
                                let json1=await response.json();
                                $(`#${name._id}`).hide();
                                console.log(name._id);

                                

                            }}></i></a>

                            </div>
                      </div>
                    </td>
                    
                  </tr>
                  

                        }))
                    }
                </tbody>
              </table>
         
          <div className="row d-flex flex-column">
              <div className="col-8">

              </div>
          </div>
      </div>


      <div className="row d-flex flex-column">
          <div className="col-3">
          <input type="file"  onChange={this.fileselectedhandler}/>

          </div>
          <div className="col-3">
              <button className="btn-dark btn" onClick={ async()=>{
                        
                        console.log("Uploading document")

                        let url="http://localhost:5000/document/upload";
                        
                        const formdata=new FormData();
                        formdata.append("user_id",this.state.user_id);
                        formdata.append("testImage",this.state.SelectedFile);
                
                        const options = {
                            method: 'POST',
                            body: formdata,
                          };
                          fetch(url, options).then(()=>{
                
                              this.alwaysdocuemntfetching();
                          });
                
              }}><i class="fa fa-upload" aria-hidden="true"></i></button>
          </div>
      </div>
              </div>
          </div>
      
      <div className="row d-flex justify-content-center">
          <div className="col-3">

    <a href="#" className="btn btn-primary"><i class="fas fa-edit"></i></a>
          </div>

      </div>
     
  </div>
</div>
                  </div>
              </div>
          </div>
                <DoctorNotification/>
                <Appointment/>
            </div>
        )
    }
}

export default Doctor


