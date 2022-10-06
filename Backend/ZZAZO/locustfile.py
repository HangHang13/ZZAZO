# locustfile.py
from locust import HttpUser, task, between
import json
class WebsiteTestUser(HttpUser):
     
    wait_time = between(1, 2.5)
    @task
    def my_task(self):
        token =""
        
        headers = {'Content-Type':'application/json', 'Authorization' : 'Bearer ' + token}
        payload = {
            "longitude" : 127.29955512818,
            "latitude" : 36.3487861008275,
            "radius" : 500
        }
        # "https://j7b307.p.ssafy.io/api/v1/place/recommend"
        self.client.post("https://j7b307.p.ssafy.io/api/v1/place/recommend", headers=headers, data = json.dumps(payload))