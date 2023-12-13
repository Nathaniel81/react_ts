import PropTypes from 'prop-types'
function Tasks({ tasks, handleClick }) {
  return (
	<>
		{tasks.map((task, index) => (
		<div key={index} id="list-wrapper" onClick={() => handleClick(task.id)}>
			<div className='task-wrapper flex-wrapper align-items-center px-5'>
				<div style={{flex:7}}>
					{task.completed == false ? (
						<span>
							{task.title}
						</span>
					): (
						<strike>
							{task.title}
						</strike>
					)}
				</div>
				<div style={{flex:1}}>
                    <button className="btn btn-sm btn-outline-info">Edit</button>
                </div>
				<div style={{flex:1}}>
					<button className="btn btn-sm btn-outline-dark delete">-</button>
				</div>
			</div>

		</div>
		))}
	</>
  )
}

Tasks.propTypes = {
	tasks: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
  };
Tasks.defaultProps = {
	tasks: [],
  }

export default Tasks