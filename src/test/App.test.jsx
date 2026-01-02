import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Todo App', () => {
  test('adds a todo', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Test Todo' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

  test('does not add empty todo', () => {
    render(<App />)
    const addButton = screen.getByText('Add')

    fireEvent.click(addButton)

    expect(screen.getByText('No todos found')).toBeInTheDocument()
  })

  test('deletes a todo', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Delete Me' } })
    fireEvent.click(addButton)

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument()
  })

  test('edits a todo', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Edit Me' } })
    fireEvent.click(addButton)

    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)

    fireEvent.change(input, { target: { value: 'Edited Todo' } })
    fireEvent.click(screen.getByText('Update'))

    expect(screen.getByText('Edited Todo')).toBeInTheDocument()
    expect(screen.queryByText('Edit Me')).not.toBeInTheDocument()
  })

  test('filters todos', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Apple' } })
    fireEvent.click(addButton)
    fireEvent.change(input, { target: { value: 'Banana' } })
    fireEvent.click(addButton)

    const searchInput = screen.getByPlaceholderText('Search todos...')
    fireEvent.change(searchInput, { target: { value: 'App' } })

    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Banana')).not.toBeInTheDocument()
  })
})