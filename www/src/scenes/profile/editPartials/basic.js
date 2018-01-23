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
			data: []
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
			// default_tags = ['bio', 'geek', 'piercing'],
			pictures = user ? user.pictures : [],
			pictureProp = { add_pic: this.add_pic, remove_pic: this.remove_pic, user: user };

			console.log(this.props)
	    return (
			<div className='white_tab'>
				<header>
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
							<label htmlFor='tags'>tags:</label>
							<Tags/>
						</div>
						<div>
							<div className='clear_fix'>
								<label htmlFor='tags'>Pictures:</label>
							</div>
							<ul className='edit_pics'>
								<li>
									{pictures[0] ? <span onClick={this.props.remove_pic}>x</span> : ''}
									<img src={pictures[0] || '/img/sprites/camera_50.png'} alt="" />
									<input type="file" name="myfile" onChange={this.add_pic.bind(this, 0)}/>
								</li>
								<li>
									{pictures[1] ? <span onClick={this.props.remove_pic}>x</span> : ''}
									<img src={pictures[1] || '/img/sprites/camera_50.png'} alt="" />
									<input type="file" name="myfile" onChange={this.add_pic.bind(this, 1)}/>
								</li>
								<li>
									{pictures[2] ? <span onClick={this.props.remove_pic}>x</span> : ''}
									<img src={pictures[2] || '/img/sprites/camera_50.png'} alt="" />
									<input type="file" name="myfile" onChange={this.add_pic.bind(this, 2)}/>
								</li>
								<li>
									{pictures[3] ? <span onClick={this.props.remove_pic}>x</span> : ''}
									<img src={pictures[3] || '/img/sprites/camera_50.png'} alt="" />
									<input type="file" name="myfile" onChange={this.add_pic.bind(this, 3)}/>
								</li>
								<li>
									{pictures[4] ? <span onClick={this.props.remove_pic}>x</span> : ''}
									<img src={pictures[4] || '/img/sprites/camera_50.png'} alt="" />
									<input type="file" name="myfile" onChange={this.add_pic.bind(this, 4)}/>
								</li>
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

								// <Pic src={pictures[0]} {...pictureProp}/>
								// <Pic src={pictures[1]} {...pictureProp}/>
								// <Pic src={pictures[2]} {...pictureProp}/>
								// <Pic src={pictures[3]} {...pictureProp}/>
								// <Pic src={pictures[4]} {...pictureProp}/>
class Pic extends Component
{
	constructor(props)
  	{
	    super(props);

		this.append_image = this.append_image.bind(this);

		this.state = 
		{
			src: '',
			is_set: false
		}
	}

	componentDidMount()
	{
		console.log(this.props.src)
		this.setState({src: this.props.src})
	}

	append_image(e)
	{
		const input = e.target;

		if (input.files && input.files[0])
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				// $('#blah').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	render ()
	{
		const exist = this.props.src ? true : false,
			src = this.props.src  || '/img/sprites/camera_50.png';

			if (exist && !this.state.is_set)
				this.setState({src: this.props.src, is_set: true})
		// console.log(this.state.src)
		if (exist)
			return (<li><img src={src} alt={this.props.user.first + ' picture'} /><span onClick={this.props.remove_pic}>x</span></li>);
		return (<li><img src={src} alt={this.props.user.first + ' picture'} /><input type="file" name="myfile" onChange={this.append_image}/></li>);
	}
}


function Tags(props)
{
	return (<FlatButton label="Default" />);
}

export default EditBasic;
