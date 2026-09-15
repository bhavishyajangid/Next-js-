********************** Client Component vs Server Component **********************


in the next js 13, there are two types of components: Client Components and Server Components.

1. Server Component (Default in Next.js)

In Next.js App Router (app/ folder), every component is a Server Component by default.

Example:

export default function Home() {
  return <h1>Hello</h1>;
}

This runs on the server.

How Server Component Works

Flow:

Browser request page
        ↓
Next.js server runs component
        ↓
Creates HTML
        ↓
HTML sent to browser
        ↓
Browser shows page

So yes, your understanding is mostly correct:

"Page loads on server and browser receives ready HTML"

Correct ✅

What Happens Internally

Suppose:

export default function Page() {
  return <h1>Welcome</h1>;
}

Server creates:

<h1>Welcome</h1>

and sends it to browser.

Browser directly displays it.

No heavy JavaScript needed.

Why Server Components Exist

Main reason:

Faster Performance

Because browser receives ready-made HTML.

Benefits:

Faster page load
Better SEO
Less JavaScript bundle
Better security
Can directly access database/API securely
Where We Use Server Components

Use Server Components when:

✅ Fetching data
✅ Calling database
✅ SEO pages
✅ Blog pages
✅ Product pages
✅ Dashboard data fetching
✅ Static content

Example:

async function getUsers() {
  const res = await fetch("https://api.com/users");
  return res.json();
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

This fetch happens on server.

API key remains hidden ✅

Limitations of Server Components

You CANNOT use:

useState
useEffect
Click events
Browser APIs
window
document

❌ Example:

export default function Page() {
  const [count, setCount] = useState(0);

  return <button>{count}</button>;
}

This gives error because useState needs browser interaction.

2. Client Component

To make component client-side:

"use client";

export default function Counter() {
  return <button>Click</button>;
}

"use client" tells Next.js:

"This component should run in browser"

How Client Component Works

Flow:

Server sends page + JavaScript
        ↓
Browser downloads JS
        ↓
React hydrates page
        ↓
Component becomes interactive
What is Hydration?

Hydration means:

React attaches functionality/events to HTML in browser.

Example:

Server sends:

<button>0</button>

After hydration:

<button onClick={...}>0</button>

Now button works.

Why Client Components Exist

Because browser interaction needs JavaScript.

Use Client Components for:

✅ useState
✅ useEffect
✅ Forms
✅ Click handlers
✅ Animations
✅ Browser APIs
✅ LocalStorage
✅ Interactive UI

Example
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

This works in browser.

Important Confusion

You asked:

"Client component run on both server and client?"

YES — partially.

This confuses many developers.

Actual Behavior of Client Component

Client Components are:

1. First rendered on server (for initial HTML)

AND

2. Then hydrated and fully run in browser

So:

Initial HTML → server
Interactivity → browser

That is why people say:

"Client Components run on both server and client"

But actual interactive logic runs in browser.

Simple Real Example
Server Component
export default function Page() {
  return <h1>Products</h1>;
}

Server sends ready HTML.

No interactivity.

Client Component
"use client";

export default function Search() {
  return <input />;
}

Browser needs JS for typing/events/state.

Best Practice

In Next.js:

✅ Keep most components as Server Components
✅ Use Client Components only where interaction needed

Because Client Components increase JavaScript bundle size.

Real Project Structure

Example:

// Server Component
export default async function Page() {
  const products = await getProducts();

  return (
    <div>
      <ProductList products={products} />
      <SearchBar />
    </div>
  );
}

SearchBar:

"use client";

because search needs interaction.

Easy Comparison Table
Feature	Server Component	Client Component
Runs on server	✅	Initial render only
Runs in browser	❌	✅
useState/useEffect	❌	✅
Event handlers	❌	✅
Faster	✅	Slower
SEO	Excellent	Good
Bundle size	Small	Larger
DB/API access	✅	❌ unsafe
Interactivity	❌	✅
Very Important Interview Line

You can say:

Server Components are used for rendering UI and fetching data on the server to improve performance and SEO, while Client Components are used for interactive UI features like state, effects, and event handling inside the browser.

One More Important Thing

Client Components can be imported inside Server Components.

Example:

import Counter from "./Counter";

export default function Page() {
  return (
    <div>
      <h1>Hello</h1>
      <Counter />
    </div>
  );
}

But Server Components CANNOT be imported into Client Components directly in the normal way.

Rule to Remember
Need interaction?
   YES → Client Component

No interaction?
   YES → Server Component
Final Mental Model
Server Component:
Backend-like rendering

Client Component:
Browser interactive rendering

Think like this:

Server Component = HTML generator
Client Component = Interactive JavaScript UI