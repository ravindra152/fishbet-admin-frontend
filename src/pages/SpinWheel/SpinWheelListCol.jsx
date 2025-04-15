const Id = ({ value }) => value ?? '';
const GC = ({ value }) => value ?? '';
const SC = ({ value }) => value ?? '';
const Priority = ({ value }) => value ?? '';
const UserLimit = ({ value }) => value ?? 'N/A';
const IsAllow = ({ value }) => (value ? 'Yes' : 'No');

export { Id, GC, SC, Priority, UserLimit, IsAllow };
