import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';



class FirstStep extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  handleValid(data)
  {
    console.log(data)
    // console.log(test)
    this.props.setData({sex : data});
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
             <RaisedButton label="Homme" onClick={this.handleValid.bind(this, "Homme")} />
            </div>
            <div style={styles}>
             <RaisedButton label="Femme" value="test"  onClick={this.handleValid.bind(this, "Femme")} />
            </div>
          </div>
      </div>
    );
  }
}
export default FirstStep;