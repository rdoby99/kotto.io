from flask import Flask, request, jsonify
from flask_cors import CORS
import MeCab
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
m = MeCab.Tagger()

#Connect to DB
conn = psycopg2.connect(
    dbname=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    host="localhost"
)

@app.route('/words', methods=['GET'])
def words():
    # Break input into morphemes via Mecab
    text = request.args.get('text')
    nodes = m.parse(text).splitlines()
    words = [node.split('\t')[0] for node in nodes[:-1]]  # Exclude the last line (EOS)
    # return jsonify(words=words)

    if not words:
        return jsonify(results=[])
    
    # Create query to database
    placeholders = ', '. join(['%s'] * len(words))
    query = f"SELECT * FROM words WHERE word IN ({placeholders})"

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(query, words)
        results = cur.fetchall()

    return jsonify(results=results)

if __name__ == "__main__":
    app.run(debug=True)
