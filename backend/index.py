
import psutil
import socket

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def get_running_process():


    process_with_connections = []
    process_without_connections = []
    process_unknown = []

    for proc in psutil.process_iter(['pid', 'name' , 'exe']):
        print(proc.info)
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
                "path": proc.info['exe'],
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
                "path": proc.info['exe'],
                "reason": "Access denied"
            })

        except psutil.NoSuchProcess:
            continue


    return jsonify(data={"process_with_connections": process_with_connections , "process_without_connections" : process_without_connections , "process_unknown": process_unknown})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
