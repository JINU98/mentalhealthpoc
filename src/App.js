import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Convert from 'ansi-to-html';

function App() {

  var convert = new Convert();
  const [subreddit,setsubreddit]=useState("medical_advice")
  const [data,setData]=useState([])
  const [annotations,setAnnotations]=useState([])
  const [inferences,setInferences]=useState([])

  const displayInference = (type)=>{

  

    if(type == "0"){
      return "None"
    }
    if(type == "1"){
      return "Indication or None"
    }
    if(type == "2"){
      return "Ideation type 1"
    }
    if(type == "3"){
      return "Ideation type 2"
    }
    if(type == "4"){
      return "Behavourial or attempt"
    }


  }

  const handlePosts = async (posts) => {
    await axios.get(`http://127.0.0.1:5000/get?posts=${posts}`)
          // .then((res)=>res.json())
          
          .then((res)=>{
            let html=[];
            let infer=[];
            res.data.map((val,ind)=>{
            // let ansi_up = new AnsiUp();
              // let html = ansi_up.ansi_to_html(val);
              // console.log("html",html)
              // return console.log(val[2])
              console.log("value index",val,ind)
              
                if(val==null){
                  html.push(" ")
                  infer.push("0")
                }
                else{
                  html.push(convert.toHtml(val[2]))
                  infer.push(val[0])
                  
                }
                
              
              
            })
            console.log("html",html)
            setAnnotations(html)
            setInferences(infer)
          })
        }

  // https://www.reddit.com/r/medical_advice/
  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit +".json").then(
      res => {
        if (res.status !== 200) {
          console.warn("Warning: Something is wrong with the api.");
          return;
        }
        res.json().then(data => {
          if (data != null){
            let posts = []
            setData(data.data.children.slice(0,10));
           

            posts = data.data.children.map((val)=>{
              return val?.data?.selftext.replaceAll("&amp;","and").replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
            })
            console.log("posts",posts)
            handlePosts(JSON.stringify(posts,null,"||"))
            console.log("data",data.data.children)
          }
        });
      }
    )
  }, []);


  return (
    <div>
      <header className="main">
        <h1>r/<input class="subreddit_input" onChange={e => setsubreddit(e.target.value)} value={subreddit} /></h1>
    
				</header>

      <section>

        {data.map((value,index)=>{

        //  return console.log(value?.data?.selftext)

        return <div key={value?.data?.id} style={{margin:"0 auto",width:"100%"}}>

        { <span> Posted by : <strong> u/{value?.data?.author}</strong> &nbsp;<span> {value.data.author_flair_text}</span> </span>  } <span> {value?.data?.author_flair_text?.includes("Moderator")== true ? <i className="fa fa-star" style={{color:"red"}} aria-hidden="true"></i>: null   }  </span>
        
          
          <div style={{display:"flex",gap:"10px"}}>
          <div>
					<h3>{ value?.data?.title} </h3> 
          </div>

          <div>
            {
          <p style={{backgroundColor:"grey",color:'white',margin:"1px",padding:"5px",fontSize:"12px",borderRadius:"10px"}} >{value.data.link_flair_text}</p>
          }
            </div>
            <div>
            <p style={{backgroundColor:"#f56a6a",color:'white',margin:"1px",padding:"5px",fontSize:"12px",borderRadius:"10px"}} >
            {displayInference(inferences[index])}
          </p>
            </div>
         
        

          </div>
              
          <div>
            <source src={value?.data?.media?.scrubber_media_url} 
            width="640" height="480" frameborder="0" allowfullscreen>
          </source>
          </div>

              {/* <img src={value?.data?.thumbnail} style={{height: "200px"}} alt="" /> */}

          {
          <span> {value?.data?.selftext}

            <br/>
            <br/>
            <td style={{color:"white"}} dangerouslySetInnerHTML={{__html: annotations[index]}} />

            {/* {annotations[index]} */}

           <p> <br/> <a href="#" target="_blank" className="button fit"><i className="fa fa-comments" aria-hidden="true"></i> Comments</a> </p> <hr className="major" /> </span>} 

   

        </div>
        
      
        })}  

      </section>


    </div>
  );
}

export default App;
