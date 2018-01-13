import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';



class FirstStep extends React.Component
{
  
  handleValid(data)
  {
    console.log(data)
    // console.log(test)
    this.props.setData({gender : data});
    this.props.handleNext();
  }

  render()
  {
    const styles = {
      marginBottom: 10
    }

    return (
      <div>
          <h3>Tu es...</h3>
          <div>
            <div style={styles}>
             <RaisedButton label="Homme" onClick={this.handleValid.bind(this, "male")} />
            </div>
            <div style={styles}>
             <RaisedButton label="Femme"  onClick={this.handleValid.bind(this, "female")} />
            </div>
            <div style={styles}>
             <RaisedButton label="Autre"  onClick={this.handleValid.bind(this, "other")} />
            </div>
          </div>
      </div>
    );
  }
}
export default FirstStep;