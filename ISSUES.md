# Issues

1. I found unused code in the frontend/src/components/Dashboard.tsx. It was not really deadcode but the interval that had no clean. Internal/SetTimeout should be clear after unused.

2. User Profile Page is loading data none stop crashing the users browser.

3. Fix duplicated key issue in the live activity feed page. Fix was to recreate the id using original id plus a incremental no. not optimal but only needed in test environment like this.