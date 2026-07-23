import urllib.request, json
req = urllib.request.Request("https://api.github.com/users/NucleoColectivo/repos?per_page=100")
with urllib.request.urlopen(req) as response:
    repos = json.loads(response.read())
for repo in repos:
    try:
        url = "https://api.github.com/repos/NucleoColectivo/" + repo['name'] + "/contents"
        res = urllib.request.urlopen(url)
        contents = json.loads(res.read())
        names = [item['name'] for item in contents]
        if 'imglab' in names: print("Found imglab in", repo['name'])
        if 'public' in names:
            url2 = "https://api.github.com/repos/NucleoColectivo/" + repo['name'] + "/contents/public"
            res2 = urllib.request.urlopen(url2)
            contents2 = json.loads(res2.read())
            names2 = [item['name'] for item in contents2]
            if 'imglab' in names2: print("Found public/imglab in", repo['name'])
    except Exception as e:
        pass
