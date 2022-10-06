# locustfile.py
from locust import HttpUser, task, between
import json
#테스트 locust
class WebsiteTestUser(HttpUser):
     
    wait_time = between(1, 2.5)
    @task
    def my_task(self):
        token =""
        
        headers = {'Content-Type':'application/json', 'Authorization' : 'Bearer ' + token}
        payload = {
            "longitude" : 127.29955512818,
            "latitude" : 36.3487861008275,
            "radius" : 300
        }
        # "https://j7b307.p.ssafy.io/api/v1/place/recommend"
        # self.client.post("https://j7b307.p.ssafy.io/", headers=headers, data = json.dumps(payload))
        self.client.get("https://j7b307.p.ssafy.io/")