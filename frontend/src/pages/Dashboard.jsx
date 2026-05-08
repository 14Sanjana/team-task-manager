import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [title, setTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const token = localStorage.getItem('token');

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  useEffect(() => {

    fetchProjects();
    fetchTasks();
    fetchUsers();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/projects',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/tasks',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/users',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');

  };

  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        'http://localhost:5000/api/projects',
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Project Created');

      setName('');
      setDescription('');

      fetchProjects();

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        'Project creation failed'
      );

    }
  };

  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title,
          description: taskDescription,
          dueDate,
          assignedTo: parseInt(assignedTo),
          projectId: parseInt(projectId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Task Created');

      setTitle('');
      setTaskDescription('');
      setDueDate('');
      setAssignedTo('');
      setProjectId('');

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === 'DONE'
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== 'DONE'
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) < new Date() &&
      task.status !== 'DONE'
  ).length;

  return (

    <div
      style={{
        background: '#020617',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial',
        color: 'white'
      }}
    >

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
          }}
        >

          <div>

            <h1
              style={{
                color: '#38bdf8',
                fontSize: '48px',
                marginBottom: '10px'
              }}
            >
              Team Task Manager
            </h1>

            <p
              style={{
                color: '#94a3b8',
                fontSize: '18px'
              }}
            >
              Welcome back,
              {' '}
              <strong>
                {user?.name}
              </strong>
            </p>

          </div>

          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '12px 22px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >

          <StatCard
            title="Projects"
            value={projects.length}
          />

          <StatCard
            title="Tasks"
            value={tasks.length}
          />

          <StatCard
            title="Completed"
            value={completedTasks}
          />

          <StatCard
            title="Pending"
            value={pendingTasks}
          />

          <StatCard
            title="Overdue"
            value={overdueTasks}
          />

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px'
          }}
        >

          <div
            style={sectionStyle}
          >

            <h2 style={headingStyle}>
              Create Project
            </h2>

            <form onSubmit={handleCreateProject}>

              <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                style={inputStyle}
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
                style={{
                  ...inputStyle,
                  minHeight: '100px'
                }}
              />

              <button
                type="submit"
                style={buttonStyle}
              >
                Create Project
              </button>

            </form>

            <hr
              style={{
                margin: '35px 0',
                borderColor: '#1e293b'
              }}
            />

            <h2 style={headingStyle}>
              Create Task
            </h2>

            <form onSubmit={handleCreateTask}>

              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
                style={inputStyle}
              />

              <textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
                required
                style={{
                  ...inputStyle,
                  minHeight: '100px'
                }}
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                required
                style={inputStyle}
              />

              <select
                value={assignedTo}
                onChange={(e) =>
                  setAssignedTo(e.target.value)
                }
                required
                style={inputStyle}
              >

                <option value="">
                  Select User
                </option>

                {
                  users.map((user) => (

                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>

                  ))
                }

              </select>

              <select
                value={projectId}
                onChange={(e) =>
                  setProjectId(e.target.value)
                }
                required
                style={inputStyle}
              >

                <option value="">
                  Select Project
                </option>

                {
                  projects.map((project) => (

                    <option
                      key={project.id}
                      value={project.id}
                    >
                      {project.name}
                    </option>

                  ))
                }

              </select>

              <button
                type="submit"
                style={buttonStyle}
              >
                Create Task
              </button>

            </form>

          </div>

          <div>

            <h2
              style={{
                color: '#38bdf8',
                marginBottom: '20px',
                fontSize: '30px'
              }}
            >
              Tasks
            </h2>

            {
              tasks.map((task) => (

                <div
                  key={task.id}
                  style={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    padding: '22px',
                    borderRadius: '16px',
                    marginBottom: '20px'
                  }}
                >

                  <h3
                    style={{
                      marginBottom: '10px',
                      fontSize: '24px'
                    }}
                  >
                    {task.title}
                  </h3>

                  <p
                    style={{
                      color: '#cbd5e1',
                      marginBottom: '15px'
                    }}
                  >
                    {task.description}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    {' '}

                    <span
                      style={{
                        color:
                          task.status === 'DONE'
                            ? '#22c55e'
                            : task.status === 'IN_PROGRESS'
                            ? '#f59e0b'
                            : '#94a3b8',
                        fontWeight: 'bold'
                      }}
                    >
                      {task.status}
                    </span>
                  </p>

                  <p>
                    <strong>Due:</strong>
                    {' '}
                    {
                      new Date(task.dueDate)
                        .toLocaleDateString()
                    }
                  </p>

                  {
                    new Date(task.dueDate) < new Date() &&
                    task.status !== 'DONE' && (

                      <p
                        style={{
                          color: '#ef4444',
                          fontWeight: 'bold'
                        }}
                      >
                        OVERDUE TASK
                      </p>
                    )
                  }

                  <p>
                    <strong>Project:</strong>
                    {' '}
                    {task.project?.name}
                  </p>

                  <p>
                    <strong>Assigned:</strong>
                    {' '}
                    {task.assignee?.name}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '18px',
                      flexWrap: 'wrap'
                    }}
                  >

                    <button
                      onClick={() =>
                        updateStatus(
                          task.id,
                          'TODO'
                        )
                      }
                      style={smallButton}
                    >
                      TODO
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task.id,
                          'IN_PROGRESS'
                        )
                      }
                      style={smallButton}
                    >
                      IN PROGRESS
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task.id,
                          'DONE'
                        )
                      }
                      style={smallButton}
                    >
                      DONE
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({ title, value }) {

  return (

    <div
      style={{
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '18px',
        padding: '30px',
        textAlign: 'center'
      }}
    >

      <h3
        style={{
          color: '#94a3b8',
          marginBottom: '15px'
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: '#38bdf8',
          fontSize: '42px'
        }}
      >
        {value}
      </h1>

    </div>
  );
}

const sectionStyle = {
  background: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '18px',
  padding: '30px'
};

const headingStyle = {
  color: '#38bdf8',
  marginBottom: '20px',
  fontSize: '28px'
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '16px',
  borderRadius: '10px',
  border: '1px solid #334155',
  background: '#020617',
  color: 'white',
  fontSize: '15px'
};

const buttonStyle = {
  width: '100%',
  background: '#38bdf8',
  color: '#020617',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px'
};

const smallButton = {
  background: '#1e293b',
  color: 'white',
  border: 'none',
  padding: '10px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default Dashboard;