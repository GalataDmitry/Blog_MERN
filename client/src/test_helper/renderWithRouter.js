import store from "../../toolkit/store/store"
import {Provider} from "react-redux"
import {MemoryRouter} from "react-router-dom"

export const renderWithRouter = (component, initialRoute = "/") => {
  return (
      <Provider store={store}>
          <MemoryRouter initialEntries={[initialRoute]}>
            {component}
          </MemoryRouter>
      </Provider>
  )
}
