# reactd3sunburst

> React component for sunburst chart implementation using D3

[![NPM](https://img.shields.io/npm/v/reactd3sunburst.svg)](https://www.npmjs.com/package/reactd3sunburst) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactd3sunburst
```

## Usage

```jsx
import React, { Component } from 'react'

import Sunburst from 'reactd3sunburst'

class App extends Component {
  render () {
    const jsonData = getDataAsJson()

    return (
      <Sunburst data={jsonData}/>
    )
  }
}
```

## License

MIT © [roeezolantz](https://github.com/roeezolantz)

## License

This project is a fork of @vkbansal's sunburst chart
