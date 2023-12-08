import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

function Navbar() {
  return (
	<div className="flex justify-between items-center">
		<div className="flex items-center justify-between gap-3">
			<div>
				<IoMdMenu  style={{ fontSize: '24px' }}/>
			</div>
			<div className="text-2xl">Best <span className="font-extrabold">Eats</span></div>
			<button className="bg-slate-800 text-lime-50">Delivery</button>
		</div>

		<div className="flex-1 flex justify-center">
			<input type="text" className="bg-slate-700 rounded-sm p-5 w-[350px] h-5" placeholder="Search..." />
			</div>
		<div>
		<FaShoppingCart />
		</div>
	</div>
  )
}

export default Navbar