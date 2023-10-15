import './App.css'
import {Outlet} from "react-router-dom";
import NavigationButton from "./components/NavigationButton.tsx";

function App(): JSX.Element {

  return (
      <div className="flex flex-col h-screen bg-zinc-600">
          <main className="grow bg-neutral-200 p-4 overflow-y-auto">
              <Outlet />
          </main>
          <nav className="h-min flex place-content-evenly py-3 bg-black">
              <NavigationButton icon={'list'} label={'Records'} navigation_link_props={{to: "/"}} />
              <NavigationButton icon={'person'} label={'Students'} navigation_link_props={{to: "/students"}} />
              <NavigationButton icon={'groups'} label={'Teams'} navigation_link_props={{to: "/teams"}} />
              <NavigationButton icon={'settings'} label={'Settings'} navigation_link_props={{to: "/settings"}} />
          </nav>
      </div>
  )
}

export default App
