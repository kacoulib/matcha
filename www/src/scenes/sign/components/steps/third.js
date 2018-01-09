import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';



class Third_step extends React.Component
{
  render()
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
              <DatePicker hintText="Age" style={style} underlineShow={false} autoOk={true} />
              <Divider />
              <TextField hintText="Email address" style={style} underlineShow={false} type="email" />
              <Divider />
              <TextField hintText="Password" style={style} underlineShow={false}  type="password"/>
              <Divider />
            </Paper>
          </div>
      </div>
    );
  }
}
export default Third_step;