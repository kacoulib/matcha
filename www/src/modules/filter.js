import React, { Component } from 'react';
import Axios from 'axios';

import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';




class Filter extends Component
{
	constructor()
	{
		super();

		this.handleFirstSlider = this.handleFirstSlider.bind(this);
		this.handleTag = this.handleTag.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state =
		{
			distance: 1000,
			age: 24,
			popularity: 0,
			tags: [],
			sort: 'Age',

			sortTab: ["Age", "Localisation", "Popularity", "Tags"],
			sortNumber: 0
		}
	}

	componentDidMount()
	{
		let data = [],
			toRm = ['sport', 'love', 'kiss'];


		for (var i = toRm.length - 1; i >= 0; i--)
			data[i] = {name: toRm[i], checked: false};

		this.setState({tags: data, sort: this.state.sortTab[0]});
	}

	handleFirstSlider = (key, e, value) =>
	{
		let data = {};
		data[key] = value;

		this.setState(data);
	}

	handleTag(i)
	{
		let tags = this.state.tags;

		tags[i].checked = !tags[i].checked;

		this.setState({tags});
	}

	handleSort(event, index, sortNumber)
	{
		let sort = this.state.sortTab[sortNumber];

		this.setState({sortNumber, sort});
	}

	handleSubmit()
	{
		let data = this.state,
			result = {age: data.age, distance: data.distance, popularity: data.popularity,  tags:[]};

		data.tags.map((elem)=>(elem.checked) ? result.tags.push(elem.name): '');

		if (data.sort)
			result['sort'] = data['sort'];

		console.log(result);
	}

	render()
	{
		const styleSlider =
		{
			marginTop: '10px',
			marginBottom: '15px'
		},
		stylesTag =
		{
			block:
			{
				maxWidth: 250,
			},

			checkbox:
			{
				marginBottom: 16,
			},
		};
		let {tags} = this.state;

		return (
			<div>
				<aside id="filter">
					<div>
						<p>Distance <span>{this.state.distance}</span></p>
						 <Slider
							min={100}
							max={2000}
							step={0.0000001}
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
						<p>popularity <span>{this.state.popularity}</span></p>
						 <Slider
							min={0}
							step={1}
							max={10}
							value={this.state.popularity}
							onChange={this.handleFirstSlider.bind(this, 'popularity')}
							sliderStyle={styleSlider}
						/>
					</div>

					<div>
						{
							tags.map((tag, i)=>
							(
								<Checkbox
									label={tag.name}
									checked={tag.checked}
									onCheck={this.handleTag.bind(this, i)}
									style={stylesTag}
									key={i}
								/>
							))
						}

					</div>

					<div>
						<SelectField
							floatingLabelText="Sort"
							value={this.state.sortNumber}
							onChange={this.handleSort}
						>
							<MenuItem value={0} primaryText="Age" />
							<MenuItem value={1} primaryText="Localisation" />
							<MenuItem value={2} primaryText="Popularity" />
							<MenuItem value={3} primaryText="Tags" />
						</SelectField>
					</div>

					<div style={{textAlign: 'center'}}>
						<RaisedButton label="Filter" primary={true} style={{margin: '12px auto'}} onClick={this.handleSubmit}/>
					</div>

				</aside>
			</div>
		);
	}
}
export default Filter;
