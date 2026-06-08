import psutil
from flask import Flask , jsonify ,request
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["*"])


@app.route("/")
def get_running_process(): 
    try:
        arr = []
        
        for proc in psutil.process_iter(['pid', 'name']):
            try:
                connections = proc.net_connections(kind='inet')
                process_info = {}
                for conn in connections:
                    data = {
                       
                       "laddr" :  conn.laddr,
                        "raddr" : conn.raddr,
                        "status" : conn.status
                    }

                    # process_info[f"{proc.info['name']} {proc.info['pid']}"] = data
                    process_info["name"] = proc.info['name']
                    process_info["pid"] = proc.info["pid"]
                    process_info["info"] = data

                    
                if process_info: 
                    arr.append(process_info)

            except (psutil.AccessDenied,
                    psutil.NoSuchProcess):
                pass

                
        return jsonify(data=arr) , 200

    except Exception as e: 
        print(e)



if __name__ == "__main__": 
        app.run(debug=True , host="0.0.0.0")