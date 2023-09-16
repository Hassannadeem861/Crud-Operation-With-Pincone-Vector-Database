//Hook hum in things ko khata hain go humari UI sai connected ho
// //state local variable hota hain
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./home.css";
// import WeatherCard from "../weatherWidget/weatherWidget";


const baseUrl = "http://localhost:5001";

// //Busniess Logic Complete
const CreatePost = (e) => {
  const postTitleInputRef = useRef(null);
  const postBodyInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [editAlert, setEditAlert] = useState(null);

  const [allPosts, setAllPosts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const getAllPost = async (e) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/posts`);
      console.log(response.data);

      setIsLoading(false);
      setAllPosts([...response.data]);
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }
  };
  const searchHandler = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/search?q=${searchInputRef.current.value}`);
      console.log(response.data);

      setIsLoading(false);
      setAllPosts([...response.data]);
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();

    return () => {
      // cleanup function
    };
  }, [toggleRefresh]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/api/v1/post`, {
        title: postTitleInputRef.current.value,
        text: postBodyInputRef.current.value,
      });

      setIsLoading(false);
      console.log(response.data);
      setAlert(response.data.message);
      setToggleRefresh(!toggleRefresh);
      e.target.reset()
      // getAllPost();
    } catch (error) {
      // handle error
      console.log(error?.data);
      setIsLoading(false);
    }
  };

  const deletePostHandler = async (_id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${baseUrl}/api/v1/post/${_id}`, {
        title: postTitleInputRef.current.value,
        text: postBodyInputRef.current.value,
      });

      setIsLoading(false);
      console.log(response.data);
      setAlert(response.data.message);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      // handle error
      console.log(error?.data);
      setIsLoading(false);
    }
  };

  const editSaveSubmitHandler = async (e) => {
    e.preventDefault();
    const _id = e.target.elements[0].value;
    const title = e.target.elements[1].value;
    const text = e.target.elements[2].value;

    try {
      setIsLoading(true);
      const response = await axios.put(`${baseUrl}/api/v1/post/${_id}`, {
        title: title,
        text: text,
      });

      setIsLoading(false);
      console.log(response.data);
      setAlert(response?.data?.message);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      // handle error
      console.log(error?.data);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="postTitleInput"> Post Title:</label>
        <input id="postTitleInput" type="text" required minLength={2} maxLength={20} ref={postTitleInputRef} />
        <br />

        <label htmlFor="postBodyInput"> Post Body:</label>
        <textarea
          id="postBodyInput"
          type="text"
          required
          minLength={2}
          maxLength={999}
          ref={postBodyInputRef}
        ></textarea>
        <br />

        <button type="submit">Publish Post</button>
        <span>
          {alert && alert}
          {isLoading && "Loading..."}
        </span>
      </form>

      <br />

      <form onSubmit={searchHandler}>
        <input type='search'placeholder="Enter Your Search..." ref={searchInputRef}/>
       <button type="submit" hidden></button>
      </form>

      <div>
        {allPosts.map((post, index) => (
          <div key={post._id} className="post">
            {post.isEdit ? (
              <form onSubmit={editSaveSubmitHandler} className="editForm">
                <input type="text" disabled value={post._id} hidden />
                <input defaultValue={post.title} type="text" placeholder="title" />
                <br />
                <textarea defaultValue={post.text} type="text" placeholder="body" />
                <br />
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    post.isEdit = false;
                    setAllPosts([...allPosts]);
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p>{post.text}</p>

                <button
                  onClick={(e) => {
                    console.log("click");
                    allPosts[index].isEdit = true;
                    setAllPosts([...allPosts]);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    deletePostHandler(post._id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}

        <br />
      </div>
    </div>
  );
};

export default CreatePost;


// import axios from "axios";
// //Hook hum in things ko khata hain go humari UI sai connected ho
// //state local variable hota hain
// import { useState, useRef, useEffect } from "react";
// import "./home.css";
// // import WeatherCard from "../weatherWidget/weatherWidget";

// //Busniess Logic Complete
// const CreatePost = () => {
//   // console.log("CreatePost: ", CreatePost)
//   const baseUrl = "http://localhost:5001";
//   // console.log("allPosts: ", allPosts)
//   const postTitleInputRef = useRef(null);
//   const postTextInputRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const [editAlert, setEditAlert] = useState(null);
//   const [allPosts, setAllPosts] = useState([]);
//   const [toggleRefresh, setToggleRefresh] = useState(false);

 
//   // DATABASE READ FUNCTION 

//   useEffect(() => {
//     setIsLoading(true);
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${baseUrl}/api/v1/posts`);
//         console.log("response: ", response.data);
//         setIsLoading(false);
//         setAllPosts(response.data);
//         setToggleRefresh(!toggleRefresh);
//         //CreatePost()
//       } catch (error) {
//         console.log("error: ", error.data);
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//     // return () => {
//     //   //CleanUp Function
//     // };
//   }, [toggleRefresh]);


//   // DATABASE CREATE POST FUNCTION

//   const SubmitPost = async (event) => {
//     event.preventDefault();
//     // console.log("Function is Running: ", SubmitPost);
//     try {
//       setIsLoading(true);
//       const response = await axios.post(`${baseUrl}/api/v1/post`, {
//         title: postTitleInputRef.current.value,
//         text: postTextInputRef.current.value,
//       });
//       console.log("response: ", response.data);
//       setAlert(response.data.message);
//       setIsLoading(false);
//     } catch (error) {
//       console.log("error: ", error?.data);
//       setIsLoading(false);
//     }
//   };
// };

// //      DELETE POST FUNCTION

// const deletePost = async (_id) => {
//   console.log("deletePost: ", _id);

//   try {
//     setIsLoading(true);
//     const response = await axios.delete(`${baseUrl}/api/v1/post/${_id}`, {

//       // title: postTitleInputRef.current.value,
//       // text: postTextInputRef.current.value,

//     });
//     setIsLoading(false);
//     console.log("response: ", response.data);
//     setAlert(response.data.message);
//     setToggleRefresh(!toggleRefresh)
//   } catch (error) {
//     console.log("error: ", error?.data);
//     setIsLoading(false);
//   }
// };


// //Edit Function
// const editSaveSubmitHandler = async (e) => {
// e.preventDefault()
// const id = e.target.element[0].value;
// const title = e.target.element[1].value;
// const text = e.target.element[2].value;

// try {
//   setIsLoading(true);
//   const response = await axios.put(`${baseUrl}/api/v1/post/${_id}`, {
//     title: title,
//     text: text,
//   });
//   setIsLoading(false);
//   console.log("response: ", response.data);
//   setAlert(response?.data?.message);
//   setToggleRefresh(!toggleRefresh)
// } catch (error) {
//   console.log("error: ", error?.data);
//   setIsLoading(false);
// }

// }




// return ( 
//    <div>
//     <form id="form" onSubmit={SubmitPost}>
//       <label htmlFor="postTitleInputRef">PostTitle:</label>
//       <input
//         type="text"
//         id="postTitleInputRef"
//         maxLength={20}
//         minLength={2}
//         placeholder="Enter Your PostTitle"
//         required
//         ref={postTitleInputRef}
//       />

//       <br />

//       <label htmlFor="postTextInputRef">PostText:</label>
//       <textarea
//         type="text"
//         id="postTextInputRef"
//         maxLength={1000}
//         minLength={5}
//         placeholder="Enter Your PostText"
//         required
//         ref={postTextInputRef}
//       />
//       <br />
//       <button type="submit" id="btn">
//         Publish Post
//       </button>
//     <span>
//     {alert && alert }
//     {isLoading && "Loading..." }
//     </span>
//     </form>

    

//     <br />  
//      <div>
//         {allPosts.map((post, index) => (
//         <div key={post._id} className='post'>
//           { (post.isEdit) ? 
//           <form className={post} id="editForm">
//           <input value={post._id} type="text" disabled hidden id="" placeholder="Edit Title" required />
//           <input defaultValue={post.title} type="text" id="editInput" placeholder="Edit Title" required />
//           <br />
//           <textarea defaultValue={post.text} type="text" id="editInput" placeholder="Edit Text" required />
//           <br />
//           <button type="submit" onSubmit={editSaveSubmitHandler}>Edit</button>

//           <button type="button" onClick={ () => {
//             post.isEdit = false;
//             setAllPosts([...allPosts]);  

//           }}>cancel</button>
//           <span>
//           {editAlert && editAlert }
//           {isLoading && "Loading..." }
//           </span>
//         </form>  
//           : 
//           <div>
//           <h2>{post.title}</h2> 
//           <p>{post.text}</p>
//          <button type="click" id="edit-post" onClick={(e) => {
//           allPosts[index].isEdit = true
//           setAllPosts([...allPosts])
//         }}
//         >Edit Post</button>
//          <button 
//          type="click"
//           id="del-post"
//           onClick={(e) =>{
//           deletePost(post._id)
//         }}
//         >
//         Delete Post
//         </button>
//         </div>
//    }


//         </div>
//      ))}
//   </div> 


//   </div>
// );
// export default CreatePost;
