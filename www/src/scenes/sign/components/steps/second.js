import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';



// 'heterosexual', 'bisexual', 'homosexual'

class SecondStep extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  handleValid(data)
  {
    console.log(data)
    // console.log(test)
    this.props.setData({orientation : data});
    this.props.handleNext();
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
           <RaisedButton label="Bisexual" onClick={this.handleValid.bind(this, "bisexual")}/>
          </div>
          <div style={styles}>
           <RaisedButton label="homosexual" onClick={this.handleValid.bind(this, "homosexual")}/>
          </div>
          <div>
           <RaisedButton label="Heterosexual" onClick={this.handleValid.bind(this, "beterosexual")}/>
          </div>
        </div>
      </div>
    );
  }
}
export default SecondStep;