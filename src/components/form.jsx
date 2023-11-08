import React, { useEffect, useState } from "react";
import arrowIcon from "../assets/icon-arrow.svg";
import AnimatedNumber from "react-animated-numbers";

const inputClassname =
  "input input-bordered input-lg w-28 sm:w-36 text-black text-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

function isValidDate(dateString) {
  const [year, month, day] = dateString.split("-");

  const parsedYear = parseInt(year, 10);
  const parsedMonth = parseInt(month, 10) - 1;
  const parsedDay = parseInt(day, 10);

  const inputDate = new Date(parsedYear, parsedMonth, parsedDay);
  const currentDate = new Date();

  return (
    inputDate.getFullYear() === parsedYear &&
    inputDate.getMonth() === parsedMonth &&
    inputDate.getDate() === parsedDay &&
    inputDate <= currentDate
  );
}

const AnimatedNumberComp = ({ num }) => {
  return (
    <AnimatedNumber
      animateToNumber={num}
      locale="en-US"
      configs={[
        { mass: 1, tension: 220, friction: 100 },
        { mass: 1, tension: 180, friction: 130 },
        { mass: 1, tension: 280, friction: 90 },
        { mass: 1, tension: 180, friction: 135 },
        { mass: 1, tension: 260, friction: 100 },
        { mass: 1, tension: 210, friction: 180 },
      ]}
    ></AnimatedNumber>
  );
};

const Form = () => {
  const [values, setValues] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [age, setAge] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [error, setError] = useState({
    day: "",
    month: "",
    year: "",
  });

  const handleComputeAge = () => {
    if (!values.day) {
      setError((prev) => {
        return { ...prev, day: "This field is required" };
      });
    }
    if (!values.month) {
      setError((prev) => {
        return { ...prev, month: "This field is required" };
      });
    }
    if (!values.year) {
      setError((prev) => {
        return { ...prev, year: "This field is required" };
      });
    }

    if (!Object.values(error).some((i) => i.length > 0)) {
      const currentDate = new Date();
      const birthDate = new Date(
        `${values.year}-${values.month}-${values.day}`
      );
      const dateString = `${values.year}-${values.month}-${values.day}`;

      if (!isValidDate(dateString)) {
        setError((prev) => {
          return { ...prev, day: "Must be a valid date" };
        });
      } else {
        let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        let ageMonths = currentDate.getMonth() - birthDate.getMonth();
        let ageDays = currentDate.getDate() - birthDate.getDate();

        if (ageDays < 0) {
          ageMonths--;
          ageDays += new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          ).getDate();
        }

        if (ageMonths < 0) {
          ageYears--;
          ageMonths += 12;
        }

        setAge({
          day: ageDays,
          month: ageMonths,
          year: ageYears,
        });
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    if (values.day) {
      setError((prev) => {
        return { ...prev, day: "" };
      });
    }
    if (values.month) {
      setError((prev) => {
        return { ...prev, month: "" };
      });
    }
    if (values.year) {
      setError((prev) => {
        return { ...prev, year: "" };
      });
    }

    if (Number(values.day) > 31) {
      setError((prev) => {
        return { ...prev, day: "Must be a valid day" };
      });
    }
    if (Number(values.month) > 12) {
      setError((prev) => {
        return { ...prev, month: "Must be a valid month" };
      });
    }
    if (Number(values.year) > currentDate.getFullYear()) {
      setError((prev) => {
        return { ...prev, year: "Must be in the past" };
      });
    }
  }, [values.day, values.month, values.year]);

  return (
    <div className="w-full sm:w-auto p-8 bg-white rounded-2xl rounded-br-[120px] shadow-xl text-[#716f6f] text-sm">
      <div className="flex gap-4">
        <div className="form-control">
          <label className="label">
            <span
              className={`tracking-widest ${error.day && "text-[#ff5757]"}`}
            >
              DAY
            </span>
          </label>
          <input
            type="number"
            value={values.day}
            placeholder="DD"
            className={`${inputClassname} ${error.day && "input-error"}`}
            onChange={(e) => setValues({ ...values, day: e.target.value })}
          />
          <label className="label">
            <span className="text-[#ff5757] text-xs italic">{error.day}</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span
              className={`tracking-widest ${error.month && "text-[#ff5757]"}`}
            >
              MONTH
            </span>
          </label>
          <input
            type="number"
            value={values.month}
            placeholder="MM"
            className={`${inputClassname} ${error.month && "input-error"}`}
            onChange={(e) => setValues({ ...values, month: e.target.value })}
          />
          <label className="label">
            <span className="text-[#ff5757] text-xs italic">{error.month}</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span
              className={`tracking-widest ${error.year && "text-[#ff5757]"}`}
            >
              YEAR
            </span>
          </label>
          <input
            type="number"
            value={values.year}
            placeholder="YYYY"
            className={`${inputClassname} ${error.year && "input-error"}`}
            onChange={(e) => setValues({ ...values, year: e.target.value })}
          />
          <label className="label">
            <span className="text-[#ff5757] text-xs italic">{error.year}</span>
          </label>
        </div>
      </div>
      <div className="flex relative items-center my-8 sm:my-4">
        <div className="w-full sm:w-[520px] h-[2px] bg-[#716f6f]/20"></div>
        <button
          onClick={handleComputeAge}
          className="hidden sm:flex btn btn-circle btn-primary w-20 h-20 bg-[#854dff] rounded-full items-center justify-center hover:bg-black"
        >
          <img src={arrowIcon} alt="icon" className="w-8 h-8" />
        </button>
        <div className="flex w-full justify-center sm:hidden absolute">
          <button
            onClick={handleComputeAge}
            className="btn btn-circle btn-primary w-14 h-14 bg-[#854dff] rounded-full flex items-center justify-center hover:bg-black"
          >
            <img src={arrowIcon} alt="icon" className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-6xl sm:text-7xl italic font-bold text-[#141414]">
        <h1 className="flex gap-4">
          <div className="text-[#854dff]">
            {" "}
            {age.year ? <AnimatedNumberComp num={age.year} /> : "--"}
          </div>
          years
        </h1>
        <h1 className="flex gap-4">
          <div className="text-[#854dff]">
            {" "}
            {age.month ? <AnimatedNumberComp num={age.month} /> : "--"}
          </div>{" "}
          months
        </h1>
        <h1 className="flex gap-4">
          <div className="text-[#854dff]">
            {" "}
            {age.day ? <AnimatedNumberComp num={age.day} /> : "--"}
          </div>{" "}
          days
        </h1>
      </div>
    </div>
  );
};

export default Form;
