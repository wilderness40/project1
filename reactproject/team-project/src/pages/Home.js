import React, {useState} from "react";
import homeIcons from "../HomeIconsData"; 

function Home(){
    return(
        <>
            <main>
                {homeIcons.map((icon, id) => {
                   return (<Icon key={id} src={icon.iconSrc}>{icon.iconTitle}</Icon>) 
                })} 
            </main>
            <Footer homeIcons={homeIcons}></Footer>
        </>
    )
}

export default Home