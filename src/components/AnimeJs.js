import anime from "animejs"; // anime = funtion anime({..}){...}
import React, { Component } from "react";

export default class AnimeJs extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: "0%" };
  }
  componentDidMount() {
    // Target: NodeList
    let nodeListLi1 = document.querySelectorAll(".nodelist li");
    anime({
      targets: nodeListLi1,
      translateX: "350px",
      rotate: "1turn", // '360deg'
      scale: "0.75",
      backgroundColor: "#fff",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
      loop: 4,
      direction: "alternate", // set animation back
      endDelay: 300,
      update: () => {
        // console.log("animasi nodelist di update.."); // update() di eksekusi secara terus menerus
      },
    });

    // Target: Javascript Object
    const loadEl = document.querySelector(".loader-info");
    let load = this.state;
    anime({
      targets: load,
      loading: "100%", // properti : diisi nilai akhir
      easing: "linear",
      round: 1,
      duration: 3000,
      update: () => {
        // react hanya akan merender ulang komponent ketika terjadi pemanggilan setState()
        this.setState(load);
      },
    });

    // Target : Array / multiple element animation
    anime({
      targets: [".title", ".paragraph"],
      translateX: 180,
      delay: 100,
    });

    // properties DOM Attribute
    anime({
      targets: ".subscribers-input",
      value: [0, 1000000],
      round: 1,
      duration: 1500,
      easing: "easeInOutQuad",
    });

    // Spesific Property Parameters
    anime({
      targets: ".block1",
      direction: "alternate",
      translateX: {
        value: 350,
        duration: 800,
      },
      rotate: {
        value: "2turn",
        duration: 800,
        easing: "easeInOutSine",
        delay: 800,
      },
      scale: {
        value: 2,
        duration: 800,
        easing: "easeInOutQuart",
        delay: 1600,
      },
    });

    // Function Based Parameters
    anime({
      targets: ".kotak-a",
      translateX: 270,
      direction: "alternate",
      loop: true,
      delay: function (elementTarget, targetIndex, targetsLength) {
        return targetIndex * 100;
      },
      easing: "spring",
      endDelay: -500,
    });

    anime({
      targets: ".load-box",
      width: "100%",
      easing: "linear",
      duration: 3000,
    });

    // Function Based Value
    anime({
      targets: ".kotak-random div",
      translateX: (elementTarget, targetIndex, targetsLength) => {
        return elementTarget.getAttribute("data-distance");
      },
      translateY: (elementTarget, targetIndex, targetsLength) => {
        return 50 + -50 * targetIndex;
      },
      scale: (elementTarget, targetIndex, targetsLength) => {
        return targetsLength - targetIndex + 0.25;
      },
      rotate: () => {
        return anime.random(-360, 360); // generate random number
      },
      borderRadius: () => {
        return ["50%", anime.random(10, 35) + "%"];
      },
      duration: () => {
        return anime.random(1200, 1800);
      },
      delay: () => {
        return anime.random(0, 400);
      },
      direction: "alternate",
      loop: true,
      opacity: [0.7, 1],
    });

    // Animation Keyframes
    anime({
      targets: ".kotak-bergerak",
      duration: 4000,
      keyframes: [
        { translateX: 250 },
        { translateY: -250 },
        { translateX: 0 },
        { translateY: 0 },
      ],
      easing: "easeOutElastic(1, .8)",
      loop: true,
    });

    // Property Keyframes
    anime({
      targets: ".kotak-keyframes",
      translateX: [
        { value: 250, duration: 1000, delay: 500 }, // 500ms -> anime(1000ms)
        { value: 0, duration: 1000, delay: 500 }, // 500ms -> anime(100ms)
      ],
      translateY: [
        { value: 50, duration: 500, delay: 1000 },
        { value: 0, duration: 500, delay: 1000 },
      ],
    });

    // Animate on Scroll
    const divCobaStagger = document.querySelector(".coba-stagger");
    let ulHaveBeenAnimated = false;
    window.addEventListener("scroll", () => {
      const { scrollTop, clientHeight } = document.documentElement;
      const topElementToTopViewport =
        divCobaStagger.getBoundingClientRect().top;

      if (!ulHaveBeenAnimated) {
        if (
          (scrollTop + (topElementToTopViewport - 500)).toFixed() < scrollTop
        ) {
          // console.log("element tercapai");
          // Stagger / Staggering
          anime({
            targets: ".coba-stagger li",
            translateX: 270,
            delay: anime.stagger(100, { start: 100 }),
            direction: "alternate",
          });

          ulHaveBeenAnimated = true;
        }
      } else {
        if (
          (scrollTop + (topElementToTopViewport - 500)).toFixed() > scrollTop
        ) {
          ulHaveBeenAnimated = false;
          // console.log("ulhavebeenanimated set to false");
        }
      }
    });

    // Timeline
    // Prinsip timeline mirip inheritance
    // Untuk membuat animasi yang berjalan secara berurutan, animasi dieksekusi berurutan, jika animasi sebelumnya belum selesai, maka animasi berikutnya tidak akan dieksekusi
    // Create a timeline with default parameters
    // Animasi2 di dalam timeline tersinkronasi menjadi 1 besar
    // Time offset : manipulasi waktu jeda antar animasi
    const myTimeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 750,
      direction: "alternate",
      loop: true,
      delay: anime.stagger(100),
    });
    // Add children
    myTimeline.add({
      targets: ".kotak-timeline",
      translateX: 250,
      easing: "spring",
    });
    myTimeline.add(
      {
        targets: ".kotak2-timeline",
        translateX: 250,
      },
      "-=400" // relative to previous animation
    );
    myTimeline.add(
      {
        targets: ".kotak3-timeline",
        translateX: 250,
        // rotate: "1turn",
      },
      100 // relative to whole time animation
    );

    // Controls
    const animation = anime({
      targets: ".coba-controls div",
      translateX: 270,
      delay: function (el, i) {
        return i * 100;
      },
      direction: "alternate",
      loop: true,
      autoplay: false,
      easing: "easeInOutSine",
    });

    const buttonPlay = document.querySelector(".button-play");
    const buttonPause = document.querySelector(".button-pause");
    const buttonRestart = document.querySelector(".button-restart");
    const buttonReverse = document.querySelector(".button-reverse");

    buttonPlay.addEventListener("click", function () {
      animation.play();
    });
    buttonPause.addEventListener("click", function () {
      animation.pause();
    });
    buttonRestart.addEventListener("click", function () {
      animation.restart();
    });
    buttonReverse.addEventListener("click", function () {
      animation.reverse();
    });

    const animation2 = anime({
      targets: ".coba-seek div",
      translateX: 270,
      delay: function (el, i) {
        return i * 100;
      },
      elasticity: 200,
      easing: "easeInOutSine",
      direction: "alternate",
      autoplay: false,
    });

    const inputSeek = document.querySelector("#input-seek");
    // set default value
    inputSeek.value = 0;
    inputSeek.addEventListener("input", function () {
      animation2.seek((inputSeek.value / 100) * animation.duration);
    });
  }
  render() {
    return (
      <div className="mb-[1000px]">
        {/* css / node */}
        <div className="bg-slate-100 h-80 p-6">
          <h3 className="text-xl font-semibold">NodeList</h3>
          <ul className="nodelist">
            <li className="my-3 w-8 h-8 bg-pink-500 text-white">*</li>
            <li className="my-3 w-8 h-8 bg-pink-500 text-white">*</li>
            <li className="my-3 w-8 h-8 bg-pink-500 text-white">*</li>
            <li className="my-3 w-8 h-8 bg-pink-500 text-white">*</li>
          </ul>
        </div>
        {/* javascript */}
        <div className="javascript bg-slate-50 p-6">
          <h3 className="text-xl font-semibold mb-5">Javascript Animation</h3>
          <div className="loader h-10 w-32 flex mx-auto rounded-lg bg-blue-400">
            <span className="loader-info block m-auto font-medium">
              Loading {this.state.loading}
            </span>
          </div>
        </div>
        {/* multiple element animation */}
        <div className=" bg-slate-50 p-6">
          <h3 className="text-xl font-semibold mb-5">
            Multiple Element Animation
          </h3>
          <div className=" mx-auto">
            <h1 className="title text-xl text-slate-700 font-semibold px-3 py-2 rounded-sm bg-slate-100 mb-3">
              Title
            </h1>
            <p className="paragraph text-lg w-1/2 text-slate-500 mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              modi architecto animi maiores, quidem labore? Possimus ut
              necessitatibus velit tenetur.
            </p>
            <div className="w-56 mx-auto mt-8">
              <fieldset>
                <label
                  htmlFor="subscribers"
                  className="text-base font-medium text-slate-600"
                >
                  Subscribers Number
                </label>
                <input
                  type="text"
                  name="subscribers"
                  className="subscribers-input my-2 border-slate-700 border rounded-lg text-center text-lg"
                />
              </fieldset>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="block1 w-12 h-12 bg-pink-400 mb-5"></div>
          <div className="">
            <div className="kotak-a w-6 h-6 my-2 bg-slate-700"></div>
            <div className="kotak-a w-6 h-6 my-2 bg-slate-700"></div>
            <div className="kotak-a w-6 h-6 my-2 bg-slate-700"></div>
          </div>
          <div className="p-6">
            <div className="load-box h-2 w-3 bg-blue-500"></div>
          </div>
        </div>
        {/* Function based values */}
        <div className="p-6 bg-slate-100 kotak-random">
          <div
            data-distance="200px"
            className="w-5 h-5 rounded-full bg-green-500 my-2"
          ></div>
          <div
            data-distance="300px"
            className="w-5 h-5 rounded-full bg-green-500 my-2"
          ></div>
          <div
            data-distance="400px"
            className="w-5 h-5 rounded-full bg-green-500 my-2"
          ></div>
        </div>
        {/* Keyframes */}
        <div className="p-6">
          <div className="w-1/2 mx-auto bg-slate-200 p-6">
            <div className="kotak-bergerak w-6 h-6 rounded-xl bg-pink-500"></div>
          </div>
          <div className="w-1/2 mx-auto bg-slate-100 p-6">
            <div className="kotak-keyframes w-6 h-6 rounded-xl bg-green-500"></div>
          </div>
          <div className="w-1/2 mx-auto bg-slate-50 p-6">
            <h1 className="text-center text-xl font-medium">
              Animate This Element on Scroll
            </h1>
            <ul className="coba-stagger">
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
              <li className="w-5 h-5 bg-slate-600 rounded-md my-2"></li>
            </ul>
          </div>
        </div>
        {/* Timeline */}
        <div className="p-6 bg-slate-100">
          <div className="w-1/2 mx-auto">
            <div className="kotak-timeline w-8 h-8 my-2 bg-blue-200"></div>
            <div className="kotak2-timeline w-8 h-8 my-2 bg-blue-400"></div>
            <div className="kotak3-timeline w-8 h-8 my-2 bg-blue-600"></div>
          </div>
        </div>
        {/* Controls */}
        <div className="p-6">
          <div className="w-1/2 mx-auto coba-controls">
            <div className="w-8 h-8 my-2 bg-pink-200"></div>
            <div className=" w-8 h-8 my-2 bg-pink-400"></div>
            <div className=" w-8 h-8 my-2 bg-pink-600"></div>
          </div>
          <div className="flex justify-center my-3">
            <button className="button-play px-4 py-2 bg-green-300 rounded-lg mx-2 font-medium">
              Play
            </button>
            <button className="button-pause px-4 py-2 bg-yellow-300 rounded-lg mx-2 font-medium">
              Pause
            </button>
            <button className="button-restart px-4 py-2 bg-blue-300 rounded-lg mx-2 font-medium">
              Restart
            </button>
            <button className="button-reverse px-4 py-2 bg-pink-300 rounded-lg mx-2 font-medium">
              Reverse
            </button>
          </div>
          <div className="mt-8 p-6">
            <div className="w-1/2 mx-auto coba-seek">
              <div className="w-8 h-8 my-2 bg-green-200"></div>
              <div className=" w-8 h-8 my-2 bg-green-400"></div>
              <div className=" w-8 h-8 my-2 bg-green-600"></div>
            </div>
            <div className="flex justify-center">
              <input type="range" id="input-seek" className="bg-blue-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
