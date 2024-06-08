import React from "react";
export default function Bubble(){


    const bubbleStyles = {
        bubbleContainer: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundColor: 'aliceblue'
        },
        bubble1Styles: {
          position: 'absolute',
          width: '300px',
          height: 'auto',
          top: 0,
          right: 0
        },
        bubble2Styles: {
          position: 'absolute',
          width: '300px',
          height: 'auto',
          bottom: 0,
          opacity: '0.5',
          left: 0
        }
        
      };

    return(
        <div className="bubble-container" style={bubbleStyles.bubbleContainer}>
        <img src=".\images\blob1.svg" alt="bubble" className="bubble1" style={bubbleStyles.bubble1Styles} />
        <img src=".\images\blob2.svg" alt="bubble" className="bubble2" style={bubbleStyles.bubble2Styles} />
      </div>
    )
}