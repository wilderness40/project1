import React, {useState} from "react";

function Footer({homeIcons}){
    return(
        <footer>
            <Sidebar homeIcons={homeIcons}></Sidebar>
            <Button></Button>
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer