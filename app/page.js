
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clock3, CalendarDays, Globe2, Sun, Moon,
  Play, Pause, RotateCcw, Timer, AlarmClock,
  ChevronLeft, ChevronRight, Github
} from "lucide-react";

const pad = (n) => String(n).padStart(2, "0");

const zones = [
  { city: "Bangkok", country: "Thailand", zone: "Asia/Bangkok", flag: "🇹🇭" },
  { city: "Tokyo", country: "Japan", zone: "Asia/Tokyo", flag: "🇯🇵" },
  { city: "London", country: "United Kingdom", zone: "Europe/London", flag: "🇬🇧" },
  { city: "New York", country: "United States", zone: "America/New_York", flag: "🇺🇸" },
];

function getTime(date, zone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date).reduce((obj, part) => {
    obj[part.type] = part.value;
    return obj;
  }, {});
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function AnalogClock({ now }) {
  const t = getTime(now, "Asia/Bangkok");
  const h = Number(t.hour) % 12;
  const m = Number(t.minute);
  const s = Number(t.second);

  return (
    <div className="analog">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="tick"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-88px)`,
          }}
        >
          {i || 12}
        </span>
      ))}
      <div className="hand hour" style={{
        transform: `translateX(-50%) rotate(${h * 30 + m / 2}deg)`
      }} />
      <div className="hand minute" style={{
        transform: `translateX(-50%) rotate(${m * 6}deg)`
      }} />
      <div className="hand second" style={{
        transform: `translateX(-50%) rotate(${s * 6}deg)`
      }} />
      <div className="pin" />
    </div>
  );
}

export default function Home() {
  const [now, setNow] = useState(new Date());

  // Stopwatch
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  // Countdown
  const [timerInput, setTimerInput] = useState("05:00");
  const [timerLeft, setTimerLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  // Calendar
  const [month, setMonth] = useState(new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ));
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((v) => v + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerLeft((v) => {
        if (v <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const t = getTime(now, "Asia/Bangkok");

  const calendar = useMemo(() => {
    const year = month.getFullYear();
    const mon = month.getMonth();
    const first = new Date(year, mon, 1).getDay();
    const count = new Date(year, mon + 1, 0).getDate();

    return [
      ...Array(first).fill(null),
      ...Array.from({ length: count }, (_, i) => i + 1),
    ];
  }, [month]);

  const stopwatchDisplay =
    `${pad(Math.floor(elapsed / 3600))}:` +
    `${pad(Math.floor(elapsed / 60) % 60)}:` +
    `${pad(elapsed % 60)}`;

  const timerDisplay =
    `${pad(Math.floor(timerLeft / 60))}:` +
    `${pad(timerLeft % 60)}`;

  function resetStopwatch() {
    setRunning(false);
    setElapsed(0);
  }

  function setCountdown() {
    const match = timerInput.trim().match(/^(\d{1,3}):([0-5]?\d)$/);
    if (!match) {
      alert("กรุณากรอกเวลาในรูปแบบ MM:SS");
      return;
    }

    const total = Number(match[1]) * 60 + Number(match[2]);
    if (total <= 0) {
      alert("กรุณากำหนดเวลามากกว่า 0");
      return;
    }

    setTimerRunning(false);
    setTimerLeft(total);
  }

  function resetCountdown() {
    setTimerRunning(false);
    setTimerLeft(300);
    setTimerInput("05:00");
  }

  function changeMonth(value) {
    setMonth(new Date(
      month.getFullYear(),
      month.getMonth() + value,
      1
    ));
  }

  return (
    <main className="container">

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#" className="logo">
          <Clock3 size={21} />
          Clock UI
        </a>

        <nav>
          <a href="#widgets">Widgets</a>
          <a href="#tools">Tools</a>
        </nav>

        <div className="nav-right">
          <span className="live-dot" />
          LIVE
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <Github size={16} />
            Give us a Star
          </a>
          <Sun size={19} />
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="eyebrow">
          <span className="live-dot" />
          YOUR PERSONAL TIME SPACE
        </div>

        <h1>
          Make every second <span>count.</span>
        </h1>

        <p>
          A collection of thoughtful time widgets for your everyday workflow.
        </p>

        <a href="#widgets" className="main-button">
          Explore Widgets ↗
        </a>
      </section>

      {/* SECTION TITLE */}
      <div className="section-title" id="widgets">
        <div>
          <small>YOUR DASHBOARD</small>
          <h2>Time at a glance</h2>
        </div>

        <div className="date-label">
          <CalendarDays size={16} />
          {now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* WIDGET GRID */}
      <div className="grid">

        {/* DATE */}
        <Card className="date-card">
          <div className="card-heading">
            <span>TODAY</span>
            <CalendarDays size={18} />
          </div>

          <div className="date-week">
            {now.toLocaleDateString("en-US", { weekday: "short" })}
          </div>

          <div className="date-number">{now.getDate()}</div>

          <p>
            {now.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </Card>

        {/* DIGITAL CLOCK */}
        <Card className="digital-card">
          <div className="card-heading">
            <span>LOCAL TIME · BANGKOK</span>
            <span className="live-badge">● LIVE</span>
          </div>

          <div className="digital-time">
            {t.hour}
            <span>:</span>
            {t.minute}
            <small>:{t.second}</small>
          </div>

          <div className="digital-bottom">
            <span>UTC +07:00</span>
            <span>Asia / Bangkok</span>
          </div>

          <div className="wave">
            {Array.from({ length: 25 }, (_, i) => (
              <i key={i} style={{
                height: `${8 + ((i * 13) % 17)}px`
              }} />
            ))}
          </div>
        </Card>

        {/* ANALOG CLOCK */}
        <Card className="analog-card">
          <div className="card-heading">
            <span>ANALOG CLOCK</span>
            <Clock3 size={18} />
          </div>

          <AnalogClock now={now} />

          <p className="muted-text">A classic way to see time</p>
        </Card>

        {/* WORLD CLOCK */}
        <Card className="world-card">
          <div className="card-heading">
            <span>WORLD CLOCK</span>
            <Globe2 size={18} />
          </div>

          <div className="world-list">
            {zones.map((z) => {
              const time = getTime(now, z.zone);

              return (
                <div className="world-row" key={z.city}>
                  <span className="flag">{z.flag}</span>

                  <div className="city-info">
                    <b>{z.city}</b>
                    <small>{z.country}</small>
                  </div>

                  <div className="city-time">
                    {time.hour}:{time.minute}
                    <small>:{time.second}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* STOPWATCH */}
        <Card className="stopwatch-card">
          <div className="card-heading">
            <span>STOPWATCH</span>
            <Timer size={18} />
          </div>

          <div className="stopwatch-time">
            {stopwatchDisplay}
          </div>

          <div className="progress">
            <span style={{
              width: `${(elapsed % 60) / 60 * 100}%`
            }} />
          </div>

          <div className="controls">
            <button className="round-button" onClick={resetStopwatch}>
              <RotateCcw size={17} />
            </button>

            <button
              className="round-button green"
              onClick={() => setRunning((v) => !v)}
            >
              {running ? <Pause size={17} /> : <Play size={17} />}
            </button>
          </div>

          <p className="muted-text">
            {running ? "Stopwatch is running" : "Ready when you are"}
          </p>
        </Card>

        {/* DAYLIGHT */}
        <Card className="weather-card">
          <div className="card-heading">
            <span>DAYLIGHT</span>
            <Sun size={19} />
          </div>

          <div className="temperature">29<span>°</span></div>
          <h3>Sunny</h3>

          <div className="sun-info">
            <span><Sun size={14} /> Sunrise <b>06:18</b></span>
            <span><Moon size={14} /> Sunset <b>17:48</b></span>
          </div>

          <div className="sun-progress">
            <span />
          </div>

          <p className="muted-text">Daylight overview · Bangkok</p>
        </Card>

        {/* CALENDAR */}
        <Card className="calendar-card">
          <div className="card-heading">
            <span>CALENDAR</span>
            <CalendarDays size={18} />
          </div>

          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>
              <ChevronLeft size={17} />
            </button>

            <b>
              {month.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </b>

            <button onClick={() => changeMonth(1)}>
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span className="weekday" key={i}>{d}</span>
            ))}

            {calendar.map((d, i) => (
              <button
                key={i}
                disabled={!d}
                className={`day ${
                  d === selectedDay ? "selected" : ""
                }`}
                onClick={() => d && setSelectedDay(d)}
              >
                {d || ""}
              </button>
            ))}
          </div>

          <p className="muted-text">
            Selected: {month.toLocaleDateString("en-US", { month: "short" })} {selectedDay}
          </p>
        </Card>

        {/* COUNTDOWN */}
        <Card className="timer-card" id="tools">
          <div className="card-heading">
            <span>COUNTDOWN TIMER</span>
            <AlarmClock size={18} />
          </div>

          <div className="timer-display">
            {timerDisplay}
          </div>

          <div className="timer-input">
            <input
              value={timerInput}
              onChange={(e) => setTimerInput(e.target.value)}
              placeholder="MM:SS"
              aria-label="Countdown minutes and seconds"
            />

            <button onClick={setCountdown}>SET</button>
          </div>

          <div className="controls">
            <button className="round-button" onClick={resetCountdown}>
              <RotateCcw size={17} />
            </button>

            <button
              className="round-button green"
              onClick={() => {
                if (timerLeft === 0) return;
                setTimerRunning((v) => !v);
              }}
            >
              {timerRunning ? <Pause size={17} /> : <Play size={17} />}
            </button>
          </div>

          <p className="muted-text">
            {timerLeft === 0
              ? "Time is up!"
              : timerRunning
              ? "Counting down..."
              : "Set a time and press play"}
          </p>
        </Card>

        {/* QUOTE */}
        <Card className="quote-card">
          <div className="quote-mark">“</div>
          <p>
            The key is in not spending time, but in investing it.
          </p>
          <small>— Stephen R. Covey</small>
          <Clock3 className="quote-icon" size={48} />
        </Card>

      </div>

      {/* FOOTER */}
      <footer>
        <span>© 2026 CLOCK UI</span>
        <span>DESIGNED TO MAKE TIME FEEL GOOD ✳</span>
        <span>BUILT WITH NEXT.JS</span>
      </footer>

    </main>
  );
}
