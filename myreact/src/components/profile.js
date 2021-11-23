import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css"

import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { createItem, getItems } from '../functions';

function Profile() {

  const [item, setItem] = useState({ title: '', image: '' });
  const [items, setItems] = useState([])
  const onSubmitHandler = async (e) => {
    console.log(item)
    e.preventDefault();
    if(item.title=="" ){
    
      alert("Please add title!")
    }else if(item.image==""){
      alert("Please add image!")
      
    }
    else{
      const result = await createItem(item);

      setItems([...items, result]);
    }
   
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log('fetch data;m', result)
      setItems(result)
    }
    fetchData()

  }, [])
  return (
    <div className="container">
      {/* <pre>{JSON.stringify(item, null, '\t')}</pre> */}
     
      {items?.map(item => (
        <center>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div className="card" style={{ width: "40rem" }} key={item._id}>
          <center>
            <img className="card-img-top" style={{ width: '50%', height: 300 }} src={item.image} alt="IMAGE POST" />
            </center>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text" style={{ textAlign:"left",paddingLeft:"20px" }}>
              🗣️ comment here
              </p>


            </div>
            <br></br>

            <div className="card-body">

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">User's can see your comments   <i
                  className=" bi bi-chat-text-fill"

                ></i></label>
                <br></br>   <br></br>
                <input
                  type="text"
                  className="form-control"

                  style={{ width: '50%' }}

                  placeholder="Enter Comment"
                /><br></br>
                <button type="button" className="btn btn-outline-success">Send<i
                  className=" bi bi-play-fill" style={{ fontSize: '15px' }}

                ></i></button>



              </div>
            </div>




          </div>
          <br></br>
          <br></br>
        </center>





      ))}

      
       {/* Button trigger modal */}
  <button
    type="button"
    className="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
  >
    Launch demo modal
  </button>
  {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Upload new Image
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

        <form action="" onSubmit={onSubmitHandler}>
        <input type="text" className="input-field" placeholder="Add Title of Post"
        style={{ width: "30rem" }}

          onChange={e => setItem({ ...item, title: e.target.value })}
        />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItem({ ...item, image: base64 })}
        />
        <div className="right-align">
          <button className="btn">submit</button>
        </div>

      </form>



        </div>
        <div className="modal-footer">
          
        </div>
      </div>
    </div>
  </div>


    </div>
  

  );
}


export default Profile;
