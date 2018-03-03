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
      first_name: '',
      last_name: '',
      login: '',
      age: minDate,
      email: '',
      password: '',
      is_button_disable : true,
      date_default: minDate
    }
  }

  is_data_complete()
  {
    let field_min_len = 4;

    if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ||
      this.state.first_name.length < field_min_len ||
      this.state.last_name.length < field_min_len ||
      this.state.login.length < field_min_len ||
      this.state.password.length < field_min_len)
      return false;

    return (true)
  }

  dataChange(data, e)
  {
    let r = {},
      is_complete;

    r[data] =  e.target.value;
    this.setState(r, ()=>
    {
      is_complete = this.is_data_complete();

      if (!is_complete && !this.state.is_button_disable)
          this.setState({'is_button_disable' : true}, ()=>this.handleValid()) ;
      else if(is_complete)
          this.setState({'is_button_disable' : false}, ()=>this.handleValid()) ;
    })
  }

  dateChange(e, data)
  {
    this.setState({'age': data}, ()=>
    {
      if (this.is_data_complete())
        this.handleValid();
    });
  }

  handleValid()
  {
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      login: this.state.login,
      age: this.state.age,
      email: this.state.email,
      password: this.state.password,
      is_button_disable: this.state.is_button_disable
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
              <TextField hintText="Frist name" style={style} underlineShow={false}
                onChange={this.dataChange.bind(this, "first_name")} autoFocus
                />
              <TextField hintText="Last name" style={style} underlineShow={false}
                onChange={this.dataChange.bind(this, "last_name")}
                />
              <Divider />
              <DatePicker hintText="Age" style={style} underlineShow={false} autoOk={true}
                onChange={this.dateChange}
                maxDate={this.state.date_default}
                defaultDate={this.state.date_default}
              />
              <Divider />
              <TextField hintText="Login" style={style} underlineShow={false} type="email"
                onChange={this.dataChange.bind(this, "login")}
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
