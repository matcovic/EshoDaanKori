import React from 'react'

function WhyUs(props) {
    return (
        <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="why-us-grid">
                <img className="why-us-icon" src={props.icon} alt=""/>
                <h3>{props.title}</h3>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

export default WhyUs
