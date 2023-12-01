# React User Config

Utilities for setting and using user configurations.

## Install

```
npm i react-user-config
```

## How to use

Prerequisite: a list of json schema files for user configurations that:

-   all fields have default values.
-   has a title in the top level

Configuration json schema example:

```json
{
    "title": "Editor",
    "description": "Code editor settings.",
    "type": "object",
    "properties": {
        "font": {
            "title": "Text font size",
            "type": "number",
            "default": 14
        }
    }
}
```

Code example:

```js
import { useConfig, ConfigForms } from "react-user-config";
import schema from "./schema.json"; // import json schema of configurations

function App() {
    const schemas = [schema];
    const { config, set_config, ready } = useConfig(schemas);

    // If initialization not done, don't continue.
    if (!ready) {
        return;
    }

    // Checking the configurations
    console.log(config);

    return (
        <>
            {/* The Component used for setting the configurations */}
            <ConfigForms schemas={schemas} config={config} set_config={set_config} />
        </>
    );
}
```
- `useConfig`: hook dealing with configuration storying, changing and reading logic.
    - `config`: the configuration object.
    - `ready`: when this indicator is true, the initialization steps are done.
        - before that, the `config` is either `{}` or not reflecting the saved configurations.
    - `set_config`: 
        - set part of the configuration by a specific schema name and an configuration json object of that schema.
        - this function is supposed to be used only in `ConfigForms` component.
- `ConfigForms`: component for configuration viewing and changing.
    - `schemas`: list of json schemas.
        - each schema is one section of the configuration, which is shown as a tab in the UI.
    - `config`: the configuration object from `useConfig` hook.
    - `set_config`: the configuration setting function from `useConfig` hook.

## Demo

https://urfdvw.github.io/react-user-config/

*In this demo `react-lazy-dark-theme` is used for changing the page theme.*

## Planned features

- Save/Load config to local file handle.
- Import/Export config as file.