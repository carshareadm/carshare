//Import react
import React, { Component, PropTypes } from "react";

import style from "./Emergency.css";
import stylesMain from "../../main.css";

//Create a component class
export class App extends Component {
  render() {
    // Here goes our page
    return (
      <div className={style.body}>
        <h1 className={style.title}>Emergency</h1>
        <p>
          <strong>What to do if you're in a car accident</strong>
        </p>
        <p>
        Car accidents can happen anywhere, anytime, even if you're the safest driver around. 
        Other drivers may be careless or inexperienced, roads could be dangerous due to bad 
        weather, or you could just be in the wrong place at the wrong time.
        </p>
        <br />

        <p>
          <strong>At the scene</strong>
        </p>
        <p>
        If you're involved in an accident, stop immediately. If the damage isn't extensive, 
        move your car to the side of the road so you're not blocking traffic. Take a photo 
        of the scene before moving your car, for insurance purposes. 
        </p>
        <p>
        If you can't move your car, turn on the hazard lights, leave your vehicle and move 
        to a safe place. 
        </p>
        <p>
        Always stop to check on other parties involved, and to assess any damage caused. 
        </p>
        <p>
        Make sure you get details about any other party involved in the accident, 
        including their name, address, phone number, driver's licence number, 
        licence plate number and insurance details.
        </p>
        <br />
        <p>
          <h1 className={stylesMain.subtitle}>If required call emergency services, the phone number is 000</h1>
        </p>
        <p>
          Call for an ambulance if anyone is injured. 
        </p>
         <p>
          You should call the police if property is damaged, or if the other party did 
          not stop or is refusing to provide their personal details.  
        </p>
         <p>
          Depending on the circumstances, a police report may be required.
        </p>
        <br />
        <p>
          <h1 className={stylesMain.subtitle}>Call Shacar……. Our team will help.</h1>
        </p>
        <br />

          <p><strong>Customer Services</strong>
          <br />
            Services available 7am - 7pm</p>

          <h1 className={stylesMain.subtitle}>1300 000 123</h1>

            <p><strong>ShaCar Office Address:</strong><br />
            1 Flinders St,<br />
            Melbourne, Victoria</p>
      </div>
    );
  }
}

export default App;
