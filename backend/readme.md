TODO:
[] update `updateAccount` endpoint

[] allow users to be promoted to admin endpoint

[] add information to an assignment endpoint

[] add a way to list out the cases

Expected use case:
Admin logs on [login] -> adds case [addCase]

Admin assigns users to case [getUsers] + [assignCase] (could use assignCases?)

User logs on [login] -> views cases [assignedCases] (can track progress here)

User enters a case [getCase/{hash}], submits case [updateAssignment]

Admin can view the submissions for a case [getAssignments] (with hash = case)

- Admin can resolve the submissions of a case [resolveCase] (hash, userId)
- Admin can conglomorate information to a final information and mark a case complete [resolveCase] (this might delete existing outstanding assignments?)

user should be able to see if a case is complete? [???]
