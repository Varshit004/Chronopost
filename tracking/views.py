from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to the Tracking API!")

def track_view(request):
    tracking_info = None
    if request.method == "GET":
        tracking_number = request.POST.get("tracking_number")
        if tracking_number:  # Check if a tracking number is provided
            tracking_info = f"Tracking details for {tracking_number}: In Chronopost"
        else:
            tracking_info = "Please enter a valid tracking number."

    return render(request, "tracking/tracking.html", {"tracking_info": tracking_info})
