import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';





class ThirdStep extends React.Component
{
  constructor(props)
  {
    super(props);
    this.dateChange = this.dateChange.bind(this);

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      prenom: '',
      age: minDate,
      email: '',
      password: '',
      is_button_disable : true,
      date_default: minDate
    }
  }

  dataChange(data, e)
  {
    let r = {};

    r[data] =  e.target.value;
    this.setState(r, ()=>
    {
      if (this.state.prenom && this.state.email && this.state.password)
        this.handleValid();
    })
  }

  dateChange(e, data)
  {
    this.setState({'age': data}, ()=>
    {
      if (this.state.prenom && this.state.email && this.state.password)
        this.handleValid();
    });
  }

  handleValid()
  {
    let data = {
      prenom: this.state.prenom,
      age: this.state.age,
      email: this.state.email,
      password: this.state.password,
      is_button_disable: false
    }

    this.props.setData(data);
  }

  render()
  {
    const style = { marginLeft: 20 }
    

    return (
      <div>
          <h3>Bientôt fini :)</h3>
          <div>
            <Paper zDepth={2}>
              <TextField hintText="Prenom" style={style} underlineShow={false}
                onChange={this.dataChange.bind(this, "prenom")}
                />
              <Divider />
              <DatePicker hintText="Age" style={style} underlineShow={false} autoOk={true}
                onChange={this.dateChange}
                maxDate={this.state.date_default}
                defaultDate={this.state.date_default}
              />
              <Divider />
              <TextField hintText="Email address" style={style} underlineShow={false} type="email"
                onChange={this.dataChange.bind(this, "email")}
                />
              <Divider />
              <TextField hintText="Password" style={style} underlineShow={false}  type="password"
                onChange={this.dataChange.bind(this, "password")}
                />
              <Divider />
            </Paper>
          </div>
      </div>
    );
  }
}
export default ThirdStep;