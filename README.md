# Course README

## Objective
The objective of this course is for students to develop an online store using React and Next.js for the frontend, and ASP.NET Core for the REST API.

## How to debug 
###  React front-end application
For this part, we will use the `debugger` statement to instruct the browser where it should pause execution. Then, we will use the browser's controls to navigate through different flows of the React code.

For the React part, we will utilize the following components and hooks:
- Components
```jsx
import React from 'react';

const ExampleComponent = () => {
  return (
    <div>
      <h1>This is an example component</h1>
      <p>It demonstrates the basic structure of a React component.</p>
    </div>
  );
};

export default ExampleComponent;
```
- The use of prompts.
```jsx
import React from 'react';

const PromptComponent = () => {
  const handleClick = () => {
    const userInput = prompt('Enter your name:');
    alert(`Hello, ${userInput}!`);
  };

  return (
    <div>
      <button onClick={handleClick}>Prompt</button>
    </div>
  );
};

export default PromptComponent;

```
- useState Hook:Tthe useState hook for managing component state.
```jsx
import React, { useState } from 'react';

const StateExample = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default StateExample;
```
- useEffect: The useEffect hook for handling side effects.
```jsx
import React, { useState, useEffect } from 'react';

const EffectExample = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default EffectExample;
```

###  ASP core REST API
For this part, we will configure the Visual Studio Code Debugger to set a breakpoint and examine the code execution on the backend.
The steps to debug an ASP.NET Web project are as follows:
1. Create the `launch.json` file. To do this, go to the "Run and Debug" option and click on "Create launch.json file".
2. Select C#.
3. Click on "Add Configuration".
4. Look for the option ".NET: Launch Executable file (Web)".
5. Finally, fix the URL and the name of the DLL.

#### Additional Resources
You can also refer to this helpful video tutorial for further guidance: [Debugging ASP.NET Web Projects](https://youtu.be/vyjWkqiEwHc)


## Code reviews and Feedback
[Code review - React useEffec, ASP Core  and feedback](https://youtu.be/V4lnIGXlRFs)


