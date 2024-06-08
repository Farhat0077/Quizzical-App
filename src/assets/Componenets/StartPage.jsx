import React from "react";

export default function Start(props) {
    const styles = {
        btn:{
        display: "inline-block",
        border: "1px solid #25397b",
        cursor: "pointer",
        backgroundColor: "#162556",
        color: "white",
        padding: "10px",
        borderRadius: "15px",
        width: "250px",
        marginBottom: "25px"
      
    },

    text:   {
        color: "#162556"
    }
    }
    return (
        <div>
            <h1 style={styles.text}>Quizzical</h1>
            <p style={styles.text}>Explore , learn and challenge yourself !</p>
            <button style={styles.btn} onClick={props.showPage}>Start Quiz</button>
        </div>
    )
}
