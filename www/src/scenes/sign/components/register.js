import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import First_step from './steps/first.js';
import Second_step from './steps/second.js';
import Third_step from './steps/third.js';


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
    this.is_button_disable = this.is_button_disable.bind(this);

    this.state = {
      prenom: '',
      orientation: '',
      age: '',
      username: '',
      email: '',
      password: '',
      sex : '',

      finished: false,
      stepIndex: 0,
      is_button_disable: false
    }
  }

  // state = {
  // };

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

  is_button_disable(data)
  {
    this.setState({is_button_disable : data});
    console.log(data)
  }

  setData(event)
  {
    console.log(event);
  }

  getStepContent(stepIndex)
  {
    const parentProp = {
      handleNext: this.handleNext,
      is_button_disable: this.is_button_disable,
    }

    switch (stepIndex) {
      case 0:
        return <First_step {...parentProp} />;
      case 1:
        return <Second_step {...parentProp} />;
      case 2:
        return <Third_step {...parentProp} />;
      default:
        return <First_step {...parentProp} />;
    }
  }

  render() {
    const {finished, stepIndex, is_button_disable} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                  disabled={is_button_disable}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}



export default Register;