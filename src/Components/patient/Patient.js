import React, { Component } from 'react'
import dp from '../../image/unknow.png'
import patientcss from '../assests/Css/Patient/patient.module.css'
import Notification from '../notification/Notification'
import Navbar from '../Navbar'
import ReactRoundedImage from "react-rounded-image";
import $ from 'jquery';

export class Patient extends Component {

    constructor(props){
        super(props);
        let obj=localStorage.getItem('Mytoken');
        let mydata=JSON.parse(localStorage.getItem('mydata'));

        if(obj!=null)
        {
            
            
            this.state={
              name:"",
              email:"",
              SelectedFile:null,
              user_id:mydata._id,
              url:"",
              data:{},
              document:[]
              
          }
        }
       
        
       
    }
    async componentDidMount()
    {
        this.alwaysdocuemntfetching();
        this.alwaysfetching();

      let obj1=localStorage.getItem('Mytoken');
      if(obj1!=null)
        {
               let url="http://localhost:5000/api/auth/getuser";
               const response=await fetch(url,{

                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':obj1

                },
            

               });
               let json1= await response.json();
               console.log(json1);
               
               this.setState({
                   data:json1
                  
               },()=>console.log(this.state,"hiii"))
               
        }
        else
        {
            console.error("It is not a patient page");
            

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
        

      <div className={  ` ${patientcss.h}`}>
          <Navbar/>
          <div className="container my-5 ">
              <div className="row ">
                  <div className="col-4 ">
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
                  
                  <div className="col-8">
                  <div className="card" >
  <div className="card-body">
      <div className="container">
          <div className="row">
              <div className={`col-6 ${patientcss.detail}`}>
                  <div className="row">
                      <h5>Detail</h5>
                  </div>

        <div className="row d-flex flex-column">
            <div className="col-8">
            <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={this.state.data.name} disabled/>
  </div>
            </div>
            <div className="col-8">
            <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={this.state.data.email} disabled/>
  </div>
            </div>
            <div className="col-8">
            <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Address</label>
    
    <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value="Sarai Dangari Tikari Varanasi" disabled></textarea>
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
                            return <tr id={name._id}  key={key}>
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
                                console.log($(`#${name._id}`).hide(),"It is correct or not");
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
          <Notification/>
          

  </div>

    )
  }
}

export default Patient
