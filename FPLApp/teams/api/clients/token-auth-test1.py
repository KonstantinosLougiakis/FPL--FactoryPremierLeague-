import requests

def client():
    #credentials = {"username": "admin", "password": "1234"}
    #response = requests.post("http://localhost:8000/dj-rest-auth/login/", data=credentials)
    token = "806c56de316f044bd99be3733329ac4586a04753"
    headers = {"Authorization": f"Token {token}"}
    response = requests.get("http://localhost:8000/api/user-profile/", headers=headers)
    print("Status code:", response.status_code)
    response_data = response.json()
    print(response_data)

if __name__ == "__main__":
    client()