import PropTypes from 'prop-types'


function Foods({foods, handleClick}) {
  return (
    <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-blue-50'>
        {foods.map((food) => (
            <div key={food.id} onClick={() => handleClick(food.id)}>
              <img src={food.image} alt="" className='rounded-md w-[300px] h-[300px] object-cover'/>
              <div>{food.name}</div>
              <div className='text-blue-50/50'>{food.price}</div>
            </div>
        ))}
    </div>
  )
}

Foods.propTypes = {
  foods: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};
Foods.defaultProps = {
	foods: [],
}


export default Foods