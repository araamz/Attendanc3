import './App.css'
import {Outlet} from "react-router-dom";
import NavigationButton from "./components/NavigationButton.tsx";

function App(): JSX.Element {

  return (
      <div className="flex flex-col md:flex-row p-5 gap-5">
          <nav className="h-min flex place-content-between md:flex-col md:gap-4">
              <NavigationButton icon={'list'} label={'Records'} to='/' />
              <NavigationButton icon={'person'} label={'Students'} to='/students' />
              <NavigationButton icon={'groups'} label={'Groups'} to='/groups' />
              <NavigationButton icon={'settings'} label={'Settings'} to='/settings' />
          </nav>
          <main className="">
              <Outlet />
          </main>
      </div>
  )
}

export default App
