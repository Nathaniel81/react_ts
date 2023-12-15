import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from "./components/Counter";
import Inc from "./components/Inc";
import Dec from "./components/Dec";
import { increment, decrement } from './counterSlice';

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const incCount = () => {
    dispatch(increment());
  };

  const decCount = () => {
    dispatch(decrement());
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <Counter count={count} />
        <Inc incCount={incCount} />
        <Dec decCount={decCount} />
      </div>
    </>
  );
};

export default App;
