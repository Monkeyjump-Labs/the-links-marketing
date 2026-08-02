import re,os,json,glob,html
def txt(s):
    s=re.sub(r'<script.*?</script>','',s,flags=re.S|re.I)
    s=re.sub(r'<style.*?</style>','',s,flags=re.S|re.I)
    s=re.sub(r'<[^>]+>',' ',s); return re.sub(r'\s+',' ',html.unescape(s)).strip()
def main_of(d):
    m=re.search(r'<main\b[^>]*>(.*?)</main>',d,re.S|re.I)
    if m: return m.group(1)
    m=re.search(r'id="page"[^>]*>(.*)</',d,re.S)
    return m.group(1) if m else d
res={}
for f in sorted(glob.glob("raw/*.html")):
    slug=os.path.basename(f)[:-5]
    d=open(f,encoding='utf-8',errors='replace').read()
    mn=main_of(d)
    heads=[(t.upper(),txt(c)) for t,c in re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>',mn,re.S|re.I)]
    heads=[h for h in heads if h[1]]
    links=[]
    seen=set()
    for attrs,inner in re.findall(r'<a\b([^>]*)>(.*?)</a>',mn,re.S|re.I):
        hm=re.search(r'href=["\'](.*?)["\']',attrs)
        if not hm: continue
        href=html.unescape(hm.group(1)); label=txt(inner)[:80]
        k=(href,label)
        if k in seen: continue
        seen.add(k); links.append((label,href))
    res[slug]=dict(heads=heads,links=links,mainlen=len(txt(mn)))
json.dump(res,open("content.json","w"),indent=1)
print(len(res))
