import logo from './logo.svg';
import './App.css';
// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets'
import axios from 'axios';
import { useEffect } from 'react';
// import Twitter from 'twitter-v2';

function App() {

  const [text,setText]=useState("");
  const [inputValue,setInputValue]= useState("");
  const [filename,setFilename]=useState("Upload your own meme");
  
  const [previewImage,setPreviewImage]=useState("")
  const [uploadImage,setUploadImage]=useState("https://cdn-icons-png.flaticon.com/512/2956/2956875.png")
  const [showResult,setShowResult]=useState(false)
  const [count,setCount]=useState(0)
 
  // const handleTweetSubmit = ()=>{
  //   setText(inputValue.split("/").pop())
  //   return
  // }

  // https://twitter.com/Interior/status/463440424141459456

  //AAAAAAAAAAAAAAAAAAAAAOoOgwEAAAAAHZznerHzxWmwX7pGe9l49eoPwiY%3DycMcrY9HASjfBqv57STyyUSMA46syIImNis3XaVYPLD7KwfDVu
  //API Key SUmtdRi3cVXYCBcDHyCcFnYFy

  // eJHKxgYRvWS4iZdvPNsvvijrRvKMuImuiXAl2XMWB0RxpssXEz
// ci S0dBVFgyMi1Kc3R3NWM4X2RlTFM6MTpjaQ
//cs lehPOQoN7WjWHy_gUCoeFXP0VmtIFRgex0ti-PstWTSTlJpg-p

  // useEffect(() => {

  //   const URL = 'https://api.twitter.com/labs/2/tweets?ids=1566788679523254279'

  //   const bearer = "Bearer AAAAAAAAAAAAAAAAAAAAAOoOgwEAAAAAkFp9%2FJSbdByg4EJ%2Fdzoo1UYwHRs%3DbPDzGQikvGNtroSshlj8ErNmK9qYkUhQoukU9C82BOynAajUVt"
  //     axios.get(URL, { headers: { Authorization: bearer } })
  //   .then(response => {
  //       // If request is good...
  //       console.log(response.data);
  //     })
  //   .catch((error) => {
  //       console.log('error ' + error);
  //     });
   
  // }, []);

  const show = (count) =>{

    if(count==0){
      return  (<section class="wrapper style1 align-center">
              <div class="inner">


               
                <h3>Result based on your query.</h3>
                <div class="items style1 medium onscroll-fade-in">
                <section>
                    <h3>Sentiment Analysis</h3>
                    <b style={{fontWeight:"800"}}>Neutral Sentiment</b>
                  </section>
                <section>
                    <h3>Emotion Analysis</h3>
                    <b style={{fontWeight:"800"}}>is offensive and humorous</b>

                  </section>
                  <section>
                    <h3>Semantic Classification</h3>
                    <b style={{fontWeight:"800"}}>and the scale is slightly (3).</b>
                  </section>
  
                
                </div>
        <img src="heatmaps/heatmap4.png" style={{height:"600px"}} alt="" />

              </div>
            

            </section>)
    }
    if(count==1){
      return  (<section class="wrapper style1 align-center">
      <div class="inner">
       
      <h3>Result based on your query. The given meme is showing: </h3>
        <div class="items style1 medium onscroll-fade-in">

        <section>
                    <h3>Sentiment Analysis</h3>
                    <b style={{fontWeight:"800"}}>Neutral Sentiment</b>
                  </section>
                <section>
                    <h3>Emotion Analysis</h3>
                    <b style={{fontWeight:"800"}}>is sarcastic and humorous</b>

                  </section>
                  <section>
                    <h3>Semantic Classification</h3>
                    <b style={{fontWeight:"800"}}>and the scale is mild (3).</b>
                  </section>
        
        </div>
        <img src="heatmaps/heatmap3.png" style={{height:"600px"}} alt="" />

      </div>
    </section>)
    }

    if(count==2){
      return  (<section class="wrapper style1 align-center">
      <div class="inner">
       
      <h3>Result based on your query.</h3>
        <div class="items style1 medium onscroll-fade-in">

        <section>
                    <h3>Sentiment Analysis</h3>
                    <b style={{fontWeight:"800"}}>Negative Sentiment</b>
                  </section>
                <section>
                    <h3>Emotion Analysis</h3>
                    <b style={{fontWeight:"800"}}>is offensive</b>

                  </section>
                  <section>
                    <h3>Semantic Classification</h3>
                    <b style={{fontWeight:"800"}}>and the scale is very (4).</b>
                  </section>
        
        </div>
        <img src="heatmaps/heatmap1.png" style={{height:"600px"}} alt="" />

      </div>
    </section>)
    }
    if(count==3){
      return  (<section class="wrapper style1 align-center">
      <div class="inner">
     
      <h3>Result based on your query.</h3>
        <div class="items style1 medium onscroll-fade-in">
        <section>
                    <h3>Sentiment Analysis</h3>
                    <b style={{fontWeight:"800"}}>Neutral Sentiment</b>
                  </section>
                <section>
                    <h3>Emotion Analysis</h3>
                    <b style={{fontWeight:"800"}}>is humorous</b>

                  </section>
                  <section>
                    <h3>Semantic Classification</h3>
                    <b style={{fontWeight:"800"}}>and the scale is very (4).</b>
                  </section>
        
        </div>
        <img src="heatmaps/heatmap2.png" style={{height:"600px"}} alt="" />

      </div>
    </section>)
    }
 

   

  }

  const verifyURL = (url)=>{
    
    if(url.split(".").pop()==="jpg" || url.split(".").pop()==="jpeg" ||url.split(".").pop()==="png"){
      setPreviewImage(url)
      setText("")
    }
    else{
      setText(url.split("/").pop())
      setPreviewImage("")
    }
    

  }
  const changeHandler=(e)=>{
    if (e.target.files.length > 0) {
     let file_name = e.target.files[0].name;
     console.log(e.target.files[0])
     setPreviewImage(URL.createObjectURL(e.target.files[0]))
      setFilename(file_name)
    }
  }

  const temp = ()=>{
    setCount(count+1)
    setShowResult(true)

  }

  return (
    <div className="App">    

    <div >
      

    <input type="text" placeholder='Paste Meme Image or Twitter Url with a Meme Here...' value={inputValue} style={{textAlign:"center"}}
              onChange={(e)=>{setInputValue(e.target.value)}} onKeyUp={()=>verifyURL(inputValue)}  
            
      /> 
  

      <div style={{margin:"3vh auto" }}><Tweet tweetId={text} /></div>
      <div style={{margin:"3vh auto" }}><img src={previewImage}  style={{height:"400px"}} /></div>


      <p>Or</p>
      
      <div class="image-upload">
  <label for="file-input">
    <img src={uploadImage} height={"100px"} style={{cursor:"pointer"}} />
  </label>

  <input id="file-input" type="file" accept='image/*' onChange={changeHandler} />
  {/* <p>{filename}</p> */}

  <div><input onClick={temp} type="submit" style={{width:"100%"}} /></div>

    <div>
      {showResult ? show(count%4)  : null}
    </div>

</div>

    </div>   




   
  </div>
  );
}

export default App;
