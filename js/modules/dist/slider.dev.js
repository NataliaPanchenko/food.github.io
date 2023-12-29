"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function slider(_ref) {
  var container = _ref.container,
      slide = _ref.slide,
      nextArrow = _ref.nextArrow,
      prevArrow = _ref.prevArrow,
      totalCounter = _ref.totalCounter,
      currentCounter = _ref.currentCounter,
      wrapper = _ref.wrapper,
      field = _ref.field;
  // Slider
  var slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      prev = document.querySelector(prevArrow),
      next = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      width = window.getComputedStyle(slidesWrapper).width,
      slidesField = document.querySelector(field);
  var slideIndex = 1,
      offset = 0;

  if (slides.length < 10) {
    total.textContent = "0".concat(slides.length);
    current.textContent = "0".concat(slideIndex);
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach(function (slide) {
    slide.style.width = width;
  });
  slider.style.position = "relative";
  var indicators = document.createElement("ol"),
      dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = "\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 15;\n        display: flex;\n        justify-content: center;\n        margin-right: 15%;\n        margin-left: 15%;\n        list-style: none;\n    ";
  slider.append(indicators);

  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = "\n            box-sizing: content-box;\n            flex: 0 1 auto;\n            width: 30px;\n            height: 6px;\n            margin-right: 3px;\n            margin-left: 3px;\n            cursor: pointer;\n            background-color: #fff;\n            background-clip: padding-box;\n            border-top: 10px solid transparent;\n            border-bottom: 10px solid transparent;\n            opacity: .5;\n            transition: opacity .6s ease;\n        ";

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", function () {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = "0".concat(slideIndex);
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(function (dot) {
      return dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });
  prev.addEventListener("click", function () {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = "0".concat(slideIndex);
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(function (dot) {
      return dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });
  dots.forEach(function (dot) {
    dot.addEventListener("click", function (e) {
      var slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = "translateX(-".concat(offset, "px)");

      if (slides.length < 10) {
        current.textContent = "0".concat(slideIndex);
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(function (dot) {
        return dot.style.opacity = ".5";
      });
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

var _default = slider;
exports["default"] = _default;