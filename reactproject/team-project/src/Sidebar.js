import React, {useState} from "react";


function Sidebar({homeIcons}){
    return(
        <>
            <div className="window-bar">
                <div className="window-textbar"></div>
                <div className="window-menubar">
                    {homeIcons.map((icon, id)=>{
                        return (
                            <Link key={id} to={icon.url}><img src={icon.iconSrc} /> {icon.iconTitle}</Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Sidebar