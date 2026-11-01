
import psutil

process_with_connections = []
process_without_connections = []
process_unknown = []

for proc in psutil.process_iter(['pid', 'name']):

    try:
        net_connections = proc.net_connections(kind='all')

        connections = []

        for conn in net_connections:
            data = {
                "laddr": conn.laddr._asdict() if conn.laddr else None,
                "raddr": conn.raddr._asdict() if conn.raddr else None,
                "status": conn.status,
                "family": str(conn.family),
                "type": str(conn.type)
            }

            connections.append(data)

        process_info = {
            "name": proc.info['name'],
            "pid": proc.info['pid'],
            "info": connections
        }

        if connections:
            process_with_connections.append(process_info)
        else:
            process_without_connections.append(process_info)

    except psutil.AccessDenied:
        process_unknown.append({
            "name": proc.info['name'],
            "pid": proc.info['pid'],
            "reason": "Access denied"
        })

    except psutil.NoSuchProcess:
        continue


print("Processes with connections:", len(process_with_connections))
print("Processes without connections:", len(process_without_connections))
print("Processes inaccessible:", len(process_unknown))

print(
    "Total accounted processes:",
    len(process_with_connections)
    + len(process_without_connections)
    + len(process_unknown)
)
