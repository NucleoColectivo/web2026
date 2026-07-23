import urllib.request, json
req = urllib.request.Request("https://api.github.com/users/NucleoColectivo/repos?per_page=100")
with urllib.request.urlopen(req) as response:
    repos = json.loads(response.read())
for repo in repos:
    try:
        url = "https://api.github.com/repos/NucleoColectivo/" + repo['name'] + "/contents/imglab"
        res = urllib.request.urlopen(url)
        print("Found in", repo['name'])
    except:
        pass
