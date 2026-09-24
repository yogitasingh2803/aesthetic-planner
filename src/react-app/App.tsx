import { useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  time: string;
  done: boolean;
};

function App() {
  const [activePage, setActivePage] = useState("Today");
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Review chemistry notes", time: "9:00 AM", done: true },
    { id: 2, title: "Finish planner design", time: "11:30 AM", done: false },
    { id: 3, title: "Read for 30 minutes", time: "5:00 PM", done: false },
  ]);

  const navigation = [
    "Today",
    "Calendar",
    "Tasks",
    "Habits",
    "Goals",
    "Study",
    "Notes",
    "Journal",
  ];

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        time: "Anytime",
        done: false,
      },
    ]);

    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.done).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h1>muse</h1>
            <span>your little life planner</span>
          </div>
        </div>

        <button className="new-button" onClick={() => setActivePage("Tasks")}>
          <span>＋</span> New task
        </button>

        <nav>
          <p className="nav-label">PLAN</p>

          {navigation.map((item) => (
            <button
              key={item}
              className={`nav-item ${activePage === item ? "active" : ""}`}
              onClick={() => setActivePage(item)}
            >
              <span className="nav-icon">
                {item === "Today" && "☀"}
                {item === "Calendar" && "□"}
                {item === "Tasks" && "✓"}
                {item === "Habits" && "♡"}
                {item === "Goals" && "◎"}
                {item === "Study" && "✎"}
                {item === "Notes" && "▤"}
                {item === "Journal" && "☾"}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="quote">
            <span>“</span>
            <p>Small steps still move you forward.</p>
          </div>

          <div className="profile">
            <div className="avatar">Y</div>
            <div>
              <strong>Your space</strong>
              <small>Personal planner</small>
            </div>
            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">WEDNESDAY · SEPTEMBER 24</p>
            <h2>
              Good evening, <em>you.</em>
            </h2>
            <p className="subtitle">
              Let's make today feel a little more intentional.
            </p>
          </div>

          <div className="top-actions">
            <button>⌕</button>
            <button>♡</button>
            <button>⚙</button>
          </div>
        </header>

        <section className="hero">
          <div>
            <span className="hero-tag">TODAY'S FOCUS</span>
            <h3>Make space for what matters.</h3>
            <p>
              You don't have to do everything today. Just take the next step.
            </p>
          </div>

          <div className="progress-circle">
            <strong>{Math.round((completedTasks / tasks.length) * 100)}%</strong>
            <span>done</span>
          </div>
        </section>

        <div className="content-grid">
          <section className="card tasks-card">
            <div className="card-heading">
              <div>
                <span className="section-kicker">MY DAY</span>
                <h3>Today's tasks</h3>
              </div>
              <span className="count">{completedTasks}/{tasks.length}</span>
            </div>

            <div className="task-input">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                }}
                placeholder="Add something to your day..."
              />
              <button onClick={addTask}>＋</button>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <div
                  className={`task ${task.done ? "completed" : ""}`}
                  key={task.id}
                >
                  <button
                    className="check"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.done ? "✓" : ""}
                  </button>

                  <div className="task-info">
                    <strong>{task.title}</strong>
                    <span>{task.time}</span>
                  </div>

                  <button className="dots">•••</button>
                </div>
              ))}
            </div>
          </section>

          <section className="card habits-card">
            <div className="card-heading">
              <div>
                <span className="section-kicker">ROUTINE</span>
                <h3>Little habits</h3>
              </div>
              <span className="sparkle">✦</span>
            </div>

            <div className="habit">
              <span className="habit-icon">💧</span>
              <div>
                <strong>Drink water</strong>
                <small>6 / 8 glasses</small>
              </div>
              <div className="habit-progress">
                <i style={{ width: "75%" }} />
              </div>
            </div>

            <div className="habit">
              <span className="habit-icon">📖</span>
              <div>
                <strong>Read</strong>
                <small>20 / 30 min</small>
              </div>
              <div className="habit-progress">
                <i style={{ width: "66%" }} />
              </div>
            </div>

            <div className="habit">
              <span className="habit-icon">🌿</span>
              <div>
                <strong>Mindful moment</strong>
                <small>Completed</small>
              </div>
              <div className="habit-check">✓</div>
            </div>
          </section>

          <section className="card goals-card">
            <div className="card-heading">
              <div>
                <span className="section-kicker">DREAM BIG</span>
                <h3>Current goals</h3>
              </div>
              <button className="text-button">View all →</button>
            </div>

            <div className="goal">
              <div className="goal-top">
                <strong>Study consistently</strong>
                <span>72%</span>
              </div>
              <div className="goal-bar">
                <i style={{ width: "72%" }} />
              </div>
            </div>

            <div className="goal">
              <div className="goal-top">
                <strong>Build my dream planner</strong>
                <span>38%</span>
              </div>
              <div className="goal-bar">
                <i style={{ width: "38%" }} />
              </div>
            </div>

            <div className="goal">
              <div className="goal-top">
                <strong>Read 12 books</strong>
                <span>50%</span>
              </div>
              <div className="goal-bar">
                <i style={{ width: "50%" }} />
              </div>
            </div>
          </section>

          <section className="card upcoming-card">
            <div className="card-heading">
              <div>
                <span className="section-kicker">UP NEXT</span>
                <h3>Upcoming</h3>
              </div>
              <span className="calendar-icon">▦</span>
            </div>

            <div className="event">
              <div className="event-date">
                <strong>25</strong>
                <span>SEP</span>
              </div>
              <div>
                <strong>Math revision</strong>
                <small>Tomorrow · 4:00 PM</small>
              </div>
            </div>

            <div className="event">
              <div className="event-date">
                <strong>27</strong>
                <span>SEP</span>
              </div>
              <div>
                <strong>Finish assignment</strong>
                <small>Saturday · 11:00 AM</small>
              </div>
            </div>
          </section>
        </div>

        <footer>
          <span>made for slow mornings & big dreams</span>
          <span>✦</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
