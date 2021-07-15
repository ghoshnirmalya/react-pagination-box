# reactjs-pagination-component

> A pagination component built using React.js

## Install

```bash
npm install --save reactjs-pagination-component
```

## Usage

```jsx
import React, { Component } from "react";

import MyComponent from "reactjs-pagination-component";

class Example extends Component {
  render() {
    return (
      <ReactPaginationComponent
        color="#333"
        isLoading={isLoading}
        onChange={handleChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );
  }
}
```

## License

MIT © [ghoshnirmalya](https://github.com/ghoshnirmalya)
