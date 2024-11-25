import { Component } from "react";

class TaskForm extends Component {
  render() {
    const { title, category, dueDate, handleChange, addTask } = this.props;

    return (
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Titre de la tâche"
          value={title}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={category}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="personnel">Personnel</option>
          <option value="travail">Travail</option>
          <option value="option3">Option 3</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
          required
        />
        <button onClick={addTask} style={{ marginLeft: "10px", padding :"5px" }}>
          <i className="fas fa-plus"></i> Ajouter
        </button>
      </div>
    );
  }
}

class TaskFilter extends Component {
  render() {
    const { filterCategory, handleFilterChange, tasks } = this.props;

    const categories = Array.from(new Set(tasks.map(task => task.category)));

    return (
      <>
        {tasks.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <strong>Filtrer par catégorie : </strong>
            <select value={filterCategory} onChange={handleFilterChange}>
              <option value="toutes">Toutes</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </>
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newTitle: this.props.task.title,
      newCategory: this.props.task.category,
      newDueDate: this.props.task.dueDate,
    };
  }

  handleEditToggle = () => {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  handleTitleChange = (e) => {
    this.setState({ newTitle: e.target.value });
  };

  handleCategoryChange = (e) => {
    this.setState({ newCategory: e.target.value });
  };

  handleDueDateChange = (e) => {
    this.setState({ newDueDate: e.target.value });
  };

  handleSave = () => {
    const { task, updateTask } = this.props;
    const { newTitle, newCategory, newDueDate } = this.state;
    updateTask(task.id, newTitle, newCategory, newDueDate);
    this.handleEditToggle();
  };

  render() {
    const { task, deleteTask } = this.props;
    const { isEditing, newTitle, newCategory, newDueDate } = this.state;

    return (
      <div className="task">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={this.handleTitleChange}
              placeholder="Titre de la tâche"
            />
            <select value={newCategory} onChange={this.handleCategoryChange}>
              <option value="personnel">Personnel</option>
              <option value="travail">Travail</option>
              <option value="option3">Option 3</option>
            </select>
            <input
              type="date"
              value={newDueDate}
              onChange={this.handleDueDateChange}
            />
            <button onClick={this.handleSave} style={{ marginLeft: "10px" }}>
              Enregistrer
            </button>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>Catégorie : {task.category}</p>
            <p>Échéance : {task.dueDate}</p>
            <button onClick={this.handleEditToggle} className="modify" style={{ marginRight: "10px" }}>
              Modifier
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete">
              <i className="fas fa-trash"></i> Supprimer
            </button>
          </>
        )}
      </div>
    );
  }
}

class TaskList extends Component {
  render() {
    const { tasks, deleteTask, updateTask } = this.props;

    return (
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
        ))}
      </div>
    );
  }
}

class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      title: "",
      category: "personnel",
      dueDate: "",
      filterCategory: "toutes",
    };
  }

  addTask = () => {
    const { title, category, dueDate } = this.state;

    if (!title || !dueDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      category,
      dueDate,
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      title: "",
      category: "personnel",
      dueDate: "",
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFilterChange = (e) => {
    this.setState({ filterCategory: e.target.value });
  };

  updateTask = (id, newTitle, newCategory, newDueDate) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, category: newCategory, dueDate: newDueDate } : task
      ),
    }));
  };

  render() {
    const { tasks, title, category, dueDate, filterCategory } = this.state;

    const filteredTasks =
      filterCategory === "toutes"
        ? tasks
        : tasks.filter((task) => task.category === filterCategory);

    return (
      <div style={{ padding: "20px" }}>
        <h1>Gestion de Tâches</h1>

        <TaskForm
          title={title}
          category={category}
          dueDate={dueDate}
          handleChange={this.handleChange}
          addTask={this.addTask}
        />

        <TaskFilter
          filterCategory={filterCategory}
          handleFilterChange={this.handleFilterChange}
          tasks={tasks}
        />

        <TaskList tasks={filteredTasks} deleteTask={this.deleteTask} updateTask={this.updateTask} />
      </div>
    );
  }
}

export default TaskManager;
