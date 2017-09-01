[![npm version](https://badge.fury.io/js/react-fullscreen-crossbrowser.svg)](https://www.npmjs.com/package/node-project-badge)
# react-fullscreen-crossbrowser

A React component that sets its children to full screen using the Fullscreen API, normalized using [fscreen](https://github.com/rafrex/fscreen).

## Disclosure   
This package is a combination of two packages downloaded and converted to typescript   
all credits due:   
https://www.npmjs.com/package/react-full-screen   
https://www.npmjs.com/package/fscreen   


## Usage similar to the original author but will work in typescript too

* Install.
```bash
yarn add react-fullscreen-crossbrowser
```

* Require component.
```js
import Fullscreen from 'react-full-screen';
```

* Setup and render.
```jsx
import React, { Component } from "react";
import Fullscreen from 'react-fullscreen-crossbrowser';

class App extends Component {
  constructor(props) {
    this.state = {
      isFullscreenEnabled: false,
    };
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({isFullscreenEnabled: true})}>
          Go Fullscreen
        </button>

        <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}
        >
          <div className='full-screenable-node>
            Hi! This may cover the entire monitor.
          </div>
        </Fullscreen>
      </div>
    );
  }
}

export default App;
```

or typescript:
```tsx
import * as React from 'react';
import FullScreen from 'react-fullscreen-crossbrowser';


export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFullscreenEnabled: false,
    };
  }

  render() {
    return (
        <div>
          <button onClick={() => this.setState({isFullscreenEnabled: true})}>
            Go Fullscreen
          </button>
          <FullScreen
            enabled={this.state.isFullscreenEnabled}
            onChange={(isFullscreenEnabled: any) => this.setState({isFullscreenEnabled})}
          >
            <div className='full-screenable-node'>
              Hi! This may cover the entire monitor.
            </div>
          </FullScreen>
        </div>
    );
  }
}

```




The reason for keeping track of the current state outside of the component is that the user can choose to leave full screen mode without the action of your application. This is a safety feature of the Fullscreen API. In order to enter full screen again, the `enabled` prop needs to be flipped.
