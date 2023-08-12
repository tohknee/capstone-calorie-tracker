from flask import Blueprint, jsonify, request


chatgpt_routes=Blueprint("chatgpt",__name__)

CHATGPT_API_KEY = 'YOUR_CHATGPT_API_KEY'
CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions'

