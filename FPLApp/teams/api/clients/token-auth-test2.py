import requests

def client():
    data = {
        "username": "usertest",
        "email": "usertest@mail.com",
        "password1": "1234",
        "password2": "1234",
    }

    response = requests.post("http://localhost:8000/api/register/", data=data)
    print("Status code:", response.status_code)

if __name__ == "__main__":
    client()