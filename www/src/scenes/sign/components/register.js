import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class Register extends React.Component
{

  state = {
    finished: false,
    stepIndex: 0,
  };

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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return third_step();
      case 1:
        return second_step();
      case 2:
        return third_step();
      default:
        return first_step();
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
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
              <p>{this.getStepContent(stepIndex)}</p>
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
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const first_step = ()=> (
  <div>
      <h3>Tu es...</h3>
      <div>
        <p>
         <RaisedButton label="Homme" />
        </p>
        <p>
         <RaisedButton label="Femme" />
        </p>
      </div>
  </div>
);

// 'heterosexual', 'bisexual', 'homosexual'
const second_step = ()=> (
    <div>
      <h3>Ton orientation</h3>
      <div>
        <p>
         <RaisedButton label="Bisexual" />
        </p>
        <p>
         <RaisedButton label="homosexual" />
        </p>
        <p>
         <RaisedButton label="Heterosexual" />
        </p>
      </div>
  </div>
);

const third_step = ()=>
{
  const style = {
    marginLeft: 20,
  }

  return (

    <div>
        <h3>Bientôt fini :)</h3>
        <div>
          <Paper zDepth={2}>
            <TextField hintText="Prenom" style={style} underlineShow={false} />
            <Divider />
            <DatePicker hintText="Age" style={style} underlineShow={false} autoOk="true" />
            <Divider />
            <TextField hintText="Email address" style={style} underlineShow={false} />
            <Divider />
            <TextField hintText="Password" style={style} underlineShow={false}  type="password"/>
            <Divider />
          </Paper>
        </div>
    </div>
  );
}
export default Register;