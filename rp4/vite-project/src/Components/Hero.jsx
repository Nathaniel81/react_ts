import PropTypes from 'prop-types'

function Hero( {food} ) {
  return (
	<div>
		<img src={food.image}  className='w-full h-screen object-cover'/>
	</div>
  )
}

Hero.propTypes = {
	food: PropTypes.array.isRequired,
}
Hero.defaultProps = {
	food: [],
}


export default Hero