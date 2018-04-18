

function match_order(sort)
{
	sort = sort.toLowerCase();
	res = '';
	switch(sort)
	{
		case 'age':
				res = 'User.age';
				break;

		case 'location':
				res = 'distance';
				break;

		case 'popularity':
				res = 'User.popularity';
				break;

		case 'tags':
				res = 'User.tag';
				break;

		default:
				res = 'distance ';
	}
	return (res);
}

function match_sex(user)
{
    if (user.gender === 'male')
    {
      if (user.orientation === 'heterosexual')
        return ({gender: "'female'", orientation: "'heterosexual'"});
      else if (user.orientation === 'homosexual')
        return ({gender: "'male'", orientation: "'homosexual'"});
      else if (user.orientation === 'bisexual')
        return ({gender: "'male', 'female'", orientation: "'heterosexual', 'bisexual'"});
    }
    else if (user.gender === 'female')
    {
			if (user.orientation === 'heterosexual')
				return ({gender: "'male'", orientation: "'heterosexual'"});
			else if (user.orientation === 'homosexual')
				return ({gender: "'female'", orientation: "'homosexual'"});
			else if (user.orientation === 'bisexual')
				return ({gender: "'male', 'female'", orientation: "'heterosexual', 'bisexual'"});
    }
    return ({genre: "", orientation: ""});
}


module.exports =
{
	match_order: match_order,

	match_sex: match_sex,
}
