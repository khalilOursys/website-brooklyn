"use client";

import { useEffect, useState } from "react";

export default function Quantity({ setQuantity = (value) => { }, quantity }) {
  const [count, setCount] = useState(quantity);

  /* useEffect(() => {
    setQuantity(count);
  }, [count]); */

  return (
    <div className="wg-quantity">
      <span
        className="btn-quantity minus-btn"
        onClick={() => setQuantity((pre) => (pre == 1 ? 1 : pre - 1))}
      >
        -
      </span>
      <input
        min={1}
        type="text"
        onChange={(e) => setQuantity(e.target.value / 1)}
        name="number"
        value={quantity}
      />
      <span
        className="btn-quantity plus-btn"
        onClick={() => {
          setQuantity((pre) => pre + 1);
        }}
      >
        +
      </span>
    </div>
  );
}
