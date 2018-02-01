import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import InputField from '../components/input_field.js';




class EditBasic extends Component
{
	constructor(props)
  	{
	    super(props);
		this.add_pic = this.add_pic.bind(this);
		this.remove_pic = this.remove_pic.bind(this);

		this.state = {
			data: [],
			default_tags: ['bio', 'geek', 'hangout', 'piercing', 'programming', 'vegan']
		}
	}

	remove_pic()
	{
		console.log('remove')
	}

	add_pic(index, e)
	{
		let pic = e.target.files;

		if (pic.length === 0)
			return ;
		// this.setState({index})
		console.log('index = '+index)
		console.log('data = '+e)
		this.props.set_upload_picture(index, pic)
	}

	render()
	{
		const user = this.props.data || {},
			parentProp = { set_input_data: this.props.set_input_data },
			tagProp = {user_tags: user.tags, toggle_tags: this.props.toggle_tags},
			pictures = user ? user.pictures : [];

	    return (
			<div className='white_tab'>
				<header className='edit_header'>
					<h3>Basic info</h3>
				</header>
				<div className='tab_content' id='edit'>
					<form onSubmit={this.props.handleSubmit} >
						<InputField  value={this.props.data.first} name='first' label_text='First name' {...parentProp}/>
						<InputField  value={this.props.data.last} name='last' label_text='Last name' {...parentProp}/>
						<InputField  value={this.props.data.email} type='email' name='email' label_text='Email' {...parentProp}/>
						<div className='clear_fix'>
							<label htmlFor='bio'>Bio:</label>
							<textarea  id='bio' value={user.bio} onChange={parentProp.set_input_data.bind(this, 'bio')} />
						</div>
						<div className='clear_fix'>
							<label htmlFor='tags'>Tags:</label>
							<div className="left" style={{width: 300}}>
								{this.state.default_tags.map((elem, i)=>
								{
									return (<Tags key={i} {...tagProp} name={elem}/>)
								})}
							</div>
						</div>
						<div>
							<div className='clear_fix'>
								<label htmlFor='tags'>Pictures:</label>
							</div>
							<ul className='edit_pics'>
								{[0, 1, 2, 3, 4].map((elem, i)=>{
									return (
										<li key={i}>
											{pictures[i] ? <span onClick={this.props.remove_pic}>x</span> : ''}
											<img src={pictures[i] || '/img/sprites/camera_50.png'} alt="" />
											<input type="file" name="myfile" onChange={this.add_pic.bind(this, i)}/>
										</li>
									)
								})}


							</ul>
						</div>

						<div className='submit_container'>
							<button className='flat_button'>Save</button>
						</div>
					</form>
				</div>
			</div>
	    );
	}
}


function Tags(props)
{
	if (props.user_tags && props.user_tags.includes(props.name))
		return (<FlatButton label={props.name} primary={true} onClick={(e)=>props.toggle_tags(props.name)}/>);
	else
		return (<FlatButton label={props.name} onClick={(e)=>props.toggle_tags(props.name)}/>);
}

export default EditBasic;
