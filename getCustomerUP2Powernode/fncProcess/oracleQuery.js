module.exports = 	`
							select 
								 flex_value_id
								,flex_value
								,description
							from 
								FND_FLEX_VALUES_VL 
							where 
								flex_value_set_id = 1016294 
							order by 
								flex_value_id desc 
						`
