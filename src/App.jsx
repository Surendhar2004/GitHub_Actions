import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)

  const addTodo = () => {
    if (!text.trim()) return
    if (editId) {
      setTodos(todos.map(t => t.id === editId ? { ...t, text } : t))
      setEditId(null)
    } else {
      setTodos([...todos, { id: Date.now(), text }])
    }
    setText('')
  }

  const editTodo = (todo) => {
    setText(todo.text)
    setEditId(todo.id)
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t =>
    t.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <h2>Todo List</h2>
      <div className="input-group">
        <input
          placeholder="Search todos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          placeholder="Add a new todo..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      <ul>
        {filtered.map(todo => (
          <li key={todo.id}>
            <span className="todo-text">{todo.text}</span>
            <div className="actions">
              <button className="secondary" onClick={() => editTodo(todo)}>Edit</button>
              <button className="danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ justifyContent: 'center', color: 'var(--text-secondary)', border: 'none', background: 'transparent' }}>
            No todos found
          </li>
        )}
      </ul>
    </div>
  )
}