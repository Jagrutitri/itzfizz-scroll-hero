"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "200+", label: "Projects showcased" },
  { value: "5", label: "Core service categories" },
];

const services = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    description: "Build for performance",
    href: "https://itzfizz.com/web-development/",
  },
  {
    number: "02",
    title: "UI/UX DESIGN",
    description: "Design better experiences",
    href: "https://itzfizz.com/design",
  },
  {
    number: "03",
    title: "SOCIAL MEDIA",
    description: "Create connections",
    href: "https://itzfizz.com/social-media-marketing/",
  },
  {
    number: "04",
    title: "BRANDING",
    description: "Stand out with purpose",
    href: "https://itzfizz.com/branding/",
  },
  {
    number: "05",
    title: "SEO",
    description: "Get discovered",
    href: "https://itzfizz.com/seo",
  },
];

function CarIllustration() {
  return (
    <svg
      viewBox="0 0 240 100"
      className="car-svg"
      role="img"
      aria-label="Illustration of a car moving along a road"
    >
      <defs>
        <linearGradient id="carPaint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#aab5b2" />
        </linearGradient>
      </defs>

      <path
        d="M25 61 L39 48 L70 42 L94 19 Q100 13 113 13 L157 17 Q169 19 180 36 L203 46 L219 58 Q225 63 221 72 L19 72 Q14 66 25 61 Z"
        fill="url(#carPaint)"
        stroke="#ffffff"
        strokeWidth="1.5"
      />

      <path
        d="M84 40 L104 20 Q108 17 117 18 L137 20 L144 40 Z"
        fill="#182c31"
      />

      <path
        d="M149 21 L157 22 Q166 24 175 40 L149 40 Z"
        fill="#182c31"
      />

      <path d="M32 56 L52 51 L47 61 L25 64 Z" fill="#c5ff73" />
      <path d="M190 52 L207 57 L210 62 L192 60 Z" fill="#ff4f43" />
      <path d="M19 72 L221 72 L213 81 L31 81 Z" fill="#53605f" />

      <circle cx="58" cy="75" r="19" fill="#111816" />
      <circle cx="58" cy="75" r="10" fill="#89958e" />
      <circle cx="58" cy="75" r="4" fill="#202825" />

      <circle cx="184" cy="75" r="19" fill="#111816" />
      <circle cx="184" cy="75" r="10" fill="#89958e" />
      <circle cx="184" cy="75" r="4" fill="#202825" />
    </svg>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const car = carRef.current;

    if (!hero || !car) return;

    const ctx = gsap.context(() => {
      // Intro animation for the opening headline and content.
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 16,
          duration: 0.5,
        })
        .from(
          ".hero-letter",
          {
            opacity: 0,
            y: 24,
            stagger: 0.035,
            duration: 0.5,
          },
          "-=0.1"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
          },
          "-=0.15"
        )
        .from(
          ".stat-card",
          {
            opacity: 0,
            y: 18,
            stagger: 0.15,
            duration: 0.5,
          },
          "-=0.1"
        );

      // Pin the hero and connect the animation to scrolling.
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline
        .to(
          car,
          {
            x: () => {
              const road = hero.querySelector(".road");

              if (!road) return 0;

              return Math.max(
                0,
                road.clientWidth - car.getBoundingClientRect().width - 12
              );
            },
            ease: "none",
          },
          0
        )
        .to(
          ".road-progress",
          {
            scaleX: 1,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-accent",
          {
            scaleX: 1,
            ease: "none",
          },
          0
        )
        .fromTo(
          ".road-message-letter",
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.035,
            ease: "none",
          },
          0.15
        );

      // Reveal service rows when the next section enters view.
      gsap.from(".service-item", {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="hero">
        <header className="hero-top">
          <a className="brand-mark" href="https://itzfizz.com/">
            itzfizz<span>.</span>
          </a>

          <p className="hero-eyebrow">
            DIGITAL STRATEGY · DESIGN · DEVELOPMENT
          </p>

          <h1 className="hero-title" aria-label="Welcome ITZ FIZZ">
            {"WELCOME ITZ FIZZ".split("").map((letter, index) => (
              <span
                className="hero-letter"
                key={index}
                aria-hidden="true"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <div className="hero-accent" />

          <p className="hero-description">
            We help brands grow through thoughtful design, powerful websites
            and digital marketing that connects.
          </p>

          <a className="hero-cta" href="https://itzfizz.com/contact/">
            LET&apos;S BUILD SOMETHING <span>↗</span>
          </a>
        </header>

        <div className="road-scene">
          <p className="road-label">SCROLL TO EXPLORE ↓</p>

          <div className="road">
            <div className="road-progress" />

            <div
              className="road-message"
              aria-label="We make digital matter"
            >
              {"WE MAKE DIGITAL MATTER".split("").map((letter, index) => (
                <span
                  className="road-message-letter"
                  key={index}
                  aria-hidden="true"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            <div className="road-dashes" aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => (
                <span key={index} />
              ))}
            </div>

            <div ref={carRef} className="car">
              <CarIllustration />
            </div>
          </div>

          <div className="road-caption">
            <span>CREATIVE MOMENTUM</span>
            <span>IDEAS INTO IMPACT ↗</span>
          </div>
        </div>

        <div className="stats">
          {stats.map((stat, index) => (
            <article className="stat-card" key={stat.label}>
              <span className="stat-index">
                0{index + 1} / ITZFIZZ
              </span>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </article>
          ))}
        </div>

        <footer className="hero-footer">
          <span>DIGITAL EXPERIENCES WITH PURPOSE</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </footer>
      </section>

      <section className="services-section">
        <p className="hero-eyebrow">WHAT WE DO</p>

        <h2 className="services-heading">
          One partner. Multiple ways to grow.
        </h2>

        <p className="services-intro">
          From search visibility to memorable brand experiences, explore the
          services that help businesses move forward.
        </p>

        <div className="services-list">
          {services.map((service) => (
            <a
              className="service-item"
              key={service.number}
              href={service.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>

        <a
          className="services-cta"
          href="https://itzfizz.com/"
          target="_blank"
          rel="noreferrer"
        >
          EXPLORE ITZFIZZ ↗
        </a>
      </section>
    </>
  );
}