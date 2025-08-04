import "./styles.css";

import StaticForm from "./StaticForm";
import { getData } from "./utils";

export default function App() {
  return (
    <div className="App" style={{ backgroundColor: "grey" }}>
      <h1>Static Renderer</h1>
      <StaticForm object={getData()} />
    </div>
  );
}
