# Issues

1. I found unused code in the frontend/src/components/Dashboard.tsx. It was not really deadcode but the interval that had no clean. Internal/SetTimeout should be clear after unused.

2. User Profile Page is loading data none stop crashing the users browser.

3. TeamService was was returning a 500 rather than 404 for not found. Standard for API is to return 404. 

4. ActivityService is doing N+1 query. 
I compared the queries before and after. Before it was doing two queries, later It was turned into a query with join.

From

```
    select
        a1_0.id,
        a1_0.action,
        a1_0.timestamp,
        a1_0.user_id 
    from
        activities a1_0
    select
        u1_0.id,
        u1_0.email,
        u1_0.name,
        u1_0.team_id 
    from
        users u1_0 
    where
        u1_0.id=?
```

to
```
    select
        a1_0.id,
        a1_0.action,
        a1_0.timestamp,
        u1_0.id,
        u1_0.email,
        u1_0.name,
        u1_0.team_id 
    from
        activities a1_0 
    left join
        users u1_0 
            on u1_0.id=a1_0.user_id
```

5. mockApi.ts had no HTTP error handling. It would just silently fails, even if I tried doing catch in the component fetching the data it wouldn't go into catch. So, check the response object and check when the response is not ok then I would throw an error.

### Not a real issue but for a clean and easier debugging.
1. Fix duplicated key issue in the live activity feed page. Fix was to recreate the id using original id plus a incremental no. not optimal but only needed in test environment like this.