import {screen, render} from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import {renderWithRouter} from "../../test_helper/renderWithRouter"
import NewPost from "./NewPost"

describe('test new post component', () => {
    let name, title, post
    let checkInput

    beforeEach(() => {
        name = 'name'
        title = ''
        post = ''
    })
    test('test component title', () => {
        render(renderWithRouter(<NewPost/>, '/new_post'))
        const title = screen.getByText(/Create your post/i)
        expect(title).toBeInTheDocument()
        screen.debug()
    })
    test('test name input', async () => {
        render(renderWithRouter(<NewPost/>, '/new_post'))
        const nameInput = screen.getByTestId('name-input')
        expect(nameInput).toBeInTheDocument()
        // userEvent.type(nameInput, 'hello')
        // expect(nameInput.value).toHaveFormValues('hello')
    })
    test('test title input', () => {
        render(renderWithRouter(<NewPost/>, '/new_post'))
        const titleInput = screen.getByTestId('title-input')
        expect(titleInput).toBeInTheDocument()
    })
    test('test text area', () => {
        render(renderWithRouter(<NewPost/>, '/new_post'))
        const textArea = screen.getByTestId('text-area')
        expect(textArea).toBeInTheDocument()
    })
    test('test send button', () => {
        render(renderWithRouter(<NewPost/>, '/new_post'))
        const sendButton = screen.getByTestId('send-button')
        expect(sendButton).toBeInTheDocument()
        expect(screen.queryByTestId('post-container')).toBeVisible()
    })
})