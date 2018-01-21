import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import FirstStep from './steps/first.js';
import SecondStep from './steps/second.js';
import ThirdStep from './steps/third.js';
import axios from 'axios';

import Login from './login.js';


/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class Register extends React.Component
{

  constructor(props)
  {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.setData = this.setData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      prenom: '',
      orientation: '',
      age: '',
      email: '',
      password: '',
      gender : '',

      finished: false,
      stepIndex: 0,
      is_button_disable: true
    }
  }



  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  setData(data)
  {
    this.setState(data);
    // console.log(this.state);
  }

  handleLogin()
  {
    let data = {
      prenom: this.state.prenom,
      age: Date.parse(this.state.age),
      orientation: this.state.orientation,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      is_button_disable: false
    };
    console.log(data)
    axios.post('http://localhost:3000/sign_up', data)
    .then((res)=>
    {
      console.log(res)
    }).catch((err)=> {throw err})
  }

  getStepContent(stepIndex)
  {
    const parentProp = {
      handleNext: this.handleNext,
      setData: this.setData
    }

    switch (stepIndex) {
      case 0:
        return <FirstStep {...parentProp} />;
      case 1:
        return <SecondStep {...parentProp} />;
      case 2:
        return <ThirdStep {...parentProp} />;
      default:
        return <FirstStep {...parentProp} />;
    }
  }

  render() {
    const {finished, stepIndex, is_button_disable} = this.state;
    const contentStyle = {margin: '0 16px', textAlign: 'center'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: '20px auto auto'}}>
        <Tabs>
          <Tab label='Login'>
            <div className="steper_container">
                <Login />
            </div>

          </Tab>
          <Tab label='Register'>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Select campaign settings</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create an ad group</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create an ad</StepLabel>
              </Step>
            </Stepper>
            <div style={contentStyle}>
          
              {finished ? (
                <p>
                  {


                  }
                  <a
                    href="/"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({stepIndex: 0, finished: false});
                    }}
                  >
                    Click here
                  </a> to reset the example.
                </p>
              ) : (
                <div className="steper_container">
                  {this.getStepContent(stepIndex)}
                  <div style={{marginTop: 12}}>
                    
                    <RaisedButton
                      label="finished"
                      style={stepIndex === 2 ? {display: 'block'} : {display: 'none'}}
                      primary={true}
                      onClick={this.handleLogin}
                      disabled={is_button_disable}
                    />
                  </div>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}



export default Register;