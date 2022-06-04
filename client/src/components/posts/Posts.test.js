import {screen, render} from "@testing-library/react"
import '@testing-library/jest-dom'
import {renderWithRouter} from "../../test_helper/renderWithRouter"
import Posts from "./Posts"

describe('test posts component', () => {

    let fetchMock
    let posts = [{
        name: 'Hello',
        title: 'World',
        post: 'Lorem Ipsum'
    }]

    beforeEach(() => {
        fetchMock = jest.spyOn(global, 'fetch')
            .mockResolvedValue({
                json: () => Promise.resolve(posts)
            })
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('test post name', async () => {
        render(renderWithRouter(<Posts/>, '/'))
        const postName = await screen.findByTestId('post-name')
        expect(postName).toHaveTextContent('Hello')
        const postName_1 = await screen.findByText(/hello/i)
        expect(postName_1).toBeInTheDocument()
    })
    test('test post title', async () => {
        render(renderWithRouter(<Posts/>, '/'))
        const postTitle = await screen.findByTestId('post-title')
        expect(postTitle).toHaveTextContent('World')
        const postTitle_1 = await screen.findByText(/world/i)
        expect(postTitle_1).toBeInTheDocument()
    })
    test('test post text', async () => {
        render(renderWithRouter(<Posts/>, '/'))
        const postText = await screen.findByTestId('post-text')
        expect(postText).toHaveTextContent(/lorem/i)
        const postText_1 = await screen.findByText(/lorem/i)
        expect(postText_1).toBeInTheDocument()
    })
})
