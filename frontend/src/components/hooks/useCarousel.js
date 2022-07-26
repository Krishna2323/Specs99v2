import React, { useEffect, useState } from "react";

const useCarousel = (elementsData) => {
  const {
    carouselClass,
    carouselActiveClass,
    dotClass,
    dotActiveClass,
    tarnsformationType = "none",
  } = elementsData;
  const carousels = document.querySelectorAll(`.${carouselClass}`);

  const [current, setCurrent] = useState(0);

  const handlePlusClick = () => {
    if (current === carousels.length - 1) {
      setCurrent((current) => 0 + 0);
    } else {
      setCurrent((current) => Number(current) + 1);
    }
  };

  const handlePrevClick = () => {
    if (current <= 0) {
      setCurrent((current) => carousels.length - 1);
    } else {
      setCurrent((current) => current - 1);
    }
  };

  const handleDotClick = (e) => {
    setCurrent((ehhh) => Number(e.target.dataset.num));
  };

  useEffect(() => {
    carousels.forEach((el, i) => {
      if (+el.dataset.num === +current) {
        if (tarnsformationType === "slider") {
          el.style.transform = `translateX(${
            (i - current) * 100
          }%) scale(1.05)`;
        }
        el.classList.add(carouselActiveClass);
      } else {
        if (tarnsformationType === "slider") {
          el.style.transform = `translateX(${(i - current) * 100}%) scale(.95)`;
        }
        el.classList.remove(carouselActiveClass);
      }
    });

    let timer;
    const moveCarousel = () => {
      timer = setTimeout(() => {
        if (current === carousels.length - 1) {
          setCurrent((current) => 0);
        } else if (current <= 0) {
          setCurrent(current + 1);
        }
        if (current === 1) {
          setCurrent((current) => current + 1);
        }
      }, 4000);
    };
    moveCarousel();

    const dots = document.querySelectorAll(`.${dotClass}`);

    dots.forEach((el) => {
      if (parseInt(el.dataset.num) === current) {
        el.classList.add(dotActiveClass);
      } else {
        el.classList.remove(dotActiveClass);
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, [current, carousels, dotActiveClass, dotClass, carouselActiveClass]);

  return {
    handlePlusClick,
    handlePrevClick,
    handleDotClick,
  };
};

export default useCarousel;
