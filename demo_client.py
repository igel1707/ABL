import requests, json, sys

BASE = "http://localhost:3000"

def pretty(title, data):
    print(f"\n=== {title} ===")
    print(json.dumps(data, indent=2))

# 1) Create space
r = requests.post(f"{BASE}/spaces", json={
    "name":"Main Hall L1", "location":"Campus A - Tower 1", "totalSeats": 5
})
r.raise_for_status()
space = r.json()
pretty("Create Space", space)
space_id = space["id"]

# 2) Seed seats S1..S5
r = requests.post(f"{BASE}/spaces/{space_id}/seed")
r.raise_for_status()
pretty("Seed Seats", r.json())

# 3) List AVAILABLE seats
r = requests.get(f"{BASE}/spaces/{space_id}/seats", params={"status":"AVAILABLE"})
r.raise_for_status()
seats = r.json()
pretty("List AVAILABLE Seats", seats)
seat_id = seats[0]["id"]

# 4) Lock (hold) a seat
r = requests.post(f"{BASE}/spaces/{space_id}/seats/{seat_id}/lock")
r.raise_for_status()
pretty(f"Lock Seat {seat_id}", r.json())

# 5) Mark as RESERVED (checkout)
r = requests.patch(f"{BASE}/spaces/{space_id}/seats/{seat_id}/status", json={"status":"RESERVED"})
r.raise_for_status()
pretty(f"Set Seat {seat_id} to RESERVED", r.json())

# 6) List RESERVED seats
r = requests.get(f"{BASE}/spaces/{space_id}/seats", params={"status":"RESERVED"})
r.raise_for_status()
pretty("List RESERVED Seats", r.json())

print("\n✅ Demo completed.")

# To run this demo, ensure the server is running on localhost:3000
# Then execute: python demo_client.py