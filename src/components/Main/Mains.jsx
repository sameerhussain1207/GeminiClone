import React from 'react'
import { useContext } from 'react'
import './Mains.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Mains = () => {

const {onSent , input,setInput  ,recentPromts, prevPromts, showResult, loading, resultData} = useContext(Context);


const inputChange = (e) => {
    setInput(e.target.value);

}
  return (
    
        <div className='mains'>
            <div className="nav">
            <p>Gimini</p>
            <img src={assets.user_icon} alt="" />
            </div>
      <div className="main-container">

        {!showResult
        ?<>
         <div className="greet">
            <p><span>Hello,Sam</span></p>
            <p>How can i help you today</p>
        </div>

        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>Brifly summarrize this concept : unban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>Branstrom team bonding acticities for out work retret</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Improves the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
        </>
        :
        <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPromts}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                ? <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
                : 
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>

        </div>
        }

       

        <div className="main-bottom">

            <div className="search-box">
                <input onChange={inputChange} value={input} type="text" placeholder='Search for anything...' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {
                        input ?
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> 
                        :
                        null

                    }
                </div>
            </div>

            <p className="bottom-info">
                Gimini may dosplay inaccurate or offensive information and should not be seen as a perfectly reliable source.

            </p>
        </div>
      </div>
    </div>
  )
}

export default Mains
