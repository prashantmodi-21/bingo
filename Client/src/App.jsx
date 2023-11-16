import Login from "./components/login/Login"
import Chat from "./components/chat/Chat"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
    </BrowserRouter>
)
}
export default App
