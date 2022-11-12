import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImage, getMusic } from "../../utils";

import "./index.scss";

gsap.registerPlugin(ScrollTrigger);

const carData = [
  {
    id: 1,
    name: "Destiny 2: Season of the Splicer",
    platform: "PlayStation 5 - Xbox Series X/S - PlayStation 4 - Xbox One - PC",
    month: "MAY",
    day: "03",
    role: "destiny-role.png",
    background: "destiny-card.png",
    music: "sading.mp3",
  },
  {
    id: 2,
    name: "Assassin's Creed Valhalla: Wrath of the Druids DLC",
    platform: "PlayStation 5 - Xbox Series X/S - PlayStation 4 - Xbox One - PC",
    month: "MAY",
    day: "13",
    role: "reskident_role.png",
    background: "resident-card.png",
    music: "pig.mp3",
  },
  {
    id: 3,
    name: "Resident Evil Village",
    platform: "PlayStation 5 - Xbox Series X/S - PlayStation 4 - Xbox One - PC",
    month: "MAY",
    day: "07",
    role: "rassassins-role.png",
    background: "assassins-card.png",
    music: "gun.mp3",
  },
];

const Card = ({ data }) => {
  const el = useRef();
  const audioEl = useRef();

  const q = gsap.utils.selector(el);

  console.log(getImage(data.background));

  const [isScrollT, setIsScrollT] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cardScrollTrigger = {
    trigger: () => q(".card-bg"),
    start: "top top",
    end: "120% top",
    scrub: true,
  };

  useEffect(() => {
    gsap.fromTo(
      q(".card"),
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.33,
        duration: 2,
        onStart: () => setIsLoading(true),
        onComplete: () => setIsLoading(false),
      }
    );
  }, []);

  useEffect(() => {
    if (isEnter) return;
    const animation1 = gsap.to(q(".card-bg"), {
      rotateX: "45deg",
      skewX: "-25deg",
      transformOrigin: "bottom",
      duration: 1,
      onStart: () => setIsScrollT(true),
      onReverseComplete: () => setIsScrollT(false),
      scrollTrigger: cardScrollTrigger,
    });
    const animation2 = gsap.to(q(".card-role"), {
      x: "-5%",
      scale: 1.2,
      transformOrigin: "bottom",
      duration: 1,
      scrollTrigger: cardScrollTrigger,
    });
    const animation3 = gsap.to(q(".des"), {
      x: "10%",
      y: "30%",
      ease: "ease-in",
      duration: 0.8,
      scrollTrigger: cardScrollTrigger,
    });
    return () => {
      animation1.scrollTrigger.kill();
      animation2.scrollTrigger.kill();
      animation3.scrollTrigger.kill();
    };
  }, [isEnter]);

  useEffect(() => {
    const animation1 = gsap.to(q(".btn"), {
      y: -100,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: () => q(".card-bg"),
        start: "35% top",
        end: "bootom center",
        scrub: true,
      },
    });
    const animation2 = gsap.fromTo(
      q(".time"),
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: () => q(".card-bg"),
          start: "top center",
          end: "bootom center",
        },
      }
    );
    return () => {
      animation1.scrollTrigger.kill();
      animation2.scrollTrigger.kill();
    };
  }, []);

  const onEnter = () => {
    if (isScrollT) return;
    if (isLoading) return;
    setIsEnter(true);
    gsap.to(q(".card-bg"), {
      rotateX: "45deg",
      skewX: "-25deg",
      transformOrigin: "bottom",
      duration: 1,
      onStart: () => setIsEnter(true),
    });
    gsap.to(q(".card-role"), {
      x: "-5%",
      scale: 1.2,
      transformOrigin: "bottom",
      duration: 1,
    });
    gsap.to(q(".des"), { x: "10%", y: "30%", ease: "ease-in", duration: 0.8 });
  };

  const onLeaver = () => {
    if (isScrollT) return;
    if (isLoading) return;
    setIsEnter(true);
    gsap.to(q(".card-bg"), {
      rotateX: "0",
      skewX: "0",
      transformOrigin: "bottom",
      duration: 1,
      onComplete: () => setIsEnter(false),
    });
    gsap.to(q(".card-role"), { x: 0, scale: 1, duration: 1 });
    gsap.to(q(".des"), { x: "0", y: "0", duration: 0.8 });
  };

  const pllayMusic = () => {
    audioEl.current.play();
  };

  return (
    <div className="section" ref={el}>
      <div
        className="card"
        data-text={getImage(data.background)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeaver}
        onClick={pllayMusic}
      >
        <div
          className="card-shadow"
          style={{
            background: `${getImage(data.background)}) no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="card-role"
          style={{
            background: `${getImage(data.role)} no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="card-bg"
          style={{
            background: `${getImage(data.role)} no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="time">
          <h1>{data.day}</h1>
          <span>{data.month}</span>
        </div>
        <div className="des">
          <h3>{data.name}</h3>
          <p>{data.platform}</p>
        </div>
        <div className="btn">
          <a href="">
            <h3>More Info</h3>
          </a>
        </div>
      </div>
      <audio src={getMusic(data.music)} ref={audioEl}></audio>
    </div>
  );
};

const Cars = () => {
  return (
    <>
      {carData.map((item) => (
        <Card data={item} key={item.id} />
      ))}
    </>
  );
};

export default Cars;
