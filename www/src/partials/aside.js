import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'material-ui/Slider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class AsideLeft extends Component
{
	constructor()
	{
		super();

		this.handleFirstSlider = this.handleFirstSlider.bind(this);

		this.state = {
			distance: 1000,
			age: 24,
			popularite: 1,
			items: [],
			defaultValue: 1
		}
	}

	componentDidMount()
	{
		let items = [];

		for (let i = 0; i < 10; i++ )
			items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);

		this.setState({items});
	}

	handleFirstSlider = (key, e, value) =>
	{
		let data = {};
		data[key] = value;

		this.setState(data);
	}

	render()
	{
		const styles =
		{
			display: 'block'
		},

		styleSlider =
		{
			marginTop: '10px',
			marginBottom: '15px'
		};

		return (
			<div>
				<aside className='aside-nav'>
					<ul>
						<li className='aside_sprite'>
							<Link to='/me' style={styles}>
								<span className='home'></span><span>My Profile</span>
							</Link>
						</li>

						<li className='aside_sprite'>
							<Link to='/notifications' style={styles}>
								<span className='notifications'></span><span>Notifications</span>
							</Link>
						</li>

						<li className='aside_sprite'>
							<Link to='/friends' style={styles} >
								<span className='friends'></span><span>friends</span>
							</Link>
						</li>
					</ul>
				</aside>
				<aside className='aside-nav'>
					<div>
						<p>Distance <span>{this.state.distance}</span></p>
						 <Slider
							min={100}
							max={2000}
							step={0.00000000001}
							value={this.state.distance}
							onChange={this.handleFirstSlider.bind(this, 'distance')}
							sliderStyle={styleSlider}
						/>
						
					</div>

					<div>
						<p>Age <span>{this.state.age}</span></p>
						 <Slider
							min={18}
							max={100}
							step={1}
							value={this.state.age}
							onChange={this.handleFirstSlider.bind(this, 'age')}
							sliderStyle={styleSlider}
						/>
						
					</div>

					<div>
						<p>popularite <span>{this.state.popularite}</span></p>
						 <Slider
							min={0}
							step={1}
							max={10}
							value={this.state.popularite}
							onChange={this.handleFirstSlider.bind(this, 'popularite')}
							sliderStyle={styleSlider}
						/>
					</div>

					<div>
						<DropDownMenu maxHeight={300} value={this.state.defaultValue} onChange={this.handleChange}>
							<MenuItem value={1} key="1" primaryText="1" />
							<MenuItem value={2} key="2" primaryText="2" />
							<MenuItem value={3} key="3" primaryText="3" />
						</DropDownMenu>

					</div>

				</aside>
			</div>
		);
	}
}
export default AsideLeft;
