
"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  CalendarDays,
  Globe2,
  Sun,
  Moon,
  Play,
  Pause,
  RotateCcw,
  Timer,
  AlarmClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TabName = "Dashboard" | "World Clock" | "Stopwatch" | "Timer";

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  return (
    <div className="analog-clock">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="clock-number"
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-125px) rotate(-${i * 30}deg)`,
          }}
        >
          {i === 0 ? 12 : i}
        </span>
      ))}

      <div
        className="hand hour-hand"
        style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
      />
      <div
        className="hand minute-hand"
        style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
      />
      <div
        className="hand second-hand"
        style={{ transform: `translateX(-50%) rotate(${secondAngle}deg)` }}
      />
      <div className="clock-center" />
    </div>
  );
}

function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const firstDay = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const monthName = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="dashboard-content">
      <div className="welcome">
        <div>
          <p className="eyebrow">YOUR PERSONAL TIME SPACE</p>
          <h1>Good day<span>.</span></h1>
          <p className="muted">Make every second count.</p>
        </div>
        <div className="live-badge">
          <span className="live-dot" /> LIVE
        </div>
      </div>

      <div className="top-grid">
        <section className="panel digital-panel">
          <div className="panel-heading">
            <span><Clock3 size={17} /> LOCAL TIME</span>
            <span className="green-label">LIVE CLOCK</span>
          </div>
          <div className="digital-time">
            {hours}:{minutes}<span>:{seconds}</span>
          </div>
          <p className="date-text">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="digital-footer">
            <span><Globe2 size={14} /> Local timezone</span>
            <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </div>
        </section>

        <section className="panel analog-panel">
          <div className="panel-heading">
            <span><Clock3 size={17} /> ANALOG CLOCK</span>
            <span className="green-label">REAL TIME</span>
          </div>
          <AnalogClock />
        </section>
      </div>

      <div className="bottom-grid">
        <section className="panel calendar-panel">
          <div className="panel-heading">
            <span><CalendarDays size={17} /> CALENDAR</span>
            <div className="calendar-controls">
              <button
                aria-label="Previous month"
                onClick={() =>
                  setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
                }
              >
                <ChevronLeft size={17} />
              </button>
              <button
                aria-label="Next month"
                onClick={() =>
                  setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
                }
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <h3>{monthName}</h3>
          <div className="calendar-grid">
            {weekdays.map((day) => (
              <div className="weekday" key={day}>{day}</div>
            ))}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday =
                day === new Date().getDate() &&
                month.getMonth() === new Date().getMonth() &&
                month.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`calendar-day ${isToday ? "today" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel info-panel">
          <div className="panel-heading">
            <span><Sun size={17} /> TIME FACTS</span>
          </div>
          <div className="fact-item">
            <div className="fact-icon"><Sun size={19} /></div>
            <div>
              <strong>Daylight</strong>
              <p>Make the most of today.</p>
            </div>
          </div>
          <div className="fact-item">
            <div className="fact-icon"><Moon size={19} /></div>
            <div>
              <strong>Night mode</strong>
              <p>Designed for comfortable viewing.</p>
            </div>
          </div>
          <div className="quote">
            “The key is in not spending time, but in investing it.”
            <span>— Stephen R. Covey</span>
          </div>
        </section>
      </div>
    </div>
  );
}

