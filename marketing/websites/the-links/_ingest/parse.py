import re,os,json,glob,html,sys
raw="raw"
def txt(s):
    s=re.sub(r'<[^>]+>','',s); s=html.unescape(s); return re.sub(r'\s+',' ',s).strip()
out=[]
for f in sorted(glob.glob(raw+"/*.html")):
    slug=os.path.basename(f)[:-5]
    d=open(f,encoding='utf-8',errors='replace').read()
    # limit to body content region for headings: squarespace main content
    m=re.search(r'<title>(.*?)</title>',d,re.S); title=txt(m.group(1)) if m else None
    def meta(name,attr='name'):
        mm=re.search(r'<meta[^>]*'+attr+r'=["\']'+re.escape(name)+r'["\'][^>]*content=["\'](.*?)["\']',d,re.S|re.I)
        if not mm:
            mm=re.search(r'<meta[^>]*content=["\'](.*?)["\'][^>]*'+attr+r'=["\']'+re.escape(name)+r'["\']',d,re.S|re.I)
        return txt(mm.group(1)) if mm else None
    desc=meta('description')
    canon=re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']',d,re.I)
    ogt=meta('og:title','property'); ogd=meta('og:description','property'); ogi=meta('og:image','property'); ogu=meta('og:url','property')
    # headings
    heads=[(t.upper(),txt(c)) for t,c in re.findall(r'<(h[1-6])[^>]*>(.*?)</\1>',d,re.S|re.I)]
    heads=[h for h in heads if h[1]]
    # links
    links=[]
    for href,inner in re.findall(r'<a\b([^>]*)>(.*?)</a>',d,re.S|re.I):
        hm=re.search(r'href=["\'](.*?)["\']',href)
        if not hm: continue
        links.append((hm.group(1),txt(inner)[:90]))
    ext=[(h,t) for h,t in links if h.startswith('http') and 'lakevillelinks.com' not in h]
    iframes=re.findall(r'<iframe[^>]*src=["\'](.*?)["\']',d,re.I)
    dataframes=re.findall(r'data-src=["\'](https?://[^"\']*(?:youtube|vimeo|google|maps|calend|book)[^"\']*)["\']',d,re.I)
    imgs=len(re.findall(r'<img\b',d,re.I))
    ssimgs=len(set(re.findall(r'images\.squarespace-cdn\.com/content/[^"\'\s]+',d)))
    jsonld=re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',d,re.S|re.I)
    out.append(dict(slug=slug,title=title,desc=desc,canon=canon.group(1) if canon else None,
        ogt=ogt,ogd=ogd,ogi=ogi,ogu=ogu,heads=heads,ext=ext,links=links,iframes=iframes,
        dataframes=dataframes,imgs=imgs,ssimgs=ssimgs,jsonld=[txt(j)[:300] for j in jsonld],bytes=len(d)))
json.dump(out,open("parsed.json","w"),indent=1)
print("pages",len(out))
