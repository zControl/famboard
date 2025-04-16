export const ActivityLogSummary = () => {
  const placeholderLogs = [
    { id: 1, user: 'John Doe', action: 'Logged in', timestamp: '2023-10-01 10:00 AM' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', timestamp: '2023-10-01 10:15 AM' },
    { id: 3, user: 'John Doe', action: 'Created a post', timestamp: '2023-10-01 10:30 AM' },
    { id: 4, user: 'Jane Smith', action: 'Logged out', timestamp: '2023-10-01 10:45 AM' },
  ];

  return (
    <div>
      <ul>
        {placeholderLogs.map((log) => (
          <li key={log.id}>
            <strong>{log.user}</strong> - {log.action} at {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};