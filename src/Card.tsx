import { useEffect, useRef, useState } from "react";
import listAdvices from "./assets/advices.json";
import dices from "./assets/icon-dice.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface NumericListAdvices {
  [key: number]: string;
}

const Card = () => {
  const diceRef = useRef<HTMLImageElement>(null);
  const [addClass, setAddClass] = useState(false);
  const [numberAdvice, setNumberAdvice] = useState<number>(2);
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [numericListAdvices, setNumericListAdvices] =
    useState<NumericListAdvices>({});
  useEffect(() => {
    if (diceRef.current) {
      if (addClass) {
        diceRef.current.classList.add("rotate");
      } else {
        diceRef.current.classList.remove("rotate");
      }
    }
  }, [addClass]);

  const changeAdvice = () => {
    const randomNumber = Math.ceil(Math.random() * 77);
    setNumberAdvice(randomNumber);
    setAddClass(true);
    setTimeout(() => {
      setAddClass(false);
    }, 300);
  };
  const copyText = () => {
    if (!isCopying) {
      setIsCopying(true);
      toast.success("Text copied to clipboard.");
      navigator.clipboard.writeText(numericListAdvices[numberAdvice]);
      setShowTooltip(false);
      setTimeout(() => {
        setIsCopying(false);
        setShowTooltip(true);
      }, 5500);
    }
  };
  useEffect(() => {
    const newList = Object.fromEntries(
      Object.entries(listAdvices).map(([key, value]) => [
        parseInt(key, 10),
        value,
      ])
    );
    setNumericListAdvices(newList);
    changeAdvice();
  }, []);
  return (
    <main>
      <h1 className="advice-number">ADVICE #{numberAdvice}</h1>
      <button
        className="advice-text"
        onClick={copyText}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Click to copy!"
      >
        "{numericListAdvices[numberAdvice]}"
      </button>
      <button className="dice-circle flex" onClick={changeAdvice}>
        <img src={dices} className="dice" alt="" ref={diceRef} />
      </button>
      {showTooltip ? (
        <Tooltip
          id="my-tooltip"
          place="bottom"
          style={{
            fontSize: "16px",
          }}
        />
      ) : null}
      <ToastContainer
        toastStyle={{
          fontSize: "16px",
        }}
      />
    </main>
  );
};

export default Card;
