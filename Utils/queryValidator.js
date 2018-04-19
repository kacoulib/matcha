

function match_order(sort)
{
	sort = sort.toLowerCase();
	res = '';
	switch(sort)
	{
		case 'age':
				res = 'age';
				break;

		case 'distance':
				res = 'distance';
				break;

		case 'popularity':
				res = 'popularity';
				break;

		case 'tags':
				res = 'tag';
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
				return "gender IN ('female') AND orientation = 'heterosexual', 'bisexual')";
      else if (user.orientation === 'homosexual')
				return "gender IN ('male') AND orientation IN ('homosexual', 'bisexual)')";
      else if (user.orientation === 'bisexual')
				return "gender IN ('male', 'female', 'other') AND orientation IN ('homosexual', 'bisexual)')";
    }
    else if (user.gender === 'female')
    {
			if (user.orientation === 'heterosexual')
				return "gender IN ('male') AND orientation IN ('heterosexual', 'bisexual)')";
			else if (user.orientation === 'homosexual')
				return "gender IN ('female') AND orientation IN ('homosexual', 'bisexual)')";
			else if (user.orientation === 'bisexual')
				return "gender IN ('male', 'female', 'other') AND orientation IN ('homosexual', 'bisexual)')";
    }
    return ({genre: "", orientation: ""});
}


module.exports =
{
	match_order: match_order,

	match_sex: match_sex,
}
