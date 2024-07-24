from flask import Flask, request, jsonify
from flask_cors import CORS
import MeCab

app = Flask(__name__)
CORS(app)
m = MeCab.Tagger()

@app.route('/words', methods=['GET'])
def words():
    text = request.args.get('text')
    nodes = m.parse(text).splitlines()
    words = [node.split('\t')[0] for node in nodes[:-1]]  # Exclude the last line (EOS)
    return jsonify(words=words)

if __name__ == "__main__":
    app.run(debug=True)
