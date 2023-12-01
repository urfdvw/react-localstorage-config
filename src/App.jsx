import "./App.css";
import { useConfig, ConfigForms } from "react-user-config";
import DarkTheme from "react-lazy-dark-theme";
// import json schema of configurations
import global_config_schema from "./schemas/global.json";
import editor_config_schema from "./schemas/editor.json";

function App() {
    const schemas = [global_config_schema, editor_config_schema];
    const { config, set_config, ready } = useConfig(schemas);

    // If initialization not done, don't continue.
    if (!ready) {
        return;
    }

    // Checking the configurations
    console.log(config);

    // using the configurations
    var dark = null;
    if (config.global.theme === "light") {
        dark = false;
    } else if (config.global.theme === "dark") {
        dark = true;
    }

    return (
        <>
            <DarkTheme dark={dark} />
            {/* The Component used for setting the configurations */}
            <ConfigForms schemas={schemas} config={config} set_config={set_config} />
        </>
    );
}

export default App;
