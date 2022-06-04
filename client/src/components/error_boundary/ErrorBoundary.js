import React from "react"
import ErrorPage from "../error_page/ErrorPage"

class ErrorBoundary extends React.Component {
    state = {isError: false}

    static getDerivedStateFromError(error) {
        return {isError: true}
    }

    componentDidCatch(error, errorInfo) {
    }

    render() {
        if (this.state.isError) {
            return <ErrorPage/>
        }
        return this.props.children
    }
}

export default ErrorBoundary