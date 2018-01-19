import React from 'react';


export default function Avatar(props)
{
	const styles = (props.data && props.data.styles) ? props.data.styles : {},
		avatar = (props.data && props.data.avatar) ? props.data.avatar : '/img/sprites/camera_50.png';

	return (<div className='avatar'><img style={styles} src={avatar}/></div>);
}