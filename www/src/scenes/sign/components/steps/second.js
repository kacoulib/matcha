import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';



// 'heterosexual', 'bisexual', 'homosexual'

class Second_step extends React.Component
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

    console.log(this.props)
    return (
      <div>
        <h3>Ton orientation</h3>
        <div>
          <div style={styles}>
           <RaisedButton label="Bisexual" onClick={this.handleValid.bind(this, "Bisexual")}/>
          </div>
          <div style={styles}>
           <RaisedButton label="homosexual" onClick={this.handleValid.bind(this, "homosexual")}/>
          </div>
          <div>
           <RaisedButton label="Heterosexual" onClick={this.handleValid.bind(this, "Heterosexual")}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Second_step;