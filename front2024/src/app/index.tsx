import { Routes, Route } from 'react-router-dom'
import useStore from '@src/hooks/use-store'
import useInit from '@src/hooks/use-init'
import Main from './main'
import Article from './article'
import Login from './login'
import Profile from './profile'
import Protected from '@src/containers/protected'
import Modals from '@src/containers/modals'
import Chat from './chat'
import LeafFall from './leaf-fall'
import Drawing from './drawing'
import Admin from './admin'
import { useSelector as useSelectorRedux } from 'react-redux'

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore()
  useInit(async () => {
    await store.actions.session.remind()
  })

  const activeModal = useSelectorRedux((state: any) => state.modals.activeModal)

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/leaf'} element={<LeafFall />} />
        <Route path={'/drawing'} element={<Drawing />} />
        <Route
          path={'/profile'}
          element={
            <Protected redirect="/login">
              <Profile />
            </Protected>
          }
        />
        <Route
          path={'/chat'}
          element={
            <Protected redirect="/login">
              <Chat />
            </Protected>
          }
        />
        <Route
          path={'/admin'}
          element={
            <Protected redirect="/login">
              <Admin />
            </Protected>
          }
        />
      </Routes>

      {activeModal && <Modals />}
    </>
  )
}

export default App
