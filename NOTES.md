### Notes for State Management

## Step 1: Rewrite Handlers
    Rewrite event handlers to dispatch actions rather than update state directly

## Step 2: Write Reducer
    Write a reducer that accepts dispatched actions and current state, then returns updated state based on received action.type

## Step 3: Combine Reducers with Context
    Create context, put reducer in appropriate context, use the context to pass the values anywhere in the app