function WorldClock() {
  const cities = [
    { name: "Bangkok", zone: "Asia/Bangkok", country: "Thailand" },
    { name: "Tokyo", zone: "Asia/Tokyo", country: "Japan" },
    { name: "London", zone: "Europe/London", country: "United Kingdom" },
    { name: "New York", zone: "America/New_York", country: "United States" },
    { name: "Paris", zone: "Europe/Paris", country: "France" },
  ];

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="panel tool-panel">
      <p className="eyebrow">GLOBAL TIME</p>
      <h2>World Clock<span>.</span></h2>
      <div className="city-list">
        {cities.map((city) => (
          <div className="city-row" key={city.name}>
            <div>
              <strong>{city.name}</strong>
              <p>{city.country}</p>
            </div>
            <div className="city-time">
              {now.toLocaleTimeString("en-GB", {
                timeZone: city.zone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((v) => v + 10), 10);
    return () => clearInterval(interval);
  }, [running]);

  const format = (value: number) => {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    const centiseconds = Math.floor((value % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <section className="panel tool-panel stopwatch-panel">
      <p className="eyebrow">PRECISION TIMER</p>
      <h2>Stopwatch<span>.</span></h2>
      <div className="stopwatch-time">{format(elapsed)}</div>
      <div className="timer-actions">
        <button className="action-button secondary" onClick={() => {
          setRunning(false);
          setElapsed(0);
        }}>
          <RotateCcw size={17} /> Reset
        </button>
        <button className="action-button primary" onClick={() => setRunning(!running)}>
          {running ? <Pause size={17} /> : <Play size={17} />}
          {running ? "Pause" : "Start"}
        </button>
      </div>
    </section>
  );
}

function CountdownTimer() {
  const [inputMinutes, setInputMinutes] = useState("5");
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const format = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (remaining === 0) {
      const value = Math.max(1, Number(inputMinutes) || 1) * 60;
      setRemaining(value);
    }
    setRunning(true);
  };

  return (
    <section className="panel tool-panel stopwatch-panel">
      <p className="eyebrow">COUNTDOWN</p>
      <h2>Timer<span>.</span></h2>
      <div className="stopwatch-time">{format(remaining)}</div>
      <label className="timer-input-label">
        Minutes
        <input
          type="number"
          min="1"
          max="999"
          value={inputMinutes}
          onChange={(event) => {
            setInputMinutes(event.target.value);
            if (!running) {
              setRemaining(Math.max(1, Number(event.target.value) || 1) * 60);
            }
          }}
          disabled={running}
        />
      </label>
      <div className="timer-actions">
        <button className="action-button secondary" onClick={() => {
          setRunning(false);
          setRemaining(Math.max(1, Number(inputMinutes) || 1) * 60);
        }}>
          <RotateCcw size={17} /> Reset
        </button>
        <button className="action-button primary" onClick={() => {
          if (running) setRunning(false);
          else startTimer();
        }}>
          {running ? <Pause size={17} /> : <Play size={17} />}
          {running ? "Pause" : "Start"}
        </button>
      </div>
      {remaining === 0 && <p className="green-label">TIME IS UP!</p>}
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("Dashboard");

  const tabs: { name: TabName; icon: typeof Clock3 }[] = [
    { name: "Dashboard", icon: Clock3 },
    { name: "World Clock", icon: Globe2 },
    { name: "Stopwatch", icon: Timer },
    { name: "Timer", icon: AlarmClock },
  ];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Clock3 size={23} /></div>
          <span>clock<span className="brand-green">.</span></span>
        </div>

        <p className="nav-label">MENU</p>
        <nav>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                className={`nav-item ${activeTab === tab.name ? "active" : ""}`}
                onClick={() => setActiveTab(tab.name)}
              >
                <Icon size={19} />
                {tab.name}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="live-dot" />
            System online
          </div>
          <div className="sidebar-version">CLOCK APP · V1.0</div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span className="breadcrumb">Workspace / <strong>{activeTab}</strong></span>
          <div className="topbar-right">
            <span className="live-dot" />
            <span>All systems normal</span>
          </div>
        </header>

        <div className="page-content">
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "World Clock" && <WorldClock />}
          {activeTab === "Stopwatch" && <Stopwatch />}
          {activeTab === "Timer" && <CountdownTimer />}
        </div>

        <footer className="footer">
          <span>© 2026 CLOCK. All rights reserved.</span>
          <span>DESIGNED FOR EVERY SECOND.</span>
        </footer>
      </div>
    </main>
  );
}
