import "./styles.css";
import DynamicForm from "./components/DynamicForm";
// import StaticForm from "./StaticForm";
import { getData } from "./utils";

export default function App() {
  return (
    <div className="App" style={{ backgroundColor: "grey" }}>
      <h1>Dynamic Renderer</h1>
      {/* <StaticForm object={getData()} /> */}
      <DynamicForm object={getData()} />
    </div>
  );
}
