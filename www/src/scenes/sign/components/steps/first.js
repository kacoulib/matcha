import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';



class First_step extends React.Component
{
  constructor(props)
  {
    super(props);
    // this.handleValid = this.handleValid.bind(this);

    this.state = {
      is_button_disable : true
    }
  }

  handleValid(data)
  {
    this.state.is_button_disable = false;
    console.log(data)
    // console.log(test)
    this.props.handleNext();
  }

  componentDidMount()
  {
    this.props.is_button_disable(this.state.is_button_disable)
    console.log(this.props)
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
export default First_step;