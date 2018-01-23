import React from 'react';
import { Link } from 'react-router-dom';


export default function Pics(props)
{
	const data = props.data.data,
	styles =
	{
		position: 'relative',
		display: 'inline-block',
		borderRadius: 100,
		height: 123,
		width: 123,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '50% 50%'
	};

	if (!data)
		return '';

	const lst = data.map((pic) =>
	{
		styles.backgroundImage = pic;
		return (<li key={data.key + pic} style={styles} ><Link to=''><img src={pic} alt={data.first + ' picture'} /></Link></li>);
	});

	return (lst)
}