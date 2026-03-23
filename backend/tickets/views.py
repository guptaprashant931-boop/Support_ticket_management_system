from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.db.models import Count, Avg
from django.utils.timezone import now
from datetime import timedelta



from .models import Ticket
from .serializers import TicketSerializer

# Create your views here.

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer
    filterset_fields = ['category', 'priority', 'status']
    search_fields = ['title', 'description']
    
from rest_framework.views import APIView
class TicketStatsView(APIView):
    
    def get(self,request):
        total_tickets = Ticket.objects.count()
        open_tickets = Ticket.objects.filter(status='open').count()
        
        #Average tickets per day
        first_ticket = Ticket.objects.order_by('created_at').first()
        
        if first_ticket:
            days = (now() - first_ticket.created_at).days or 1
            avg_per_day = total_tickets / days 
        else:
            avg_per_day = 0
            
        #Priority breakdown
        priority_data = Ticket.objects.values('priority').annotate(count=Count('id'))
        
        priority_breakdown = {
            item['priority']: item['count']
            for item in priority_data 
        }
        
        #Category breakdown
        category_data = Ticket.objects.values('category').annotate(count=Count('id'))
        
        category_breakdown = {
            item['category'] : item['count']
            for item in category_data
        }
        
        
        return Response({
            "total_tickets": total_tickets,
            "open_tickets" : open_tickets,
            "avg_tickets_per_day" : round(avg_per_day,2),
            "priority_breakdown" : priority_breakdown,
            "category_breakdown" : category_breakdown,
        })
import os 
from openai import OpenAI

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = None

if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)
        
@api_view(['POST'])
def classify_ticket(request):
    description = request.data.get("description")
    
    if not description:
        return Response(
            {"error" : "Description is required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not client:
        
        return Response({
            "suggest_category": None,
            "suggested_priority": None,
            "error": "LLM API key not configured"
        })
        
    prompt = f"""
    You are a support ticket classifier.
    
    based on the description below, return:
    - category (billing, technical, account, general)
    - priority (low, medium, high, critical)
    
    Respond ONLY in this JSON format:
    {{
        "category" : "...",
        "priority" : "...:
    }}
    
    Description:
    {description}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user","content" : prompt}
            ]
        )
        
        content = response.choices[0].message.content
        
        import json 
        parsed = json.loads(content)
        
        return Response({
            "suggested_category": parsed.get("category"),
            "suggested_priority": parsed.get("priority"),
        })
        
        
        
    except Exception as e:
        # Gracefull fallback (important requirement)
        return Response({
            "suggested_category": None,
            "suggested_priority" : None,
            "error" : "LLM service unavaulable"
        })