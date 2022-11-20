# Routes in NextJS

## Creating a new Route

To create a new Route, first create a new file called "api" in ./src/pages

In ./api create a ts file with the name of route

In this file, create a route like a node

```ts
// ./src/pages/api/hello.ts
  export default function handler(req, res) {
    return res.json({message: 'hello'})
  }
```

To acess this route use [text](https://localhost:3000/api/hello)

This code will work on Server-Side, then, we can acess the DB, Secret Keys, ...

For make Typing of req and res, utilize The next

```ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({message: 'hello'})
}

```
