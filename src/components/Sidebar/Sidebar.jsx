import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Context } from '../../context/context' // Import the context

const Sidebar = () => {

const [extended, setExtended] = useState(false);
const{onSent,prevPromts, setRecentPrompts,newChat} = useContext(Context);

const loadPrompt = async (prompt) => {
  setRecentPrompts(prompt); // Update recent prompts with the selected prompt
  await onSent(prompt); // Call the onSent function with the selected prompt
}

  return (
    <div className='sidebar'>
      <div className="top">
        <img  onClick={()=> setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={() => newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p> New Chat</p> : null}
        </div>

        {extended ?
         <div  className="recent">
            <p className="recent-title">Recent </p>
            {prevPromts.map ((item , index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                <img src= {assets.message_icon} alt="" />
                <p>{item.slice(0,18)}...</p>
            </div>
              )

})}

            
        </div> : null
    }
       
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
         { extended ? <p>Help</p> : null}
        </div>
        <div className="sidebar-icon recent-entry">
          <img src={assets.history_icon} alt="" />
            {extended ? <p>History</p> : null}
        </div>
        <div className="sidebar-icon recent-entry">
          <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
 